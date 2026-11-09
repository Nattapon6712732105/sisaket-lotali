'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Car,
  Award,
  Smartphone,
  Bike,
  Snowflake,
  Fan,
  Tv,
} from 'lucide-react';
import { LotteryData } from '@/types/lottery';

interface AutoSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: LotteryData;
}

export default function AutoSlideModal({ isOpen, onClose, data }: AutoSlideModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(7); // seconds per slide
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = 6;
  const prizes = data.prizes;

  // Auto slide interval
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    setProgress(0);
    const stepMs = 100;
    const totalSteps = (duration * 1000) / stepMs;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((s) => (s + 1) % totalSlides);
          return 0;
        }
        return prev + 100 / totalSteps;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, duration, currentSlide]);

  // Fullscreen handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  if (!isOpen) return null;

  const renderBigNumber = (num: string | null, digitCount: number = 6, isGold: boolean = false) => {
    const isFilled = num && num.trim() !== '';

    if (!isFilled) {
      return (
        <div className="flex items-center justify-center gap-2 sm:gap-4 px-4 py-3 sm:px-6 sm:py-4 bg-slate-900/80 border-2 border-dashed border-amber-500/40 rounded-2xl shadow-inner">
          {Array.from({ length: digitCount }).map((_, i) => (
            <span
              key={i}
              className="inline-block w-6 sm:w-10 text-center font-mono text-2xl sm:text-5xl font-extrabold text-amber-500/40 border-b-2 border-amber-500/30 pb-1"
            >
              -
            </span>
          ))}
        </div>
      );
    }

    return (
      <div
        className={`flex items-center justify-center px-6 py-3 sm:px-8 sm:py-5 rounded-2xl font-mono text-3xl sm:text-6xl font-black tracking-widest shadow-2xl transition-all transform hover:scale-105 ${
          isGold
            ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 ring-4 ring-amber-300/60 shadow-orange-500/50'
            : 'bg-white text-slate-900 border-2 border-amber-300/80 shadow-lg'
        }`}
      >
        {num}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between text-white overflow-hidden select-none">
      {/* ======================================================== */}
      {/* TOP BAR / CONTROLS */}
      {/* ======================================================== */}
      <div className="px-6 py-4 bg-slate-900/80 border-b border-amber-500/20 flex items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center shadow-md">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block">
              STAGE PRESENTATION MODE • โหมดสไลด์อัตโนมัติขึ้นจอเวที
            </span>
            <h1 className="text-sm sm:text-base font-extrabold text-white">
              {data.title} ประจำปี {data.year}
            </h1>
          </div>
        </div>

        {/* Play / Pause / Duration / Fullscreen / Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Duration select */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-400">สไลด์ละ:</span>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer"
            >
              <option value={5} className="bg-slate-900 text-white">5 วิ</option>
              <option value={7} className="bg-slate-900 text-white">7 วิ</option>
              <option value={10} className="bg-slate-900 text-white">10 วิ</option>
              <option value={15} className="bg-slate-900 text-white">15 วิ</option>
            </select>
          </div>

          {/* Pause / Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">หยุด</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">เล่นต่อ</span>
              </>
            )}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
            title="เต็มจอ"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors"
            title="ปิดโหมดสไลด์"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-800 h-1">
        <div
          className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 h-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ======================================================== */}
      {/* SLIDE CONTENTS (MAIN STAGE) */}
      {/* ======================================================== */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

        {/* ====================================================== */}
        {/* SLIDE 0: ภาพรวมผลรางวัล (OVERVIEW) */}
        {/* ====================================================== */}
        {currentSlide === 0 && (
          <div className="w-full max-w-5xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs sm:text-sm font-bold border border-amber-500/30 mb-4">
              <Sparkles className="w-4 h-4" />
              <span>สรุปผลการออกรางวัลสลากกาชาดศรีสะเกษ ๒๕๗๐</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-amber-100 mb-6 tracking-tight drop-shadow-md">
              ผลรางวัลไฮไลท์ประจำปี ๒๕๗๐
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              {/* First prize preview */}
              <div className="bg-gradient-to-br from-orange-950/80 to-slate-900/90 border-2 border-amber-400/50 p-6 rounded-3xl shadow-2xl">
                <div className="flex items-center gap-3 text-amber-400 mb-2">
                  <Car className="w-6 h-6" />
                  <span className="font-extrabold text-lg sm:text-xl">รางวัลที่ ๑ (๒ รางวัล)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mb-4">{prizes.firstPrize.reward}</p>
                <div className="grid grid-cols-2 gap-3">
                  {prizes.firstPrize.numbers.map((n, i) => (
                    <div key={i} className="text-center">
                      <span className="text-[10px] text-amber-300/70 block mb-1">หมายเลขที่ {i + 1}</span>
                      {renderBigNumber(n, 6, true)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Last 3 digits preview */}
              <div className="bg-gradient-to-br from-blue-950/80 to-slate-900/90 border-2 border-blue-400/50 p-6 rounded-3xl shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-cyan-400 mb-2">
                    <Fan className="w-6 h-6" />
                    <span className="font-extrabold text-lg sm:text-xl">{prizes.last3DigitsPrize.name}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mb-4">{prizes.last3DigitsPrize.reward} (๑๐๐ รางวัล)</p>
                </div>
                <div className="text-center my-2">
                  <span className="text-xs text-cyan-300/70 block mb-2 font-bold">หมายเลขท้าย ๓ ตัว</span>
                  {renderBigNumber(prizes.last3DigitsPrize.numbers[0], 3, false)}
                </div>
                <div className="text-[11px] text-blue-300 text-center">ตรวจ ๓ หลักท้ายของสลากกาชาด ๖ หลัก</div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* SLIDE 1: รางวัลที่ ๑ (FIRST PRIZE) + ข้างเคียง */}
        {/* ====================================================== */}
        {currentSlide === 1 && (
          <div className="w-full max-w-5xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs sm:text-sm font-extrabold mb-3 shadow-lg">
              <Car className="w-4 h-4" />
              <span>FIRST PRIZE • รางวัลใหญ่ที่สุด</span>
            </div>

            <h2 className="text-3xl sm:text-6xl font-black text-amber-300 tracking-tight drop-shadow-xl">
              {prizes.firstPrize.name} (เลข ๖ หลัก)
            </h2>
            <p className="text-base sm:text-xl text-amber-100 font-semibold mt-2 mb-6">
              {prizes.firstPrize.reward} (จำนวน ๒ รางวัล)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              {prizes.firstPrize.numbers.map((num, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-orange-950/70 to-slate-900/90 p-6 rounded-3xl border-2 border-amber-400 shadow-2xl text-center"
                >
                  <span className="text-xs sm:text-sm font-bold text-amber-300 block mb-3 uppercase tracking-wider">
                    รางวัลที่ ๑ • หมายเลขที่ {idx + 1}
                  </span>
                  {renderBigNumber(num, 6, true)}
                </div>
              ))}
            </div>

            {/* Adjacent Prizes */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 max-w-3xl mx-auto">
              <span className="text-xs sm:text-sm font-bold text-amber-400 block mb-2">
                รางวัลข้างเคียงรางวัลที่ ๑ (ทองคำแท่ง ๑ สลึง • ๔ รางวัล):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {prizes.adjacentFirstPrize.numbers.map((n, i) => (
                  <div key={i} className="bg-slate-950 p-2 rounded-xl border border-amber-500/20 text-center">
                    <span className="text-[10px] text-slate-400 block">ข้างเคียง {i + 1}</span>
                    <span className="text-base sm:text-xl font-mono font-bold text-amber-300">
                      {n || '------'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* SLIDE 2: รางวัลที่ ๒ (ทองคำ 1 บาท) & รางวัลที่ ๓ (iPhone 16 Pro) */}
        {/* ====================================================== */}
        {currentSlide === 2 && (
          <div className="w-full max-w-5xl mx-auto text-center animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* รางวัลที่ ๒ */}
              <div className="bg-gradient-to-br from-amber-950/60 to-slate-900/90 border-2 border-amber-500/40 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-amber-300">{prizes.secondPrize.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 mb-6">{prizes.secondPrize.reward} (๓ รางวัล)</p>
                </div>
                <div className="space-y-3">
                  {prizes.secondPrize.numbers.map((num, idx) => (
                    <div key={idx} className="bg-slate-950/80 p-3 rounded-2xl border border-amber-500/30 text-center">
                      <span className="text-[10px] text-amber-400 block mb-1">ลำดับที่ {idx + 1}</span>
                      {renderBigNumber(num, 6, false)}
                    </div>
                  ))}
                </div>
              </div>

              {/* รางวัลที่ ๓ */}
              <div className="bg-gradient-to-br from-slate-900/90 to-indigo-950/60 border-2 border-indigo-500/40 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-indigo-300">{prizes.thirdPrize.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 mb-6">{prizes.thirdPrize.reward} (๓ รางวัล)</p>
                </div>
                <div className="space-y-3">
                  {prizes.thirdPrize.numbers.map((num, idx) => (
                    <div key={idx} className="bg-slate-950/80 p-3 rounded-2xl border border-indigo-500/30 text-center">
                      <span className="text-[10px] text-indigo-400 block mb-1">ลำดับที่ {idx + 1}</span>
                      {renderBigNumber(num, 6, false)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* SLIDE 3: รางวัลที่ ๔ (มอเตอร์ไซค์ Honda Wave ๕ รางวัล) */}
        {/* ====================================================== */}
        {currentSlide === 3 && (
          <div className="w-full max-w-5xl mx-auto text-center animate-fade-in">
            <div className="w-16 h-16 rounded-3xl bg-red-600 text-white flex items-center justify-center mx-auto mb-3 shadow-xl">
              <Bike className="w-10 h-10" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-red-400 drop-shadow-md">
              {prizes.fourthPrize.name}
            </h2>
            <p className="text-base sm:text-xl text-slate-300 mt-1 mb-8">
              {prizes.fourthPrize.reward} (จำนวน ๕ รางวัล • เลข ๖ หลัก)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {prizes.fourthPrize.numbers.map((num, idx) => (
                <div key={idx} className="bg-slate-900/90 p-4 rounded-3xl border border-red-500/30 text-center shadow-lg">
                  <span className="text-xs font-bold text-red-400 block mb-2">ลำดับที่ {idx + 1}</span>
                  {renderBigNumber(num, 6, false)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* SLIDE 4: รางวัลที่ ๕ (ตู้เย็น ๒ ประตู ๑๐ รางวัล) */}
        {/* ====================================================== */}
        {currentSlide === 4 && (
          <div className="w-full max-w-5xl mx-auto text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center mx-auto mb-2 shadow-xl">
              <Snowflake className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-teal-300 drop-shadow-md">
              {prizes.fifthPrize.name}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1 mb-6">
              {prizes.fifthPrize.reward} (จำนวน ๑๐ รางวัล • เลข ๖ หลัก)
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {prizes.fifthPrize.numbers.map((num, idx) => (
                <div key={idx} className="bg-slate-900/90 p-3 rounded-2xl border border-teal-500/30 text-center">
                  <span className="text-[11px] font-bold text-teal-400 block mb-1">ลำดับที่ {idx + 1}</span>
                  <span className="font-mono text-xl sm:text-2xl font-black text-white">
                    {num || '------'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* SLIDE 5: รางวัลที่ ๖ เลขท้าย ๓ ตัว (พัดลมตั้งพื้น ๑๐๐ รางวัล) */}
        {/* ====================================================== */}
        {currentSlide === 5 && (
          <div className="w-full max-w-4xl mx-auto text-center animate-fade-in">
            <div className="w-16 h-16 rounded-3xl bg-cyan-500 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-xl">
              <Fan className="w-10 h-10" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-cyan-300 drop-shadow-md">
              {prizes.last3DigitsPrize.name}
            </h2>
            <p className="text-base sm:text-xl text-slate-300 mt-1 mb-8">
              {prizes.last3DigitsPrize.reward} (ออก ๑ หมายเลข ได้รับจำนวน ๑๐๐ รางวัล)
            </p>

            <div className="max-w-md mx-auto bg-gradient-to-br from-cyan-950/70 to-slate-900/90 p-8 rounded-3xl border-2 border-cyan-400/60 shadow-2xl">
              <span className="text-sm font-bold text-cyan-300 block mb-3 uppercase tracking-wider">
                หมายเลขท้าย ๓ ตัวที่ออก
              </span>
              {renderBigNumber(prizes.last3DigitsPrize.numbers[0], 3, false)}
              <p className="text-xs sm:text-sm text-cyan-200/80 mt-4">
                * สลากกาชาด ๖ หลักฉบับใดที่มีเลขท้าย ๓ ตัวตรงกับเลขนี้ ถือว่าถูกรางวัลที่ ๖
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* BOTTOM CONTROLS & INDICATOR DOTS */}
      {/* ======================================================== */}
      <div className="px-6 py-4 bg-slate-900/80 border-t border-amber-500/20 flex items-center justify-between z-20">
        <button
          onClick={() => setCurrentSlide((s) => (s - 1 + totalSlides) % totalSlides)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">สไลด์ก่อนหน้า</span>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === idx
                  ? 'w-8 bg-amber-400 shadow-md shadow-amber-400/50'
                  : 'w-2.5 bg-slate-700 hover:bg-slate-600'
              }`}
              title={`ไปที่สไลด์ ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((s) => (s + 1) % totalSlides)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-colors"
        >
          <span className="hidden sm:inline">สไลด์ถัดไป</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

