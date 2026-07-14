import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export interface RateLimiter {
  checkAndConsume(key: string): Promise<RateLimitResult>;
}

const HOUR_MS = 60 * 60 * 1000;
const BURST_WINDOW_MS = 5 * 60 * 1000;
const HOUR_LIMIT = 3;
const BURST_LIMIT = 2;

class MemoryRateLimiter implements RateLimiter {
  private hits = new Map<string, number[]>();

  async checkAndConsume(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const timestamps = (this.hits.get(key) ?? []).filter(
      (t) => now - t < HOUR_MS,
    );

    const burstCount = timestamps.filter((t) => now - t < BURST_WINDOW_MS).length;
    if (burstCount >= BURST_LIMIT) {
      return { allowed: false, retryAfterSeconds: Math.ceil(BURST_WINDOW_MS / 1000) };
    }
    if (timestamps.length >= HOUR_LIMIT) {
      const oldest = Math.min(...timestamps);
      return {
        allowed: false,
        retryAfterSeconds: Math.ceil((oldest + HOUR_MS - now) / 1000),
      };
    }

    timestamps.push(now);
    this.hits.set(key, timestamps);
    return { allowed: true };
  }
}

class UpstashRateLimiter implements RateLimiter {
  constructor(private redis: Redis) {}

  async checkAndConsume(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const redisKey = `ratelimit:contact:${key}`;

    await this.redis.zremrangebyscore(redisKey, 0, now - HOUR_MS);

    const burstCount = await this.redis.zcount(
      redisKey,
      now - BURST_WINDOW_MS,
      now,
    );
    if (burstCount >= BURST_LIMIT) {
      return { allowed: false, retryAfterSeconds: Math.ceil(BURST_WINDOW_MS / 1000) };
    }

    const hourCount = await this.redis.zcard(redisKey);
    if (hourCount >= HOUR_LIMIT) {
      const oldest = await this.redis.zrange(redisKey, 0, 0, { withScores: true });
      const oldestScore = oldest.length > 0 ? Number(oldest[1]) : now;
      return {
        allowed: false,
        retryAfterSeconds: Math.ceil((oldestScore + HOUR_MS - now) / 1000),
      };
    }

    await this.redis.zadd(redisKey, { score: now, member: `${now}:${Math.random()}` });
    await this.redis.expire(redisKey, Math.ceil(HOUR_MS / 1000));
    return { allowed: true };
  }
}

let cachedLimiter: RateLimiter | null = null;
let degraded = false;

// Diagnostic flag only — never expose in a public API response, since
// confirming degraded-mode to an unauthenticated caller helps an attacker
// time abuse around it. Safe to read from a server-only health check.
export function isRateLimiterDegraded(): boolean {
  return degraded;
}

export function getRateLimiter(): RateLimiter {
  if (cachedLimiter) return cachedLimiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    cachedLimiter = new UpstashRateLimiter(new Redis({ url, token }));
  } else {
    degraded = true;
    // No IPs, HMACs, emails, names, or message content — this fires once
    // per cold start and only says *that* the limiter degraded, not who
    // hit it.
    console.warn("[rateLimit] Upstash credentials absent — falling back to per-instance memory rate limiting. Distributed rate-limit protection is NOT active.");
    cachedLimiter = new MemoryRateLimiter();
  }
  return cachedLimiter;
}
