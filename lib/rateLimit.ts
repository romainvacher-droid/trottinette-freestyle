const requests = new Map<string, number[]>();
const failures = new Map<string, number>(); // IP -> count

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = requests.get(key) ?? [];

  const valid = timestamps.filter(t => now - t < windowMs);
  if (valid.length >= limit) return false;

  valid.push(now);
  requests.set(key, valid);
  return true;
}

export function getFailureDelay(ip: string): number {
  const count = failures.get(ip) ?? 0;
  if (count >= 10) return 15 * 60 * 1000; // 15 min block
  if (count >= 5) return 1000 * Math.pow(2, count - 4); // 1s, 2s, 4s...
  return 0;
}

export function recordFailure(ip: string) {
  const count = (failures.get(ip) ?? 0) + 1;
  failures.set(ip, count);
}

export function clearFailures(ip: string) {
  failures.delete(ip);
}
