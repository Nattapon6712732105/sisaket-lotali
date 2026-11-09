'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from '@/components/Header';
import LiveIndicator from '@/components/LiveIndicator';
import PrizeBoard from '@/components/PrizeBoard';
import LotteryChecker from '@/components/LotteryChecker';
import OfficialNotice from '@/components/OfficialNotice';
import Footer from '@/components/Footer';
import { LotteryData, INITIAL_LOTTERY_DATA } from '@/types/lottery';
import Image from 'next/image';

export default function HomePage() {
  const [lotteryData, setLotteryData] = useState<LotteryData>(INITIAL_LOTTERY_DATA);
  const [countdown, setCountdown] = useState<number>(5);
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

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
          {/* Banner Graphic if available */}
          <div className="relative mb-6 rounded-3xl overflow-hidden shadow-lg border-2 border-orange-200/70 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 max-h-48 sm:max-h-64 flex items-center justify-center">
            <img
              src="/images/ticket-banner.jpg"
              alt="สลากกาชาด งานเทศกาลปีใหม่สี่เผ่าไทยศรีสะเกษ ประจำปี ๒๕๗๐"
              className="w-full h-full object-cover max-h-64"
              onError={(e) => {
                // If image fails, fallback to subtle banner
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

          {/* Quick Check Lottery Number Tool */}
          <LotteryChecker data={lotteryData} />

          {/* The Main Prize Announcement Board */}
          <PrizeBoard data={lotteryData} />

          {/* Official Notices and Conditions */}
          <OfficialNotice />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
