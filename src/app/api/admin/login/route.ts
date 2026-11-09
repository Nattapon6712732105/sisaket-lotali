import { NextRequest, NextResponse } from 'next/server';
import { getAdminPassword, createAdminToken } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = getAdminPassword();

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, message: 'กรุณากรอกรหัสผ่านผู้ดูแลระบบ' },
        { status: 400 }
      );
    }

    if (password.length < 10) {
      return NextResponse.json(
        { success: false, message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 10 ตัวอักษรขึ้นไป' },
        { status: 400 }
      );
    }

    if (password !== correctPassword) {
      return NextResponse.json(
        { success: false, message: 'รหัสผ่านไม่ถูกต้อง (เฉพาะผู้ดูแลระบบเท่านั้นที่สามารถกรอกข้อมูลได้)' },
        { status: 401 }
      );
    }

    const token = createAdminToken(correctPassword);

    const response = NextResponse.json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
    });

    // Set HTTP-Only Cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error logging in' },
      { status: 500 }
    );
  }
}
