'use client';

import React from 'react';
import { LotteryData } from '@/types/lottery';

interface OfficialPrintSheetProps {
  data: LotteryData;
}

export default function OfficialPrintSheet({ data }: OfficialPrintSheetProps) {
  const prizes = data.prizes;

  const formatNum = (num: string | null) => {
    if (!num || num.trim() === '') return '- - - - - -';
    return num;
  };

  return (
    <div className="official-sheet font-sans text-black bg-white p-4 max-w-4xl mx-auto">
      {/* Header text similar to GLO Official Sheet */}
      <div className="text-center pb-2 border-b-2 border-black mb-2">
        <p className="text-[10px] text-gray-700 tracking-wide">
          ตรวจผลรางวัลทาง Internet ได้ที่เว็บไซต์ www.sisaket.go.th และ www.glo.or.th
        </p>
        <h1 className="text-xl font-extrabold tracking-tight mt-0.5 text-black">
          ผลการออกรางวัล{data.title}
        </h1>
        <p className="text-xs font-bold text-gray-900 mt-0.5">
          {data.subTitle} ออกรางวัล ณ {data.eventDate}
        </p>
      </div>

      {/* ======================================================== */}
      {/* SECTION 1: รางวัลที่ ๑ & รางวัลข้างเคียง & เลขท้าย ๓ ตัว */}
      {/* ======================================================== */}
      <table className="w-full border-collapse border-2 border-black text-center mb-1.5">
        <tbody>
          {/* Black Headers */}
          <tr className="bg-black text-white text-xs font-bold">
            <td className="border-2 border-black py-1 w-5/12">รางวัลที่ ๑</td>
            <td className="border-2 border-black py-1 w-4/12">รางวัลข้างเคียงรางวัลที่ ๑</td>
            <td className="border-2 border-black py-1 w-3/12">รางวัลเลขท้าย ๓ ตัว</td>
          </tr>

          {/* Reward Sub-headers */}
          <tr className="bg-gray-50 text-[10px] text-gray-800 font-semibold">
            <td className="border border-black py-0.5 px-1">
              {prizes.firstPrize.reward} (๒ รางวัล)
            </td>
            <td className="border border-black py-0.5 px-1">
              {prizes.adjacentFirstPrize.reward} (๔ รางวัล)
            </td>
            <td className="border border-black py-0.5 px-1">
              {prizes.last3DigitsPrize.reward} (๑๐๐ รางวัล)
            </td>
          </tr>

          {/* Numbers Row */}
          <tr>
            {/* รางวัลที่ 1 (2 หมายเลข) */}
            <td className="border-2 border-black py-3 px-2">
              <div className="flex items-center justify-around font-mono text-2xl font-black tracking-wider text-black">
                {prizes.firstPrize.numbers.map((n, i) => (
                  <span key={i} className="px-1">{formatNum(n)}</span>
                ))}
              </div>
            </td>

            {/* ข้างเคียงรางวัลที่ 1 (4 หมายเลข) */}
            <td className="border-2 border-black py-2 px-1">
              <div className="grid grid-cols-2 gap-1 font-mono text-sm font-bold tracking-wider text-black">
                {prizes.adjacentFirstPrize.numbers.map((n, i) => (
                  <span key={i} className="border border-gray-200 py-0.5">{formatNum(n)}</span>
                ))}
              </div>
            </td>

            {/* เลขท้าย 3 ตัว (1 หมายเลข) */}
            <td className="border-2 border-black py-3 px-2">
              <span className="font-mono text-3xl font-black tracking-widest text-black">
                {prizes.last3DigitsPrize.numbers[0] || '- - -'}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ======================================================== */}
      {/* SECTION 2: รางวัลที่ ๒ (ทองคำแท่ง ๑ บาท ๓ รางวัล) */}
      {/* ======================================================== */}
      <table className="w-full border-collapse border-2 border-black text-center mb-1.5">
        <tbody>
          <tr className="bg-black text-white text-xs font-bold">
            <td colSpan={3} className="py-1">
              {prizes.secondPrize.name} รางวัลละ {prizes.secondPrize.reward} (จำนวน ๓ รางวัล)
            </td>
          </tr>
          <tr className="font-mono text-lg font-extrabold tracking-wider text-black">
            {prizes.secondPrize.numbers.map((n, i) => (
              <td key={i} className="border-2 border-black py-2 w-1/3">
                {formatNum(n)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* ======================================================== */}
      {/* SECTION 3: รางวัลที่ ๓ (iPhone 16 Pro ๓ รางวัล) */}
      {/* ======================================================== */}
      <table className="w-full border-collapse border-2 border-black text-center mb-1.5">
        <tbody>
          <tr className="bg-black text-white text-xs font-bold">
            <td colSpan={3} className="py-1">
              {prizes.thirdPrize.name} รางวัลละ {prizes.thirdPrize.reward} (จำนวน ๓ รางวัล)
            </td>
          </tr>
          <tr className="font-mono text-lg font-extrabold tracking-wider text-black">
            {prizes.thirdPrize.numbers.map((n, i) => (
              <td key={i} className="border-2 border-black py-2 w-1/3">
                {formatNum(n)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* ======================================================== */}
      {/* SECTION 4: รางวัลที่ ๔ (มอเตอร์ไซค์ Honda Wave ๕ รางวัล) */}
      {/* ======================================================== */}
      <table className="w-full border-collapse border-2 border-black text-center mb-1.5">
        <tbody>
          <tr className="bg-black text-white text-xs font-bold">
            <td colSpan={5} className="py-1">
              {prizes.fourthPrize.name} รางวัลละ {prizes.fourthPrize.reward} (จำนวน ๕ รางวัล)
            </td>
          </tr>
          <tr className="font-mono text-base font-extrabold tracking-wider text-black">
            {prizes.fourthPrize.numbers.map((n, i) => (
              <td key={i} className="border-2 border-black py-2 w-1/5">
                {formatNum(n)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* ======================================================== */}
      {/* SECTION 5: รางวัลที่ ๕ (ตู้เย็น ๒ ประตู ๑๐ รางวัล - 5 คอลัมน์ x 2 แถว) */}
      {/* ======================================================== */}
      <table className="w-full border-collapse border-2 border-black text-center mb-2">
        <tbody>
          <tr className="bg-black text-white text-xs font-bold">
            <td colSpan={5} className="py-1">
              {prizes.fifthPrize.name} รางวัลละ {prizes.fifthPrize.reward} (จำนวน ๑๐ รางวัล)
            </td>
          </tr>
          {/* Row 1: 5 items */}
          <tr className="font-mono text-sm sm:text-base font-bold tracking-wider text-black">
            {prizes.fifthPrize.numbers.slice(0, 5).map((n, i) => (
              <td key={i} className="border-2 border-black py-1.5 w-1/5">
                {formatNum(n)}
              </td>
            ))}
          </tr>
          {/* Row 2: 5 items */}
          <tr className="font-mono text-sm sm:text-base font-bold tracking-wider text-black">
            {prizes.fifthPrize.numbers.slice(5, 10).map((n, i) => (
              <td key={i + 5} className="border-2 border-black py-1.5 w-1/5">
                {formatNum(n)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* ======================================================== */}
      {/* FOOTER: Official GLO Terms & Conditions */}
      {/* ======================================================== */}
      <div className="border-t-2 border-black pt-2 text-[10px] leading-relaxed text-black">
        <ul className="space-y-1 list-disc pl-4">
          <li>
            <strong>เงื่อนไขการรับรางวัล:</strong> สลากกาชาด ประจำปี ๒๕๗๐ ฉบับละ ๑๐๐ บาท จำนวนทั้งสิ้น ๑๒๗ รางวัล ออกรางวัล ณ {data.eventDate} ณ {data.location}
          </li>
          <li>
            <strong>การจ่ายรางวัล:</strong> รางวัลจะจ่ายแก่ผู้ถือสลากฉบับที่ถูกรางวัลนำมาขอรับเท่านั้น โดยสลากต้องอยู่ในสภาพสมบูรณ์ ไม่ชำรุด ฉีกขาด หรือถูกแก้ไขดัดแปลงตัวเลข
          </li>
          <li>
            <strong>สถานที่และกำหนดเวลา:</strong> ผู้ถูกรางวัลสามารถติดต่อขอรับรางวัลได้ที่ <strong>สำนักงานเหล่ากาชาดจังหวัดศรีสะเกษ</strong> ตั้งแต่วันที่ ๑๓ มกราคม ๒๕๗๐ ถึง วันที่ ๙ กุมภาพันธ์ ๒๕๗๐ ในวันและเวลาราชการ
          </li>
          <li>
            <strong>ติดต่อสอบถาม:</strong> โทรศัพท์ ๐๔๕-๖๑๒๔๕๑ หรือตรวจสอบผลการออกรางวัลอย่างเป็นทางการได้ทางเว็บไซต์ <strong>www.sisaket.go.th</strong>
          </li>
        </ul>

        {/* Signatures Row */}
        <div className="grid grid-cols-2 gap-8 text-center pt-4 mt-2">
          <div>
            <p className="text-[10px] text-gray-500 mb-6">...........................................................................</p>
            <p className="font-bold text-[11px]">( ประธานกรรมการออกรางวัลสลากกาชาด )</p>
            <p className="text-[10px] text-gray-600">จังหวัดศรีสะเกษ</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 mb-6">...........................................................................</p>
            <p className="font-bold text-[11px]">( นายกเหล่ากาชาดจังหวัดศรีสะเกษ )</p>
            <p className="text-[10px] text-gray-600">สำนักงานเหล่ากาชาดจังหวัดศรีสะเกษ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

