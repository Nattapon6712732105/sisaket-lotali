import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, resetLotteryData } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cookieToken = req.cookies.get('admin_token')?.value;
  const token = authHeader?.replace('Bearer ', '') || cookieToken;

  if (!verifyAdminToken(token)) {
    return NextResponse.json(
      { success: false, message: 'ไม่ได้รับอนุญาต (Unauthorized)' },
      { status: 401 }
    );
  }

  try {
    const data = await resetLotteryData();
    return NextResponse.json({
      success: true,
      message: 'รีเซ็ตข้อมูลผลรางวัลกลับเป็นค่าว่างเรียบร้อยแล้ว',
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error resetting lottery data' },
      { status: 500 }
    );
  }
}

