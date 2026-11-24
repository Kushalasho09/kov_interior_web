'use client';

import React, { useState } from 'react';
import { DesignPin } from '@/types';
import { supabase } from '@/lib/supabase';
import {
  Palette,
  MapPin,
  Plus,
  CheckCircle2,
  ZoomIn,
} from 'lucide-react';

interface DesignModuleProps {
  pins: DesignPin[];
  projectId?: string;
  onPinsUpdated: () => void;
}

const ROOM_VIEWS = [
  { id: 'living', name: 'Living Lounge', fullName: 'Grand Living & Lounge', image: '/assets/projects/living_room.webp', area: '950 sqft' },
  { id: 'bedroom', name: 'Master Suite', fullName: 'Master Suite & Walk-in', image: '/assets/projects/bedroom.webp', area: '480 sqft' },
  { id: 'kitchen', name: 'Island Kitchen', fullName: 'Gourmet Island Kitchen', image: '/assets/projects/kitchen.webp', area: '320 sqft' },
];

export default function DesignModule({ pins, projectId, onPinsUpdated }: DesignModuleProps) {
  const [selectedRoom, setSelectedRoom] = useState(ROOM_VIEWS[0]);
  const [selectedPin, setSelectedPin] = useState<DesignPin | null>(pins[0] || null);
  const [newPinCoords, setNewPinCoords] = useState<{ x: number; y: number } | null>(null);
  const [pinTitle, setPinTitle] = useState('');
  const [pinNote, setPinNote] = useState('');
  const [pinSpec, setPinSpec] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Handle clicking on image to place a new pin
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setNewPinCoords({ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
    setSelectedPin(null);
  };

  // Save new pin to Supabase
  const handleSavePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinCoords || !pinTitle) return;

    setIsSaving(true);
    const { error } = await supabase.from('design_pins').insert({
      project_id: projectId || 'a1b2c3d4-e5f6-7890-abcd-111122223333',
      room_name: selectedRoom.name,
      image_url: selectedRoom.image,
      pin_x: newPinCoords.x,
      pin_y: newPinCoords.y,
      title: pinTitle,
      note: pinNote,
      material_spec: pinSpec,
      status: 'open',
    });

    setIsSaving(false);
    if (!error) {
      setNewPinCoords(null);
      setPinTitle('');
      setPinNote('');
      setPinSpec('');
      onPinsUpdated();
    }
  };

  // Toggle pin approval status
  const handleToggleStatus = async (pinId: string, currentStatus: DesignPin['status']) => {
    const nextStatus = currentStatus === 'approved' ? 'open' : 'approved';
    const { error } = await supabase
      .from('design_pins')
      .update({ status: nextStatus })
      .eq('id', pinId);

    if (!error) {
      onPinsUpdated();
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER BAR - STRICT PIXEL-PERFECT ALIGNMENT */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] shadow-sm dark:shadow-md transition-colors">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <h2 className="font-luxury text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              Design Management & Architectural Pins
            </h2>
            <span className="h-7 px-3 rounded-full text-xs font-bold bg-[#C9A46C]/15 text-[#8F7049] dark:text-[#DFCAA5] border border-[#C9A46C]/30 inline-flex items-center justify-center whitespace-nowrap shrink-0">
              3D Perspectives
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Click directly anywhere on the Kov Interior architectural render below to drop custom material specs.
          </p>
        </div>

        {/* Room Switcher Tabs - Guaranteed never to overflow card boundary */}
        <div className="h-9 flex items-center bg-slate-100 dark:bg-[#191D27] border border-slate-200 dark:border-[#262C3A] rounded-xl p-0.5 text-xs shrink-0 self-start xl:self-auto overflow-x-auto max-w-full">
          {ROOM_VIEWS.map((room) => (
            <button
              key={room.id}
              onClick={() => {
                setSelectedRoom(room);
                setNewPinCoords(null);
              }}
              className={`h-full px-3.5 sm:px-4 rounded-lg font-bold transition-all whitespace-nowrap inline-flex items-center justify-center ${
                selectedRoom.id === room.id
                  ? 'bg-[#C9A46C] text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN STUDIO CANVAS + DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Canvas (2 Columns) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-[#2B3243] bg-black shadow-2xl group select-none">
            {/* Clickable Image Container */}
            <div
              onClick={handleImageClick}
              className="relative w-full aspect-[16/10] cursor-crosshair overflow-hidden"
            >
              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
              />

              {/* Existing Interactive Pins */}
              {pins.map((pin, idx) => {
                const isSelected = selectedPin?.id === pin.id;
                return (
                  <button
                    key={pin.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPin(pin);
                      setNewPinCoords(null);
                    }}
                    style={{ left: `${pin.pin_x}%`, top: `${pin.pin_y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isSelected
                        ? 'bg-[#DFCAA5] text-slate-950 scale-125 ring-4 ring-[#C9A46C]/60 shadow-2xl z-20'
                        : pin.status === 'approved'
                        ? 'bg-emerald-400 text-slate-950 hover:scale-110 shadow-lg'
                        : 'bg-[#C9A46C] text-slate-950 hover:scale-110 shadow-lg'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}

              {/* Temporary Marker for Pending New Pin */}
              {newPinCoords && (
                <div
                  style={{ left: `${newPinCoords.x}%`, top: `${newPinCoords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#C9A46C] text-slate-950 flex items-center justify-center font-extrabold text-sm animate-bounce shadow-2xl ring-4 ring-[#C9A46C]/40 z-30"
                >
                  +
                </div>
              )}
            </div>

            {/* Canvas Bottom Bar */}
            <div className="p-3.5 bg-slate-100 dark:bg-[#101217] border-t border-slate-200 dark:border-[#232938] flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 transition-colors">
              <span className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-[#B58E50] dark:text-[#C9A46C]" />
                <span className="text-slate-800 dark:text-slate-200 font-medium">Click anywhere on render to drop a new specification pin</span>
              </span>
              <span className="text-xs text-[#8F7049] dark:text-[#C9A46C] font-semibold">{(selectedRoom as any).fullName || selectedRoom.name} • {selectedRoom.area}</span>
            </div>
          </div>
        </div>

        {/* Pin Details & Creation Panel (1 Column) */}
        <div className="space-y-4">
          {newPinCoords ? (
            <div className="p-5 rounded-2xl bg-white dark:bg-[#171B26] border border-[#C9A46C] shadow-lg space-y-4 transition-colors">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-[#293247]">
                <h3 className="text-xs font-bold text-slate-900 dark:text-[#F1E5D3] flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[#C9A46C]" />
                  Drop Specification Pin @ ({newPinCoords.x}%, {newPinCoords.y}%)
                </h3>
                <button
                  onClick={() => setNewPinCoords(null)}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSavePin} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-bold">Pin Specification Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Custom Fluted Smoked Oak Panel"
                    value={pinTitle}
                    onChange={(e) => setPinTitle(e.target.value)}
                    className="w-full mt-1 bg-slate-50 dark:bg-[#12151E] border border-slate-200 dark:border-[#282F40] rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-bold">Material Specification</label>
                  <input
                    type="text"
                    placeholder="e.g. Century Marine Ply IS:710 + 4mm Smoked Oak"
                    value={pinSpec}
                    onChange={(e) => setPinSpec(e.target.value)}
                    className="w-full mt-1 bg-slate-50 dark:bg-[#12151E] border border-slate-200 dark:border-[#282F40] rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-bold">Architectural Notes</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Align grain pattern vertically, provide concealed conduit channel."
                    value={pinNote}
                    onChange={(e) => setPinNote(e.target.value)}
                    className="w-full mt-1 bg-slate-50 dark:bg-[#12151E] border border-slate-200 dark:border-[#282F40] rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#C9A46C]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-2.5 rounded-xl bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 text-xs font-bold shadow-md transition-all"
                >
                  {isSaving ? 'Saving Pin...' : 'Save Pin to Database'}
                </button>
              </form>
            </div>
          ) : selectedPin ? (
            <div className="p-5 rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#2A3245] shadow-sm dark:shadow-lg space-y-4 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#232938]">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#C9A46C]/20 text-[#8F7049] dark:text-[#DFCAA5] border border-[#C9A46C]/30">
                  Pin Spec Details
                </span>
                <button
                  onClick={() => handleToggleStatus(selectedPin.id, selectedPin.status)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    selectedPin.status === 'approved'
                      ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/40 hover:bg-emerald-200 dark:hover:bg-emerald-900/60'
                      : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800/40 hover:bg-amber-200 dark:hover:bg-amber-900/60'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {selectedPin.status === 'approved' ? 'Approved Spec' : 'Mark Approved'}
                </button>
              </div>

              <div>
                <h3 className="font-luxury text-base font-bold text-slate-900 dark:text-slate-100">{selectedPin.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Location: {selectedPin.room_name}</p>
              </div>

              {selectedPin.material_spec && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1A1F2C] border border-slate-200 dark:border-[#262D3E]">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                    Material Specification
                  </p>
                  <p className="text-xs text-[#8F7049] dark:text-[#C9A46C] font-semibold mt-1">
                    {selectedPin.material_spec}
                  </p>
                </div>
              )}

              {selectedPin.note && (
                <div className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#12151E] p-3 rounded-xl border border-slate-200 dark:border-[#202636] leading-relaxed">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">
                    Architectural Note
                  </p>
                  <p>{selectedPin.note}</p>
                </div>
              )}
            </div>
          ) : null}

          {/* List of all pins */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#232938] shadow-sm dark:shadow-md space-y-3 transition-colors">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>All Floorplan Pins</span>
              <span className="text-xs text-[#8F7049] dark:text-[#C9A46C] font-mono font-bold">{pins.length} Specs</span>
            </h4>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {pins.map((pin, i) => (
                <div
                  key={pin.id}
                  onClick={() => {
                    setSelectedPin(pin);
                    setNewPinCoords(null);
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    selectedPin?.id === pin.id
                      ? 'bg-amber-50 dark:bg-[#1E2535] border-[#C9A46C] text-slate-900 dark:text-slate-100 font-semibold'
                      : 'bg-slate-50 dark:bg-[#181D28] border-slate-200 dark:border-[#252C3C] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-[#262E42] text-[#8F7049] dark:text-[#C9A46C] flex items-center justify-center font-bold text-[10px] shrink-0">
                      {i + 1}
                    </span>
                    <span className="truncate">{pin.title}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      pin.status === 'approved'
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/40'
                        : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800/40'
                    }`}
                  >
                    {pin.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
