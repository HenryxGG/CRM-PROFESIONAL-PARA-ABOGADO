-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- ENUMS
create type user_role as enum ('admin', 'abogado', 'asistente', 'contador');
create type client_type as enum ('natural', 'juridica');
create type client_status as enum ('prospecto', 'activo', 'inactivo');
create type case_status as enum ('iniciado', 'en_tramite', 'suspendido', 'archivado', 'finalizado');
create type case_type as enum (
  'civil', 'penal', 'laboral', 'familia', 'transito', 
  'contencioso_admin', 'contencioso_tributario', 'constitucional', 
  'inquilinato', 'mediacion', 'administrativo'
);
create type task_status as enum ('pendiente', 'en_progreso', 'completada');
create type task_priority as enum ('baja', 'media', 'alta', 'urgente');
create type fee_type as enum ('fijo', 'por_hora', 'etapa', 'cuota_litis');

-- PROFILES (Users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  role user_role default 'abogado',
  firm_id uuid, -- For multi-tenancy future proofing
  avatar_url text,
  email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- CLIENTS
create table public.clients (
  id uuid default uuid_generate_v4() primary key,
  type client_type not null,
  identification text unique not null, -- Cédula or RUC
  name text not null, -- Full name or Company name
  email text,
  phone text,
  address text,
  legal_representative text, -- For juridical persons
  status client_status default 'prospecto',
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- CASES (Procesos)
create table public.cases (
  id uuid default uuid_generate_v4() primary key,
  code text unique, -- Internal code
  judicial_number text, -- Official number (2024-001...)
  type case_type not null,
  status case_status default 'iniciado',
  client_id uuid references public.clients(id) not null,
  responsible_lawyer_id uuid references public.profiles(id),
  judicial_unit text, -- Juzgado / Unidad Judicial
  city text,
  province text,
  opposing_party text,
  description text, -- Pretensión
  amount numeric(12, 2), -- Cuantía
  start_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- DOCUMENTS
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  case_id uuid references public.cases(id) on delete cascade,
  client_id uuid references public.clients(id), -- Can be linked to client directly too
  uploader_id uuid references public.profiles(id),
  name text not null,
  file_path text not null, -- Storage path
  file_type text, -- 'demanda', 'sentencia', etc.
  version int default 1,
  created_at timestamptz default now()
);

-- EVENTS (Agenda)
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  case_id uuid references public.cases(id) on delete set null,
  title text not null,
  description text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  location text,
  event_type text check (event_type in ('audiencia', 'diligencia', 'reunion', 'vencimiento', 'otro')),
  is_deadline boolean default false,
  alert_config jsonb, -- e.g., {"days_before": [1, 3, 5]}
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- TASKS
create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  case_id uuid references public.cases(id) on delete set null,
  assigned_to uuid references public.profiles(id),
  title text not null,
  description text,
  status task_status default 'pendiente',
  priority task_priority default 'media',
  due_date timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- FEES & PAYMENTS (Honorarios)
create table public.fees (
  id uuid default uuid_generate_v4() primary key,
  case_id uuid references public.cases(id) not null,
  type fee_type not null,
  amount numeric(12, 2) not null,
  description text, -- e.g., "Honorarios por primera instancia"
  status text check (status in ('pendiente', 'parcial', 'pagado', 'anulado')),
  created_at timestamptz default now()
);

create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  fee_id uuid references public.fees(id) on delete cascade,
  amount numeric(12, 2) not null,
  payment_date date default current_date,
  method text, -- 'transferencia', 'efectivo', 'cheque'
  reference text,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- AUDIT LOG (Trazabilidad)
create table public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  action text not null, -- 'create', 'update', 'delete', 'login'
  table_name text,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  created_at timestamptz default now()
);

-- RLS POLICIES (Example: Profiles)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone" 
on public.profiles for select 
using ( true );

create policy "Users can update own profile" 
on public.profiles for update 
using ( auth.uid() = id );

-- RLS POLICIES (Example: Clients - Restricted visibility basic)
alter table public.clients enable row level security;

create policy "Authenticated users can view clients"
on public.clients for select
to authenticated
using ( true );

create policy "Authenticated users can insert clients"
on public.clients for insert
to authenticated
with check ( true );

create policy "Authenticated users can update clients"
on public.clients for update
to authenticated
using ( true );

-- RLS should be refined based on 'user_role' later.

-- FUNCTIONS: handle_new_user
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role, email)
  values (new.id, new.raw_user_meta_data->>'full_name', 'abogado', new.email);
  return new;
end;
$$ language plpgsql security definer;

-- TRIGGER: on auth.users created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
