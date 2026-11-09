import { NextRequest, NextResponse } from 'next/server';
import { getLotteryData, checkLotteryNumber } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { number } = await req.json();
    if (!number || typeof number !== 'string') {
      return NextResponse.json(
        { success: false, message: 'กรุณาระบุหมายเลขสลากที่ต้องการตรวจ' },
        { status: 400 }
      );
    }

    const data = await getLotteryData();
    const result = checkLotteryNumber(data, number);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error checking lottery number' },
      { status: 500 }
    );
  }
}
