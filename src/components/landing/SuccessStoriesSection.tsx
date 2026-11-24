'use client';

import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

interface SuccessStoriesSectionProps {
  onOpenContact: () => void;
}

export default function SuccessStoriesSection({ onOpenContact }: SuccessStoriesSectionProps) {
  const stories = [
    {
      title: 'The Sky Villa (4BHK Luxury)',
      client: 'Rajesh & Meera Mehta',
      location: 'Prahlad Nagar, Ahmedabad',
      scope: '₹1.50 Cr Turnkey Scope',
      image: '/assets/projects/hero_villa.webp',
      stats: '48% Executed • 0 Days Delay',
      quote:
        'Kov OS eliminated the constant back-and-forth between our architect and site contractor. The 3D coordinate pins ensured our Italian marble was laid precisely to spec.',
    },
    {
      title: 'Sindhu Bhavan Duplex Penthouse',
      client: 'Kiran & Sunita Patel',
      location: 'SBR Road, Ahmedabad',
      scope: '₹2.20 Cr Turnkey Scope',
      image: '/assets/projects/living_room.webp',
      stats: '100% Handed Over • 10-Point Sign-off',
      quote:
        'The live photo feed and WhatsApp AI brief gave us complete peace of mind while traveling. Escrow milestone releases were seamless.',
    },
    {
      title: 'Bodakdev Contemporary Bungalow',
      client: 'Anand Vora (Industrialist)',
      location: 'Bodakdev, Ahmedabad',
      scope: '₹3.40 Cr Turnkey Scope',
      image: '/assets/projects/bedroom.webp',
      stats: '99.4% On-time Handover',
      quote:
        'Managing 4 floors of turnkey interiors, bespoke joinery, and HVAC used to be chaotic. With Kov HRMS and BOQ estimator, our studio saved ₹24L in material waste.',
    },
  ];

  return (
    <section id="success-stories" className="py-20 bg-slate-50 dark:bg-[#0F1218] border-t border-slate-200 dark:border-[#1D2230] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold text-[#B58E50] dark:text-[#C9A46C] uppercase tracking-widest px-3 py-1 rounded-full bg-amber-50 dark:bg-[#C9A46C]/10 border border-amber-200 dark:border-[#C9A46C]/30">
            Success in Action
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-luxury mt-3">
            Real Teams. Real Sites. Real Results.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Leading architects and discerning luxury homeowners rely on Kov OS for transparent execution.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-white dark:bg-[#141721] border border-slate-200 dark:border-[#232938] hover:border-slate-300 dark:hover:border-[#C9A46C]/60 overflow-hidden flex flex-col justify-between transition-all shadow-sm hover:shadow-md"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-[#1B202D]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#0D0F13]/85 border border-slate-200 dark:border-[#C9A46C]/60 text-[10px] font-bold text-slate-800 dark:text-[#F1E5D3] backdrop-blur-md">
                    {story.stats}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B58E50] dark:text-[#C9A46C]" />
                    <span>{story.location}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-luxury group-hover:text-[#B58E50] dark:group-hover:text-[#DFCAA5] transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#B58E50] dark:text-[#C9A46C] mt-0.5">
                    {story.scope}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-[#0F1117] border border-slate-200 dark:border-[#202534] text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </div>

                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-3 text-right">
                    — {story.client}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={onOpenContact}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1A1F2C] dark:hover:bg-[#C9A46C] text-slate-800 dark:text-slate-200 dark:hover:text-[#0D0F13] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
