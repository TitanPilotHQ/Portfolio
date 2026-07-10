# Public Claims Register

Every measurable public claim on titanpilot.app must have a row here
before it ships. No claim goes live without a source.

| Claim | Source doc | Evidence date | Public-safe wording | Owner | Review/expiry date |
| --- | --- | --- | --- | --- | --- |
| Phase C.5 certification passed | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md` | 2026-07-08 | "Phase C.5 certified — ten operational-hardening tasks, each deployed and verified in production the same day." | Emad | 2027-01-08 (recertify at next major phase) |
| Replay determinism verified | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md` (DR drill), `docs/releases/v1.1.0-phase-c.md` (Phase C close) | 2026-07-08 | "Replay verification reproduces 1,662 of 1,662 recorded events with zero drift." | Emad | 2027-01-08 |
| Disaster recovery — restore speed | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md`, `docs/reports/2026-07-08-dr-drill.md` | 2026-07-08 | "Full restore and 12/12 integrity verification completes in 13 seconds." | Emad | 2027-01-08 |
| Disaster recovery — point-in-time recovery | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md`, `docs/reports/2026-07-08-dr-drill.md` | 2026-07-08 | "Point-in-time recovery from base backup plus 908 WAL segments completes in 78 seconds with zero event gap." | Emad | 2027-01-08 |
| AI provider failover proof | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md` | 2026-07-08 | "A 12-case transport-level fault matrix (connection refusal, DNS failure, TLS failure, timeouts, HTTP 429/5xx) confirms automatic failover to a backup AI provider, verified against production traffic." | Emad | 2027-01-08 |
| Test suite health | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md` | 2026-07-08 | "412 automated tests passing; strict type-checking and linting clean in CI." | Emad | 2027-01-08 |
| Security audit — findings remediated | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md`, `docs/reports/2026-07-08-security-audit.md` | 2026-07-08 | "An independent security audit found two high-severity issues; both were fixed and verified the same day (SSH restricted to key-only authentication; backup files restricted to owner-only permissions)." | Emad | 2027-01-08 |
