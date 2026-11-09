'use client';

import React from 'react';
import { FileText, Printer, MapPin, Phone, Calendar, Info, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function OfficialNotice() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
            TERMS & CONDITIONS
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            เงื่อนไขและการติดต่อขอรับรางวัล
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            สลากกาชาด งานเทศกาลปีใหม่สี่เผ่าไทยศรีสะเกษ ประจำปี ๒๕๗๐ (จำนวน ๙๙,๙๙๙ ฉบับ)
          </p>
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="no-print flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>พิมพ์ใบประกาศรางวัล (Print)</span>
        </button>
      </div>

      {/* Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600">
        <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
          <div className="flex items-center gap-2 font-bold text-orange-900 mb-2">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>ก. สิทธิ์การรับรางวัล</span>
          </div>
          <p className="leading-relaxed">
            รางวัลจะจ่ายแก่ผู้ถือสลากฉบับที่ถูกรางวัลนำมาขอรับรางวัลเท่านั้น โดยสลากต้องอยู่ในสภาพสมบูรณ์ ไม่ชำรุด ฉีกขาด หรือถูกแก้ไขดัดแปลงตัวเลข
          </p>
        </div>

        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
          <div className="flex items-center gap-2 font-bold text-amber-900 mb-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>ข. กำหนดการออกรางวัล</span>
          </div>
          <p className="leading-relaxed">
            ออกรางวัลในวันจันทร์ที่ ๕ มกราคม ๒๕๗๐ เวลา ๒๐.๓๐ น. เป็นต้นไป ณ บริเวณเวทีกลาง สนามหน้าศาลากลางจังหวัดศรีสะเกษ
          </p>
        </div>

        <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100">
          <div className="flex items-center gap-2 font-bold text-red-900 mb-2">
            <MapPin className="w-4 h-4 text-red-600" />
            <span>ค. สถานที่และระยะเวลาขอรับ</span>
          </div>
          <p className="leading-relaxed">
            ขอรับรางวัลได้ที่ <strong>สำนักงานเหล่ากาชาดจังหวัดศรีสะเกษ</strong> ตั้งแต่วันที่ ๑๓ มกราคม ๒๕๗๐ ถึง วันที่ ๙ กุมภาพันธ์ ๒๕๗๐ ในวันและเวลาราชการ
          </p>
        </div>
      </div>

      {/* Contact & Verification info */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-orange-600" />
            โทรศัพท์: <strong>๐๔๕-๖๑๒๔๕๑</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-orange-600" />
            ตรวจผลออนไลน์: <a href="https://www.sisaket.go.th" target="_blank" rel="noreferrer" className="underline font-medium text-orange-700">www.sisaket.go.th</a>
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          รายได้จากการจำหน่ายสลาก เพื่อช่วยเหลือการกุศลและสาธารณประโยชน์
        </span>
      </div>
    </div>
  );
}
