import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, getAdminPassword } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cookieToken = req.cookies.get('admin_token')?.value;
  const token = authHeader?.replace('Bearer ', '') || cookieToken;

  const isAuthenticated = verifyAdminToken(token);
  const adminPassword = getAdminPassword();

  return NextResponse.json({
    authenticated: isAuthenticated,
    // Provide password hint/length info safely
    passwordLength: adminPassword.length,
    passwordConfigured: true,
  });
}

