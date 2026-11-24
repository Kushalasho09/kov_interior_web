'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'lifetime'>('annual');

  const plans = [
    {
      name: 'Growth Plan',
      tagline: 'Ideal for boutique interior studios & independent architects',
      users: 'Up to 5 Users',
      annualPrice: '₹60,000',
      lifetimePrice: '₹1,50,000',
      period: 'per annum + taxes',
      isPopular: false,
      features: [
        'CRM & Lead Inquiries',
        '3D Drawing Pin Annotations',
        'Tasks & Project Subtasks',
        'Quotes & BOQ Estimator',
        'PO & Work Orders',
        'Centralized Cloud Files',
        'Project Schedule & Activities',
        'Finances & Milestone Tracking',
        'Checklists & 10-Point Handover',
        'Invoices & Payment Gateways',
        'Embedded AI Assistant',
        'Basic Warehouse & Materials',
        'Site Attendance with GPS Geolocation',
      ],
    },
    {
      name: 'Pro Plan',
      tagline: 'For high-velocity turnkey design & build firms',
      users: 'Up to 15 Users',
      annualPrice: '₹2,00,000',
      lifetimePrice: '₹4,50,000',
      period: 'per annum + taxes',
      isPopular: true,
      features: [
        'Everything in Growth, plus:',
        'Advanced Process Automation',
        'Meta Ads & Instagram Lead Sync',
        'Automated Email Integration',
        'AI WhatsApp Client Daily Brief',
        'Priority SLA Support Desk',
        'Multi-Site Project Dashboards',
        'Custom Team Roles & Scopes',
        'Digital Contract Storage & E-sign',
        'Vendor Quote Comparison Portal',
      ],
    },
    {
      name: 'Enterprise Plan',
      tagline: 'For established turnkey builders with multi-city operations & SOPs',
      users: 'Up to 25 Users / Custom',
      annualPrice: '₹4,00,000',
      lifetimePrice: '₹8,50,000',
      period: 'per annum + taxes',
      isPopular: false,
      features: [
        'Everything in Pro, plus:',
        'In-Person Studio & Site Deployment',
        'Custom Database Fields & Schemas',
        'Multi-Level Approval Hierarchy',
        'ERP & Accounting API Integration',
        'Custom Module Development',
        'Studio SOP Implementation',
        'Complete White-Labelling & Custom Domain',
        'AI Predictive Delay & Cost Analysis',
        'Dedicated Solutions Architect (Ahmedabad HQ)',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-[#0D0F13] border-t border-slate-200 dark:border-[#1F2536] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-[#B58E50] dark:text-[#C9A46C] uppercase tracking-widest px-3 py-1 rounded-full bg-amber-50 dark:bg-[#C9A46C]/10 border border-amber-200 dark:border-[#C9A46C]/30">
            Investment Plans
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-luxury mt-3">
            Select Your Plan &amp; Scale Your Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Transparent pricing based on your team size. Add implementation support or white-labeling as you grow.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#151822] border border-slate-200 dark:border-[#262D3D]">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`py-1.5 px-4 rounded-lg text-xs font-bold transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-[#C9A46C] text-slate-900 dark:text-[#0D0F13] shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Annual Billing
            </button>
            <button
              onClick={() => setBillingCycle('lifetime')}
              className={`py-1.5 px-4 rounded-lg text-xs font-bold transition-all ${
                billingCycle === 'lifetime'
                  ? 'bg-white dark:bg-[#C9A46C] text-slate-900 dark:text-[#0D0F13] shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Lifetime Access
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                p.isPopular
                  ? 'bg-white dark:bg-[#151924] border-2 border-[#B58E50] dark:border-[#C9A46C] shadow-lg scale-[1.02]'
                  : 'bg-slate-50 dark:bg-[#12151D] border border-slate-200 dark:border-[#222838]'
              }`}
            >
              {p.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0F172A] dark:bg-gradient-to-r dark:from-[#C9A46C] dark:to-[#B59058] text-white dark:text-[#0D0F13] text-[10px] font-bold uppercase tracking-widest shadow">
                  Most Recommended
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-luxury">{p.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-[#1F2536] text-slate-700 dark:text-[#DFCAA5]">
                    {p.users}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">{p.tagline}</p>

                <div className="mt-5 pb-5 border-b border-slate-200 dark:border-[#212738]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                      {billingCycle === 'annual' ? p.annualPrice : p.lifetimePrice}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{p.period}</p>
                </div>

                <div className="mt-5 space-y-2.5">
                  <p className="text-[11px] font-bold text-[#B58E50] dark:text-[#C9A46C] uppercase tracking-wider">
                    Included Workflows:
                  </p>
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={() => onSelectPlan(p.name)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    p.isPopular
                      ? 'bg-[#0F172A] hover:bg-slate-800 text-white dark:bg-gradient-to-r dark:from-[#C9A46C] dark:to-[#B59058] dark:hover:from-[#D4B27C] dark:hover:to-[#C9A46C] dark:text-[#0D0F13] shadow-md'
                      : 'bg-white hover:bg-slate-100 dark:bg-[#1A1F2C] dark:hover:bg-[#23293B] text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-[#272D3E]'
                  }`}
                >
                  <span>{p.name === 'Enterprise Plan' ? 'Contact Sales' : 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>All plans include Supabase real-time cloud database and SSL encryption.</span>
        </div>
      </div>
    </section>
  );
}
