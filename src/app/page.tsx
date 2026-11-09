'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import LiveIndicator from '@/components/LiveIndicator';
import PrizeBoard from '@/components/PrizeBoard';
import LotteryChecker from '@/components/LotteryChecker';
import OfficialNotice from '@/components/OfficialNotice';
import Footer from '@/components/Footer';
import AutoSlideModal from '@/components/AutoSlideModal';
import { LotteryData, INITIAL_LOTTERY_DATA } from '@/types/lottery';
import { Tv, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [lotteryData, setLotteryData] = useState<LotteryData>(INITIAL_LOTTERY_DATA);
  const [countdown, setCountdown] = useState<number>(5);
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Auto slide modal state
  const [isAutoSlideOpen, setIsAutoSlideOpen] = useState<boolean>(false);

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
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        {/* Main Header */}
        <Header
          title={lotteryData.title}
          subTitle={lotteryData.subTitle}
          year={lotteryData.year}
          eventDate={lotteryData.eventDate}
          location={lotteryData.location}
          status={lotteryData.status}
        />

        <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Top Stage Bar: Banner & Auto Slide Launch Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="text-xs text-slate-500 font-medium">
              ระบบแสดงผลรางวัลแบบ Real-time • เลขสลาก ๖ หลัก
            </div>

            {/* Launch Auto-Slide Button */}
            <button
              onClick={() => setIsAutoSlideOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 hover:from-slate-800 hover:to-orange-900 text-amber-300 font-bold text-xs sm:text-sm rounded-2xl shadow-lg border border-amber-500/40 flex items-center justify-center gap-2.5 active:scale-95 transition-all group"
            >
              <div className="w-6 h-6 rounded-lg bg-orange-600/80 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Tv className="w-3.5 h-3.5" />
              </div>
              <span>เปิดโหมดสไลด์เวทีอัตโนมัติ (Auto Slide Mode)</span>
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </button>
          </div>

          {/* Banner Graphic */}
          <div className="relative mb-6 rounded-3xl overflow-hidden shadow-lg border-2 border-orange-200/70 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 max-h-48 sm:max-h-64 flex items-center justify-center">
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
          <OfficialNotice />
        </main>
      </div>

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
