import { NextRequest, NextResponse } from 'next/server';
import { getLotteryData, saveLotteryData, verifyAdminToken } from '@/lib/storage';
import { LotteryData } from '@/types/lottery';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET: ดึงผลรางวัลปัจจุบัน (Public - ทุกคนเข้าถึงได้)
export async function GET() {
  try {
    const data = await getLotteryData();
    return NextResponse.json(
      { success: true, data },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error fetching lottery data' },
      { status: 500 }
    );
  }
}

// POST: อัปเดตผลรางวัล (Admin Only)
export async function POST(req: NextRequest) {
  try {
    // Check auth from cookie or Authorization header
    const authHeader = req.headers.get('authorization');
    const cookieToken = req.cookies.get('admin_token')?.value;
    const token = authHeader?.replace('Bearer ', '') || cookieToken;

    if (!verifyAdminToken(token)) {
      return NextResponse.json(
        { success: false, message: 'ไม่ได้รับอนุญาต (Unauthorized: เฉพาะผู้ดูแลระบบเท่านั้น)' },
        { status: 401 }
      );
    }

    const body = (await req.json()) as LotteryData;
    if (!body || !body.prizes) {
      return NextResponse.json(
        { success: false, message: 'ข้อมูลไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    const saved = await saveLotteryData(body);
    return NextResponse.json({
      success: true,
      message: 'บันทึกผลรางวัลเรียบร้อยแล้ว',
      data: saved,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error updating lottery data' },
      { status: 500 }
    );
  }
}
