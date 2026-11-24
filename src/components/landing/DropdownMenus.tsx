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
      subtitle: 'Site Progress, tasks, and payments',
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
      className="absolute top-full left-0 mt-2 w-84 sm:w-96 z-50 bg-white dark:bg-[#10131B] border border-slate-200 dark:border-[#252C3D] rounded-2xl shadow-2xl p-2.5 animate-in fade-in slide-in-from-top-2 duration-150"
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
              className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#171C27] text-left transition-colors group"
            >
              {/* Soft Blue Icon Container */}
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
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
      subtitle: 'Guides on running & scaling studios',
      icon: BookOpen,
    },
    {
      id: 'casestudies' as const,
      title: 'Case Studies',
      subtitle: 'See how teams deliver projects faster',
      icon: FileText,
    },
    {
      id: 'faqs' as const,
      title: 'FAQs',
      subtitle: 'Quick product & workflow answers',
      icon: HelpCircle,
    },
  ];

  return (
    <div
      className="absolute top-full left-0 mt-2 w-80 sm:w-88 z-50 bg-white dark:bg-[#10131B] border border-slate-200 dark:border-[#252C3D] rounded-2xl shadow-2xl p-2.5 animate-in fade-in slide-in-from-top-2 duration-150"
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
              className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#171C27] text-left transition-colors group"
            >
              {/* Soft Blue Icon Container */}
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
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
