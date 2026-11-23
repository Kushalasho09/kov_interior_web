export interface Project {
  id: string;
  title: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  location: string;
  city: string;
  area_sqft: number;
  budget: number;
  status: 'upcoming' | 'in_progress' | 'completed';
  completion_percentage: number;
  created_at: string;
}

export interface Lead {
  id: string;
  client_name: string;
  phone: string;
  email: string;
  property_type: string;
  location: string;
  stage: 'new' | 'site_visit' | 'estimate_sent' | 'negotiation' | 'won';
  estimated_budget: number;
  notes: string;
  created_at: string;
}

export interface DesignPin {
  id: string;
  project_id: string;
  room_name: string;
  image_url: string;
  pin_x: number;
  pin_y: number;
  title: string;
  note: string;
  material_spec: string;
  status: 'open' | 'approved' | 'resolved';
  created_at: string;
}

export interface BoqItem {
  id: string;
  project_id: string;
  category: string;
  item_name: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  total_amount: number;
  status: 'draft' | 'approved' | 'invoiced';
  created_at: string;
}

export interface SiteUpdate {
  id: string;
  project_id: string;
  supervisor_name: string;
  stage: string;
  caption: string;
  photo_url: string;
  created_at: string;
}

export interface MilestonePayment {
  id: string;
  project_id: string;
  title: string;
  percentage: number;
  amount: number;
  due_date: string;
  status: 'paid' | 'pending' | 'requested';
  invoice_number: string;
  created_at: string;
}

export interface InventoryItem {
  id: string;
  project_id: string;
  material_name: string;
  brand: string;
  unit: string;
  total_ordered: number;
  current_stock: number;
  minimum_threshold: number;
  updated_at: string;
}

export interface HandoverRecord {
  id: string;
  project_id: string;
  checklist_item: string;
  is_completed: boolean;
  verified_by: string | null;
  client_sign_url: string | null;
  notes: string | null;
  completed_at: string | null;
}

export interface ProjectPhase {
  id: string;
  project_id: string;
  phase_name: string;
  start_date: string;
  end_date: string;
  progress_percent: number;
  status: 'completed' | 'in_progress' | 'upcoming';
  order_index: number;
}

export interface SiteManpower {
  id: string;
  project_id: string;
  log_date: string;
  carpenters: number;
  electricians: number;
  painters: number;
  helpers: number;
  supervisor_notes: string;
  ai_generated_summary: string;
}
