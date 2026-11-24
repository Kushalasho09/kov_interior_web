'use client';

import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ArrowUp,
} from 'lucide-react';

interface LandingFooterProps {
  onScrollToTop: () => void;
  onOpenContact: () => void;
}

export default function LandingFooter({ onScrollToTop, onOpenContact }: LandingFooterProps) {
  return (
    <footer className="bg-slate-900 dark:bg-[#090B0F] text-slate-400 border-t border-slate-800 dark:border-[#1C212E] select-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Studio Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 dark:bg-[#141822] border border-slate-700 dark:border-[#C9A46C]/50 p-1 flex items-center justify-center shadow-lg">
                <img
                  src="/assets/logo.png"
                  alt="KOV INTERIOR"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-luxury text-base font-bold tracking-wider text-white uppercase">
                  KOV INTERIOR
                </h3>
                <p className="text-[10px] text-[#C9A46C] font-semibold tracking-wider uppercase">
                  Architecture &amp; Studio OS
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier AI-native operating system designed specifically for luxury turnkey interior and architecture firms. Uniting 3D floor plan pins, BOQ scope estimator, and field photo logs.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-[#141822] border border-slate-700 dark:border-[#232A3B] flex items-center justify-center text-slate-400 hover:text-[#C9A46C] hover:border-[#C9A46C] transition-colors"
              >
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-[#141822] border border-slate-700 dark:border-[#232A3B] flex items-center justify-center text-slate-400 hover:text-[#C9A46C] hover:border-[#C9A46C] transition-colors"
              >
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-[#141822] border border-slate-700 dark:border-[#232A3B] flex items-center justify-center text-slate-400 hover:text-[#C9A46C] hover:border-[#C9A46C] transition-colors"
              >
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800 dark:bg-[#141822] border border-slate-700 dark:border-[#252C3D] text-[11px] text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ISO 27001 Certified &amp; Data Compliant</span>
              </div>
            </div>
          </div>

          {/* Features Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Core Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">CRM &amp; Inquiries</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Design &amp; 3D Pins</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">BOQ Scope &amp; Pricing</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Site Photo Stream</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Milestones &amp; Escrow</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Warehouse &amp; Stock</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Site Handover Checklist</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">HRMS &amp; Labor Muster</span></li>
            </ul>
          </div>

          {/* Who We Serve Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Who We Serve
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">Architects</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Interior Studios</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Construction Teams</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Turnkey Contractors</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">EPC Infrastructure</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Bespoke Millwork</span></li>
            </ul>
          </div>

          {/* Offices & Contact Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Studio Locations
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <p className="font-bold text-slate-200">Ahmedabad HQ Studio</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Prahlad Nagar, Corporate Rd, Ahmedabad 380015
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-200">Mumbai Studio</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Turner Rd, Bandra West, Mumbai 400050
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 dark:border-[#1C212E] space-y-1 text-slate-300">
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#C9A46C]" />
                  <span>+91 98250 89000</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#C9A46C]" />
                  <span>contact@kovinterior.in</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 dark:border-[#181D2A] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 KOV Interiors. All rights reserved. Designed for Luxury Turnkey Excellence.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms &amp; Conditions</span>
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1 text-[#C9A46C] hover:text-[#DFCAA5] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
