-- Dados de exemplo para o banco de TESTE. Nunca rodar em produção.

insert into public.editions (name, year, status)
values ('Semana do Estágio 2027', 2027, 'draft')
on conflict (year) do nothing;
