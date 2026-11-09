'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Search, Gift, XCircle, Sparkles } from 'lucide-react';
import { CheckResult, LotteryData } from '@/types/lottery';
import { checkLotteryNumber } from '@/lib/lottery-utils';

interface LotteryCheckerProps {
  data: LotteryData;
}

export default function LotteryChecker({ data }: LotteryCheckerProps) {
  const [inputNumber, setInputNumber] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputNumber.trim();

    if (clean.length !== 6) {
      alert('กรุณากรอกหมายเลขสลากให้ครบ ๖ หลัก (เช่น 012345)');
      return;
    }

    setIsChecking(true);
    // Client-side quick check using current data
    setTimeout(() => {
      const res = checkLotteryNumber(data, clean);
      setResult(res);
      setHasSearched(true);
      setIsChecking(false);

      if (res.isWon) {
        triggerConfetti();
      }
    }, 200);
  };

  const handleClear = () => {
    setInputNumber('');
    setResult(null);
    setHasSearched(false);
  };

  return (
    <div className="bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 dark:from-slate-900 dark:via-orange-950/20 dark:to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-orange-200/80 dark:border-slate-800 shadow-lg mb-8 no-print transition-colors">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 text-xs font-bold mb-3 border border-orange-200 dark:border-orange-800">
          <Search className="w-3.5 h-3.5" />
          <span>ระบบตรวจผลรางวัลทันใจ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          ตรวจผลสลากกาชาดศรีสะเกษ
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 mb-6">
          กรอกหมายเลขสลาก ๖ หลัก เพื่อตรวจรางวัลทั้งหมดแบบอัตโนมัติ
        </p>

        {/* Input Form */}
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              maxLength={6}
              inputMode="numeric"
              placeholder="กรอกเลข ๖ หลัก (เช่น 123456)"
              value={inputNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setInputNumber(val);
                if (hasSearched) setHasSearched(false);
              }}
              className="w-full text-center px-4 py-3.5 text-2xl font-mono font-bold tracking-widest text-slate-900 dark:text-amber-300 bg-white dark:bg-slate-800 border-2 border-orange-300 dark:border-orange-500/40 rounded-2xl shadow-inner focus:outline-none focus:ring-4 focus:ring-orange-400/30 focus:border-orange-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 placeholder:text-base placeholder:tracking-normal"
            />
            {inputNumber && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={inputNumber.length !== 6 || isChecking}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{isChecking ? 'กำลังตรวจ...' : 'ตรวจผลรางวัล'}</span>
          </button>
        </form>

        {/* Search Results Display */}
        {hasSearched && result && (
          <div className="mt-6 transition-all duration-300">
            {result.isWon ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-400 dark:border-emerald-600 rounded-2xl p-6 text-center animate-bounce-short">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Gift className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-emerald-800 dark:text-emerald-300">
                  🎉 ยินดีด้วย! หมายเลข {result.searchedNumber} ถูกรางวัล 🎉
                </h3>
                <div className="mt-4 space-y-2">
                  {result.matchedPrizes.map((p, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-sm max-w-lg mx-auto"
                    >
                      <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full font-bold text-sm mb-1">
                        {p.prizeName}
                      </span>
                      <p className="text-base font-extrabold text-slate-800 dark:text-slate-100 mt-1">
                        ของรางวัล: <span className="text-amber-700 dark:text-amber-400">{p.reward}</span>
                      </p>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
                        (หมายเลขที่ออก: {p.winningNumber})
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-4 font-medium">
                  * โปรดนำสลากฉบับจริงพร้อมบัตรประจำตัวประชาชนไปติดต่อขอรับรางวัลตามเงื่อนไขที่กำหนด
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <XCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  หมายเลข {result.searchedNumber} ไม่ถูกรางวัล
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  ขอขอบคุณที่ร่วมทำบุญสนับสนุนกิจกรรมสาธารณกุศลของเหล่ากาชาดจังหวัดศรีสะเกษ
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
