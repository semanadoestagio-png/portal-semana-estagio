# Roteiro: construindo o portal com o Claude Code

## Antes de começar (uma vez só)

1. Crie um **e-mail institucional da SanFran Jr.** para ser dono das contas abaixo.
2. Crie contas gratuitas com esse e-mail: **GitHub**, **Supabase**, **Vercel** e **Resend**.
3. Instale o **Node.js** (versão LTS) e o **Claude Code**. Você pode usar o Claude Code pelo terminal ou pela aba *Code* do app do Claude.
4. Crie uma pasta vazia `portal-semana-estagio`, coloque nela os arquivos `SPEC.md` e `CLAUDE.md` e abra o Claude Code nessa pasta.
5. Responda às **questões em aberto** da seção 11 da SPEC que já puder e anote as respostas no `CLAUDE.md`.

## Hábitos que fazem diferença

- **Shift+Tab** ativa o *Plan Mode*. Use em toda fase: leia o plano e corrija antes de aprovar.
- **`/clear`** entre features, para começar com o contexto limpo. A SPEC e o CLAUDE.md seguram a memória do projeto.
- Peça sempre: *"me diga como testar isso no navegador"*.
- Se algo der errado: *"desfaça a última mudança"* (o git guarda tudo).
- Não peça a fase inteira de uma vez. Peça um item, teste, faça commit e siga para o próximo.

---

## Prompts por fase

Copie e cole. Ajuste o que quiser.

### Fase 0: Fundação
```
Leia SPEC.md e CLAUDE.md. Vamos executar a Fase 0.
Antes de codar, me apresente um plano: estrutura de pastas, pacotes,
esquema inicial do banco (migrations + RLS) e o que eu preciso criar
ou configurar manualmente no Supabase/Vercel (passo a passo, como para
alguém leigo). Inicialize também o git e um README básico.
```

### Fase 1: Cadastro e contatos
```
Fase 1 da SPEC (seção 4.1). Planeje primeiro.
Comece só pelo cadastro da empresa + login por link mágico.
Inclua um teste automatizado provando que a Empresa A não consegue ler
dados da Empresa B, nem pela interface nem chamando o banco diretamente.
```
Depois, em sessões separadas: convite de contatos → aprovação pelo organizador → consentimento LGPD.

### Fase 2: Mural e e-mails
```
Fase 2 da SPEC (seções 4.2 e 4.7). Planeje primeiro.
Quero ver os e-mails no ambiente de teste sem mandar para empresas reais.
Como fazemos isso?
```

### Fase 3: Inscrição e Portal do Expositor
```
Fase 3 da SPEC (seções 4.3 e 4.4). Planeje primeiro e divida em
entregas pequenas. Comece pela inscrição e pelo pipeline de status.
```

### Fase 4: Contratos
```
Fase 4 da SPEC (seção 4.5). Antes de planejar, compare ZapSign,
Clicksign e D4Sign para o nosso caso (API, sandbox, preço, webhook)
e recomende um. Depois planeje o versionamento sem a assinatura,
e só então integre a assinatura no sandbox.
```

### Fase 5: Painel master e mapa de estandes
```
Fase 5 da SPEC (seção 4.6). Planeje primeiro.
Comece pelo mapa de estandes em tempo real. Vou te passar a planta do
local [anexar imagem]. Garanta no banco que um estande não recebe
duas empresas, mesmo se dois organizadores clicarem ao mesmo tempo.
```

### Fase 6: Lançamento
```
Faça uma revisão de segurança completa do projeto como se fosse um
atacante tentando ver dados de outra empresa ou agir como organizador.
Liste os problemas por gravidade e corrija um por um.
Depois escreva um README de passagem de bastão para a próxima gestão
da SanFran Jr.: como rodar, como fazer deploy, onde ficam as contas
e como abrir uma nova edição.
```

---

## Checklist de lançamento

- [ ] Revisão de segurança feita e problemas corrigidos
- [ ] Testes ponta a ponta passando (cadastro, aviso, inscrição, contrato, estande)
- [ ] Política de privacidade publicada
- [ ] Domínio próprio configurado e e-mails saindo do domínio da SanFran Jr.
- [ ] Banco de produção separado do de teste
- [ ] Organizadores cadastrados com os papéis corretos
- [ ] Piloto com 2 ou 3 empresas parceiras concluído
- [ ] README de passagem de bastão revisado por outro membro da equipe
