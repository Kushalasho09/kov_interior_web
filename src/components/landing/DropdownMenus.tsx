'use client';

import React from 'react';
import {
  Compass,
  Building,
  HardHat,
  Briefcase,
  Layers,
  Factory,
  BookOpen,
  FileText,
  HelpCircle,
} from 'lucide-react';

interface WhoWeServeDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAudience: (title: string) => void;
}

export function WhoWeServeDropdown({
  isOpen,
  onClose,
  onSelectAudience,
}: WhoWeServeDropdownProps) {
  if (!isOpen) return null;

  const items = [
    {
      title: 'Architects',
      subtitle: 'Designs, approvals, and client alignment',
      icon: Compass,
    },
    {
      title: 'Interior Studios',
      subtitle: 'Projects, budgets, and vendor tracking',
      icon: Building,
    },
    {
      title: 'Construction Companies',
      subtitle: 'Site progress, workforce, and project management',
      icon: HardHat,
    },
    {
      title: 'Contractors',
      subtitle: 'Site progress, tasks, and payments',
      icon: Briefcase,
    },
    {
      title: 'EPC Companies',
      subtitle: 'Project execution, procurement, and cost control',
      icon: Layers,
    },
    {
      title: 'Manufacturers',
      subtitle: "BOM's, orders, and production planning",
      icon: Factory,
    },
  ];

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 w-80 z-50 bg-white dark:bg-[#121620] border border-slate-200 dark:border-[#242A3B] rounded-2xl shadow-xl p-3 animate-in fade-in slide-in-from-top-2 duration-150"
      onMouseLeave={onClose}
    >
      <div className="space-y-1">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => {
                onSelectAudience(item.title);
                onClose();
              }}
              className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#1A202E] text-left transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#181D2A] border border-slate-200 dark:border-[#2B3347] flex items-center justify-center shrink-0 text-[#B58E50] dark:text-[#C9A46C] group-hover:scale-105 transition-all">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#B58E50] dark:group-hover:text-[#DFCAA5] transition-colors truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ResourcesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResource: (type: 'blogs' | 'casestudies' | 'faqs') => void;
}

export function ResourcesDropdown({
  isOpen,
  onClose,
  onSelectResource,
}: ResourcesDropdownProps) {
  if (!isOpen) return null;

  const items = [
    {
      id: 'blogs' as const,
      title: 'Blogs',
      subtitle: 'Guides on running & scaling turnkey design studios',
      icon: BookOpen,
    },
    {
      id: 'casestudies' as const,
      title: 'Case Studies',
      subtitle: 'See how teams deliver luxury projects faster (Sky Villa)',
      icon: FileText,
    },
    {
      id: 'faqs' as const,
      title: 'FAQs',
      subtitle: 'Quick answers for architecture & field sync workflows',
      icon: HelpCircle,
    },
  ];

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 w-80 z-50 bg-white dark:bg-[#121620] border border-slate-200 dark:border-[#242A3B] rounded-2xl shadow-xl p-3 animate-in fade-in slide-in-from-top-2 duration-150"
      onMouseLeave={onClose}
    >
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectResource(item.id);
                onClose();
              }}
              className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#1A202E] text-left transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#181D2A] border border-slate-200 dark:border-[#2B3347] flex items-center justify-center shrink-0 text-[#B58E50] dark:text-[#C9A46C] group-hover:scale-105 transition-all">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#B58E50] dark:group-hover:text-[#DFCAA5] transition-colors truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
