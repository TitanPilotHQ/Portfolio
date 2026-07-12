import { Redis } from "@upstash/redis";

export interface LeadRecord {
  schema_version: 1;
  lead_id: string;
  uuid: string;
  submitted_at: string;
  form_version: number;
  source: string;
  company: string;
  name: string;
  work_email: string;
  job_title: string;
  desk_size: string;
  jurisdiction: string;
  asset_classes: string[];
  ai_usage: string;
  governance_method: string;
  primary_goal: string[];
  message: string;
  consent: boolean;
  hashed_ip: string;
  user_agent: string;
  referrer: string | null;
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  } | null;
}

export interface LeadStore {
  getNextLeadId(): Promise<string>;
  save(record: LeadRecord): Promise<void>;
}

class UpstashLeadStore implements LeadStore {
  constructor(private redis: Redis) {}

  async getNextLeadId(): Promise<string> {
    const year = new Date().getUTCFullYear();
    const sequence = await this.redis.incr(`leads:counter:${year}`);
    return `TP-${year}-${String(sequence).padStart(6, "0")}`;
  }

  async save(record: LeadRecord): Promise<void> {
    await this.redis.set(`leads:${record.lead_id}`, JSON.stringify(record));
  }
}

let cachedStore: LeadStore | null = null;

export function getLeadStore(): LeadStore {
  if (cachedStore) return cachedStore;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN are not configured — LeadStore requires a real Upstash connection (see deployment checklist).",
    );
  }
  cachedStore = new UpstashLeadStore(new Redis({ url, token }));
  return cachedStore;
}
