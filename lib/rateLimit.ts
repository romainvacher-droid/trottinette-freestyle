import { Redis } from '@upstash/redis';

// In-memory fallback for local dev (no Redis configured)
const memRequests = new Map<string, number[]>();
const memFailures = new Map<string, number>();

let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export async function checkRateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  if (!redis) {
    const now = Date.now();
    const timestamps = memRequests.get(key) ?? [];
    const valid = timestamps.filter(t => now - t < windowMs);
    if (valid.length >= limit) return false;
    valid.push(now);
    memRequests.set(key, valid);
    return true;
  }

  const now = Date.now();
  const rlKey = `rl:${key}`;

  await redis.zremrangebyscore(rlKey, 0, now - windowMs);
  const count = await redis.zcard(rlKey);

  if (count >= limit) return false;

  await redis.zadd(rlKey, { score: now, member: `${now}:${Math.random()}` });
  await redis.pexpire(rlKey, windowMs);

  return true;
}

export async function getFailureDelay(ip: string): Promise<number> {
  const count = redis
    ? ((await redis.get<number>(`failures:${ip}`)) ?? 0)
    : (memFailures.get(ip) ?? 0);

  if (count >= 10) return 15 * 60 * 1000;
  if (count >= 5) return 1000 * Math.pow(2, count - 4);
  return 0;
}

export async function recordFailure(ip: string): Promise<void> {
  if (redis) {
    await redis.incr(`failures:${ip}`);
    await redis.expire(`failures:${ip}`, 24 * 60 * 60);
  } else {
    memFailures.set(ip, (memFailures.get(ip) ?? 0) + 1);
  }
}

export async function clearFailures(ip: string): Promise<void> {
  if (redis) {
    await redis.del(`failures:${ip}`);
  } else {
    memFailures.delete(ip);
  }
}
