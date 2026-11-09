import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  title: string;
  subTitle: string;
  year: string;
  eventDate: string;
  location: string;
  status: 'waiting' | 'in_progress' | 'completed';
}

export default function Header({
  title,
  subTitle,
  year,
  eventDate,
  location,
  status,
}: HeaderProps) {
  const getStatusBadge = () => {
    switch (status) {
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse">
            <span className="w-2 h-2 mr-1.5 bg-emerald-500 rounded-full"></span>
            กำลังออกรางวัล (LIVE)
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
            <span className="w-2 h-2 mr-1.5 bg-blue-500 rounded-full"></span>
            ออกรางวัลครบถ้วนแล้ว
          </span>
        );
      case 'waiting':
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 mr-1.5 bg-amber-500 rounded-full animate-ping"></span>
            รอเริ่มการออกรางวัล
          </span>
        );
    }
  };

  return (
    <header className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white shadow-xl overflow-hidden">
      {/* Decorative Background Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-orange-400/20 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Emblem */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl p-2 shadow-2xl flex items-center justify-center border-2 border-amber-200 shrink-0">
              {/* Emblem / Redcross Icon */}
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto relative flex items-center justify-center">
                  <div className="absolute w-full h-3.5 bg-red-600 rounded-sm"></div>
                  <div className="absolute h-full w-3.5 bg-red-600 rounded-sm"></div>
                </div>
                <span className="block text-[9px] font-bold text-red-700 mt-1 leading-tight">
                  กาชาดศรีสะเกษ
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                {getStatusBadge()}
                <span className="text-xs bg-black/20 text-white/90 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                  ประจำปี {year}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-md text-amber-50">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-orange-100 font-medium mt-1">
                {subTitle}
              </p>
            </div>
          </div>

          {/* Event Details Card */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-xs sm:text-sm text-white/95 max-w-sm w-full shadow-inner">
            <div className="flex items-start gap-2.5 mb-2">
              <span className="text-amber-300 font-bold shrink-0">📅 วันที่ออกรางวัล:</span>
              <span>{eventDate}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-amber-300 font-bold shrink-0">📍 สถานที่:</span>
              <span>{location}</span>
            </div>
            <div className="mt-3 pt-2 border-t border-white/15 text-[11px] text-amber-200 text-center font-medium">
              ฉบับละ ๑๐๐ บาท • รางวัลทั้งสิ้น ๑๒๗ รางวัล
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
