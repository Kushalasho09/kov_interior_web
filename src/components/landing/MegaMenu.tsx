'use client';

import React from 'react';
import {
  Users,
  Palette,
  FileSpreadsheet,
  Camera,
  IndianRupee,
  Boxes,
  FileCheck2,
  CalendarRange,
  Sparkles,
  HardHat,
  Lock,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { LockedFeatureInfo } from './LockedFeatureModal';
import { ActiveTab } from '../Sidebar';

interface FeatureItem {
  title: string;
  subtitle: string;
  isLocked?: boolean;
  tier?: 'Pro' | 'Enterprise';
  tabId?: ActiveTab;
  highlights?: string[];
}

interface FeatureColumn {
  category: string;
  icon: React.ElementType;
  items: FeatureItem[];
}

export const MEGA_MENU_COLUMNS: FeatureColumn[] = [
  {
    category: 'CRM',
    icon: Users,
    items: [
      { title: 'Lead Management', subtitle: 'Import & track studio inquiries', tabId: 'crm' },
      { title: 'Notes', subtitle: 'Centralized client notes & briefs', tabId: 'crm' },
      { title: 'Funnel Stages', subtitle: 'Track deal progress to commission', tabId: 'crm' },
      { title: 'Follow-ups', subtitle: 'Schedule calls & site visits', tabId: 'crm' },
    ],
  },
  {
    category: 'Design & Pins',
    icon: Palette,
    items: [
      { title: 'Site Recce', subtitle: 'Measurements & structural recce', tabId: 'design' },
      { title: 'Moodboards', subtitle: 'Curate design concepts & themes', tabId: 'design' },
      { title: 'Drawing & Pins', subtitle: 'Coordinate pins on 3D renders', tabId: 'design' },
      { title: 'Finishes List', subtitle: 'Material & finish specifications', tabId: 'design' },
    ],
  },
  {
    category: 'BOQ & Scope',
    icon: FileSpreadsheet,
    items: [
      { title: 'Cost Quotes', subtitle: 'Itemized rate breakdowns', tabId: 'boq' },
      {
        title: 'Work Orders',
        subtitle: 'Subcontractor agreements',
        isLocked: true,
        tier: 'Pro',
        highlights: ['Vendor PO generation', 'Digital approval trails', 'Tax calculations'],
      },
      { title: 'Invoices', subtitle: 'GST-compliant billing docs', tabId: 'boq' },
      {
        title: 'Vendor RFQ',
        subtitle: 'Multi-vendor bidding comparison',
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Rate comparison matrix', 'Direct supplier portal', 'Automated analysis'],
      },
    ],
  },
  {
    category: 'Site Tracking',
    icon: Camera,
    items: [
      { title: 'Site Attendance', subtitle: 'GPS-verified daily headcount', tabId: 'site_tracking' },
      { title: 'Photo Stream', subtitle: 'Timestamped room progress photos', tabId: 'site_tracking' },
      {
        title: 'Labor Ledgers',
        subtitle: 'Trade-wise wage reconciliation',
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Weekly wage reconciliation', 'Contractor billing', 'Overtime ledgers'],
      },
    ],
  },
  {
    category: 'Finances',
    icon: IndianRupee,
    items: [
      { title: 'Ledger Entries', subtitle: 'Real-time financial journal', tabId: 'finance' },
      { title: 'Payment Requests', subtitle: 'Approve vendor disbursement', tabId: 'finance' },
      { title: 'Escrow Milestones', subtitle: 'Gated milestone releases', tabId: 'finance' },
    ],
  },
  {
    category: 'Warehouse',
    icon: Boxes,
    items: [
      { title: 'Material Requisition', subtitle: 'Site engineer purchase orders', tabId: 'inventory' },
      { title: 'Goods Receipt (GRN)', subtitle: 'Verify delivered site goods', tabId: 'inventory' },
      { title: 'Stock Tracking', subtitle: 'Live stock & minimum alerts', tabId: 'inventory' },
      {
        title: 'Stock Transfer',
        subtitle: 'Multi-site dispatch pass',
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Multi-site dispatch transit', 'Gate-pass generation', 'Vehicle tracking'],
      },
    ],
  },
  {
    category: 'Handovers',
    icon: FileCheck2,
    items: [
      { title: '10-Point Checklist', subtitle: 'Turnkey quality verification', tabId: 'handover' },
      {
        title: 'Legal Contracts',
        subtitle: 'Client turnkey agreements',
        isLocked: true,
        tier: 'Pro',
        highlights: ['Standard turnkey contract templates', 'Version tracking', 'Client NDA protection'],
      },
      { title: 'Client Sign-off', subtitle: 'Digital signature on delivery', tabId: 'handover' },
    ],
  },
  {
    category: 'Project Schedule',
    icon: CalendarRange,
    items: [
      { title: 'Timeline Gantt', subtitle: 'Phased schedule management', tabId: 'project_mgmt' },
      { title: 'Site Tasks', subtitle: 'Trade tasks & dependencies', tabId: 'project_mgmt' },
      {
        title: 'CPM Analysis',
        subtitle: 'Critical path calculation',
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Float & slack computation', 'Automated bottleneck alerts', 'Lead-time prediction'],
      },
    ],
  },
  {
    category: 'AI Assistant',
    icon: Sparkles,
    items: [
      { title: 'WhatsApp Brief', subtitle: 'Daily client progress synthesis', tabId: 'ai' },
      {
        title: '3D Neural Render',
        subtitle: 'Instant photorealistic renders',
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['CAD/SketchUp to 4K render', 'PBR lighting synthesis', 'Material style swap'],
      },
      {
        title: 'Drawing to BOM',
        subtitle: 'Auto-extract BOM from plan',
        isLocked: true,
        tier: 'Enterprise',
        highlights: ['Computer-vision room takeoff', 'Auto hardware counting', 'Dynamic BOQ sync'],
      },
      { title: 'Knowledge Base', subtitle: 'Studio standards & specs', tabId: 'ai' },
    ],
  },
  {
    category: 'HRMS & Labor',
    icon: HardHat,
    items: [
      { title: 'Daily Muster Roll', subtitle: 'Skilled vs unskilled count', tabId: 'hrms' },
      {
        title: 'Leave Approvals',
        subtitle: 'Site engineer roster',
        isLocked: true,
        tier: 'Pro',
        highlights: ['Leave calendar', 'Stand-in allocation', 'Attendance records'],
      },
      {
        title: 'Payroll Ledgers',
        subtitle: 'Direct salary disbursement',
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
      {/* 1. Backdrop Overlay: Dims and blurs content below so ZERO bleed-through can ever occur */}
      <div
        className="fixed inset-0 top-20 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* 2. 100% Solid Opaque Container (Fixed at top-20, above backdrop) */}
      <div
        className="fixed top-20 left-0 right-0 w-full z-50 bg-white dark:bg-[#0E1117] border-b border-slate-200 dark:border-[#232938] shadow-2xl text-slate-800 dark:text-slate-100 max-h-[calc(100vh-5rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          {/* Header Summary */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-[#1E2433]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Studio Capabilities &amp; Workflows
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                10 core turnkey modules built for elite architecture firms
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live Sync Active
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E2433] text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                title="Close Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 10 Columns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-6">
            {MEGA_MENU_COLUMNS.map((col, idx) => {
              const Icon = col.icon;
              return (
                <div key={idx} className="space-y-2.5">
                  {/* Category Title */}
                  <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100 dark:border-[#1C2230]">
                    <Icon className="w-4 h-4 text-[#B58E50] dark:text-[#C9A46C] shrink-0" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider truncate">
                      {col.category}
                    </span>
                  </div>

                  {/* Category Items */}
                  <div className="space-y-1">
                    {col.items.map((item, itemIdx) => {
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
                          className="w-full text-left p-1.5 -mx-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-[#161B26] transition-colors flex flex-col group"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-[#B58E50] dark:group-hover:text-[#C9A46C] truncate transition-colors">
                              {item.title}
                            </span>
                            {isLocked ? (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#1E2330] text-slate-600 dark:text-slate-400 shrink-0">
                                <Lock className="w-2.5 h-2.5" />
                                <span>{item.tier}</span>
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                Open →
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {item.subtitle}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Bar inside Mega Menu */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#1E2433] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
            <span>
              Connected to Supabase Cloud live database for real-time sync with mobile app.
            </span>
            <button
              onClick={() => {
                onSelectActiveFeature('overview');
                onClose();
              }}
              className="font-bold text-[#B58E50] dark:text-[#C9A46C] hover:underline flex items-center gap-1"
            >
              <span>Launch Studio Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
