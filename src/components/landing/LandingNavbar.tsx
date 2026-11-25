'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const openedByHoverRef = useRef<boolean>(false);

  const handleMouseEnter = (menu: 'features' | 'who' | 'resources') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu((prev) => {
      if (prev !== menu) {
        openedByHoverRef.current = true;
      }
      return menu;
    });
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      openedByHoverRef.current = false;
      setActiveMenu(null);
    }, 200);
  };

  const toggleMenu = (menu: 'features' | 'who' | 'resources') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu((prev) => {
      if (prev === menu) {
        if (openedByHoverRef.current) {
          openedByHoverRef.current = false;
          return menu;
        }
        return null;
      }
      openedByHoverRef.current = false;
      return menu;
    });
  };

  const closeAllMenus = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    openedByHoverRef.current = false;
    setActiveMenu(null);
  };

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAllMenus();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0D0F13]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#202534] select-none transition-colors">
      <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => {
            closeAllMenus();
            onScrollToSection('hero');
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#161A24] border border-slate-200 dark:border-[#272E3E] p-1.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <img
              src="/assets/logo.png"
              alt="KOV INTERIOR"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-luxury text-base sm:text-lg font-bold tracking-wider text-slate-900 dark:text-white uppercase">
                KOV INTERIOR
              </span>
            </div>
            <p className="text-[10px] text-blue-600 dark:text-[#C9A46C] font-semibold tracking-wider uppercase">
              Turnkey Architecture &amp; Studio OS
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Features Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('features')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleMenu('features')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                activeMenu === 'features'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-[#181D29]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#161A24]'
              }`}
            >
              <span>Features</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'features' ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'
                }`}
              />
            </button>
          </div>

          {/* Who We Serve Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('who')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleMenu('who')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                activeMenu === 'who'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-[#181D29]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#161A24]'
              }`}
            >
              <span>Who we serve</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'who' ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'
                }`}
              />
            </button>
            <WhoWeServeDropdown
              isOpen={activeMenu === 'who'}
              onClose={closeAllMenus}
              onSelectAudience={(aud) => {
                closeAllMenus();
                onScrollToSection('who-we-serve');
              }}
            />
          </div>

          {/* Resources Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleMenu('resources')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                activeMenu === 'resources'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-[#181D29]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#161A24]'
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'resources' ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'
                }`}
              />
            </button>
            <ResourcesDropdown
              isOpen={activeMenu === 'resources'}
              onClose={closeAllMenus}
              onSelectResource={(res) => {
                closeAllMenus();
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
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Studio Login Button */}
          <button
            onClick={() => {
              closeAllMenus();
              onOpenLogin();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#161A24] hover:bg-slate-200 dark:hover:bg-[#1E2332] border border-slate-200 dark:border-[#2B3245] text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5 text-blue-600 dark:text-[#C9A46C]" />
            <span>Studio Login</span>
          </button>

          {/* Book a Demo Button (Matching Image 1 SaaS Primary CTA) */}
          <button
            onClick={() => {
              closeAllMenus();
              onOpenContact();
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
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

      {/* Floating Mega Menu with Centered Card Container (Image 2 style) */}
      <MegaMenu
        isOpen={activeMenu === 'features'}
        onClose={closeAllMenus}
        onSelectActiveFeature={onSelectActiveFeature}
        onSelectLockedFeature={onSelectLockedFeature}
        onMouseEnter={() => handleMouseEnter('features')}
        onMouseLeave={handleMouseLeave}
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
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider text-center"
            >
              Book a Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
