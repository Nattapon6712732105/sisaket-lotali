import { NextRequest, NextResponse } from 'next/server';
import { generateRandomPassword, verifyAdminToken, getAdminPassword } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Allow fetching current password ONLY if already authenticated as admin
  const authHeader = req.headers.get('authorization');
  const cookieToken = req.cookies.get('admin_token')?.value;
  const token = authHeader?.replace('Bearer ', '') || cookieToken;

  const lengthParam = req.nextUrl.searchParams.get('length');
  const length = Math.max(10, parseInt(lengthParam || '16', 10));

  const newRandomPassword = generateRandomPassword(length);

  if (verifyAdminToken(token)) {
    return NextResponse.json({
      success: true,
      currentPassword: getAdminPassword(),
      generatedPassword: newRandomPassword,
    });
  }

  // If not logged in, only return newly generated suggestions (does not expose current password)
  return NextResponse.json({
    success: true,
    generatedPassword: newRandomPassword,
  });
}
