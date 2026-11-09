'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import LiveIndicator from '@/components/LiveIndicator';
import PrizeBoard from '@/components/PrizeBoard';
import LotteryChecker from '@/components/LotteryChecker';
import OfficialNotice from '@/components/OfficialNotice';
import Footer from '@/components/Footer';
import AutoSlideModal from '@/components/AutoSlideModal';
import OfficialPrintSheet from '@/components/OfficialPrintSheet';
import { LotteryData, INITIAL_LOTTERY_DATA } from '@/types/lottery';
import { Tv, Sparkles, FileSpreadsheet, X, Printer } from 'lucide-react';

export default function HomePage() {
  const [lotteryData, setLotteryData] = useState<LotteryData>(INITIAL_LOTTERY_DATA);
  const [countdown, setCountdown] = useState<number>(5);
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Auto slide modal state
  const [isAutoSlideOpen, setIsAutoSlideOpen] = useState<boolean>(false);

  // Official sheet preview modal state
  const [isPreviewSheetOpen, setIsPreviewSheetOpen] = useState<boolean>(false);

  // Dark Mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('ssk_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('ssk_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('ssk_theme', 'light');
      }
      return next;
    });
  };

  // Function to fetch data from API
  const fetchLotteryData = useCallback(async (showLoading = false) => {
    if (showLoading) setIsFetching(true);
    try {
      const res = await fetch('/api/lottery', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setLotteryData(json.data);
          setLastUpdated(json.data.updatedAt || new Date().toISOString());
        }
      }
    } catch (err) {
      console.error('Error fetching lottery data:', err);
    } finally {
      if (showLoading) setIsFetching(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchLotteryData(true);
  }, [fetchLotteryData]);

  // 5-second polling timer
  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchLotteryData(false);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoRefresh, fetchLotteryData]);

  const handleToggleAutoRefresh = () => {
    setIsAutoRefresh((prev) => !prev);
    if (!isAutoRefresh) {
      setCountdown(5);
    }
  };

  const handleRefreshNow = () => {
    setCountdown(5);
    fetchLotteryData(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-orange-50/50 via-slate-50 to-amber-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* ======================================================== */}
      {/* 1. SCREEN VIEW (WEB BROWSER) */}
      {/* ======================================================== */}
      <div className="screen-only">
        {/* Main Header with Theme Toggle */}
        <Header
          title={lotteryData.title}
          subTitle={lotteryData.subTitle}
          year={lotteryData.year}
          eventDate={lotteryData.eventDate}
          location={lotteryData.location}
          status={lotteryData.status}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
        />

        <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Top Action Bar: Auto Slide & Sheet Preview */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 no-print">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              ระบบแสดงผลรางวัลแบบ Real-time • เลขสลาก ๖ หลัก
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              {/* Preview Official Sheet Button */}
              <button
                onClick={() => setIsPreviewSheetOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-2xl shadow-sm border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <FileSpreadsheet className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>ใบตรวจทางการ (สไตล์กองสลาก)</span>
              </button>

              {/* Launch Auto-Slide Button */}
              <button
                onClick={() => setIsAutoSlideOpen(true)}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 hover:from-slate-800 hover:to-orange-900 text-amber-300 font-bold text-xs sm:text-sm rounded-2xl shadow-lg border border-amber-500/40 flex items-center justify-center gap-2.5 active:scale-95 transition-all group"
              >
                <div className="w-5 h-5 rounded-lg bg-orange-600/80 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Tv className="w-3.5 h-3.5" />
                </div>
                <span>โหมดสไลด์เวที (Auto Slide)</span>
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              </button>
            </div>
          </div>

          {/* Banner Graphic */}
          <div className="relative mb-6 rounded-3xl overflow-hidden shadow-lg border-2 border-orange-200/70 dark:border-slate-800 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 max-h-48 sm:max-h-64 flex items-center justify-center no-print">
            <img
              src="/images/ticket-banner.jpg"
              alt="สลากกาชาด งานเทศกาลปีใหม่สี่เผ่าไทยศรีสะเกษ ประจำปี ๒๕๗๐"
              className="w-full h-full object-cover max-h-64"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* 5-second Auto-Refresh Indicator bar */}
          <LiveIndicator
            countdown={countdown}
            isAutoRefresh={isAutoRefresh}
            isFetching={isFetching}
            lastUpdated={lastUpdated}
            onToggleAutoRefresh={handleToggleAutoRefresh}
            onRefreshNow={handleRefreshNow}
          />

          {/* Quick Check Lottery Number Tool (6 digits) */}
          <LotteryChecker data={lotteryData} />

          {/* The Main Prize Announcement Board (6 digits) */}
          <PrizeBoard data={lotteryData} />

          {/* Official Notices and Conditions */}
          <OfficialNotice onPreviewSheet={() => setIsPreviewSheetOpen(true)} />
        </main>
      </div>

      {/* ======================================================== */}
      {/* 2. PRINT-ONLY SHEET (OFFICIAL GLO STYLE FORMAT) */}
      {/* ======================================================== */}
      <div className="print-only">
        <OfficialPrintSheet data={lotteryData} />
      </div>

      {/* ======================================================== */}
      {/* 3. MODAL: PREVIEW OFFICIAL SHEET ON SCREEN */}
      {/* ======================================================== */}
      {isPreviewSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-print">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-300 flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  ตัวอย่างใบตรวจรางวัลอย่างเป็นทางการ (รูปแบบสำนักงานสลากกินแบ่งรัฐบาล)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>พิมพ์ทันที</span>
                </button>
                <button
                  onClick={() => setIsPreviewSheetOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: The Official Sheet */}
            <div className="p-4 sm:p-6 bg-slate-100 flex-1 flex justify-center">
              <div className="bg-white shadow-lg border border-slate-300 w-full p-4 rounded-xl">
                <OfficialPrintSheet data={lotteryData} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auto Slide Stage Presentation Modal */}
      <AutoSlideModal
        isOpen={isAutoSlideOpen}
        onClose={() => setIsAutoSlideOpen(false)}
        data={lotteryData}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
