'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles, LogIn, Menu, X, Sun, Moon } from 'lucide-react';
import MegaMenu from './MegaMenu';
import { WhoWeServeDropdown, ResourcesDropdown } from './DropdownMenus';
import { LockedFeatureInfo } from './LockedFeatureModal';
import { ActiveTab } from '../Sidebar';
import { useTheme } from '@/context/ThemeContext';

interface LandingNavbarProps {
  onOpenLogin: () => void;
  onOpenContact: () => void;
  onSelectActiveFeature: (tabId: ActiveTab) => void;
  onSelectLockedFeature: (feature: LockedFeatureInfo) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function LandingNavbar({
  onOpenLogin,
  onOpenContact,
  onSelectActiveFeature,
  onSelectLockedFeature,
  onScrollToSection,
}: LandingNavbarProps) {
  const [activeMenu, setActiveMenu] = useState<'features' | 'who' | 'resources' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = (menu: 'features' | 'who' | 'resources') => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const closeAllMenus = () => setActiveMenu(null);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0D0F13]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#202534] select-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onScrollToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#161A24] border border-slate-300 dark:border-[#C9A46C]/50 p-1 flex items-center justify-center shadow-sm">
            <img
              src="/assets/logo.png"
              alt="KOV INTERIOR"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-luxury text-base sm:text-lg font-bold tracking-wider text-slate-900 dark:text-white uppercase">
              KOV INTERIOR
            </span>
            <p className="text-[10px] text-[#B58E50] dark:text-[#C9A46C] font-semibold tracking-wider uppercase">
              Turnkey Architecture &amp; Studio OS
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Features Mega Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => toggleMenu('features')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                activeMenu === 'features'
                  ? 'text-[#B58E50] dark:text-[#DFCAA5] bg-slate-100 dark:bg-[#181D29]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#161A24]'
              }`}
            >
              <span>Features</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'features' ? 'rotate-180 text-[#B58E50] dark:text-[#C9A46C]' : 'text-slate-400'
                }`}
              />
            </button>
          </div>

          {/* Who We Serve Trigger */}
          <div className="relative">
            <button
              onClick={() => toggleMenu('who')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                activeMenu === 'who'
                  ? 'text-[#B58E50] dark:text-[#DFCAA5] bg-slate-100 dark:bg-[#181D29]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#161A24]'
              }`}
            >
              <span>Who we serve</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'who' ? 'rotate-180 text-[#B58E50] dark:text-[#C9A46C]' : 'text-slate-400'
                }`}
              />
            </button>
            <WhoWeServeDropdown
              isOpen={activeMenu === 'who'}
              onClose={closeAllMenus}
              onSelectAudience={(aud) => {
                onScrollToSection('who-we-serve');
              }}
            />
          </div>

          {/* Resources Trigger */}
          <div className="relative">
            <button
              onClick={() => toggleMenu('resources')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                activeMenu === 'resources'
                  ? 'text-[#B58E50] dark:text-[#DFCAA5] bg-slate-100 dark:bg-[#181D29]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#161A24]'
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'resources' ? 'rotate-180 text-[#B58E50] dark:text-[#C9A46C]' : 'text-slate-400'
                }`}
              />
            </button>
            <ResourcesDropdown
              isOpen={activeMenu === 'resources'}
              onClose={closeAllMenus}
              onSelectResource={(res) => {
                onScrollToSection('resources');
              }}
            />
          </div>

          {/* Success Stories */}
          <button
            onClick={() => {
              closeAllMenus();
              onScrollToSection('success-stories');
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#161A24] transition-colors"
          >
            Success Stories
          </button>

          {/* Pricing */}
          <button
            onClick={() => {
              closeAllMenus();
              onScrollToSection('pricing');
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#161A24] transition-colors"
          >
            Pricing
          </button>

          {/* Contact us */}
          <button
            onClick={() => {
              closeAllMenus();
              onOpenContact();
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#161A24] transition-colors"
          >
            Contact us
          </button>
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#161A24] border border-slate-200 dark:border-[#272D3E] transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#C9A46C]" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Studio Login Button */}
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#161A24] hover:bg-slate-200 dark:hover:bg-[#1E2332] border border-slate-200 dark:border-[#2B3245] text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5 text-[#B58E50] dark:text-[#C9A46C]" />
            <span>Studio Login</span>
          </button>

          {/* Book a Demo Button */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 dark:bg-gradient-to-r dark:from-[#C9A46C] dark:to-[#B59058] dark:hover:from-[#D4B27C] dark:hover:to-[#C9A46C] text-white dark:text-[#0D0F13] font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            <span>Book a Demo</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-[#161A24] border border-slate-200 dark:border-[#272D3E] text-slate-600 dark:text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mega Menu Dropdown with Absolute Solid Backdrop */}
      <MegaMenu
        isOpen={activeMenu === 'features'}
        onClose={closeAllMenus}
        onSelectActiveFeature={onSelectActiveFeature}
        onSelectLockedFeature={onSelectLockedFeature}
      />

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#10131B] border-b border-slate-200 dark:border-[#242A3B] px-5 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                toggleMenu('features');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#161A24] text-left text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#252C3E]"
            >
              Explore 10 Modules →
            </button>
            <button
              onClick={() => {
                onScrollToSection('pricing');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#161A24] text-left text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#252C3E]"
            >
              Subscription Plans →
            </button>
            <button
              onClick={() => {
                onScrollToSection('who-we-serve');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#161A24] text-left text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#252C3E]"
            >
              Who We Serve →
            </button>
            <button
              onClick={() => {
                onScrollToSection('success-stories');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#161A24] text-left text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#252C3E]"
            >
              Success Stories →
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#222838]">
            <span className="text-xs text-slate-600 dark:text-slate-400">Theme</span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#161A24] text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#272D3E]"
            >
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-[#222838]">
            <button
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-[#171C27] border border-slate-200 dark:border-[#2B3347] text-xs font-bold text-slate-800 dark:text-slate-200 text-center"
            >
              Studio Login
            </button>
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0F172A] dark:bg-[#C9A46C] text-white dark:text-[#0D0F13] font-bold text-xs uppercase tracking-wider text-center"
            >
              Book a Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
