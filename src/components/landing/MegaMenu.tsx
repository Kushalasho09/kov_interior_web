'use client';

import React from 'react';
import {
  Users,
  FileText,
  TrendingUp,
  CheckSquare,
  Image as ImageIcon,
  Palette,
  Pin,
  ClipboardCheck,
  FileSpreadsheet,
  ShoppingBag,
  Receipt,
  AlertCircle,
  Clock,
  Calendar,
  Contact,
  CircleDollarSign,
  CreditCard,
  BarChart3,
  FilePlus,
  Archive,
  Box,
  ArrowLeftRight,
  Building2,
  CheckCircle2,
  FileCheck,
  PenTool,
  CalendarDays,
  ListChecks,
  GitFork,
  Timer,
  Mic,
  Cpu,
  BookOpen,
  Bot,
  CalendarOff,
  Wallet,
  Lock,
  ArrowRight,
  X,
} from 'lucide-react';
import { LockedFeatureInfo } from './LockedFeatureModal';
import { ActiveTab } from '../Sidebar';

interface FeatureItem {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  tabId?: ActiveTab;
  isLocked?: boolean;
  tier?: 'Pro' | 'Enterprise';
  highlights?: string[];
}

interface FeatureColumn {
  category: string;
  items: FeatureItem[];
}

export const MEGA_MENU_COLUMNS: FeatureColumn[] = [
  {
    category: 'CRM',
    items: [
      {
        title: 'Lead Management',
        subtitle: 'Create or import leads in funnels',
        icon: Users,
        tabId: 'crm',
      },
      {
        title: 'Notes',
        subtitle: 'Centralized notes for leads & projects',
        icon: FileText,
        tabId: 'crm',
      },
      {
        title: 'Funnel Management',
        subtitle: 'Visualize & move deals across stages',
        icon: TrendingUp,
        tabId: 'crm',
      },
      {
        title: 'Tasks',
        subtitle: 'Assign and track sales follow-ups',
        icon: CheckSquare,
        tabId: 'crm',
      },
    ],
  },
  {
    category: 'Design Management',
    items: [
      {
        title: 'Recce',
        subtitle: 'Capture site details and measurements',
        icon: ImageIcon,
        tabId: 'design',
      },
      {
        title: 'Moodboards',
        subtitle: 'Organize design ideas and inspirations',
        icon: Palette,
        tabId: 'design',
      },
      {
        title: 'Drawing & Pins',
        subtitle: 'Manage drawings with annotations',
        icon: Pin,
        tabId: 'design',
      },
      {
        title: 'Finishes & Makelist',
        subtitle: 'Track materials, finishes, & selections',
        icon: ClipboardCheck,
        tabId: 'design',
      },
    ],
  },
  {
    category: 'BOQ & Scope',
    items: [
      {
        title: 'Quotes',
        subtitle: 'Create and share project quotations',
        icon: FileSpreadsheet,
        tabId: 'boq',
      },
      {
        title: 'Orders',
        subtitle: 'Manage work and purchase orders',
        icon: ShoppingBag,
        isLocked: true,
        tier: 'Pro',
        highlights: ['Vendor PO generation', 'Digital approval trails', 'Tax calculations'],
      },
      {
        title: 'Invoices',
        subtitle: 'Generate and track billing documents',
        icon: Receipt,
        tabId: 'boq',
      },
      {
        title: 'RFQ',
        subtitle: 'Request and compare vendor quotations',
        icon: AlertCircle,
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Rate comparison matrix', 'Direct supplier portal', 'Automated analysis'],
      },
    ],
  },
  {
    category: 'Site Tracking',
    items: [
      {
        title: 'Attendance',
        subtitle: 'Track daily site workforce attendance',
        icon: Clock,
        tabId: 'site_tracking',
      },
      {
        title: 'Quick Updates',
        subtitle: 'Post instant site progress updates',
        icon: Calendar,
        tabId: 'site_tracking',
      },
      {
        title: 'Manpower Ledgers',
        subtitle: 'Monitor labor deployment and usage',
        icon: Contact,
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Weekly wage reconciliation', 'Contractor billing', 'Overtime ledgers'],
      },
    ],
  },
  {
    category: 'Financial Management',
    items: [
      {
        title: 'Transactions',
        subtitle: 'Track all project financial entries',
        icon: CircleDollarSign,
        tabId: 'finance',
      },
      {
        title: 'Payment Requests',
        subtitle: 'Request & approve payments securely',
        icon: CreditCard,
        tabId: 'finance',
      },
      {
        title: 'Milestone Tracking',
        subtitle: 'Link payments to project milestones',
        icon: BarChart3,
        tabId: 'finance',
      },
    ],
  },
  {
    category: 'Inventory & Warehouse',
    items: [
      {
        title: 'Purchase Request',
        subtitle: 'Raise material purchase requests',
        icon: FilePlus,
        tabId: 'inventory',
      },
      {
        title: 'GRN',
        subtitle: 'Record goods received at site',
        icon: Archive,
        tabId: 'inventory',
      },
      {
        title: 'Inventory Management',
        subtitle: 'Monitor material stock levels',
        icon: Box,
        tabId: 'inventory',
      },
      {
        title: 'Stock Transfer',
        subtitle: 'Move stock between sites or stores',
        icon: ArrowLeftRight,
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Multi-site dispatch transit', 'Gate-pass generation', 'Vehicle tracking'],
      },
      {
        title: 'Warehouse Management',
        subtitle: 'Manage centralized material storage',
        icon: Building2,
        tabId: 'inventory',
      },
    ],
  },
  {
    category: 'Site Handovers',
    items: [
      {
        title: 'CheckList',
        subtitle: 'Ensure all handover tasks are complete',
        icon: CheckCircle2,
        tabId: 'handover',
      },
      {
        title: 'Contracts',
        subtitle: 'Store and manage project agreements',
        icon: FileCheck,
        isLocked: true,
        tier: 'Pro',
        highlights: ['Standard turnkey contract templates', 'Version tracking', 'Client NDA protection'],
      },
      {
        title: 'E-signing',
        subtitle: 'Digitally sign and approve documents',
        icon: PenTool,
        tabId: 'handover',
      },
    ],
  },
  {
    category: 'Project Management',
    items: [
      {
        title: 'Project Schedule',
        subtitle: 'Plan timelines and dependencies',
        icon: CalendarDays,
        tabId: 'project_mgmt',
      },
      {
        title: 'Activities',
        subtitle: 'Track tasks across project stages',
        icon: ListChecks,
        tabId: 'project_mgmt',
      },
      {
        title: 'CPM',
        subtitle: 'Find the critical path and avoid delays',
        icon: GitFork,
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Float & slack computation', 'Automated bottleneck alerts', 'Lead-time prediction'],
      },
      {
        title: 'PERT',
        subtitle: 'Estimate timelines with three-point durations',
        icon: Timer,
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Three-point probabilistic scheduling', 'Optimistic/Pessimistic variance analysis'],
      },
    ],
  },
  {
    category: 'AI',
    items: [
      {
        title: 'Voice Updates',
        subtitle: 'Convert voice notes into updates',
        icon: Mic,
        tabId: 'ai',
      },
      {
        title: '3D to Render',
        subtitle: 'Generate renders from 3D models',
        icon: Box,
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['CAD/SketchUp to 4K render', 'PBR lighting synthesis', 'Material style swap'],
      },
      {
        title: 'Drawing to BOM',
        subtitle: 'Auto-create BOM from drawings',
        icon: Cpu,
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Computer-vision room takeoff', 'Auto hardware counting', 'Dynamic BOQ sync'],
      },
      {
        title: 'Knowledge Centre',
        subtitle: 'Access project insights and data',
        icon: BookOpen,
        tabId: 'ai',
      },
      {
        title: 'AI Employees',
        subtitle: 'AI agents assist across workflows',
        icon: Bot,
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Autonomous client follow-ups', 'Vendor procurement bot', 'Site delay alerts'],
      },
    ],
  },
  {
    category: 'HRMS',
    items: [
      {
        title: 'Attendance Management',
        subtitle: 'Track employee attendance digitally',
        icon: Users,
        tabId: 'hrms',
      },
      {
        title: 'Leave Management',
        subtitle: 'Manage leave requests and approvals',
        icon: CalendarOff,
        isLocked: true,
        tier: 'Pro',
        highlights: ['Leave calendar', 'Stand-in allocation', 'Attendance records'],
      },
      {
        title: 'Payroll Management',
        subtitle: 'Process salaries and payroll records',
        icon: Wallet,
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Bank payout export', 'Compliance calculations', 'Salary pay slips'],
      },
    ],
  },
];

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectActiveFeature: (tabId: ActiveTab) => void;
  onSelectLockedFeature: (feature: LockedFeatureInfo) => void;
}

export default function MegaMenu({
  isOpen,
  onClose,
  onSelectActiveFeature,
  onSelectLockedFeature,
}: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Invisible Click-outside Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Floating Card Container: Centered directly below navbar */}
      <div
        className="fixed top-20 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-7xl bg-white dark:bg-[#10131B] border border-slate-200 dark:border-[#252C3D] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[calc(100vh-6rem)] overflow-y-auto pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-200">
          {/* Top Bar with Title and Close Button */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-[#1E2434]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Studio Features &amp; Modules
              </span>
              <span className="hidden sm:inline-block text-xs text-slate-500 dark:text-slate-400">
                10 specialized modules unifying architecture, BOQ, site execution, and escrow
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1A202D] text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              title="Close Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 10 Columns Grid (5 columns per row on desktop, matching reference design) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-7">
            {MEGA_MENU_COLUMNS.map((col, idx) => (
              <div key={idx} className="space-y-3">
                {/* Column Heading */}
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-1 border-b border-slate-100 dark:border-[#1A202D]">
                  {col.category}
                </h4>

                {/* Column Feature Items */}
                <div className="space-y-1.5">
                  {col.items.map((item, itemIdx) => {
                    const Icon = item.icon;
                    const isLocked = item.isLocked;

                    return (
                      <button
                        key={itemIdx}
                        onClick={() => {
                          if (isLocked) {
                            onSelectLockedFeature({
                              title: item.title,
                              category: col.category,
                              description: item.subtitle,
                              requiredTier: item.tier || 'Enterprise',
                              highlights: item.highlights || [
                                'Custom workflow automation',
                                'Dedicated SLA & support',
                                'Direct integration with Kov OS',
                              ],
                            });
                          } else if (item.tabId) {
                            onSelectActiveFeature(item.tabId);
                          }
                          onClose();
                        }}
                        className="w-full text-left p-2 -mx-2 rounded-xl hover:bg-slate-50 dark:hover:bg-[#171C27] flex items-start gap-2.5 transition-colors group"
                      >
                        {/* Soft Blue Icon Container */}
                        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-3.5 h-3.5" />
                        </div>

                        {/* Title and Subtitle */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                              {item.title}
                            </span>
                            {isLocked && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-[#1E2434] text-slate-500 dark:text-slate-400 shrink-0">
                                <Lock className="w-2.5 h-2.5" />
                                <span>{item.tier}</span>
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Bar inside Mega Menu */}
          <div className="mt-7 pt-4 border-t border-slate-100 dark:border-[#1E2434] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
            <span>
              Real-time synchronization active across Web Studio OS and Kov Mobile App.
            </span>
            <button
              onClick={() => {
                onSelectActiveFeature('overview');
                onClose();
              }}
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
            >
              <span>Open Studio OS Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
