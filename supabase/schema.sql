-- ============================================================
-- قفل إلكتروني بواسطة بصمة الإصبع والصوت - مخطط قاعدة البيانات
-- تشغيل هذا الملف في Supabase SQL Editor
-- ============================================================

-- 1) جدول الزوار -------------------------------------------------
create table if not exists public.visitors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  last_visit timestamptz not null default now(),
  visit_count bigint not null default 1
);

-- 2) إعدادات المشروع (صف واحد فقط) --------------------------------
create table if not exists public.project_settings (
  id uuid primary key default gen_random_uuid(),
  project_name text default 'قفل إلكتروني بواسطة بصمة الإصبع والصوت',
  short_title text default 'نظام قفل إلكتروني ذكي',
  description text default '',
  problem text default '',
  importance text[] default '{}',
  goals text[] default '{}',
  working_mechanism jsonb default '[]',
  software text[] default '{}',
  electronics text default '',
  block_diagram jsonb default '[]',
  stages_title text default 'مراحل تنفيذ المشروع',
  testing jsonb default '[]',
  conclusion text default '',
  college_name text default '',
  specialization text default '',
  project_type text default '',
  graduation_year text default '',
  developed_by text default '',
  updated_at timestamptz not null default now()
);

-- 3) أعضاء الفريق -------------------------------------------------
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text default '',
  image_url text default '',
  bio text default '',
  sort_order int default 0
);

-- 4) المشرفون -----------------------------------------------------
create table if not exists public.supervisors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  academic_title text default '',
  image_url text default '',
  sort_order int default 0
);

-- 5) المكونات -----------------------------------------------------
create table if not exists public.components (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  model text default '',
  description text default '',
  image_url text default '',
  sort_order int default 0
);

-- 6) المميزات -----------------------------------------------------
create table if not exists public.features (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  icon text default '',
  sort_order int default 0
);

-- 7) مراحل التنفيذ ------------------------------------------------
create table if not exists public.stages (
  id uuid primary key default gen_random_uuid(),
  number int default 0,
  title text not null,
  description text default '',
  sort_order int default 0
);

-- 8) الوسائط (صور + فيديو) ----------------------------------------
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  title text default '',
  type text default 'image', -- image | video
  url text not null,
  thumbnail_url text default '',
  sort_order int default 0
);

-- 9) الملفات ------------------------------------------------------
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_url text not null,
  file_type text default '',
  sort_order int default 0
);

-- 10) الملفات -----------------------------------------------------
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.visitors enable row level security;
alter table public.project_settings enable row level security;
alter table public.team_members enable row level security;
alter table public.supervisors enable row level security;
alter table public.components enable row level security;
alter table public.features enable row level security;
alter table public.stages enable row level security;
alter table public.media enable row level security;
alter table public.documents enable row level security;
alter table public.admin_profiles enable row level security;

-- الزوار: أي زائر يمكنه الإدراج (تسجيل الزيارة) والقراءة
create policy "visitors public insert" on public.visitors
  for insert to anon, authenticated with check (true);

create policy "visitors public select" on public.visitors
  for select to anon, authenticated using (true);

-- البيانات العامة: قراءة للجميع، تعديل للإدارة فقط
create policy "project_settings public select" on public.project_settings
  for select to anon, authenticated using (true);

create policy "team_members public select" on public.team_members
  for select to anon, authenticated using (true);

create policy "supervisors public select" on public.supervisors
  for select to anon, authenticated using (true);

create policy "components public select" on public.components
  for select to anon, authenticated using (true);

create policy "features public select" on public.features
  for select to anon, authenticated using (true);

create policy "stages public select" on public.stages
  for select to anon, authenticated using (true);

create policy "media public select" on public.media
  for select to anon, authenticated using (true);

create policy "documents public select" on public.documents
  for select to anon, authenticated using (true);

-- الإدارة: تعديل / إضافة / حذف فقط لحساب مدير
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $fn$
  select exists (
    select 1 from public.admin_profiles
    where id = auth.uid() and is_admin = true
  );
$fn$;

grant execute on function public.is_admin() to authenticated;

drop policy if exists "project_settings admin write" on public.project_settings;
drop policy if exists "team_members admin write" on public.team_members;
drop policy if exists "supervisors admin write" on public.supervisors;
drop policy if exists "components admin write" on public.components;
drop policy if exists "features admin write" on public.features;
drop policy if exists "stages admin write" on public.stages;
drop policy if exists "media admin write" on public.media;
drop policy if exists "documents admin write" on public.documents;
drop policy if exists "media storage admin write" on storage.objects;
drop policy if exists "media storage public read" on storage.objects;

create policy "project_settings admin write" on public.project_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "team_members admin write" on public.team_members
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "supervisors admin write" on public.supervisors
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "components admin write" on public.components
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "features admin write" on public.features
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "stages admin write" on public.stages
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "media admin write" on public.media
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "documents admin write" on public.documents
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin_profiles select self" on public.admin_profiles
  for select to authenticated using (auth.uid() = id);

-- Storage bucket للصور والملفات
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media storage public read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');

create policy "media storage admin write" on storage.objects
  for all to authenticated using (bucket_id = 'media' and public.is_admin()) with check (bucket_id = 'media' and public.is_admin());

-- صف الإعدادات الوحيد
insert into public.project_settings (id)
values ('00000000-0000-0000-0000-000000000001')
on conflict (id) do nothing;
