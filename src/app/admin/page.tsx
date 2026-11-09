'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  Key,
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Copy,
  Check,
  ShieldAlert,
  Car,
  Award,
  Smartphone,
  Bike,
  Snowflake,
  Fan,
  RefreshCw,
} from 'lucide-react';
import { LotteryData, INITIAL_LOTTERY_DATA } from '@/types/lottery';
import { calculateAdjacentNumbers } from '@/lib/lottery-utils';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Lottery form data
  const [formData, setFormData] = useState<LotteryData>(INITIAL_LOTTERY_DATA);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password Generator / Viewer
  const [currentAdminPassword, setCurrentAdminPassword] = useState<string>('');
  const [suggestedPassword, setSuggestedPassword] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // Check login status on mount
  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    setCheckingAuth(true);
    try {
      const res = await fetch('/api/admin/status');
      if (res.ok) {
        const json = await res.json();
        setIsAuthenticated(json.authenticated);
        if (json.authenticated) {
          loadLotteryData();
          fetchPasswordInfo();
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCheckingAuth(false);
    }
  };

  const fetchPasswordInfo = async () => {
    try {
      const res = await fetch('/api/admin/generate-password');
      if (res.ok) {
        const json = await res.json();
        if (json.currentPassword) setCurrentAdminPassword(json.currentPassword);
        if (json.generatedPassword) setSuggestedPassword(json.generatedPassword);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateNewRandomPassword = async () => {
    try {
      const res = await fetch('/api/admin/generate-password?length=16');
      if (res.ok) {
        const json = await res.json();
        setSuggestedPassword(json.generatedPassword);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadLotteryData = async () => {
    try {
      const res = await fetch('/api/lottery');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setFormData(json.data);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsAuthenticated(true);
        loadLotteryData();
        fetchPasswordInfo();
      } else {
        setLoginError(json.message || 'รหัสผ่านไม่ถูกต้อง');
      }
    } catch (err: any) {
      setLoginError(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Helper to update specific prize numbers
  const handleNumberChange = (
    prizeKey: keyof LotteryData['prizes'],
    index: number,
    value: string,
    digitCount: number = 5
  ) => {
    // Only digits
    const cleaned = value.replace(/\D/g, '').slice(0, digitCount);
    setFormData((prev) => {
      const updated = { ...prev };
      const newNumbers = [...updated.prizes[prizeKey].numbers];
      newNumbers[index] = cleaned === '' ? null : cleaned;
      updated.prizes[prizeKey] = {
        ...updated.prizes[prizeKey],
        numbers: newNumbers,
      };

      // If user typed in First Prize, automatically calculate adjacent numbers if desired
      if (prizeKey === 'firstPrize') {
        const autoAdjacent = calculateAdjacentNumbers(newNumbers);
        updated.prizes.adjacentFirstPrize.numbers = autoAdjacent;
      }

      return updated;
    });
  };

  // Auto calculate adjacent from first prize button
  const handleAutoCalcAdjacent = () => {
    const adj = calculateAdjacentNumbers(formData.prizes.firstPrize.numbers);
    setFormData((prev) => ({
      ...prev,
      prizes: {
        ...prev.prizes,
        adjacentFirstPrize: {
          ...prev.prizes.adjacentFirstPrize,
          numbers: adj,
        },
      },
    }));
  };

  // Random generate test numbers
  const handleFillTestData = () => {
    if (!confirm('ต้องการสุ่มหมายเลขตัวอย่างใส่ทุกรางวัลเพื่อทดสอบใช่หรือไม่?')) return;

    const random5 = () => Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const random3 = () => Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    const first1 = random5();
    const first2 = random5();
    const adj = calculateAdjacentNumbers([first1, first2]);

    setFormData((prev) => ({
      ...prev,
      status: 'completed',
      prizes: {
        ...prev.prizes,
        firstPrize: {
          ...prev.prizes.firstPrize,
          numbers: [first1, first2],
        },
        adjacentFirstPrize: {
          ...prev.prizes.adjacentFirstPrize,
          numbers: adj,
        },
        secondPrize: {
          ...prev.prizes.secondPrize,
          numbers: [random5(), random5(), random5()],
        },
        thirdPrize: {
          ...prev.prizes.thirdPrize,
          numbers: [random5(), random5(), random5()],
        },
        fourthPrize: {
          ...prev.prizes.fourthPrize,
          numbers: [random5(), random5(), random5(), random5(), random5()],
        },
        fifthPrize: {
          ...prev.prizes.fifthPrize,
          numbers: Array.from({ length: 10 }).map(() => random5()),
        },
        last3DigitsPrize: {
          ...prev.prizes.last3DigitsPrize,
          numbers: [random3()],
        },
      },
    }));
  };

  // Reset to all empty (Initial waiting state)
  const handleResetToEmpty = async () => {
    if (!confirm('ยืนยันที่จะล้างข้อมูลผลรางวัลทั้งหมดให้เป็นค่าว่างเริ่มต้นหรือไม่?')) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/reset', { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        setFormData(json.data);
        setSaveMessage({ type: 'success', text: 'ล้างข้อมูลรางวัลทั้งหมดเรียบร้อยแล้ว (หน้าบ้านกลับเป็นค่าว่าง)' });
      }
    } catch (e: any) {
      setSaveMessage({ type: 'error', text: e.message || 'เกิดข้อผิดพลาดในการล้างข้อมูล' });
    } finally {
      setIsSaving(false);
    }
  };

  // Save changes to API
  const handleSaveData = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const res = await fetch('/api/lottery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setFormData(json.data);
        setSaveMessage({ type: 'success', text: 'บันทึกและเผยแพร่ผลรางวัลสำเร็จแล้ว! (หน้าบ้านจะอัปเดตใน ๕ วินาที)' });
      } else {
        setSaveMessage({ type: 'error', text: json.message || 'บันทึกไม่สำเร็จ' });
      }
    } catch (e: any) {
      setSaveMessage({ type: 'error', text: e.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex items-center gap-3 text-slate-600 font-semibold">
          <RefreshCw className="w-6 h-6 animate-spin text-orange-600" />
          <span>กำลังตรวจสอบสิทธิ์...</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: LOGIN FORM
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-orange-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">เข้าสู่ระบบผู้ดูแลระบบ</h1>
            <p className="text-xs text-slate-500 mt-1">
              ระบบกรอกผลรางวัลสลากกาชาดศรีสะเกษ ๒๕๗๐
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 mb-6 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              เฉพาะ <strong>Admin คนเดียว</strong> ที่มีรหัสผ่านสุ่ม 10 ตัวอักษรขึ้นไป จึงสามารถเข้ากรอกผลรางวัลได้
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                รหัสผ่าน Admin (ความยาว 10 ตัวอักษรขึ้นไป)
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="กรอกรหัสผ่าน Admin..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Unlock className="w-4 h-4" />
              <span>{loginLoading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบจัดการผลรางวัล'}</span>
            </button>
          </form>

          {/* Hint / Helper for Project Developer */}
          <div className="mt-8 pt-4 border-t border-slate-100 text-center">
            <div className="text-[11px] text-slate-400">
              ค่าเริ่มต้นระบบ: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600 font-mono">Sisaket2027@WinnerAdmin#99</code>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-orange-600 hover:underline mt-3 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>กลับสู่หน้าประกาศผลรางวัล</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ADMIN DASHBOARD (AUTHENTICATED)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      {/* Admin Navbar */}
      <nav className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-amber-400">ADMIN CONTROL CENTER</span>
              <span className="block text-[11px] text-slate-400">
                ระบบจัดการผลสลากกาชาดศรีสะเกษ ๒๕๗๐
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-orange-400" />
              <span>เปิดดูหน้าบ้าน</span>
            </Link>

            <button
              onClick={handleSaveData}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'กำลังบันทึก...' : 'บันทึกและเผยแพร่ (Save)'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>ออก</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Alerts / Feedback Message */}
        {saveMessage && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center justify-between shadow-sm border ${
              saveMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-red-50 text-red-900 border-red-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {saveMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <span className="font-bold text-sm">{saveMessage.text}</span>
            </div>
            <button
              onClick={() => setSaveMessage(null)}
              className="text-xs opacity-60 hover:opacity-100 font-bold px-2 py-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Quick Toolbar */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">เครื่องมือจัดการข้อมูลสลาก</h2>
            <p className="text-xs text-slate-500">
              สถานะปัจจุบัน: <strong className="text-orange-600 uppercase">{formData.status}</strong> • อัปเดตล่าสุด: {new Date(formData.updatedAt).toLocaleTimeString('th-TH')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAutoCalcAdjacent}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>คำนวณข้างเคียงอัตโนมัติ (±1)</span>
            </button>

            <button
              onClick={handleFillTestData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>สุ่มเลขทดสอบ (Test Mode)</span>
            </button>

            <button
              onClick={handleResetToEmpty}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-slate-700 border border-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>ล้างเป็นค่าว่าง (Reset All)</span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* INPUT FORM SECTIONS */}
        {/* ================================================================= */}
        <div className="space-y-6">
          {/* SECTION 1: รางวัลที่ ๑ (2 รางวัล) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-orange-300 shadow-md">
            <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{formData.prizes.firstPrize.name}</h3>
                <span className="text-xs text-orange-700 font-semibold">
                  {formData.prizes.firstPrize.reward} (จำนวน ๒ รางวัล)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.prizes.firstPrize.numbers.map((num, idx) => (
                <div key={idx} className="bg-orange-50/50 p-4 rounded-2xl border border-orange-200">
                  <label className="block text-xs font-bold text-orange-900 mb-2">
                    รางวัลที่ ๑ (หมายเลขที่ {idx + 1}) - เลข ๕ หลัก
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="เช่น 12345 (เว้นว่างได้)"
                    value={num || ''}
                    onChange={(e) => handleNumberChange('firstPrize', idx, e.target.value, 5)}
                    className="w-full text-center py-3 text-2xl font-mono font-bold tracking-widest text-slate-900 bg-white border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-300 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block text-center">
                    เมื่อกรอกเลขนี้ ระบบจะคำนวณรางวัลข้างเคียง ±๑ ให้อัตโนมัติ
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: รางวัลข้างเคียงรางวัลที่ ๑ (4 รางวัล) */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{formData.prizes.adjacentFirstPrize.name}</h3>
                  <span className="text-xs text-slate-500">{formData.prizes.adjacentFirstPrize.reward}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAutoCalcAdjacent}
                className="text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl self-start sm:self-auto transition-colors"
              >
                คำนวณอัตโนมัติจากรางวัลที่ ๑
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formData.prizes.adjacentFirstPrize.numbers.map((num, idx) => (
                <div key={idx} className="bg-amber-50/40 p-3 rounded-2xl border border-amber-100">
                  <label className="block text-[11px] font-bold text-amber-900 mb-1">
                    ข้างเคียง {idx + 1}
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="-----"
                    value={num || ''}
                    onChange={(e) => handleNumberChange('adjacentFirstPrize', idx, e.target.value, 5)}
                    className="w-full text-center py-2 text-lg font-mono font-bold tracking-wider text-slate-900 bg-white border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: รางวัลที่ ๒ (3 รางวัล) & รางวัลที่ ๓ (3 รางวัล) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* รางวัลที่ ๒ */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{formData.prizes.secondPrize.name}</h3>
                  <span className="text-xs text-slate-500">{formData.prizes.secondPrize.reward} (๓ รางวัล)</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {formData.prizes.secondPrize.numbers.map((num, idx) => (
                  <div key={idx}>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      ลำดับ {idx + 1}
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="-----"
                      value={num || ''}
                      onChange={(e) => handleNumberChange('secondPrize', idx, e.target.value, 5)}
                      className="w-full text-center py-2 text-base font-mono font-bold tracking-wider bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* รางวัลที่ ๓ */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{formData.prizes.thirdPrize.name}</h3>
                  <span className="text-xs text-slate-500">{formData.prizes.thirdPrize.reward} (๓ รางวัล)</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {formData.prizes.thirdPrize.numbers.map((num, idx) => (
                  <div key={idx}>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      ลำดับ {idx + 1}
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="-----"
                      value={num || ''}
                      onChange={(e) => handleNumberChange('thirdPrize', idx, e.target.value, 5)}
                      className="w-full text-center py-2 text-base font-mono font-bold tracking-wider bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4: รางวัลที่ ๔ (5 รางวัล) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{formData.prizes.fourthPrize.name}</h3>
                <span className="text-xs text-slate-500">{formData.prizes.fourthPrize.reward} (๕ รางวัล)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {formData.prizes.fourthPrize.numbers.map((num, idx) => (
                <div key={idx}>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    ลำดับ {idx + 1}
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="-----"
                    value={num || ''}
                    onChange={(e) => handleNumberChange('fourthPrize', idx, e.target.value, 5)}
                    className="w-full text-center py-2 text-base font-mono font-bold tracking-wider bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5: รางวัลที่ ๕ (10 รางวัล) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                <Snowflake className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{formData.prizes.fifthPrize.name}</h3>
                <span className="text-xs text-slate-500">{formData.prizes.fifthPrize.reward} (๑๐ รางวัล)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {formData.prizes.fifthPrize.numbers.map((num, idx) => (
                <div key={idx}>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    ลำดับ {idx + 1}
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="-----"
                    value={num || ''}
                    onChange={(e) => handleNumberChange('fifthPrize', idx, e.target.value, 5)}
                    className="w-full text-center py-2 text-base font-mono font-bold tracking-wider bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6: รางวัลที่ ๖ (เลขท้าย ๓ ตัว 100 รางวัล) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-blue-200 shadow-sm">
            <div className="flex items-center gap-3 border-b border-blue-100 pb-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Fan className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{formData.prizes.last3DigitsPrize.name}</h3>
                <span className="text-xs text-blue-700 font-semibold">
                  {formData.prizes.last3DigitsPrize.reward} (ออก ๑ หมายเลข รวม ๑๐๐ รางวัล)
                </span>
              </div>
            </div>

            <div className="max-w-xs mx-auto text-center">
              <label className="block text-xs font-bold text-blue-900 mb-2">
                หมายเลขท้าย ๓ ตัว
              </label>
              <input
                type="text"
                maxLength={3}
                placeholder="เช่น 456"
                value={formData.prizes.last3DigitsPrize.numbers[0] || ''}
                onChange={(e) => handleNumberChange('last3DigitsPrize', 0, e.target.value, 3)}
                className="w-full text-center py-3 text-3xl font-mono font-extrabold tracking-widest text-blue-900 bg-blue-50/50 border-2 border-blue-300 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-300 focus:outline-none"
              />
              <span className="text-xs text-slate-400 mt-2 block">
                สลากกาชาดฉบับใดที่เลขท้าย ๓ หลักตรงกับเลขนี้ จะถือว่าถูกรางวัลที่ ๖
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM SAVE BAR */}
        <div className="mt-8 bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold">ยืนยันและเผยแพร่ข้อมูลผลรางวัล</h4>
            <p className="text-xs text-slate-400">
              เมื่อกดบันทึก หน้าบ้านของผู้ใช้งานทุกคนจะอัปเดตทันทีภายในรอบ ๕ วินาที
            </p>
          </div>

          <button
            onClick={handleSaveData}
            disabled={isSaving}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-orange-500/25 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>{isSaving ? 'กำลังบันทึกข้อมูล...' : 'บันทึกและเผยแพร่ข้อมูลทันที (Save & Publish)'}</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* ADMIN SECURITY SETTINGS (RANDOM PASSWORD GENERATOR) */}
        {/* ================================================================= */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Key className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                การตั้งค่าความปลอดภัยรหัสผ่าน Admin (เงื่อนไข: สุ่ม 10 ตัวอักษรขึ้นไป)
              </h3>
              <p className="text-xs text-slate-500">
                เฉพาะ Admin คนเดียวเท่านั้นที่สามารถกรอกและแก้ไขผลรางวัลได้
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-600 block mb-1">
                รหัสผ่าน Admin ที่ใช้งานอยู่ในปัจจุบัน:
              </span>
              <div className="flex items-center gap-2 mt-2">
                <code className="bg-white px-3 py-2 rounded-xl border border-slate-300 font-mono text-sm text-slate-800 flex-1 break-all">
                  {currentAdminPassword || 'Sisaket2027@WinnerAdmin#99'}
                </code>
                <button
                  onClick={() => copyToClipboard(currentAdminPassword || 'Sisaket2027@WinnerAdmin#99')}
                  className="p-2.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-slate-600"
                  title="คัดลอกรหัสผ่าน"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                * สามารถเปลี่ยนรหัสผ่านได้ในไฟล์ <code className="text-slate-600">.env.local</code> หรือกำหนดใน Environment Variables บน Vercel
              </p>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-amber-900">
                  สุ่มรหัสผ่านใหม่ (ความยาว 16 ตัวอักษร):
                </span>
                <button
                  type="button"
                  onClick={handleGenerateNewRandomPassword}
                  className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>สุ่มใหม่</span>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <code className="bg-white px-3 py-2 rounded-xl border border-amber-300 font-mono text-sm text-amber-900 flex-1 break-all">
                  {suggestedPassword || 'กำลังโหลด...'}
                </code>
                <button
                  onClick={() => copyToClipboard(suggestedPassword)}
                  className="p-2.5 bg-white hover:bg-amber-100 border border-amber-300 rounded-xl text-amber-800"
                  title="คัดลอกรหัสผ่านสุ่ม"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-amber-800 mt-2">
                แนะนำให้คัดลอกรหัสนี้ไปใส่ใน Vercel Environment Variable: <code className="font-bold">ADMIN_PASSWORD</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
