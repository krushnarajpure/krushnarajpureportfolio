create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id integer primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.about_content (
  id integer primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (like public.projects including defaults);
create table if not exists public.education (like public.projects including defaults);
create table if not exists public.certifications (like public.projects including defaults);
create table if not exists public.achievements (like public.projects including defaults);
create table if not exists public.services (like public.projects including defaults);
create table if not exists public.social_links (like public.projects including defaults);

do $$
declare
  table_name text;
begin
  foreach table_name in array array['experiences','education','certifications','achievements','services','social_links'] loop
    if not exists (
      select 1 from pg_constraint
      where conrelid = format('public.%I', table_name)::regclass
        and contype = 'p'
    ) then
      execute format('alter table public.%I add primary key (id)', table_name);
    end if;
  end loop;
end $$;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  subject text not null check (char_length(subject) between 1 and 200),
  message text not null check (char_length(message) between 1 and 5000),
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_media (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  path text not null unique,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_profiles
    where user_id = auth.uid() and is_admin = true
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['admin_profiles','profiles','about_content','site_settings','skills','projects','experiences','education','certifications','achievements','services','social_links','portfolio_media'] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    if table_name <> 'portfolio_media' then
      execute format('create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
    end if;
  end loop;
end $$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['profiles','about_content','site_settings','skills','projects','experiences','education','certifications','achievements','services','social_links'] loop
    execute format('drop policy if exists "public_read_%1$s" on public.%1$I', table_name);
    execute format('drop policy if exists "admin_manage_%1$s" on public.%1$I', table_name);
    if table_name in ('skills','projects','experiences','education','certifications','achievements','services','social_links') then
      execute format('create policy "public_read_%1$s" on public.%1$I for select using (published = true)', table_name);
    else
      execute format('create policy "public_read_%1$s" on public.%1$I for select using (published = true)', table_name);
    end if;
    execute format('create policy "admin_manage_%1$s" on public.%1$I for all using (public.is_admin()) with check (public.is_admin())', table_name);
  end loop;
end $$;

drop policy if exists "admin_read_admin_profiles" on public.admin_profiles;
drop policy if exists "admin_manage_admin_profiles" on public.admin_profiles;
create policy "admin_read_admin_profiles" on public.admin_profiles for select using (public.is_admin() or user_id = auth.uid());
create policy "admin_manage_admin_profiles" on public.admin_profiles for all using (public.is_admin() or user_id = auth.uid()) with check (public.is_admin() or user_id = auth.uid());

drop policy if exists "public_create_contact_messages" on public.contact_messages;
drop policy if exists "admin_manage_contact_messages" on public.contact_messages;
create policy "public_create_contact_messages" on public.contact_messages for insert with check (true);
create policy "admin_manage_contact_messages" on public.contact_messages for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public_read_media" on public.portfolio_media;
drop policy if exists "admin_manage_media" on public.portfolio_media;
create policy "public_read_media" on public.portfolio_media for select using (true);
create policy "admin_manage_media" on public.portfolio_media for all using (public.is_admin()) with check (public.is_admin());

insert into public.profiles (id, data) values (1, '{}') on conflict (id) do nothing;
insert into public.about_content (id, data) values (1, '{}') on conflict (id) do nothing;
insert into public.site_settings (id, data) values (1, '{}') on conflict (id) do nothing;

-- Create the first admin after creating the corresponding Supabase Auth user:
-- insert into public.admin_profiles (user_id, display_name, is_admin)
-- values ('AUTH_USER_UUID', 'Krushna Rajpure', true);

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

drop policy if exists "public_read_portfolio_media" on storage.objects;
drop policy if exists "admin_upload_portfolio_media" on storage.objects;
drop policy if exists "admin_update_portfolio_media" on storage.objects;
drop policy if exists "admin_delete_portfolio_media" on storage.objects;
create policy "public_read_portfolio_media" on storage.objects for select using (bucket_id = 'portfolio-media');
create policy "admin_upload_portfolio_media" on storage.objects for insert with check (bucket_id = 'portfolio-media' and public.is_admin());
create policy "admin_update_portfolio_media" on storage.objects for update using (bucket_id = 'portfolio-media' and public.is_admin()) with check (bucket_id = 'portfolio-media' and public.is_admin());
create policy "admin_delete_portfolio_media" on storage.objects for delete using (bucket_id = 'portfolio-media' and public.is_admin());