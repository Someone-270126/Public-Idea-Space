-- IDEA SPACE: jalankan di Supabase SQL Editor.
-- RLS memastikan publik hanya dapat membaca kiriman approved dan mengirim pending.
create extension if not exists pgcrypto;

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in (
    'Teknologi','Pendidikan','Kehidupan sehari-hari','Lingkungan',
    'Kesehatan dan aksesibilitas','Bisnis dan pekerjaan','Lainnya'
  )),
  title text not null check (char_length(title) between 4 and 100),
  body text not null check (char_length(body) between 15 and 1500),
  author_name text not null default 'Anonim' check (char_length(author_name) between 1 and 40),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

alter table public.ideas enable row level security;

drop policy if exists "Public can read approved ideas" on public.ideas;
create policy "Public can read approved ideas"
on public.ideas for select to anon, authenticated
using (status = 'approved');

drop policy if exists "Anyone can submit pending ideas" on public.ideas;
create policy "Anyone can submit pending ideas"
on public.ideas for insert to anon, authenticated
with check (status = 'pending');

-- Tidak ada policy UPDATE atau DELETE untuk publik.
-- Moderasi dilakukan dari Supabase Dashboard > Table Editor, oleh admin yang login.
grant select, insert on public.ideas to anon, authenticated;
