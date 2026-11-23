'use client';

import React, { useRef, useState } from 'react';
import { HandoverRecord } from '@/types';
import { supabase } from '@/lib/supabase';
import {
  FileCheck2,
  CheckCircle2,
  Circle,
  PenTool,
  RotateCcw,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface HandoverModuleProps {
  records: HandoverRecord[];
  onRecordsUpdated: () => void;
}

const DEFAULT_RECORDS: HandoverRecord[] = [
  {
    id: 'hand-1',
    project_id: 'a1b2c3d4-e5f6-7890-abcd-111122223333',
    checklist_item: 'Deep Chemical Cleaning of Italian Marble & Bathrooms',
    is_completed: false,
    verified_by: 'Quality Lead',
    client_sign_url: null,
    notes: 'Pending post final paint coat',
    completed_at: null,
  },
  {
    id: 'hand-2',
    project_id: 'a1b2c3d4-e5f6-7890-abcd-111122223333',
    checklist_item: 'All Electrical Switchboards & Dimmer Modules Tested',
    is_completed: false,
    verified_by: 'Electrical Engineer',
    client_sign_url: null,
    notes: 'Testing scheduled on Thursday',
    completed_at: null,
  },
  {
    id: 'hand-3',
    project_id: 'a1b2c3d4-e5f6-7890-abcd-111122223333',
    checklist_item: 'Modular Kitchen Soft-Close & Telescopic Channels Inspected',
    is_completed: true,
    verified_by: 'Ketan Patel',
    client_sign_url: null,
    notes: 'Passed with zero resistance',
    completed_at: new Date().toISOString(),
  },
  {
    id: 'hand-4',
    project_id: 'a1b2c3d4-e5f6-7890-abcd-111122223333',
    checklist_item: 'Final Touchup & Digital Keys Handover to Rajeshbhai',
    is_completed: false,
    verified_by: 'Project Director',
    client_sign_url: null,
    notes: 'Final event scheduled on completion',
    completed_at: null,
  },
];

export default function HandoverModule({
  records,
  onRecordsUpdated,
}: HandoverModuleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const displayRecords = records && records.length > 0 ? records : DEFAULT_RECORDS;

  const handleToggleCheck = async (record: HandoverRecord) => {
    const nextState = !record.is_completed;
    const { error } = await supabase
      .from('handover_records')
      .update({
        is_completed: nextState,
        completed_at: nextState ? new Date().toISOString() : null,
      })
      .eq('id', record.id);

    if (!error) {
      onRecordsUpdated();
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#C9A46C';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setIsSigned(false);
  };

  const saveSignature = () => {
    if (!hasSignature) return;
    setIsSigned(true);
  };

  const completedCount = displayRecords.filter((r) => r.is_completed).length;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-[#151821] border border-[#262C3A] shadow-md">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-luxury text-xl font-bold text-slate-100 whitespace-nowrap">
              Site Handover & Digital Certificate
            </h2>
            <span className="h-7 px-3 rounded-full text-xs font-bold bg-[#C9A46C]/15 text-[#DFCAA5] border border-[#C9A46C]/30 inline-flex items-center justify-center whitespace-nowrap shrink-0">
              Quality Assurance
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Official handover snaglist and digital client sign-off protocol for The Sky Villa.
          </p>
        </div>

        <div className="h-9 px-3.5 rounded-xl bg-[#191D27] border border-[#262C3A] text-xs text-slate-300 inline-flex items-center gap-2 whitespace-nowrap">
          <Award className="w-4 h-4 text-[#C9A46C] shrink-0" />
          <span className="font-semibold">Kov Interiors Snag-Free Guarantee</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Checklist Panel */}
        <div className="p-6 rounded-2xl bg-[#151821] border border-[#262C3A] space-y-4">
          <div className="flex items-center justify-between pb-3.5 border-b border-[#232938]">
            <h3 className="font-bold text-sm text-slate-100">Handover Quality Snaglist</h3>
            <span className="text-xs text-[#C9A46C] font-bold">
              {completedCount} of {displayRecords.length} Verified
            </span>
          </div>

          <div className="space-y-3">
            {displayRecords.map((record) => (
              <div
                key={record.id}
                onClick={() => handleToggleCheck(record)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  record.is_completed
                    ? 'bg-[#151D26] border-emerald-900/50 text-slate-200'
                    : 'bg-[#181D28] border-[#252C3C] text-slate-400 hover:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {record.is_completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      record.is_completed ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {record.checklist_item}
                  </span>
                </div>

                {record.verified_by && (
                  <span className="text-[10px] text-slate-500 font-mono font-bold">
                    {record.verified_by}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Digital Signature Pad */}
        <div className="p-6 rounded-2xl bg-[#151821] border border-[#262C3A] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-[#232938]">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-[#C9A46C]" />
                Client Acceptance E-Signature
              </h3>
              {isSigned && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/50">
                  <ShieldCheck className="w-3.5 h-3.5" /> Digitally Signed
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Draw signature below with your finger or mouse to approve milestone completion:
            </p>

            <div className="mt-3 relative rounded-xl border border-[#2B3347] bg-[#0E1015] overflow-hidden">
              <canvas
                ref={canvasRef}
                width={480}
                height={160}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-40 cursor-crosshair"
              />
              {!hasSignature && !isSigned && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-slate-600">
                  Sign inside this box with mouse or finger
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3.5 border-t border-[#232938]">
            <button
              onClick={clearSignature}
              className="h-9 px-4 rounded-xl bg-[#1E2330] hover:bg-[#283247] text-xs font-semibold text-slate-300 hover:text-slate-100 inline-flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Pad</span>
            </button>

            <button
              onClick={saveSignature}
              disabled={!hasSignature || isSigned}
              className="h-9 px-5 rounded-xl bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 text-xs font-bold disabled:opacity-40 inline-flex items-center gap-1.5 transition-colors shadow-md"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{isSigned ? 'Handover Confirmed' : 'Confirm Signature'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
