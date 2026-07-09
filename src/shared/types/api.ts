// === ENUMS ===
export type UserRole = 'admin' | 'manager' | 'employee';
export type ContractType = 'employment_contract' | 'mandate_contract';
export type ShiftStatus = 'scheduled' | 'cancelled';
export type ScheduleStatus = 'draft' | 'published';
export type Locale = 'pl' | 'en';

// === USER ===
export type User = {
  id: number;
  name: string;
  email: string | null;
  login: string;
  role: UserRole;
  is_active: boolean;
  hourly_rate: number | null;
  monthly_hour_limit: number | null;
  quarter_hour_limit: number | null;
  break_limit: number | null;
  contract_type: ContractType | null;
  locale: Locale;
  positions: Position[];
  created_at: string;
};

// === POSITION ===
export type Position = {
  id: number;
  name: string;
  description: string | null;
  color: string;
  creator_name?: string;
  created_at?: string;
};

// === SCHEDULE ===
export type Schedule = {
  id: number;
  name: string;
  description: string | null;
  month: number;
  year: number;
  status: ScheduleStatus;
  published_at: string | null;
  created_by: string;
  total_shifts: number;
  created_at: string;
  updated_at?: string;
  shifts?: Shift[];
};

// === SHIFT ===
export type Shift = {
  id: number;
  schedule_id: number | null;
  user_id: number;
  user_name?: string;
  position_id: number;
  position_name?: string;
  date: string;
  shift_start: string;
  shift_end: string;
  minutes_worked: number | null;
  hours_worked: number | null;
  status: ShiftStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

// === AVAILABILITY ===
export type Availability = {
  id: number;
  user_id: number;
  date: string;
  is_available: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

// === NEWS POST ===
export type NewsPost = {
  id: number;
  title: string;
  content: string;
  is_important: boolean;
  author: { id: number; name: string };
  created_at: string;
  updated_at: string;
};

// === AUTH INPUTS ===
export type LoginInput = {
  login: string;
  password: string;
};

export type LoginPinInput = {
  login: string;
  pin: string;
};

// === BATCH ===
export type BatchShiftInput = {
  client_temp_id: string;
  user_id: number;
  position_id: number;
  date: string;
  shift_start: string;
  shift_end: string;
  notes?: string;
  status?: ShiftStatus;
};

export type BatchResponse = {
  message: string;
  count: number;
  shifts: Shift[];
};

export type BatchError = {
  message: string;
  errors: Record<string, Record<string, string[]>>;
};

// === PAGINATION ===
export type PaginatedResponse<T> = {
  data: T[];
  links: { first: string; last: string; prev: string | null; next: string | null };
  meta: { current_page: number; last_page: number; per_page: number; total: number };
};

export type SingleResource<T> = { data: T; message?: string };
export type ApiError = { message: string; errors?: Record<string, string[]> };

// === OPTIMISTIC ===
export type OptimisticShiftStatus = 'pending' | 'error' | 'confirmed';
export type OptimisticShift = BatchShiftInput & {
  status: OptimisticShiftStatus;
  error?: Record<string, string[]>;
};
