-- Fase 0: fundação do banco.
-- Tabelas que todas as fases usam: organizadores, edições, dias da feira,
-- log de auditoria e consentimentos LGPD. Empresas e contatos chegam na Fase 1.
-- Regra do projeto: toda tabela nasce com RLS ligado e policies nesta mesma migration.

-- ---------------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------------

create type public.organizer_role as enum ('organizer', 'admin');
create type public.edition_status as enum ('draft', 'open', 'closed', 'archived');

-- ---------------------------------------------------------------------------
-- Organizadores (membros da SanFran Jr.)
-- ---------------------------------------------------------------------------

create table public.organizers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete restrict,
  name text not null,
  email text not null,
  role public.organizer_role not null default 'organizer',
  active boolean not null default true,
  deactivated_at timestamptz,
  created_at timestamptz not null default now(),
  constraint organizers_deactivation_consistent
    check ((active and deactivated_at is null) or (not active and deactivated_at is not null))
);

comment on table public.organizers is
  'Membros da SanFran Jr. com acesso ao painel. Nunca apagar: desativar (active = false).';

-- Funções de papel usadas pelas policies de todas as tabelas.
-- security definer: leem organizers sem esbarrar no RLS da própria tabela.
create function public.is_organizer()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organizers
    where user_id = (select auth.uid())
      and active
  );
$$;

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organizers
    where user_id = (select auth.uid())
      and active
      and role = 'admin'
  );
$$;

-- anon também precisa executar: policies públicas (ex.: editions) chamam is_organizer(),
-- que simplesmente devolve false para quem não está logado.
revoke execute on function public.is_organizer() from public;
revoke execute on function public.is_admin() from public;
grant execute on function public.is_organizer() to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.organizers enable row level security;

create policy "organizers: cada um vê a si mesmo; organizadores veem todos"
  on public.organizers for select
  to authenticated
  using (user_id = (select auth.uid()) or (select public.is_organizer()));

create policy "organizers: só administrador inclui"
  on public.organizers for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "organizers: só administrador altera"
  on public.organizers for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- Sem policy de delete: organizadores não são apagados.

-- ---------------------------------------------------------------------------
-- Edições e dias da feira
-- ---------------------------------------------------------------------------

create table public.editions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  year integer not null unique check (year between 2000 and 2100),
  registration_opens_at timestamptz,
  registration_closes_at timestamptz,
  status public.edition_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint editions_registration_window
    check (registration_closes_at is null
           or registration_opens_at is null
           or registration_closes_at > registration_opens_at)
);

create table public.edition_days (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions (id) on delete restrict,
  date date not null,
  -- Turnos do dia, ex.: [{"starts": "08:00", "ends": "13:00"}, {"starts": "17:00", "ends": "22:00"}]
  shifts jsonb not null default '[]'::jsonb check (jsonb_typeof(shifts) = 'array'),
  unique (edition_id, date)
);

create index edition_days_edition_id_idx on public.edition_days (edition_id);

alter table public.editions enable row level security;
alter table public.edition_days enable row level security;

-- Edições publicadas são informação pública (datas da feira); rascunhos só para a organização.
create policy "editions: públicas fora do rascunho; organizadores veem todas"
  on public.editions for select
  to anon, authenticated
  using (status <> 'draft' or (select public.is_organizer()));

create policy "editions: só administrador inclui"
  on public.editions for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "editions: só administrador altera"
  on public.editions for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "edition_days: visíveis quando a edição é visível"
  on public.edition_days for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.editions e
      where e.id = edition_id
        and (e.status <> 'draft' or (select public.is_organizer()))
    )
  );

create policy "edition_days: só administrador inclui"
  on public.edition_days for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "edition_days: só administrador altera"
  on public.edition_days for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "edition_days: só administrador remove"
  on public.edition_days for delete
  to authenticated
  using ((select public.is_admin()));

-- updated_at automático
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger editions_set_updated_at
  before update on public.editions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Log de auditoria (CLAUDE.md, regra 4)
-- ---------------------------------------------------------------------------

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users (id) on delete set null, -- null = ação do sistema
  action text not null,
  entity text not null,
  entity_id text,
  diff jsonb,
  created_at timestamptz not null default now()
);

create index audit_log_entity_idx on public.audit_log (entity, entity_id);
create index audit_log_created_at_idx on public.audit_log (created_at desc);

alter table public.audit_log enable row level security;

create policy "audit_log: só organizadores leem"
  on public.audit_log for select
  to authenticated
  using ((select public.is_organizer()));

-- Gravação só pelo servidor (chave secreta) ou por funções/triggers do banco.
-- O log é somente-acréscimo: ninguém altera nem apaga.
revoke insert, update, delete, truncate on public.audit_log from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Consentimentos LGPD
-- ---------------------------------------------------------------------------

create table public.privacy_consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  policy_version text not null,
  accepted_at timestamptz not null default now(),
  ip inet
);

create index privacy_consents_user_id_idx on public.privacy_consents (user_id);

alter table public.privacy_consents enable row level security;

create policy "privacy_consents: usuário vê os próprios; organizadores veem todos"
  on public.privacy_consents for select
  to authenticated
  using (user_id = (select auth.uid()) or (select public.is_organizer()));

create policy "privacy_consents: usuário registra o próprio aceite"
  on public.privacy_consents for insert
  to authenticated
  with check (user_id = (select auth.uid()));

-- Aceites são registros históricos: sem update nem delete.
revoke update, delete, truncate on public.privacy_consents from anon, authenticated;
