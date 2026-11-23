'use client';

import React from 'react';
import {
  LayoutDashboard,
  Users,
  Palette,
  FileSpreadsheet,
  Camera,
  IndianRupee,
  Boxes,
  FileCheck2,
  CalendarRange,
  HardHat,
  Sparkles,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

export type ActiveTab =
  | 'overview'
  | 'crm'
  | 'design'
  | 'boq'
  | 'site_tracking'
  | 'finance'
  | 'inventory'
  | 'handover'
  | 'project_mgmt'
  | 'hrms'
  | 'ai';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  projectName?: string;
  projectLocation?: string;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  projectName = 'The Sky Villa (4BHK Luxury)',
  projectLocation = 'Prahlad Nagar, Ahmedabad',
}: SidebarProps) {
  const menuItems: { id: ActiveTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'crm', label: 'CRM & Deals Pipeline', icon: Users, badge: '4 HNIs' },
    { id: 'design', label: 'Design & Drawing Pins', icon: Palette, badge: '3D Pins' },
    { id: 'boq', label: 'BOQ & Scope Estimator', icon: FileSpreadsheet, badge: '₹48.5L' },
    { id: 'site_tracking', label: 'Site Photo Feed', icon: Camera, badge: 'Live' },
    { id: 'finance', label: 'Financial Milestones', icon: IndianRupee },
    { id: 'inventory', label: 'Warehouse & Materials', icon: Boxes },
    { id: 'handover', label: 'Site Handover & Sign', icon: FileCheck2 },
    { id: 'project_mgmt', label: 'Project Schedule', icon: CalendarRange },
    { id: 'hrms', label: 'HRMS & Site Labor', icon: HardHat },
    { id: 'ai', label: 'AI Daily WhatsApp Brief', icon: Sparkles, badge: 'AI' },
  ];

  return (
    <aside className="w-80 bg-[#101217] border-r border-[#222735] flex flex-col h-screen sticky top-0 select-none z-30 shrink-0 print:hidden">
      {/* Brand Header with Real Kov Interior Logo */}
      <div className="p-5 border-b border-[#222735]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-[#181B22] border border-[#C9A46C]/40 p-1 flex items-center justify-center shadow-md shrink-0">
            <img
              src="/assets/logo.png"
              alt="KOV INTERIOR Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <h1 className="font-luxury text-base font-bold tracking-wider text-slate-100 uppercase truncate">
              KOV INTERIOR
            </h1>
            <p className="text-[10px] text-[#C9A46C] font-semibold tracking-wider uppercase truncate">
              Architecture & Studio OS
            </p>
          </div>
        </div>

        {/* Active Project Card in Sidebar */}
        <div className="mt-4 p-3 rounded-xl bg-[#161922] border border-[#262C3A]">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#C9A46C]">ACTIVE RESIDENCE</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
              48% Done
            </span>
          </div>
          <p className="text-xs font-bold text-slate-100 mt-1 truncate">{projectName}</p>
          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
            <MapPin className="w-3 h-3 text-[#C9A46C] shrink-0" />
            <span className="truncate">{projectLocation}</span>
          </p>
        </div>
      </div>

      {/* Navigation List - Generous 320px width so NO text ever truncates */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Enterprise Modules
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-left ${
                isActive
                  ? 'bg-[#1C202B] text-[#F1E5D3] border border-[#C9A46C]/60 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161922] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-[#C9A46C]' : 'text-slate-400'
                  }`}
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-2 ${
                    item.badge === 'AI'
                      ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50'
                      : isActive
                      ? 'bg-[#C9A46C]/25 text-[#F1E5D3] border border-[#C9A46C]/40'
                      : 'bg-[#1F232E] text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer System Status */}
      <div className="p-3.5 border-t border-[#222735] bg-[#0E1015] text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] text-slate-300 font-semibold">Supabase Cloud</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Ahmedabad (ap-south-1)</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Kov Interiors Live Sync Active
        </p>
      </div>
    </aside>
  );
}
