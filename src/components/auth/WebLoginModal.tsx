'use client';

import React, { useState } from 'react';
import { ShieldCheck, KeyRound, ArrowRight, X, Building2, UserCheck, HardHat } from 'lucide-react';

export type UserRole = 'studio_lead' | 'site_architect' | 'client';

interface WebLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole) => void;
}

export default function WebLoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: WebLoginModalProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('studio_lead');
  const [email, setEmail] = useState('studio@kovinterior.in');
  const [pin, setPin] = useState('889900');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'studio_lead') {
      setEmail('lead@kovinterior.in');
    } else if (role === 'site_architect') {
      setEmail('architect@kovinterior.in');
    } else {
      setEmail('client.skyvilla@kovinterior.in');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(selectedRole);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#11141C] border border-slate-200 dark:border-[#2B3244] rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-900 dark:text-white transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-[#171B26] hover:bg-slate-200 dark:hover:bg-[#202534] border border-slate-200 dark:border-[#272E3F] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Studio Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#181C26] border border-slate-300 dark:border-[#C9A46C]/40 p-1.5 flex items-center justify-center shadow-md mb-3">
            <img
              src="/assets/logo.png"
              alt="KOV INTERIOR"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-xl font-bold font-luxury uppercase tracking-wider text-slate-900 dark:text-white">
            KOV INTERIOR
          </h2>
          <p className="text-[10px] text-[#B58E50] dark:text-[#C9A46C] font-semibold uppercase tracking-widest mt-0.5">
            Studio Enterprise Workspace
          </p>
        </div>

        {/* 3-Tab Role Selector with Equal Width and Centered Alignment */}
        <div className="mb-5">
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 text-center">
            Select Workspace Access Mode
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#161922] border border-slate-200 dark:border-[#242938]">
            <button
              type="button"
              onClick={() => handleRoleChange('studio_lead')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-center transition-all ${
                selectedRole === 'studio_lead'
                  ? 'bg-white dark:bg-[#222837] text-slate-900 dark:text-[#F1E5D3] font-bold border border-slate-300 dark:border-[#C9A46C]/50 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Building2 className={`w-3.5 h-3.5 mb-1 ${selectedRole === 'studio_lead' ? 'text-[#B58E50] dark:text-[#C9A46C]' : 'text-slate-400'}`} />
              <span className="text-[11px] leading-tight">Studio Lead</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('site_architect')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-center transition-all ${
                selectedRole === 'site_architect'
                  ? 'bg-white dark:bg-[#222837] text-slate-900 dark:text-[#F1E5D3] font-bold border border-slate-300 dark:border-[#C9A46C]/50 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <HardHat className={`w-3.5 h-3.5 mb-1 ${selectedRole === 'site_architect' ? 'text-[#B58E50] dark:text-[#C9A46C]' : 'text-slate-400'}`} />
              <span className="text-[11px] leading-tight">Site Architect</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('client')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-center transition-all ${
                selectedRole === 'client'
                  ? 'bg-white dark:bg-[#222837] text-slate-900 dark:text-[#F1E5D3] font-bold border border-slate-300 dark:border-[#C9A46C]/50 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <UserCheck className={`w-3.5 h-3.5 mb-1 ${selectedRole === 'client' ? 'text-[#B58E50] dark:text-[#C9A46C]' : 'text-slate-400'}`} />
              <span className="text-[11px] leading-tight">Client Portal</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Studio Identity / Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#272D3E] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#B58E50] dark:focus:border-[#C9A46C]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Security Key / PIN
              </label>
              <span className="text-[10px] text-slate-500">Default: 889900</span>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#272D3E] text-xs text-slate-900 dark:text-white placeholder-slate-400 tracking-widest focus:outline-none focus:border-[#B58E50] dark:focus:border-[#C9A46C]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 dark:border-[#2E364A] text-[#B58E50] dark:text-[#C9A46C]"
              />
              <span className="text-[11px]">Remember Workspace</span>
            </label>
            <span className="text-[10px] text-[#B58E50] dark:text-[#C9A46C] hover:underline cursor-pointer">
              Forgot PIN?
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-slate-800 dark:bg-gradient-to-r dark:from-[#C9A46C] dark:to-[#B59058] dark:hover:from-[#D4B27C] dark:hover:to-[#C9A46C] text-white dark:text-[#0D0F13] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-60"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Enter Studio Workspace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Live Sync Status Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#202534] flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>End-to-end Encrypted</span>
          </div>
          <span className="font-mono">v2.4 Live Sync</span>
        </div>
      </div>
    </div>
  );
}
