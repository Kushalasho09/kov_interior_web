'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Project,
  Lead,
  DesignPin,
  BoqItem,
  SiteUpdate,
  MilestonePayment,
  InventoryItem,
  HandoverRecord,
  ProjectPhase,
  SiteManpower,
} from '@/types';

import Sidebar, { ActiveTab } from '@/components/Sidebar';
import Header from '@/components/Header';
import OverviewModule from '@/components/modules/OverviewModule';
import CrmModule from '@/components/modules/CrmModule';
import DesignModule from '@/components/modules/DesignModule';
import BoqModule from '@/components/modules/BoqModule';
import SiteTrackingModule from '@/components/modules/SiteTrackingModule';
import FinanceModule from '@/components/modules/FinanceModule';
import InventoryModule from '@/components/modules/InventoryModule';
import HandoverModule from '@/components/modules/HandoverModule';
import ProjectMgmtModule from '@/components/modules/ProjectMgmtModule';
import HrmsModule from '@/components/modules/HrmsModule';
import AiModule from '@/components/modules/AiModule';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Database State for all 10 modules
  const [project, setProject] = useState<Project | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pins, setPins] = useState<DesignPin[]>([]);
  const [boqItems, setBoqItems] = useState<BoqItem[]>([]);
  const [siteUpdates, setSiteUpdates] = useState<SiteUpdate[]>([]);
  const [milestones, setMilestones] = useState<MilestonePayment[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [handovers, setHandovers] = useState<HandoverRecord[]>([]);
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [manpower, setManpower] = useState<SiteManpower | null>(null);

  // Fetch all tables from Supabase
  const fetchAllData = useCallback(async () => {
    try {
      const [
        projectRes,
        leadsRes,
        pinsRes,
        boqRes,
        updatesRes,
        milestonesRes,
        inventoryRes,
        handoversRes,
        phasesRes,
        manpowerRes,
      ] = await Promise.all([
        supabase.from('projects').select('*').limit(1).single(),
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('design_pins').select('*').order('created_at', { ascending: true }),
        supabase.from('boq_items').select('*').order('created_at', { ascending: true }),
        supabase.from('site_updates').select('*').order('created_at', { ascending: false }),
        supabase.from('milestone_payments').select('*').order('created_at', { ascending: true }),
        supabase.from('inventory_items').select('*').order('created_at', { ascending: true }),
        supabase.from('handover_records').select('*').order('created_at', { ascending: true }),
        supabase.from('project_phases').select('*').order('order_index', { ascending: true }),
        supabase.from('site_manpower').select('*').limit(1).single(),
      ]);

      if (projectRes.data) setProject(projectRes.data);
      if (leadsRes.data) setLeads(leadsRes.data);
      if (pinsRes.data) setPins(pinsRes.data);
      if (boqRes.data) setBoqItems(boqRes.data);
      if (updatesRes.data) setSiteUpdates(updatesRes.data);
      if (milestonesRes.data) setMilestones(milestonesRes.data);
      if (inventoryRes.data) setInventory(inventoryRes.data);
      if (handoversRes.data) setHandovers(handoversRes.data);
      if (phasesRes.data) setPhases(phasesRes.data);
      if (manpowerRes.data) setManpower(manpowerRes.data);
    } catch (err) {
      console.error('Error fetching Supabase data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const fetchRef = useRef(fetchAllData);
  fetchRef.current = fetchAllData;

  // Initial load and continuous Supabase Realtime channel
  useEffect(() => {
    fetchRef.current();

    const channel = supabase
      .channel('kov_live_sync_stable')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        fetchRef.current();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchAllData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0F13] flex items-center justify-center flex-col gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#181B22] border border-[#C9A46C]/60 p-2 flex items-center justify-center shadow-2xl animate-pulse">
          <img src="/assets/logo.png" alt="KOV INTERIOR" className="w-full h-full object-contain" />
        </div>
        <p className="text-xs text-[#C9A46C] font-bold tracking-widest uppercase">
          Initializing Kov Interiors OS...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0F13] text-[#F3F4F6] flex print:block print:bg-white print:text-slate-900 print:min-h-0">
      {/* Fixed Left Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        projectName={project?.title}
        projectLocation={project?.location}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 print:block print:w-full print:m-0 print:p-0">
        <Header onRefresh={handleRefresh} isRefreshing={isRefreshing} />

        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto print:p-0 print:m-0 print:max-w-none print:w-full print:block">
          {activeTab === 'overview' && (
            <OverviewModule
              project={project}
              leads={leads}
              siteUpdates={siteUpdates}
              milestones={milestones}
              phases={phases}
              manpower={manpower}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'crm' && (
            <CrmModule leads={leads} onLeadsUpdated={fetchAllData} />
          )}

          {activeTab === 'design' && (
            <DesignModule
              pins={pins}
              projectId={project?.id}
              onPinsUpdated={fetchAllData}
            />
          )}

          {activeTab === 'boq' && (
            <BoqModule
              items={boqItems}
              projectId={project?.id}
              onItemsUpdated={fetchAllData}
            />
          )}

          {activeTab === 'site_tracking' && (
            <SiteTrackingModule
              updates={siteUpdates}
              projectId={project?.id}
              onUpdatesUpdated={fetchAllData}
            />
          )}

          {activeTab === 'finance' && (
            <FinanceModule
              milestones={milestones}
              onMilestonesUpdated={fetchAllData}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryModule
              items={inventory}
              onItemsUpdated={fetchAllData}
            />
          )}

          {activeTab === 'handover' && (
            <HandoverModule
              records={handovers}
              onRecordsUpdated={fetchAllData}
            />
          )}

          {activeTab === 'project_mgmt' && (
            <ProjectMgmtModule
              phases={phases}
              onPhasesUpdated={fetchAllData}
            />
          )}

          {activeTab === 'hrms' && (
            <HrmsModule
              manpower={manpower}
              projectId={project?.id}
              onManpowerUpdated={fetchAllData}
            />
          )}

          {activeTab === 'ai' && (
            <AiModule
              project={project}
              manpower={manpower}
              latestUpdate={siteUpdates[0] || null}
            />
          )}
        </main>
      </div>
    </div>
  );
}
