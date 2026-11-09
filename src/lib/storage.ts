import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { LotteryData, INITIAL_LOTTERY_DATA } from '@/types/lottery';
import { calculateAdjacentNumbers, checkLotteryNumber } from './lottery-utils';

export { calculateAdjacentNumbers, checkLotteryNumber };

// In-Memory cache for fast access and Serverless resilience
let globalLotteryCache: LotteryData | null = null;

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'lottery.json');

// Helper to get admin password from environment or fallback
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'Sisaket2027@WinnerAdmin#99';
}

export function getJwtSecret(): string {
  return process.env.ADMIN_JWT_SECRET || 'ssk-lottery-secure-jwt-secret-key-99999-sisaket-2027';
}

// Generate a random password of given length (min 10)
export function generateRandomPassword(length: number = 14): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*';
  let result = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

// Generate Admin Session Token
export function createAdminToken(password: string): string {
  const payload = {
    role: 'admin',
    time: Date.now(),
    nonce: crypto.randomBytes(8).toString('hex'),
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto
    .createHmac('sha256', getJwtSecret())
    .update(`${data}:${password}`)
    .digest('hex');
  return `${data}.${signature}`;
}

// Verify Admin Session Token
export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [data, signature] = parts;
    const expected = crypto
      .createHmac('sha256', getJwtSecret())
      .update(`${data}:${getAdminPassword()}`)
      .digest('hex');
    
    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      const payload = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
      // Token valid for 7 days
      if (Date.now() - payload.time < 7 * 24 * 60 * 60 * 1000) {
        return true;
      }
    }
  } catch {
    return false;
  }
  return false;
}

// Read lottery data
export async function getLotteryData(): Promise<LotteryData> {
  // 1. Check Redis if configured (for Vercel persistent storage)
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisUrl && redisToken) {
    try {
      const res = await fetch(`${redisUrl}/get/sisaket_lottery_data`, {
        headers: { Authorization: `Bearer ${redisToken}` },
        cache: 'no-store',
      });
      if (res.ok) {
        const json = await res.json();
        if (json.result) {
          const parsed = typeof json.result === 'string' ? JSON.parse(json.result) : json.result;
          globalLotteryCache = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch from Upstash Redis, falling back to local/memory:', e);
    }
  }

  // 2. Check memory cache
  if (globalLotteryCache) {
    return globalLotteryCache;
  }

  // 3. Check local file system
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const data = JSON.parse(content) as LotteryData;
      globalLotteryCache = data;
      return data;
    }
  } catch (e) {
    console.warn('Failed to read from file, using initial data:', e);
  }

  // Fallback to initial empty data
  globalLotteryCache = JSON.parse(JSON.stringify(INITIAL_LOTTERY_DATA));
  return globalLotteryCache!;
}

// Save lottery data
export async function saveLotteryData(data: LotteryData): Promise<LotteryData> {
  data.updatedAt = new Date().toISOString();
  
  // Calculate status
  let filledCount = 0;
  let totalCount = 0;
  Object.values(data.prizes).forEach((p) => {
    totalCount += p.numbers.length;
    filledCount += p.numbers.filter((n) => n && n.trim() !== '').length;
  });

  if (filledCount === 0) {
    data.status = 'waiting';
  } else if (filledCount === totalCount) {
    data.status = 'completed';
  } else {
    data.status = 'in_progress';
  }

  globalLotteryCache = data;

  // 1. Try to save to Upstash Redis if configured
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisUrl && redisToken) {
    try {
      await fetch(`${redisUrl}/set/sisaket_lottery_data`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${redisToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.warn('Failed to save to Upstash Redis:', e);
    }
  }

  // 2. Try to save to local file
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not write to disk (likely read-only serverless environment):', e);
  }

  return data;
}

// Reset lottery data
export async function resetLotteryData(): Promise<LotteryData> {
  const fresh = JSON.parse(JSON.stringify(INITIAL_LOTTERY_DATA));
  return await saveLotteryData(fresh);
}
