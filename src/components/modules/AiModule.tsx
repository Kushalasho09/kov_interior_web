'use client';

import React, { useState } from 'react';
import { Project, SiteManpower, SiteUpdate } from '@/types';
import {
  Sparkles,
  Copy,
  Check,
  Bot,
  RefreshCw,
} from 'lucide-react';

interface AiModuleProps {
  project: Project | null;
  manpower: SiteManpower | null;
  latestUpdate: SiteUpdate | null;
}

export default function AiModule({
  project,
  manpower,
  latestUpdate,
}: AiModuleProps) {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [clientLanguage, setClientLanguage] = useState<'english' | 'gujlish'>('english');

  const defaultEnglishText = `Namaste ${
    project?.client_name || 'Rajeshbhai'
  },\n\nHere is your Kov Interiors daily progress update for The Sky Villa (Prahlad Nagar):\n\n🔨 Today's Site Activity:\n• False ceiling perimeter framing in the living area has been successfully completed and approved by the architect.\n• Master bedroom walk-in wardrobe joinery is actively underway with CenturyPly 710 Marine grade materials.\n\n👷 Site Workforce:\n• 4 Carpenters, 2 Electricians, and 3 Helpers deployed on site today.\n\n📅 Schedule Status: Work is proceeding right on schedule without any material delays.\n\nWarm regards,\nKov Interiors Team, Ahmedabad`;

  const defaultGujlishText = `Namaste ${
    project?.client_name || 'Rajeshbhai'
  },\n\nKov Interiors tarf thi The Sky Villa (Prahlad Nagar) no aaje no daily progress update:\n\n🔨 Aaje thaye-lu Site Kaam:\n• Living room ma false ceiling nu framing work architect approval sathe complete thai gayu chhe.\n• Master bedroom walk-in wardrobe ma CenturyPly Marine grade joinery chalu thai gai chhe.\n\n👷 Site Workforce:\n• 4 Carpenters, 2 Electricians ane 3 Helpers aaje site par active hata.\n\n📅 Timeline: Kaam ekdum schedule mujab chali rahyu chhe.\n\nAapno aabhar,\nKov Interiors Team, Ahmedabad`;

  const [aiText, setAiText] = useState(defaultEnglishText);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAiText(clientLanguage === 'english' ? defaultEnglishText : defaultGujlishText);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER BAR - STRICT PIXEL-PERFECT ALIGNMENT */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-[#151821] border border-[#262C3A] shadow-md">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-luxury text-xl font-bold text-slate-100 flex items-center gap-2 whitespace-nowrap">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
              <span>AI Site Update Studio</span>
            </h2>
            <span className="h-7 px-3 rounded-full text-xs font-bold bg-purple-950/70 text-purple-300 border border-purple-800/40 inline-flex items-center justify-center whitespace-nowrap shrink-0">
              Gemini & GPT Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Instantly synthesizes site workforce, photos, and engineer notes into an executive WhatsApp client report.
          </p>
        </div>

        {/* Action Controls - Strictly h-9 */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-9 flex items-center bg-[#191D27] border border-[#262C3A] rounded-xl p-0.5 text-xs">
            <button
              onClick={() => {
                setClientLanguage('english');
                setAiText(defaultEnglishText);
              }}
              className={`h-full px-3 rounded-lg font-bold transition-all whitespace-nowrap inline-flex items-center ${
                clientLanguage === 'english'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => {
                setClientLanguage('gujlish');
                setAiText(defaultGujlishText);
              }}
              className={`h-full px-3 rounded-lg font-bold transition-all whitespace-nowrap inline-flex items-center ${
                clientLanguage === 'gujlish'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Gujarati
            </button>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="h-9 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-md whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing...' : 'Re-Generate AI'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Area */}
        <div className="p-6 rounded-2xl bg-[#151821] border border-[#262C3A] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#232938]">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-400" />
                Generated Client Briefing
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Live Markdown</span>
            </div>

            <textarea
              rows={12}
              value={aiText}
              onChange={(e) => setAiText(e.target.value)}
              className="w-full bg-[#11141C] border border-[#262C3D] rounded-xl p-4 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center justify-between pt-3.5 border-t border-[#232938]">
            <span className="text-xs text-slate-400">
              Ready to send to {project?.client_name || 'Rajeshbhai Patel'}
            </span>

            <button
              onClick={handleCopy}
              className="h-9 px-4 rounded-xl bg-[#202738] hover:bg-[#283247] border border-[#303A52] text-xs font-bold text-slate-100 inline-flex items-center gap-2 transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#C9A46C]" />
                  <span>Copy for WhatsApp</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* WhatsApp Mobile Mockup Preview */}
        <div className="p-6 rounded-2xl bg-[#151821] border border-[#262C3A] flex flex-col items-center justify-center">
          <div className="w-full max-w-sm rounded-3xl border-4 border-[#2B3346] bg-[#0C1317] overflow-hidden shadow-2xl flex flex-col">
            {/* WhatsApp Header */}
            <div className="bg-[#1F2C34] p-3.5 flex items-center gap-3 border-b border-[#2A3942]">
              <div className="w-9 h-9 rounded-full bg-[#C9A46C] text-slate-950 font-bold flex items-center justify-center text-xs">
                KI
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">Kov Interiors Official</h4>
                <p className="text-[10px] text-emerald-400">Online • Verified Business</p>
              </div>
            </div>

            {/* Chat Bubble */}
            <div className="p-4 bg-[#0B141A] flex-1 space-y-3 min-h-[300px]">
              <div className="bg-[#005C4B] text-slate-100 p-3.5 rounded-2xl rounded-tl-sm text-xs leading-relaxed shadow space-y-2 whitespace-pre-wrap">
                {aiText}
                <div className="text-[9px] text-emerald-300 text-right flex items-center justify-end gap-1">
                  <span>Just now</span>
                  <span>✓✓</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#1F2C34] p-3 text-center text-[11px] text-slate-400 border-t border-[#2A3942]">
              Preview of what the client sees on WhatsApp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
