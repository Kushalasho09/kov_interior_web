'use client';

import React, { useState } from 'react';
import { SiteUpdate } from '@/types';
import { supabase } from '@/lib/supabase';
import {
  Camera,
  Plus,
  Clock,
  UserCheck,
  Smartphone,
  MapPin,
} from 'lucide-react';

interface SiteTrackingModuleProps {
  updates: SiteUpdate[];
  projectId?: string;
  onUpdatesUpdated: () => void;
}

const SAMPLE_INTERIOR_PHOTOS = [
  '/assets/projects/living_room.webp',
  '/assets/projects/bedroom.webp',
  '/assets/projects/kitchen.webp',
  '/assets/projects/hero_villa.webp',
];

export default function SiteTrackingModule({
  updates,
  projectId,
  onUpdatesUpdated,
}: SiteTrackingModuleProps) {
  const [showModal, setShowModal] = useState(false);
  const [supervisorName, setSupervisorName] = useState('Ketan Patel');
  const [stage, setStage] = useState('Carpentry & Woodwork');
  const [caption, setCaption] = useState('');
  const [photoUrl, setPhotoUrl] = useState(SAMPLE_INTERIOR_PHOTOS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption) return;

    setIsSubmitting(true);
    const { error } = await supabase.from('site_updates').insert({
      project_id: projectId || 'a1b2c3d4-e5f6-7890-abcd-111122223333',
      supervisor_name: supervisorName,
      stage,
      caption,
      photo_url: photoUrl,
    });

    setIsSubmitting(false);
    if (!error) {
      setShowModal(false);
      setCaption('');
      onUpdatesUpdated();
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER BAR - STRICT PIXEL-PERFECT ALIGNMENT */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] shadow-sm dark:shadow-md transition-colors">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-luxury text-xl font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
              Site Tracking & Architectural Feed
            </h2>
            <span className="h-7 px-3 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 inline-flex items-center justify-center whitespace-nowrap shrink-0">
              Live Connected
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time feed logged from the site engineer mobile app at Shivalik Residences, Prahlad Nagar, Ahmedabad.
          </p>
        </div>

        {/* Action Controls - Strictly h-9 with unified baseline */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-9 px-3.5 rounded-xl bg-slate-100 dark:bg-[#191D27] border border-slate-200 dark:border-[#262C3A] text-xs text-slate-700 dark:text-slate-300 inline-flex items-center gap-2 whitespace-nowrap shadow-sm dark:shadow-none">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-semibold">Mobile App Live Stream</span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="h-9 px-4 rounded-xl bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-md whitespace-nowrap"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Post Daily Site Update</span>
          </button>
        </div>
      </div>

      {/* 2. SITE UPDATES TIMELINE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {updates.map((update) => {
          const dateStr = new Date(update.created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={update.id}
              className="rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] overflow-hidden hover:border-[#B58E50] dark:hover:border-[#C9A46C]/60 transition-all flex flex-col shadow-sm dark:shadow-lg group"
            >
              {/* Photo */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={update.photo_url || SAMPLE_INTERIOR_PHOTOS[0]}
                  alt="Site execution"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#F1E5D3] border border-white/10">
                  {update.stage}
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-white/90 dark:bg-[#101217]/90 text-[10px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 border border-slate-200 dark:border-white/10 shadow-sm">
                  <MapPin className="w-3 h-3 text-[#C9A46C]" />
                  Prahlad Nagar
                </div>
              </div>

              {/* Details Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                  {update.caption}
                </p>

                <div className="pt-3 border-t border-slate-200 dark:border-[#202636] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                    <UserCheck className="w-3.5 h-3.5 text-[#C9A46C]" />
                    {update.supervisor_name}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 font-mono text-[10px]">
                    <Clock className="w-3 h-3" />
                    {dateStr}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. POST UPDATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#2B3346] rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#242A38]">
              <h3 className="font-luxury text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#C9A46C]" />
                Post Daily Site Progress Photo
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostUpdate} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-700 dark:text-slate-300 font-bold">Site Engineer Name</label>
                <input
                  type="text"
                  required
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  className="w-full mt-1 bg-slate-50 dark:bg-[#191D27] border border-slate-200 dark:border-[#282F40] rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 dark:text-slate-300 font-bold">Execution Stage</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full mt-1 bg-slate-50 dark:bg-[#191D27] border border-slate-200 dark:border-[#282F40] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                >
                  <option value="False Ceiling & Framing">False Ceiling & Framing</option>
                  <option value="Carpentry & Woodwork">Carpentry & Woodwork</option>
                  <option value="Italian Marble Laying">Italian Marble Laying</option>
                  <option value="Electrical & Automation">Electrical & Automation</option>
                  <option value="Painting & Polishing">Painting & Polishing</option>
                  <option value="Final Snaglist">Final Snaglist</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-700 dark:text-slate-300 font-bold">Progress Summary *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Master Bedroom wardrobe carcass joinery completed. Ready for smoked oak veneer application."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full mt-1 bg-slate-50 dark:bg-[#191D27] border border-slate-200 dark:border-[#282F40] rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 dark:text-slate-300 font-bold">Select Perspective Photo</label>
                <div className="grid grid-cols-4 gap-2 mt-1.5">
                  {SAMPLE_INTERIOR_PHOTOS.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => setPhotoUrl(url)}
                      className={`relative aspect-video rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        photoUrl === url ? 'border-[#C9A46C] scale-105' : 'border-transparent'
                      }`}
                    >
                      <img src={url} alt="sample" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="h-9 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:bg-[#202534] dark:text-slate-300 dark:hover:bg-[#282F42] inline-flex items-center border border-slate-200 dark:border-transparent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-9 px-5 rounded-xl bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 text-xs font-bold inline-flex items-center shadow-md"
                >
                  {isSubmitting ? 'Posting...' : 'Publish to Feed'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
