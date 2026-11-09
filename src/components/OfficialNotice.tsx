'use client';

import React from 'react';
import { Printer, MapPin, Phone, Calendar, Info, ShieldCheck, FileSpreadsheet } from 'lucide-react';

interface OfficialNoticeProps {
  onPreviewSheet?: () => void;
}

export default function OfficialNotice({ onPreviewSheet }: OfficialNoticeProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md transition-colors no-print">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/80 px-2.5 py-1 rounded-full border border-orange-200 dark:border-orange-800">
            TERMS & CONDITIONS
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            เงื่อนไขและการติดต่อขอรับรางวัล
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            สลากกาชาด งานเทศกาลปีใหม่สี่เผ่าไทยศรีสะเกษ ประจำปี ๒๕๗๐ (สลาก ๖ หลัก ๑๒๗ รางวัล)
          </p>
        </div>

        {/* Action Buttons: Print & Preview Sheet */}
        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
          {onPreviewSheet && (
            <button
              onClick={onPreviewSheet}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>ดูใบตรวจทางการ (สไตล์กองสลาก)</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์ใบตรวจรางวัล (Print A4)</span>
          </button>
        </div>
      </div>

      {/* Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        <div className="bg-orange-50/50 dark:bg-slate-800/60 p-4 rounded-2xl border border-orange-100 dark:border-slate-700">
          <div className="flex items-center gap-2 font-bold text-orange-900 dark:text-orange-300 mb-2">
            <ShieldCheck className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
            <span>ก. สิทธิ์การรับรางวัล</span>
          </div>
          <p className="leading-relaxed">
            รางวัลจะจ่ายแก่ผู้ถือสลากฉบับที่ถูกรางวัลนำมาขอรับรางวัลเท่านั้น โดยสลากต้องอยู่ในสภาพสมบูรณ์ ไม่ชำรุด ฉีกขาด หรือถูกแก้ไขดัดแปลงตัวเลข
          </p>
        </div>

        <div className="bg-amber-50/50 dark:bg-slate-800/60 p-4 rounded-2xl border border-amber-100 dark:border-slate-700">
          <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 mb-2">
            <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>ข. กำหนดการออกรางวัล</span>
          </div>
          <p className="leading-relaxed">
            ออกรางวัลในวันจันทร์ที่ ๕ มกราคม ๒๕๗๐ เวลา ๒๐.๓๐ น. เป็นต้นไป ณ บริเวณเวทีกลาง สนามหน้าศาลากลางจังหวัดศรีสะเกษ
          </p>
        </div>

        <div className="bg-red-50/50 dark:bg-slate-800/60 p-4 rounded-2xl border border-red-100 dark:border-slate-700">
          <div className="flex items-center gap-2 font-bold text-red-900 dark:text-red-300 mb-2">
            <MapPin className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
            <span>ค. สถานที่และระยะเวลาขอรับ</span>
          </div>
          <p className="leading-relaxed">
            ขอรับรางวัลได้ที่ <strong>สำนักงานเหล่ากาชาดจังหวัดศรีสะเกษ</strong> ตั้งแต่วันที่ ๑๓ มกราคม ๒๕๗๐ ถึง วันที่ ๙ กุมภาพันธ์ ๒๕๗๐ ในวันและเวลาราชการ
          </p>
        </div>
      </div>

      {/* Contact & Verification info */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            โทรศัพท์: <strong className="text-slate-700 dark:text-slate-200">๐๔๕-๖๑๒๔๕๑</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            ตรวจผลออนไลน์: <a href="https://www.sisaket.go.th" target="_blank" rel="noreferrer" className="underline font-medium text-orange-700 dark:text-orange-400">www.sisaket.go.th</a>
          </span>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          รายได้จากการจำหน่ายสลาก เพื่อช่วยเหลือการกุศลและสาธารณประโยชน์
        </span>
      </div>
    </div>
  );
}
