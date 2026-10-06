-- Objetivo Comer: tablas para compartir totales diarios entre amigos.
-- Pegalo entero en Supabase → SQL Editor → New query → Run.

create table if not exists public.perfiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  nombre      text not null check (char_length(nombre) between 1 and 40),
  meta        int  not null default 1600 check (meta between 800 and 5000),
  actualizado timestamptz not null default now()
);

create table if not exists public.totales (
  user_id uuid not null references auth.users (id) on delete cascade,
  fecha   date not null,
  kcal    int  not null check (kcal between 0 and 20000),
  primary key (user_id, fecha)
);

alter table public.perfiles enable row level security;
alter table public.totales  enable row level security;

-- Cualquiera con cuenta en TU proyecto ve los perfiles y totales de todos.
create policy "ver perfiles"        on public.perfiles for select to authenticated using (true);
create policy "crear mi perfil"     on public.perfiles for insert to authenticated with check (auth.uid() = id);
create policy "editar mi perfil"    on public.perfiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- Cada uno solo puede cargar, cambiar o borrar sus propios totales.
create policy "ver totales"         on public.totales for select to authenticated using (true);
create policy "cargar mis totales"  on public.totales for insert to authenticated with check (auth.uid() = user_id);
create policy "editar mis totales"  on public.totales for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "borrar mis totales"  on public.totales for delete to authenticated using (auth.uid() = user_id);

-- Consulta útil para ver el ranking de la semana desde el SQL Editor:
-- select p.nombre, round(avg(t.kcal)) as promedio, count(*) as dias
-- from totales t join perfiles p on p.id = t.user_id
-- where t.fecha >= current_date - 6
-- group by p.nombre order by promedio;
