'use client';

import React, { useState } from 'react';
import { InventoryItem } from '@/types';
import { supabase } from '@/lib/supabase';
import {
  Boxes,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle2,
  Package,
  Layers,
  MapPin,
  Warehouse,
  Filter,
} from 'lucide-react';

interface InventoryModuleProps {
  items: InventoryItem[];
  onItemsUpdated: () => void;
}

const DEFAULT_MATERIALS: InventoryItem[] = [
  {
    id: 'mat-1',
    project_id: 'a1b2c3d4-e5f6-7890-abcd-111122223333',
    material_name: '18mm Marine Waterproof Plywood (BWP 710)',
    brand: 'CenturyPly Club Prime',
    unit: 'Sheets',
    total_ordered: 120,
    current_stock: 48,
    minimum_threshold: 15,
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mat-2',
    project_id: 'a1b2c3d4-e5f6-7890-abcd-111122223333',
    material_name: 'Smoked Oak Natural Architectural Veneer (4mm)',
    brand: 'Turakhia Natural Veneers',
    unit: 'Sheets',
    total_ordered: 45,
    current_stock: 22,
    minimum_threshold: 10,
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mat-3',
    project_id: 'a1b2c3d4-e5f6-7890-abcd-111122223333',
    material_name: 'Soft-Close Concealed Hinges (Sensys 110°)',
    brand: 'Hafele Germany',
    unit: 'Pairs',
    total_ordered: 80,
    current_stock: 65,
    minimum_threshold: 20,
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mat-4',
    project_id: 'a1b2c3d4-e5f6-7890-abcd-111122223333',
    material_name: 'Royale Aspira Luxury Interior Emulsion (Ivory)',
    brand: 'Asian Paints Aspira',
    unit: '20L Drums',
    total_ordered: 12,
    current_stock: 4,
    minimum_threshold: 3,
    updated_at: new Date().toISOString(),
  },
];

const MATERIAL_PHOTOS: Record<string, string> = {
  '18mm Marine Waterproof Plywood (BWP 710)': 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80',
  'Smoked Oak Natural Architectural Veneer (4mm)': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  'Soft-Close Concealed Hinges (Sensys 110°)': 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
  'Royale Aspira Luxury Interior Emulsion (Ivory)': 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
};

export default function InventoryModule({
  items,
  onItemsUpdated,
}: InventoryModuleProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const displayItems = items && items.length > 0 ? items : DEFAULT_MATERIALS;

  const handleAdjustStock = async (item: InventoryItem, delta: number) => {
    const newStock = Math.max(0, Number(item.current_stock) + delta);
    setUpdatingId(item.id);

    const { error } = await supabase
      .from('inventory_items')
      .update({ current_stock: newStock })
      .eq('id', item.id);

    setUpdatingId(null);
    if (!error) {
      onItemsUpdated();
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER BAR - PIXEL-PERFECT ALIGNMENT */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-[#151821] border border-[#262C3A] shadow-md">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-luxury text-xl font-bold text-slate-100 whitespace-nowrap">
              Inventory & Site Material Stock
            </h2>
            <span className="h-7 px-3 rounded-full text-xs font-bold bg-[#C9A46C]/15 text-[#DFCAA5] border border-[#C9A46C]/30 inline-flex items-center whitespace-nowrap">
              Warehouse Sync Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time material consumption, batch tracking, and threshold monitoring at The Sky Villa site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 px-3.5 rounded-xl bg-[#191D27] border border-[#262C3A] text-xs text-slate-300 inline-flex items-center gap-2 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold">Ahmedabad Central Hub Connected</span>
          </div>
        </div>
      </div>

      {/* 2. CENTRAL WAREHOUSE DEPOT STATUS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#151821] border border-[#262C3A] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#C9A46C]/15 flex items-center justify-center shrink-0">
            <Warehouse className="w-5 h-5 text-[#C9A46C]" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Depot Location</p>
            <p className="text-xs font-bold text-slate-100">Kov Logistics Hub &bull; Sarkhej-Sanand Rd</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#151821] border border-[#262C3A] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Site Dispatches</p>
            <p className="text-xs font-bold text-slate-100">14 Batches Cleared &bull; 0 Damaged</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#151821] border border-[#262C3A] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-950/60 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Threshold Monitor</p>
            <p className="text-xs font-bold text-slate-100">1 Low Stock Alert (Asian Paints)</p>
          </div>
        </div>
      </div>

      {/* 3. MATERIAL CARDS GRID WITH REAL ARCHITECTURAL PHOTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayItems.map((item) => {
          const current = Number(item.current_stock);
          const total = Number(item.total_ordered);
          const threshold = Number(item.minimum_threshold);
          const percent = total > 0 ? Math.round((current / total) * 100) : 0;
          const isLow = current <= threshold;
          const photo =
            MATERIAL_PHOTOS[item.material_name] ||
            'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80';

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all overflow-hidden flex flex-col justify-between shadow-lg group ${
                isLow
                  ? 'bg-[#18151D] border-rose-900/50'
                  : 'bg-[#151821] border-[#262C3A] hover:border-[#C9A46C]/60'
              }`}
            >
              {/* Photo & Status Banner */}
              <div className="relative h-40 w-full overflow-hidden bg-black">
                <img
                  src={photo}
                  alt={item.material_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151821] via-transparent to-black/40" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#F1E5D3] border border-white/10 uppercase tracking-wider">
                  {item.brand}
                </div>

                <div className="absolute top-3 right-3">
                  {isLow ? (
                    <span className="h-6 px-2.5 rounded-full text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-700/60 inline-flex items-center gap-1 shadow-md">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      Low Stock Alert
                    </span>
                  ) : (
                    <span className="h-6 px-2.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 inline-flex items-center gap-1 shadow-md">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Sufficient Stock
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 left-3">
                  <h3 className="font-bold text-sm text-white drop-shadow-md">
                    {item.material_name}
                  </h3>
                </div>
              </div>

              {/* Progress & Quick Controls */}
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold">
                      Current Stock On Site:{' '}
                      <span className="text-white font-mono font-bold text-sm">
                        {current} {item.unit}
                      </span>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Batch Total: {total} {item.unit}
                    </span>
                  </div>

                  <div className="w-full bg-[#1E2330] h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isLow ? 'bg-rose-500' : 'bg-gradient-to-r from-[#C9A46C] to-emerald-400'
                      }`}
                      style={{ width: `${Math.min(100, percent)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#232938] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Min Threshold: {threshold} {item.unit}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-semibold">Quick Adjust:</span>
                    <button
                      onClick={() => handleAdjustStock(item, -5)}
                      disabled={updatingId === item.id || current <= 0}
                      className="h-7 px-2.5 rounded-lg bg-[#1E2330] hover:bg-[#283247] text-slate-200 disabled:opacity-30 text-xs font-mono font-bold inline-flex items-center justify-center transition-colors"
                    >
                      -5
                    </button>
                    <button
                      onClick={() => handleAdjustStock(item, 5)}
                      disabled={updatingId === item.id}
                      className="h-7 px-2.5 rounded-lg bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 disabled:opacity-30 text-xs font-mono font-bold inline-flex items-center justify-center transition-colors shadow-sm"
                    >
                      +5
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
