# Portal do Expositor · Semana do Estágio

Portal da **SanFran Jr.** para a relação com as empresas expositoras da Semana do Estágio:
cadastro, reuniões comerciais, estandes, avisos, inscrição, contratos e painel da organização.

- O que o portal faz e por quê: [`SPEC.md`](SPEC.md)
- Regras do projeto e instruções para o Claude Code: [`CLAUDE.md`](CLAUDE.md)
- Roteiro de construção por fases: [`docs/ROTEIRO.md`](docs/ROTEIRO.md)
- Logos e identidade visual: [`docs/marca/`](docs/marca)

**Site de teste:** https://portal-semana-estagio.vercel.app (atualiza sozinho a cada envio para a branch `main`).

## Tecnologias

Next.js 16 (App Router) + TypeScript + Tailwind CSS + shadcn/ui, Supabase (banco, login, arquivos),
Vercel (hospedagem), Vitest e Playwright (testes).

## Como rodar no seu computador

Pré-requisitos: [Node.js](https://nodejs.org) (versão LTS) e [Git](https://git-scm.com).

```bash
npm install                 # instala as dependências (só na primeira vez)
cp .env.example .env.local  # depois preencha o .env.local com as chaves do Supabase de teste
npm run dev                 # abre o site em http://localhost:3000
```

Sem o `.env.local` o site funciona, mas sem banco de dados: `http://localhost:3000/api/saude`
mostra `"banco": "não configurado"`.

## Comandos úteis

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor local em http://localhost:3000 |
| `npm run lint` | Procura problemas no código |
| `npm run typecheck` | Confere os tipos do TypeScript |
| `npm test` | Testes rápidos (Vitest) |
| `npm run test:e2e` | Testes no navegador, em tamanho de computador e de celular (Playwright) |
| `npm run build` | Gera a versão de produção (o mesmo que a Vercel faz) |
| `npx supabase db push` | Aplica as migrations novas no banco vinculado |

## Banco de dados

- Todas as mudanças de banco ficam em `supabase/migrations/` e nunca são feitas "na mão" no painel.
- Usamos dois projetos do Supabase na nuvem: **teste** (desenvolvimento) e **produção**.
  Não rodamos o Supabase localmente (exigiria Docker e muita memória).
- `supabase/seed.sql` tem dados de exemplo só para o banco de teste.

## Estrutura

```
app/(public)      página inicial, login e cadastro
app/(empresa)     área da empresa e Portal do Expositor (a partir da Fase 1)
app/(admin)       painel da organização (a partir da Fase 1)
app/api           rotas de servidor (ex.: /api/saude)
components/ui     componentes visuais reutilizáveis (shadcn/ui)
components/<área> componentes de cada parte do portal
lib/              funções compartilhadas (formatação, Supabase)
supabase/         migrations e dados de exemplo
e2e/              testes no navegador
docs/             roteiro, marca e referências (referências com preços não vão para o git)
```

## Segredos

Chaves e senhas ficam **só** no `.env.local` (seu computador) e nas variáveis de ambiente da Vercel.
Nunca no código, no git ou em mensagens.
