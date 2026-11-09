'use client';

import React from 'react';
import { LotteryData } from '@/types/lottery';
import { Car, Award, Smartphone, Bike, Snowflake, Fan, Sparkles } from 'lucide-react';

interface PrizeBoardProps {
  data: LotteryData;
}

export default function PrizeBoard({ data }: PrizeBoardProps) {
  const renderNumberBox = (num: string | null, digitCount: number = 6, highlight: boolean = false) => {
    const isFilled = num && num.trim() !== '';

    if (!isFilled) {
      return (
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-2 sm:px-3 sm:py-2.5 bg-slate-50 dark:bg-slate-800/60 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-400 dark:text-slate-600 font-mono tracking-wider text-base sm:text-xl font-bold select-none shadow-inner">
          {Array.from({ length: digitCount }).map((_, i) => (
            <span key={i} className="inline-block w-3.5 sm:w-5 text-center border-b-2 border-slate-300 dark:border-slate-600 pb-0.5">
              -
            </span>
          ))}
        </div>
      );
    }

    return (
      <div
        className={`flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-mono tracking-wider text-lg sm:text-2xl font-black shadow-sm transition-all transform hover:scale-105 ${
          highlight
            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-orange-300/50 shadow-md ring-2 ring-amber-300 text-xl sm:text-3xl'
            : 'bg-white dark:bg-slate-800 border-2 border-orange-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
        }`}
      >
        {num}
      </div>
    );
  };

  const prizes = data.prizes;

  return (
    <div className="space-y-6 printable-area">
      {/* ======================================================== */}
      {/* TOP ROW: รางวัลที่ ๑ (๖ หลัก เด่นที่สุด) & เลขท้าย ๓ ตัว */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* รางวัลที่ ๑ (2 รางวัล - 6 หลัก) */}
        <div className="lg:col-span-8 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-3xl p-1 shadow-xl">
          <div className="bg-gradient-to-b from-white via-orange-50/40 to-amber-50/70 dark:from-slate-900 dark:via-orange-950/30 dark:to-slate-900 rounded-[22px] p-5 sm:p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-orange-200 dark:border-orange-500/20 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider font-extrabold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-800">
                        FIRST PRIZE (เลข ๖ หลัก)
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">จำนวน ๒ รางวัล</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
                      {prizes.firstPrize.name}
                    </h2>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/80 px-3 py-1 rounded-xl inline-block border border-amber-200 dark:border-amber-800">
                    {prizes.firstPrize.reward}
                  </span>
                </div>
              </div>

              {/* Number Displays */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                {prizes.firstPrize.numbers.map((num, idx) => (
                  <div key={idx} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-2xl border border-orange-200/80 dark:border-slate-700 shadow-sm text-center">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
                      รางวัลที่ ๑ (หมายเลขที่ {idx + 1}) - เลข ๖ หลัก
                    </span>
                    {renderNumberBox(num, 6, true)}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-2 border-t border-orange-100 dark:border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>สลากมี ๖ หลัก (๐๐๐๐๐๐ - ๙๙๙๙๙๙) ตรวจสอบหมายเลขให้ถูกต้องตรงกันทุกหลัก</span>
            </div>
          </div>
        </div>

        {/* รางวัลที่ ๖: เลขท้าย ๓ ตัว (100 รางวัล) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border-2 border-orange-300 dark:border-slate-800 shadow-xl flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
                <Fan className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                  LAST 3 DIGITS
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {prizes.last3DigitsPrize.name}
                </h3>
              </div>
            </div>

            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              {prizes.last3DigitsPrize.reward}
              <span className="block text-xs font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                (ออก ๑ หมายเลข ได้รับจำนวน ๑๐๐ รางวัล)
              </span>
            </div>

            <div className="my-4 text-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">เลขท้าย ๓ ตัว</span>
              {renderNumberBox(prizes.last3DigitsPrize.numbers[0], 3, false)}
            </div>
          </div>

          <div className="bg-blue-50/70 dark:bg-blue-950/40 rounded-xl p-3 text-xs text-blue-900 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
            ตรวจเลข ๓ ตัวสุดท้ายของสลากกาชาด หากตรงกับเลขนี้ ถือว่าถูกรางวัลที่ ๖
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECOND ROW: รางวัลข้างเคียงรางวัลที่ ๑ (๔ รางวัล - ๖ หลัก) */}
      {/* ======================================================== */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-amber-200 dark:border-slate-800 shadow-md transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {prizes.adjacentFirstPrize.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                เคียงคู่ขนาน ±๑ ของรางวัลที่ ๑ ทั้ง ๒ หมายเลข (จำนวน ๔ รางวัล • เลข ๖ หลัก)
              </p>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-3 py-1 rounded-xl self-start sm:self-auto border border-amber-200 dark:border-amber-800">
            {prizes.adjacentFirstPrize.reward}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {prizes.adjacentFirstPrize.numbers.map((num, idx) => (
            <div key={idx} className="bg-amber-50/40 dark:bg-slate-800/40 p-3 rounded-2xl border border-amber-100 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                ข้างเคียงที่ {idx + 1}
              </span>
              {renderNumberBox(num, 6, false)}
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* THIRD ROW: รางวัลที่ ๒ (ทองคำ 1 บาท) & รางวัลที่ ๓ (iPhone 16 Pro) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* รางวัลที่ ๒ */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-md transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {prizes.secondPrize.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">จำนวน ๓ รางวัล (เลข ๖ หลัก)</span>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
              {prizes.secondPrize.reward}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {prizes.secondPrize.numbers.map((num, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/70 dark:border-slate-700 text-center">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block mb-1">ลำดับที่ {idx + 1}</span>
                {renderNumberBox(num, 6, false)}
              </div>
            ))}
          </div>
        </div>

        {/* รางวัลที่ ๓ */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-md transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 dark:bg-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {prizes.thirdPrize.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">จำนวน ๓ รางวัล (เลข ๖ หลัก)</span>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-800">
              {prizes.thirdPrize.reward}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {prizes.thirdPrize.numbers.map((num, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/70 dark:border-slate-700 text-center">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block mb-1">ลำดับที่ {idx + 1}</span>
                {renderNumberBox(num, 6, false)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FOURTH ROW: รางวัลที่ ๔ (มอเตอร์ไซค์ Honda Wave - 5 รางวัล) */}
      {/* ======================================================== */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-md transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-sm shrink-0">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {prizes.fourthPrize.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">จำนวน ๕ รางวัล (เลข ๖ หลัก)</p>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-bold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/80 px-3 py-1 rounded-xl border border-red-100 dark:border-red-800">
            {prizes.fourthPrize.reward}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {prizes.fourthPrize.numbers.map((num, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/70 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block mb-1">ลำดับที่ {idx + 1}</span>
              {renderNumberBox(num, 6, false)}
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* FIFTH ROW: รางวัลที่ ๕ (ตู้เย็น 2 ประตู 7 คิว - 10 รางวัล) */}
      {/* ======================================================== */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-md transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-sm shrink-0">
              <Snowflake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {prizes.fifthPrize.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">จำนวน ๑๐ รางวัล (เลข ๖ หลัก)</p>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 px-3 py-1 rounded-xl border border-teal-100 dark:border-teal-800">
            {prizes.fifthPrize.reward}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {prizes.fifthPrize.numbers.map((num, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/70 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block mb-1">ลำดับที่ {idx + 1}</span>
              {renderNumberBox(num, 6, false)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
