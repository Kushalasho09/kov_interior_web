'use client';

import React, { useState } from 'react';
import { SiteManpower } from '@/types';
import { supabase } from '@/lib/supabase';
import {
  HardHat,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';

interface HrmsModuleProps {
  manpower: SiteManpower | null;
  projectId?: string;
  onManpowerUpdated: () => void;
}

export default function HrmsModule({
  manpower,
  projectId,
  onManpowerUpdated,
}: HrmsModuleProps) {
  const [carpenters, setCarpenters] = useState(manpower?.carpenters || 4);
  const [electricians, setElectricians] = useState(manpower?.electricians || 2);
  const [painters, setPainters] = useState(manpower?.painters || 0);
  const [helpers, setHelpers] = useState(manpower?.helpers || 3);
  const [notes, setNotes] = useState(manpower?.supervisor_notes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveManpower = async () => {
    setIsSaving(true);
    setSavedSuccess(false);

    const { error } = await supabase
      .from('site_manpower')
      .upsert(
        {
          id: manpower?.id,
          project_id: projectId || 'a1b2c3d4-e5f6-7890-abcd-111122223333',
          log_date: new Date().toISOString().split('T')[0],
          carpenters,
          electricians,
          painters,
          helpers,
          supervisor_notes: notes,
        },
        { onConflict: 'id' }
      );

    setIsSaving(false);
    if (!error) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      onManpowerUpdated();
    }
  };

  const totalWorkers = carpenters + electricians + painters + helpers;
  const dailyLaborBurn =
    carpenters * 1200 + electricians * 1000 + painters * 900 + helpers * 600;

  return (
    <div className="space-y-6">
      {/* 1. HEADER BAR - STRICT PIXEL-PERFECT ALIGNMENT */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-[#151821] border border-[#262C3A] shadow-md">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-luxury text-xl font-bold text-slate-100 whitespace-nowrap">
              HRMS & Daily Site Labor Attendance
            </h2>
            <span className="h-7 px-3 rounded-full text-xs font-bold bg-[#C9A46C]/15 text-[#DFCAA5] border border-[#C9A46C]/30 inline-flex items-center justify-center whitespace-nowrap shrink-0">
              Workforce Log
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time artisan attendance logged by site engineer at Prahlad Nagar, Ahmedabad.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Estimated Daily Burn</span>
            <p className="text-sm font-bold text-slate-100 font-mono">₹{dailyLaborBurn.toLocaleString('en-IN')}/day</p>
          </div>

          <button
            onClick={handleSaveManpower}
            disabled={isSaving}
            className="h-9 px-4 rounded-xl bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-md whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{isSaving ? 'Saving...' : savedSuccess ? 'Logged!' : 'Save Muster Roll'}</span>
          </button>
        </div>
      </div>

      {/* 2. ARTISAN ROSTER CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Carpenters */}
        <div className="p-5 rounded-2xl bg-[#151821] border border-[#262C3A] flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold text-[#C9A46C] uppercase tracking-wider">
              Joinery & Framing
            </span>
            <h3 className="text-base font-bold text-slate-100 mt-1">Carpenters</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">₹1,200/day standard rate</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#232938]">
            <span className="text-xs text-slate-400 font-semibold">On Site:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCarpenters((c) => Math.max(0, c - 1))}
                className="w-7 h-7 rounded-lg bg-[#202636] hover:bg-[#283247] text-slate-300 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="font-mono text-base font-bold text-slate-100 w-8 text-center">
                {carpenters}
              </span>
              <button
                onClick={() => setCarpenters((c) => c + 1)}
                className="w-7 h-7 rounded-lg bg-[#202636] hover:bg-[#283247] text-[#C9A46C] flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Electricians */}
        <div className="p-5 rounded-2xl bg-[#151821] border border-[#262C3A] flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              Conduit & Fixtures
            </span>
            <h3 className="text-base font-bold text-slate-100 mt-1">Electricians</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">₹1,000/day standard rate</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#232938]">
            <span className="text-xs text-slate-400 font-semibold">On Site:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setElectricians((e) => Math.max(0, e - 1))}
                className="w-7 h-7 rounded-lg bg-[#202636] hover:bg-[#283247] text-slate-300 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="font-mono text-base font-bold text-slate-100 w-8 text-center">
                {electricians}
              </span>
              <button
                onClick={() => setElectricians((e) => e + 1)}
                className="w-7 h-7 rounded-lg bg-[#202636] hover:bg-[#283247] text-amber-400 flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Painters */}
        <div className="p-5 rounded-2xl bg-[#151821] border border-[#262C3A] flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
              Putty & Stucco
            </span>
            <h3 className="text-base font-bold text-slate-100 mt-1">Painters</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">₹900/day standard rate</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#232938]">
            <span className="text-xs text-slate-400 font-semibold">On Site:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPainters((p) => Math.max(0, p - 1))}
                className="w-7 h-7 rounded-lg bg-[#202636] hover:bg-[#283247] text-slate-300 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="font-mono text-base font-bold text-slate-100 w-8 text-center">
                {painters}
              </span>
              <button
                onClick={() => setPainters((p) => p + 1)}
                className="w-7 h-7 rounded-lg bg-[#202636] hover:bg-[#283247] text-purple-400 flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Helpers */}
        <div className="p-5 rounded-2xl bg-[#151821] border border-[#262C3A] flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Material Shifting
            </span>
            <h3 className="text-base font-bold text-slate-100 mt-1">Helpers</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">₹600/day standard rate</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#232938]">
            <span className="text-xs text-slate-400 font-semibold">On Site:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHelpers((h) => Math.max(0, h - 1))}
                className="w-7 h-7 rounded-lg bg-[#202636] hover:bg-[#283247] text-slate-300 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="font-mono text-base font-bold text-slate-100 w-8 text-center">
                {helpers}
              </span>
              <button
                onClick={() => setHelpers((h) => h + 1)}
                className="w-7 h-7 rounded-lg bg-[#202636] hover:bg-[#283247] text-slate-300 flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUPERVISOR NOTES */}
      <div className="p-6 rounded-2xl bg-[#151821] border border-[#262C3A] space-y-3">
        <h3 className="font-bold text-sm text-slate-200">Site Engineer Daily Log & Remarks</h3>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Master bedroom wardrobe carcass joinery on schedule. Need 2 additional polishers by Thursday."
          className="w-full bg-[#12151E] border border-[#262C3D] rounded-xl p-3.5 text-xs text-slate-100 focus:outline-none focus:border-[#C9A46C] leading-relaxed"
        />
        <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
          <span>Logged by Site Supervisor: Ketan Patel</span>
          <span className="font-bold text-[#C9A46C]">Total Workforce: {totalWorkers} Members</span>
        </div>
      </div>
    </div>
  );
}
