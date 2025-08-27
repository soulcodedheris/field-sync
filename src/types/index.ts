// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'superadmin' | 'admin' | 'technician';
  company: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role?: 'superadmin' | 'admin' | 'technician';
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  role?: 'superadmin' | 'admin' | 'technician';
}

// Project and Jobsite Types
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on_hold' | 'cancelled';
  client: string;
  location: string;
  startDate: string;
  endDate?: string;
  budget?: number;
  manager: User;
  technicians: User[];
  createdAt: string;
  updatedAt: string;
}

export interface Jobsite {
  id: string;
  name: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  projectId: string;
  status: 'active' | 'completed' | 'maintenance';
  currentTechnicians: User[];
  createdAt: string;
  updatedAt: string;
}

// Checklist Types
export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'file';
  required: boolean;
  options?: string[];
  order: number;
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  category: 'safety' | 'quality' | 'maintenance' | 'inspection' | 'custom';
  items: ChecklistItem[];
  projectId?: string;
  jobsiteId?: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistResponse {
  id: string;
  checklistId: string;
  jobsiteId: string;
  technicianId: string;
  responses: {
    itemId: string;
    value: string | number | boolean;
    notes?: string;
    attachments?: string[];
  }[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: string;
  approvedBy?: User;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Log and Report Types
export interface Log {
  id: string;
  title: string;
  content: string;
  type: 'daily_report' | 'incident' | 'maintenance' | 'inspection' | 'general';
  jobsiteId: string;
  technicianId: string;
  attachments: string[];
  tags: string[];
  status: 'draft' | 'submitted' | 'reviewed';
  submittedAt?: string;
  reviewedBy?: User;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Time Tracking Types
export interface TimeEntry {
  id: string;
  workOrderId: string;
  technicianId: string;
  technician: {
    id: string;
    name: string;
    avatar?: string;
  };
  clockIn: string;
  clockOut?: string;
  duration?: number; // in minutes
  status: 'active' | 'completed' | 'approved' | 'rejected';
  notes?: string;
  approvedBy?: string;
  approvedAt?: string;
  location?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}

// AI Assistant Types
export interface AIMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  attachments?: string[];
}

export interface AIConversation {
  id: string;
  userId: string;
  title: string;
  messages: AIMessage[];
  context?: {
    projectId?: string;
    jobsiteId?: string;
    checklistId?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'file' | 'checkbox';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  validation?: any;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Library Types
export interface LibraryDocument {
  id: string;
  title: string;
  description: string;
  type: 'manual' | 'sop' | 'guide' | 'safety' | 'training';
  fileType: 'pdf' | 'doc' | 'png' | 'jpg' | 'mp4';
  fileSize: string;
  category: 'emergency_procedures' | 'equipment_manuals' | 'standard_procedures' | 'training_materials';
  updatedAt: string;
  createdAt: string;
  tags: string[];
  downloads: number;
  isFavorite: boolean;
}

export interface LibraryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  documentCount: number;
}

export interface LibraryFilter {
  category?: string;
  type?: string;
  search?: string;
}

// Job and WorkOrder Types
export interface Job {
  id: string;
  name: string;
  jobType: 'installation' | 'service' | 'maintenance' | 'inspection' | 'custom';
  status: 'active' | 'on_hold' | 'completed' | 'cancelled';
  clientName: string;
  clientContact?: string;
  startDate: string;
  endDate?: string;
  budget?: number;
  primaryLocation: string; // Summary location string
  jobsites: Jobsite[];
  workOrders: WorkOrder[];
  checklistTemplates: ChecklistTemplate[];
  createdAt: string;
  updatedAt: string;
}

export interface Jobsite {
  id: string;
  jobId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  siteType: 'primary' | 'secondary' | 'satellite' | 'storage';
  accessNotes?: string;
  safetyRequirements?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkOrder {
  id: string;
  jobId: string;
  jobsiteId?: string; // Optional - can be assigned to a specific site
  title: string;
  description?: string;
  type: 'install' | 'service' | 'maintenance' | 'inspection';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'to_do' | 'in_progress' | 'done';
  scheduledStart: string;
  scheduledEnd: string;
  estimatedMinutes: number;
  actualMinutes?: number;
  
  // Multi-technician assignment
  primaryTechnician: {
    id: string;
    name: string;
    avatar?: string;
  };
  additionalTechnicians: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  
  // Time tracking per technician
  timeEntries: TimeEntry[];
  
  // Checklist instance (execution)
  checklistInstance?: ChecklistInstance;
  
  // Evidence and attachments
  evidence: Evidence[];
  
  createdAt: string;
  updatedAt: string;
}

// Checklist Templates (Job-level SOPs)
export interface ChecklistTemplate {
  id: string;
  jobId: string;
  title: string;
  description?: string;
  items: ChecklistTemplateItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistTemplateItem {
  id: string;
  title: string;
  description?: string;
  order: number;
  required: boolean;
  evidenceRequired: {
    notes: boolean;
    photo: boolean;
    signature: boolean;
  };
}

// Checklist Instance (execution on Work Order)
export interface ChecklistInstance {
  id: string;
  workOrderId: string;
  templateId: string;
  items: ChecklistInstanceItem[];
  status: 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistInstanceItem {
  id: string;
  templateItemId: string;
  title: string;
  description?: string;
  order: number;
  required: boolean;
  completed: boolean;
  completedBy?: {
    id: string;
    name: string;
    avatar?: string;
  };
  completedAt?: string;
  evidence: Evidence[];
}

// Evidence system for checklist items
export interface Evidence {
  id: string;
  checklistInstanceItemId: string;
  type: 'note' | 'photo' | 'signature';
  content: string; // Text for notes, file path for photos/signatures
  addedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  addedAt: string;
  metadata?: {
    fileSize?: number;
    mimeType?: string;
    coordinates?: { lat: number; lng: number };
  };
}

 