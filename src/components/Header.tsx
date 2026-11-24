'use client';

import React from 'react';
import { Search, Bell, Smartphone, RefreshCw, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onBackToWebsite?: () => void;
  userRole?: string;
}

export default function Header({
  onRefresh,
  isRefreshing,
  onBackToWebsite,
  userRole = 'Studio Lead',
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-[#222735] bg-white/95 dark:bg-[#101217]/95 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 print:hidden transition-colors">
      {/* Search Bar / Quick Finder */}
      <div className="flex items-center gap-3 w-80 lg:w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads, BOQ specifications, site logs..."
            className="w-full bg-slate-50 dark:bg-[#161922] border border-slate-200 dark:border-[#272D3C] rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#B58E50] dark:focus:border-[#C9A46C] transition-colors"
          />
        </div>
      </div>

      {/* Right side tools */}
      <div className="flex items-center gap-3">
        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#161922] hover:bg-slate-200 dark:hover:bg-[#1E2330] border border-slate-200 dark:border-[#272D3C] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-[#C9A46C]" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* Mobile App Live Sync Status */}
        <div className="hidden sm:inline-flex items-center gap-2.5 h-9 px-3.5 rounded-xl bg-slate-100 dark:bg-[#161922] border border-slate-200 dark:border-[#272D3C] text-xs shadow-sm">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Smartphone className="w-3.5 h-3.5 text-[#B58E50] dark:text-[#C9A46C]" />
            <span className="font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">Mobile App</span>
          </div>
          <div className="h-3.5 w-px bg-slate-300 dark:bg-[#2B3243]"></div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wide whitespace-nowrap">Live Sync</span>
          </div>
        </div>

        {/* Refresh button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            title="Refresh database data"
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#161922] hover:bg-slate-200 dark:hover:bg-[#1E2330] border border-slate-200 dark:border-[#272D3C] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#B58E50] dark:text-[#C9A46C]' : ''}`} />
          </button>
        )}

        {/* Notifications */}
        <button className="relative h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#161922] hover:bg-slate-200 dark:hover:bg-[#1E2330] border border-slate-200 dark:border-[#272D3C] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors shrink-0">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#B58E50] dark:bg-[#C9A46C]"></span>
        </button>

        {/* Studio Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200 dark:border-[#222735]">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#181B22] border border-slate-300 dark:border-[#C9A46C]/60 p-0.5 flex items-center justify-center shrink-0">
            <img src="/assets/logo.png" alt="Profile" className="w-full h-full object-contain" />
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-200">Kov Interiors Studio</p>
            <p className="text-[10px] text-[#B58E50] dark:text-[#C9A46C] font-semibold">{userRole}</p>
          </div>
        </div>

        {/* Log Out / Return to Public Website */}
        {onBackToWebsite && (
          <button
            onClick={onBackToWebsite}
            title="Return to Public Website"
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#161922] hover:bg-red-50 dark:hover:bg-red-950/40 border border-slate-200 dark:border-[#272D3C] hover:border-red-300 dark:hover:border-red-800/50 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
}
