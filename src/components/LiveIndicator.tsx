'use client';

import React from 'react';
import { RefreshCw, Pause, Play, Clock, CheckCircle2 } from 'lucide-react';

interface LiveIndicatorProps {
  countdown: number;
  isAutoRefresh: boolean;
  isFetching: boolean;
  lastUpdated: string | null;
  onToggleAutoRefresh: () => void;
  onRefreshNow: () => void;
}

export default function LiveIndicator({
  countdown,
  isAutoRefresh,
  isFetching,
  lastUpdated,
  onToggleAutoRefresh,
  onRefreshNow,
}: LiveIndicatorProps) {
  const formatTime = (isoString: string | null) => {
    if (!isoString) return '-';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return '-';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4 mb-6 transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Status & Last update time */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className={`w-3.5 h-3.5 rounded-full ${isAutoRefresh ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
            {isAutoRefresh && (
              <span className="absolute w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping opacity-75"></span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-sm sm:text-base">
                {isAutoRefresh ? 'ระบบอัปเดตผลรางวัลอัตโนมัติ' : 'ระบบหยุดอัปเดตชั่วคราว'}
              </span>
              <span className="text-xs bg-orange-100 text-orange-800 font-semibold px-2 py-0.5 rounded-full">
                ทุกๆ 5 วินาที
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>ข้อมูลล่าสุดเวลา: <strong className="text-slate-700">{formatTime(lastUpdated)}</strong></span>
            </p>
          </div>
        </div>

        {/* Right: Controls & Countdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Countdown indicator */}
          {isAutoRefresh && (
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <span className="text-xs text-slate-500">รอบถัดไป:</span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-orange-500 text-white font-bold text-xs shadow-inner">
                {countdown}s
              </span>
            </div>
          )}

          {/* Pause / Play button */}
          <button
            onClick={onToggleAutoRefresh}
            title={isAutoRefresh ? 'หยุดอัปเดตชั่วคราว' : 'เปิดอัปเดตอัตโนมัติ'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
          >
            {isAutoRefresh ? (
              <>
                <Pause className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">พัก</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">เล่นต่อ</span>
              </>
            )}
          </button>

          {/* Refresh Now Button */}
          <button
            onClick={onRefreshNow}
            disabled={isFetching}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl bg-orange-600 text-white shadow-sm hover:bg-orange-700 active:scale-95 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            <span>รีเฟรชทันที</span>
          </button>
        </div>
      </div>

      {/* Mini Progress Bar for 5s cycle */}
      {isAutoRefresh && (
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-400 to-amber-500 h-full transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${((5 - countdown) / 5) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}

