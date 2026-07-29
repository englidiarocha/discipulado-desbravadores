-- Schema para a plataforma discipulado.desbravadores.com
-- Execute este script no SQL Editor do Supabase (Project > SQL Editor > New query)

-- Extensão para gerar UUIDs
create extension if not exists "pgcrypto";

-- ==========================================
-- 1. CATEGORIAS (abas e subabas)
-- ==========================================
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  parent_id uuid references categories(id) on delete cascade,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ==========================================
-- 2. ARQUIVOS (pdf, imagem, video)
-- ==========================================
create table if not exists files (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  title text not null,
  description text,
  file_type text not null check (file_type in ('pdf', 'imagem', 'video')),
  storage_path text not null,
  file_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ==========================================
-- 3. RESPOSTAS DO FORMULÁRIO DE ACESSO
-- ==========================================
create table if not exists access_responses (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  clube_igreja text not null,
  funcao text not null,
  email text not null,
  comentario text,
  created_at timestamptz not null default now()
);

-- ==========================================
-- 4. RESPOSTAS DO FORMULÁRIO DE FEEDBACK
-- ==========================================
create table if not exists feedback_responses (
  id uuid primary key default gen_random_uuid(),
  nome text,
  email text,
  mensagem text not null,
  tipo text default 'feedback',
  created_at timestamptz not null default now()
);

-- ==========================================
-- ROW LEVEL SECURITY
-- ==========================================
alter table categories enable row level security;
alter table files enable row level security;
alter table access_responses enable row level security;
alter table feedback_responses enable row level security;

create policy "Categorias são públicas para leitura"
  on categories for select
  using (true);

create policy "Arquivos são públicos para leitura"
  on files for select
  using (true);

create policy "Qualquer um pode enviar resposta de acesso"
  on access_responses for insert
  with check (true);

create policy "Qualquer um pode enviar feedback"
  on feedback_responses for insert
  with check (true);

-- ==========================================
-- DADOS INICIAIS (estrutura de abas pedida)
-- ==========================================
insert into categories (name, slug, parent_id, sort_order) values
  ('Bom de Bíblia', 'bom-de-biblia', null, 1),
  ('Classes em figurinhas', 'classes-em-figurinhas', null, 2),
  ('Clube de leitura', 'clube-de-leitura', null, 3),
  ('Manuais oficiais', 'manuais-oficiais', null, 4)
on conflict (slug) do nothing;

insert into categories (name, slug, parent_id, sort_order)
select '2026 - Daniel', 'bom-de-biblia-2026-daniel', id, 1 from categories where slug = 'bom-de-biblia'
on conflict (slug) do nothing;

insert into categories (name, slug, parent_id, sort_order)
select '2026 - Apocalipse', 'bom-de-biblia-2026-apocalipse', id, 2 from categories where slug = 'bom-de-biblia'
on conflict (slug) do nothing;

insert into categories (name, slug, parent_id, sort_order)
select 'Amigo', 'classes-amigo', id, 1 from categories where slug = 'classes-em-figurinhas'
on conflict (slug) do nothing;

insert into categories (name, slug, parent_id, sort_order)
select 'Pela Graça de Deus', 'clube-de-leitura-pela-graca-de-deus', id, 1 from categories where slug = 'clube-de-leitura'
on conflict (slug) do nothing;

insert into categories (name, slug, parent_id, sort_order)
select 'Uniformes', 'manuais-oficiais-uniformes', id, 1 from categories where slug = 'manuais-oficiais'
on conflict (slug) do nothing;

insert into categories (name, slug, parent_id, sort_order)
select 'Manual Administrativo', 'manuais-oficiais-manual-administrativo', id, 2 from categories where slug = 'manuais-oficiais'
on conflict (slug) do nothing;

-- ==========================================
-- STORAGE BUCKET
-- ==========================================
insert into storage.buckets (id, name, public)
values ('materiais', 'materiais', true)
on conflict (id) do nothing;

create policy "Leitura pública dos materiais"
  on storage.objects for select
  using (bucket_id = 'materiais');
