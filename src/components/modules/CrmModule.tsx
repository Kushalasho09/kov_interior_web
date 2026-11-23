'use client';

import React, { useState } from 'react';
import { Lead } from '@/types';
import { supabase } from '@/lib/supabase';
import {
  Users,
  Plus,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Filter,
  Building2,
  Phone,
  LayoutGrid,
  Columns3,
} from 'lucide-react';

interface CrmModuleProps {
  leads: Lead[];
  onLeadsUpdated: () => void;
}

const STAGES: { id: Lead['stage']; label: string; color: string; border: string; bg: string }[] = [
  { id: 'new', label: 'New Inquiries', color: 'text-blue-400', border: 'border-blue-800/40', bg: 'bg-blue-950/40' },
  { id: 'site_visit', label: 'Site Recce & Visit', color: 'text-amber-400', border: 'border-amber-800/40', bg: 'bg-amber-950/40' },
  { id: 'estimate_sent', label: 'BOQ Scope Sent', color: 'text-purple-400', border: 'border-purple-800/40', bg: 'bg-purple-950/40' },
  { id: 'negotiation', label: 'Negotiation', color: 'text-orange-400', border: 'border-orange-800/40', bg: 'bg-orange-950/40' },
  { id: 'won', label: 'Won & Commissioned', color: 'text-emerald-400', border: 'border-emerald-800/40', bg: 'bg-emerald-950/40' },
];

const PROPERTY_IMAGES: Record<string, string> = {
  '4BHK High-rise Penthouse': '/assets/projects/hero_villa.webp',
  'Bungalow Interior': '/assets/projects/living_room.webp',
  '3BHK Modern Minimalist': '/assets/projects/bedroom.webp',
  'Corporate Studio Office': '/assets/projects/kitchen.webp',
  '4BHK Apartment': '/assets/projects/living_room.webp',
};

export default function CrmModule({ leads, onLeadsUpdated }: CrmModuleProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'grid'>('kanban');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Lead Form State
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('4BHK Apartment');
  const [location, setLocation] = useState('Prahlad Nagar, Ahmedabad');
  const [estimatedBudget, setEstimatedBudget] = useState('4500000');
  const [notes, setNotes] = useState('');

  const handleMoveStage = async (leadId: string, currentStage: Lead['stage'], direction: 'next' | 'prev') => {
    const currentIndex = STAGES.findIndex((s) => s.id === currentStage);
    const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (targetIndex >= 0 && targetIndex < STAGES.length) {
      const targetStage = STAGES[targetIndex].id;
      const { error } = await supabase
        .from('leads')
        .update({ stage: targetStage })
        .eq('id', leadId);

      if (!error) {
        onLeadsUpdated();
      }
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone) return;

    setIsSubmitting(true);
    const { error } = await supabase.from('leads').insert({
      client_name: clientName,
      phone,
      email: email || null,
      property_type: propertyType,
      location,
      estimated_budget: Number(estimatedBudget),
      notes,
      stage: 'new',
    });

    setIsSubmitting(false);
    if (!error) {
      setShowAddModal(false);
      setClientName('');
      setPhone('');
      setEmail('');
      setNotes('');
      onLeadsUpdated();
    }
  };

  const filteredLeads = leads.filter((lead) => {
    if (filterLocation === 'all') return true;
    return lead.location.toLowerCase().includes(filterLocation.toLowerCase());
  });

  const totalPipelineValue = filteredLeads.reduce(
    (acc, lead) => acc + (Number(lead.estimated_budget) || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* 1. HEADER CONTROLS - PIXEL-PERFECT VERTICAL ALIGNMENT (No Staggering / No Wrapping Pills) */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-6 rounded-2xl bg-[#151821] border border-[#262C3A] shadow-md">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="font-luxury text-xl font-bold text-slate-100 whitespace-nowrap">
              CRM & Luxury Client Pipeline
            </h2>
            <span className="h-7 px-3 rounded-full text-xs font-bold bg-[#C9A46C]/15 text-[#DFCAA5] border border-[#C9A46C]/30 inline-flex items-center justify-center whitespace-nowrap shrink-0">
              {filteredLeads.length} Active Deals
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Total Potential Revenue:{' '}
            <span className="text-[#C9A46C] font-bold text-sm">
              ₹{(totalPipelineValue / 100000).toFixed(1)} Lakhs
            </span>{' '}
            across premium Ahmedabad sectors.
          </p>
        </div>

        {/* Actions Row: All elements strictly h-9 with unified baseline */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Toggle */}
          <div className="h-9 flex items-center bg-[#191D27] border border-[#262C3A] rounded-xl p-0.5 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`h-full px-3 rounded-lg inline-flex items-center gap-1.5 font-bold transition-all whitespace-nowrap ${
                viewMode === 'kanban'
                  ? 'bg-[#C9A46C] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span>Funnel View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`h-full px-3 rounded-lg inline-flex items-center gap-1.5 font-bold transition-all whitespace-nowrap ${
                viewMode === 'grid'
                  ? 'bg-[#C9A46C] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>

          {/* Location filter */}
          <div className="h-9 flex items-center gap-2 bg-[#191D27] border border-[#262C3A] rounded-xl px-3 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-[#C9A46C] shrink-0" />
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer whitespace-nowrap"
            >
              <option value="all">All Ahmedabad Sectors</option>
              <option value="Prahlad Nagar">Prahlad Nagar</option>
              <option value="Sindhu Bhavan">Sindhu Bhavan Road</option>
              <option value="Bopal">Bopal & Ambli</option>
              <option value="Vastrapur">Vastrapur</option>
              <option value="SG Highway">SG Highway</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="h-9 px-4 rounded-xl bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-md whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Client Inquiry</span>
          </button>
        </div>
      </div>

      {/* 2. KANBAN FUNNEL VIEW */}
      {viewMode === 'kanban' ? (
        <div className="flex gap-5 overflow-x-auto pb-6 pt-2">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage.id);
            return (
              <div
                key={stage.id}
                className="flex flex-col bg-[#141720] border border-[#232938] rounded-2xl p-4 min-w-[320px] max-w-[320px] shrink-0 shadow-lg"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#232938] mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${stage.bg} ${stage.color} border ${stage.border} whitespace-nowrap`}>
                      {stage.label}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-[#1D2230] px-2 py-0.5 rounded-full">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Lead Cards List */}
                <div className="space-y-4 flex-1">
                  {stageLeads.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-[#232938] rounded-xl text-slate-500 text-xs gap-1">
                      <span>No deals in this stage</span>
                      <span className="text-[10px] text-slate-600">Shift leads using &rarr;</span>
                    </div>
                  ) : (
                    stageLeads.map((lead) => {
                      const imageThumb =
                        PROPERTY_IMAGES[lead.property_type] || '/assets/projects/living_room.webp';
                      const budgetLakhs = (Number(lead.estimated_budget) / 100000).toFixed(1);

                      return (
                        <div
                          key={lead.id}
                          className="rounded-xl bg-[#181D28] border border-[#272F41] hover:border-[#C9A46C]/60 transition-all shadow-md overflow-hidden group flex flex-col"
                        >
                          {/* Property Preview Image */}
                          <div className="relative h-28 w-full overflow-hidden bg-black">
                            <img
                              src={imageThumb}
                              alt={lead.property_type}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#F1E5D3] border border-white/10">
                              {lead.property_type}
                            </div>
                            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#101217]/90 text-[10px] font-bold text-[#C9A46C] border border-[#C9A46C]/40">
                              ₹{budgetLakhs} Lakhs
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-3.5 space-y-2.5">
                            <div>
                              <h4 className="font-bold text-sm text-slate-100">{lead.client_name}</h4>
                              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-[#C9A46C] shrink-0" />
                                <span className="truncate">{lead.location}</span>
                              </p>
                            </div>

                            {lead.notes && (
                              <p className="text-[11px] text-slate-300 bg-[#12151E] p-2 rounded-lg border border-[#212736] line-clamp-2 leading-relaxed">
                                {lead.notes}
                              </p>
                            )}

                            {/* Contact Badges */}
                            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                              <span className="flex items-center gap-1 text-slate-300">
                                <Phone className="w-3 h-3 text-[#C9A46C]" />
                                {lead.phone}
                              </span>
                            </div>

                            {/* Move Stage Controls */}
                            <div className="pt-2 border-t border-[#232938] flex items-center justify-between">
                              <button
                                disabled={stage.id === 'new'}
                                onClick={() => handleMoveStage(lead.id, lead.stage, 'prev')}
                                className="h-7 px-2.5 rounded-lg bg-[#202636] hover:bg-[#283247] text-slate-300 text-xs font-semibold disabled:opacity-20 inline-flex items-center gap-1"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                                <span>Prev</span>
                              </button>

                              <button
                                disabled={stage.id === 'won'}
                                onClick={() => handleMoveStage(lead.id, lead.stage, 'next')}
                                className="h-7 px-3 rounded-lg bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 text-xs font-bold disabled:opacity-20 inline-flex items-center gap-1 shadow-sm"
                              >
                                <span>Advance</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 3. GRID CARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLeads.map((lead) => {
            const imageThumb =
              PROPERTY_IMAGES[lead.property_type] || '/assets/projects/living_room.webp';
            const budgetLakhs = (Number(lead.estimated_budget) / 100000).toFixed(1);

            return (
              <div
                key={lead.id}
                className="rounded-2xl bg-[#151821] border border-[#262C3A] overflow-hidden hover:border-[#C9A46C]/60 transition-all shadow-lg flex flex-col group"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={imageThumb}
                    alt={lead.property_type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#F1E5D3]">
                    {lead.property_type}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#101217]/90 text-[10px] font-bold text-[#C9A46C] border border-[#C9A46C]/40">
                    ₹{budgetLakhs} L
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-100">{lead.client_name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A46C]" />
                      {lead.location}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2 bg-[#12151E] p-2.5 rounded-xl border border-[#202534]">
                      {lead.notes || 'Full interior turnkey requirements.'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#202534] flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A46C]">
                      Stage: {lead.stage.replace('_', ' ')}
                    </span>
                    <button
                      onClick={() => handleMoveStage(lead.id, lead.stage, 'next')}
                      disabled={lead.stage === 'won'}
                      className="h-7 px-3 rounded-lg bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 text-xs font-bold disabled:opacity-30 inline-flex items-center"
                    >
                      Next Stage &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. ADD NEW LEAD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151821] border border-[#2B3346] rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#242A38]">
              <h3 className="font-luxury text-base font-bold text-slate-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#C9A46C]" />
                Add New Luxury Client Lead
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-200 text-xs p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-bold">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dhavalbhai Patel"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full mt-1 bg-[#191D27] border border-[#282F40] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-bold">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98980 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1 bg-[#191D27] border border-[#282F40] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold">Email</label>
                  <input
                    type="email"
                    placeholder="client@kovgroup.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 bg-[#191D27] border border-[#282F40] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-bold">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full mt-1 bg-[#191D27] border border-[#282F40] rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                  >
                    <option value="4BHK High-rise Penthouse">4BHK Penthouse</option>
                    <option value="Bungalow Interior">Luxury Bungalow</option>
                    <option value="4BHK Apartment">4BHK Apartment</option>
                    <option value="3BHK Modern Minimalist">3BHK Apartment</option>
                    <option value="Corporate Studio Office">Corporate Studio</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold">Estimated Budget (INR)</label>
                  <input
                    type="number"
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    className="w-full mt-1 bg-[#191D27] border border-[#282F40] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold">Site Location in Ahmedabad</label>
                <input
                  type="text"
                  placeholder="e.g. Shivalik Residences, Prahlad Nagar"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full mt-1 bg-[#191D27] border border-[#282F40] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold">Design Specifications & Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Client requested Italian marble flooring, concealed cove ceiling, smart home dimming."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full mt-1 bg-[#191D27] border border-[#282F40] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="h-9 px-4 rounded-xl bg-[#202534] text-xs font-semibold text-slate-300 hover:bg-[#282F42] inline-flex items-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-9 px-5 rounded-xl bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 text-xs font-bold inline-flex items-center shadow-md"
                >
                  {isSubmitting ? 'Saving Deal...' : 'Create Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
