'use client';

import React, { useState } from 'react';
import { ProjectPhase } from '@/types';
import { supabase } from '@/lib/supabase';
import {
  CalendarRange,
  Calendar,
  Plus,
  Minus,
} from 'lucide-react';

interface ProjectMgmtModuleProps {
  phases: ProjectPhase[];
  onPhasesUpdated: () => void;
}

export default function ProjectMgmtModule({
  phases,
  onPhasesUpdated,
}: ProjectMgmtModuleProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleUpdateProgress = async (phase: ProjectPhase, delta: number) => {
    const newProgress = Math.min(100, Math.max(0, phase.progress_percent + delta));
    const newStatus =
      newProgress === 100 ? 'completed' : newProgress > 0 ? 'in_progress' : 'upcoming';

    setUpdatingId(phase.id);
    const { error } = await supabase
      .from('project_phases')
      .update({
        progress_percent: newProgress,
        status: newStatus,
      })
      .eq('id', phase.id);

    setUpdatingId(null);
    if (!error) {
      onPhasesUpdated();
    }
  };

  const overallProgress = Math.round(
    phases.reduce((acc, p) => acc + p.progress_percent, 0) / (phases.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* 1. HEADER BAR - STRICT PIXEL-PERFECT ALIGNMENT */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-[#151821] border border-[#262C3A] shadow-md">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-luxury text-xl font-bold text-slate-100 whitespace-nowrap">
              Project Schedule & Critical Path
            </h2>
            <span className="h-7 px-3 rounded-full text-xs font-bold bg-[#C9A46C]/15 text-[#DFCAA5] border border-[#C9A46C]/30 inline-flex items-center justify-center whitespace-nowrap shrink-0">
              CPM & Milestones
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Execution timeline and milestone tracking for The Sky Villa (4BHK).
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Overall Execution</span>
            <p className="text-sm font-bold text-[#C9A46C]">{overallProgress}% Complete</p>
          </div>
          <div className="h-9 px-3.5 rounded-xl bg-emerald-950/70 border border-emerald-800/50 text-emerald-400 text-xs font-bold inline-flex items-center whitespace-nowrap">
            42 Days to Handover
          </div>
        </div>
      </div>

      {/* 2. TIMELINE LIST */}
      <div className="space-y-4">
        {phases.map((phase, idx) => {
          const isDone = phase.status === 'completed';
          const isInProgress = phase.status === 'in_progress';

          return (
            <div
              key={phase.id}
              className={`p-5 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-[#151A24] border-emerald-900/40'
                  : isInProgress
                  ? 'bg-[#181D2A] border-[#C9A46C]/50 shadow-lg'
                  : 'bg-[#151821] border-[#262C3A]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950'
                        : isInProgress
                        ? 'bg-[#C9A46C] text-slate-950 ring-4 ring-[#C9A46C]/20'
                        : 'bg-[#202636] text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{phase.phase_name}</h3>
                    <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>
                        {phase.start_date || 'Day 1'} &rarr; {phase.end_date || 'Day 45'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-md font-bold whitespace-nowrap ${
                      isDone
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                        : isInProgress
                        ? 'bg-[#C9A46C]/20 text-[#DFCAA5] border border-[#C9A46C]/40'
                        : 'bg-[#202636] text-slate-400'
                    }`}
                  >
                    {phase.status.replace('_', ' ').toUpperCase()}
                  </span>

                  {/* Progress Adjusters */}
                  <div className="flex items-center gap-1.5 bg-[#12151E] p-1 rounded-xl border border-[#242C3D]">
                    <button
                      onClick={() => handleUpdateProgress(phase, -10)}
                      disabled={updatingId === phase.id || phase.progress_percent <= 0}
                      className="p-1 rounded-lg hover:bg-[#202738] text-slate-300 disabled:opacity-30 inline-flex items-center justify-center"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs font-bold text-slate-200 w-10 text-center">
                      {phase.progress_percent}%
                    </span>
                    <button
                      onClick={() => handleUpdateProgress(phase, 10)}
                      disabled={updatingId === phase.id || phase.progress_percent >= 100}
                      className="p-1 rounded-lg hover:bg-[#202738] text-[#C9A46C] disabled:opacity-30 inline-flex items-center justify-center"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#1B202E] h-2 rounded-full mt-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isDone
                      ? 'bg-emerald-500'
                      : 'bg-gradient-to-r from-[#C9A46C] to-amber-400'
                  }`}
                  style={{ width: `${phase.progress_percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
