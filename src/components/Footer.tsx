import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm py-8 text-slate-500 dark:text-slate-400 text-xs no-print transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="font-semibold text-slate-700 dark:text-slate-200">
            เหล่ากาชาดจังหวัดศรีสะเกษ (Sisaket Provincial Red Cross Chapter)
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            ระบบรายงานผลการออกรางวัลสลากกาชาด งานเทศกาลปีใหม่สี่เผ่าไทยศรีสะเกษ ประจำปี ๒๕๗๐
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-orange-700 dark:hover:text-amber-400 hover:bg-orange-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>เข้าสู่ระบบเจ้าหน้าที่ (Admin Only)</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
