# CLAUDE.md: Portal da Semana do Estágio (SanFran Jr.)

## O que é este projeto
Portal web para a relação entre a SanFran Jr. (empresa júnior da Faculdade de Direito da USP) e as empresas expositoras da Semana do Estágio: cadastro, avisos, inscrição, Portal do Expositor, contratos e painel master da organização.

**A especificação completa está em `SPEC.md`. Leia antes de qualquer feature nova.** Se a tarefa contradiz a SPEC ou depende de uma "questão em aberto" (seção 11), pare e pergunte.

## Quem está desenvolvendo
O responsável (Gabriel) é estudante de Direito, não programador profissional. Portanto:
- Explique decisões técnicas em linguagem simples e curta.
- Quando houver uma escolha com consequências (custo, segurança, experiência do usuário), apresente as opções e recomende uma antes de seguir.
- Ao final de cada tarefa, diga **como testar no navegador** o que foi feito, passo a passo.
- Nunca peça que ele cole senhas ou chaves no chat. Indique qual variável colocar no `.env.local`.

## Stack
- Next.js (App Router) + TypeScript (strict) + Tailwind CSS + shadcn/ui
- Supabase: Postgres, Auth (código de 6 dígitos por e-mail, **não** link mágico), Storage, Realtime
- Resend + React Email (e-mails)
- Vercel (deploy e cron)
- Vitest (unitários) e Playwright (ponta a ponta)

Não adicione bibliotecas novas sem justificar e perguntar.

## Regras inegociáveis
1. **Isolamento entre empresas.** Todo acesso a dados de empresa passa por RLS no Supabase. Toda tabela nova nasce com RLS habilitado e policies escritas na mesma migration. Toda feature que lê dados de empresa precisa de um teste provando que a empresa A não vê dados da empresa B.
2. **Ações de organizador são validadas no servidor** (Server Actions/Route Handlers que checam o papel). Nunca confie apenas em esconder botões.
3. **Nada é apagado de verdade** em contratos, versões de documentos, mensagens, reservas e histórico de status. Use soft delete (`deleted_at`/`released_at`) ou novas versões. Exclusão de dados pessoais a pedido (LGPD) é feita por **anonimização**, preservando o histórico.
4. **Ações sensíveis vão para `audit_log`:** mudança de status, atribuição de estande, envio ou assinatura de contrato, exclusões, mudança de papel.
5. **Segredos só em variáveis de ambiente.** A chave secreta do Supabase (`SUPABASE_SECRET_KEY`, antiga "service role") nunca vai para código de cliente nem para variáveis `NEXT_PUBLIC_*`.
6. **Um estande, uma empresa por dia:** garantido por índice `UNIQUE` parcial no banco (`stand_id + edition_day_id` onde `released_at is null`), não apenas por lógica.
7. **Dois níveis dos dois lados, garantidos no banco:** na empresa, só o **Gestor** vê contrato, valores, pagamento e NF (o **Membro** não). Na organização, o **Organizador** só reserva estandes para empresas das quais é responsável comercial; só o **Administrador** desfaz, bloqueia ou remaneja reservas e gerencia organizadores. Organizador desativado perde acesso na hora.

## Convenções
- **Interface 100% em português do Brasil.** Código, nomes de variáveis, tabelas e commits em inglês.
- Datas exibidas como `dd/mm/aaaa HH:mm`, fuso `America/Sao_Paulo`. Armazenar sempre em UTC (`timestamptz`).
- Dinheiro em centavos (`integer`), exibido como `R$ 1.234,56`.
- Mudanças de banco sempre via migration em `supabase/migrations/`. Nunca altere o banco "na mão".
- Componentes de UI reutilizáveis em `components/ui` (shadcn). Componentes de domínio em `components/<modulo>`.
- Estrutura de rotas:
  - `app/(public)` para a página inicial, login e cadastro
  - `app/(empresa)` para a área da empresa e o Portal do Expositor
  - `app/(admin)` para o painel da organização
- Formulários com `react-hook-form` + `zod`, com validação no cliente **e** no servidor.
- Mensagens de erro amigáveis em português. Nada de stack trace para o usuário.
- Visual sóbrio e profissional: o público é de grandes escritórios e bancos. Identidade da **Semana do Estágio** (SPEC §7): azul-marinho principal, dourado só em destaques, fundo cinza-claro; **Noto Serif** nos títulos e **Montserrat** nos textos. Logos e paleta em `docs/marca/`.
- Arquivos de referência com dados comerciais (`docs/referencias/`) não vão para o git.

## Fluxo de trabalho
1. Para toda feature: **planeje primeiro** (Plan Mode), listando arquivos, tabelas e testes, e espere aprovação.
2. Implemente em passos pequenos. Rode `npm run lint`, `npm run typecheck` e os testes antes de dizer que terminou.
3. Para mudanças de interface, abra a página com Playwright e confira se ela funciona de fato.
4. Faça commit ao fim de cada passo funcional, com mensagem clara (`feat: ...`, `fix: ...`).
5. Atualize a seção "Estado atual" abaixo ao concluir uma fase.

## Comandos
```
npm run dev          # servidor local
npm run lint
npm run typecheck
npm run test         # Vitest
npm run test:e2e     # Playwright (desktop + celular)
npm run build
npx supabase db push                                         # aplica migrations no projeto vinculado
npx supabase gen types typescript --linked > lib/database.types.ts
```

- **Não há Supabase local** (a máquina tem 8 GB de RAM; Docker pesaria demais). O banco de desenvolvimento é o projeto **teste** na nuvem; produção é outro projeto. Confira sempre a qual projeto o CLI está vinculado antes de `db push`.
- Esta versão do Next.js (16) tem mudanças grandes (ex.: `middleware` virou `proxy`, Cache Components ligado). Consulte `node_modules/next/dist/docs/` antes de usar uma API (ver `AGENTS.md`).

## Estado atual
- Fase atual: **0, Fundação** (plano em aprovação)
- Ordem das fases (SPEC v0.2): 0 Fundação → 1 Cadastro → 2 Reuniões e estandes → 3 Mural e e-mails → 4 Inscrição e Portal do Expositor → 5 Contratos → 6 Painel master → 7 Lançamento.
- Decisões já tomadas (21/10/2026), detalhes na SPEC §11:
  - Login por código de 6 dígitos; aprovação manual do autocadastro; organização também cadastra empresas e convida.
  - Vínculo por domínio só com aprovação do Gestor; domínios genéricos nunca sugerem vínculo.
  - Reserva de estande ao vivo na reunião comercial, por dia, sem expiração; empresa vira Expositor na primeira reserva.
  - Valor = estande (faixa × 1/2/3 dias, obrigatório) + pacote de apoio (opcional, vagas limitadas) + avulsos. Parcela única, NF emitida pela SanFran Jr. Sem desconto.
  - Contrato com versionamento completo; signatário externo da empresa; pela SanFran Jr. dois presidentes + uma testemunha.
  - Representantes: só nome e cargo. Sistema de Valorização e turnos de Processo Seletivo ficam fora da v1.
  - Custo mínimo: grátis no desenvolvimento; Supabase Pro + Resend Pro só na temporada.
  - Código pensado para passar a outro membro na próxima gestão.
