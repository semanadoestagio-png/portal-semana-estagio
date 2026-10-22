# Portal da Semana do Estágio: Especificação do Produto

> Documento-fonte do projeto. Toda feature deve seguir este arquivo. Se algo aqui estiver ambíguo, **pergunte antes de implementar**.
> Versão 0.2 (21/10/2026) · Responsável: Gabriel (SanFran Jr.)
> Mudanças da v0.2: decisões das questões em aberto, correções do modelo de dados e nova ordem das fases.

---

## 1. Contexto e objetivo

A **Semana do Estágio (SDE)** é a feira de carreiras organizada anualmente pela **SanFran Jr.** (empresa júnior da Faculdade de Direito da USP), apresentada como a maior feira de estágio jurídico da América Latina. Participam escritórios de advocacia, bancos, consultorias e empresas em geral (os **Expositores**).

**Números de referência (edição 2026):**
- 3 dias de feira (19 a 21/05/2026), em **dois turnos por dia** (8h às 13h e 17h às 22h), no Pátio das Arcadas.
- **29 estandes** numerados, 2 depósitos e 2 entradas (planta em `docs/referencias/apresentacao-sde-2026.pdf`, slides 33 e 34).
- Mais de 3.000 estudantes participantes em 2025.
- **De 30 a 80 empresas** entre interessadas e expositoras por edição.
- Próxima edição: entre 3 e 6 meses a partir de 10/2026.

Hoje, toda a comunicação com as empresas acontece por e-mail. Por isso:

- informações se perdem em threads longas;
- empresas esquecem de responder e prazos passam;
- não sobra histórico entre uma edição e outra (quem participou, quem era o contato, qual estande, como foi a negociação).

**Objetivo do portal:** centralizar toda a relação com as empresas em um só lugar, com histórico permanente, notificações automáticas e controle total da organização.

### Indicadores de sucesso

- 100% dos contratos da edição negociados e assinados pelo portal.
- Nenhum aviso oficial enviado fora do portal.
- Nenhum estande prometido a duas empresas para o mesmo dia.
- Ao abrir a edição seguinte, a equipe vê o histórico completo de cada empresa sem precisar procurar e-mails antigos.

---

## 2. Glossário

| Termo | Significado |
|---|---|
| **Edição** | Uma ocorrência da feira (ex.: "Semana do Estágio 2027"). Quase tudo é vinculado a uma edição. Tem dias de feira. |
| **Empresa** | Organização cadastrada (escritório, banco etc.). Existe independentemente das edições. |
| **Contato** | Pessoa da empresa com login próprio. Pode ser **Gestor** ou **Membro** (ver seção 3). |
| **Expositor** | Empresa com **pelo menos um estande reservado** em uma edição. Tem acesso ao Portal do Expositor. |
| **Organizador** | Membro da SanFran Jr. com acesso ao painel. Pode ser **responsável comercial** por empresas. |
| **Administrador** | Organizador com poderes extras (ver seção 3). |
| **Responsável comercial** | Organizador que cuida da relação com uma empresa específica. |
| **Reunião comercial** | Reunião presencial entre a SanFran Jr. e a empresa, agendada pelo portal, em que a empresa escolhe o estande. Quem se reúne primeiro escolhe primeiro. |
| **Estande** | Espaço físico da feira, com código (ex.: 12), faixa e posição no mapa. |
| **Faixa de estande** | Categoria de preço do estande, identificada por cor (ex.: Platina, Roxo, Vermelho, Laranja, Verde). Cada faixa tem um preço para 1, 2 e 3 dias. |
| **Reserva** | Vínculo de um estande a uma inscrição **em um dia específico** da feira. |
| **Pacote de apoio** | Modalidade opcional de patrocínio (ex.: Apoiador Master, Premium, Standard), com preço, **número limitado de vagas** e benefícios (atividades e divulgação). |
| **Item avulso** | Atividade ou divulgação comprada fora de um pacote. |
| **Atividade** | Palestra, workshop, roda de conversa ou similar. Tema e horário definidos pela SanFran Jr.; a empresa indica o representante. |
| **Signatário** | Pessoa que assina o contrato. Pela empresa, pode ser alguém sem acesso ao portal. |
| **Aviso** | Comunicado oficial publicado no portal e enviado por e-mail. |
| **Documento** | Arquivo compartilhado (manual, regulamento, contrato, nota fiscal etc.). |

---

## 3. Perfis e permissões

| Perfil | Pode |
|---|---|
| **Visitante** (não logado) | Ver a página inicial pública e se cadastrar. |
| **Contato Membro** | Ver dados da própria empresa, mural da edição, avisos, pendências, agenda de reuniões, estande e atividades. **Não vê** contrato, valores, pagamento nem nota fiscal. |
| **Contato Gestor** | Tudo do Membro + editar dados da empresa, convidar contatos, aprovar pedidos de vínculo, ver e negociar contrato, ver valores e documentos financeiros, indicar signatários. O primeiro contato da empresa é Gestor. |
| **Expositor** (Gestor ou Membro) | O que seu nível permite, também dentro do Portal do Expositor. |
| **Organizador** | Ver e editar todas as empresas, publicar avisos, gerenciar reuniões, contratos e pendências. **Reservar estandes apenas para as empresas pelas quais é responsável comercial.** Não pode desfazer reservas nem remanejar estandes. |
| **Administrador** | Tudo do Organizador + reservar para qualquer empresa, **desbloquear e remanejar estandes**, gerenciar organizadores (incluir, mudar papel, desativar), configurar edições, faixas, pacotes e sistema. |

**Regras de ouro:**
- Um contato **nunca** pode ver dados de outra empresa. Essa regra é garantida no banco de dados (Row Level Security), não apenas na interface.
- Dentro da empresa, a separação Gestor/Membro também é garantida no banco.
- Organizadores que saem da SanFran Jr. são **desativados** (perdem o acesso na hora, mas o histórico de quem fez o quê permanece).

---

## 4. Funcionalidades

### 4.1 Cadastro e autenticação

- Login por **e-mail + código de 6 dígitos** (sem senha). *Motivo:* filtros de segurança de e-mail de bancos e grandes escritórios "clicam" em links mágicos e os invalidam; o código não sofre com isso.
- **Dois caminhos de cadastro:**
  1. **A empresa se cadastra sozinha** e fica **pendente** até um organizador aprovar. Enquanto pendente, vê só uma tela de "cadastro em análise".
  2. **A organização cadastra a empresa** (prospecção) e convida o contato por e-mail. Empresas criadas pela organização já nascem aprovadas.
- **Cadastro da empresa:** razão social, nome fantasia, CNPJ (com validação), segmento (escritório de advocacia, banco, consultoria, empresa, órgão público, outro), site, logo (upload), descrição curta, áreas de atuação.
- **Contatos:** nome, e-mail, telefone, cargo, função no relacionamento (RH, recrutamento, financeiro, jurídico/contratos, outro), nível (Gestor/Membro) e preferências de notificação.
- Um Gestor pode **convidar outros contatos** da mesma empresa por e-mail.
- **Vínculo por domínio:** quem se cadastra com e-mail do mesmo domínio de uma empresa existente (ex.: `@mattosfilho.com.br`) recebe a sugestão de entrar nela, mas **só entra depois que um Gestor da empresa aprovar**. Se a empresa não tiver Gestor ativo, o pedido vai para a organização. Domínios genéricos (gmail, hotmail, outlook, yahoo, icloud, uol, bol etc.) **nunca** geram sugestão.
- **Troca de emprego:** um contato pode ser desativado em uma empresa e ativado em outra; o histórico antigo continua ligado à empresa antiga.
- Aceite da Política de Privacidade (LGPD) obrigatório no primeiro acesso, com registro de data, hora, IP e versão aceita.
- **Importação de histórico:** importador de planilhas das edições passadas (empresas, contatos, participação, estandes). Contatos importados **não ganham acesso automático**: recebem convite quando a organização decidir.

### 4.2 Reuniões comerciais e estandes

**Agendamento de reuniões**
- A organização abre **horários de reunião** (data, hora, local, organizador responsável).
- Cada empresa aprovada marca **um** horário pelo portal; o organizador também pode marcar em nome da empresa.
- O portal registra data e hora de cada agendamento. A ordem das reuniões define a ordem de escolha dos estandes ("quem se reúne primeiro escolhe primeiro").
- Remarcar ou cancelar libera o horário e fica no histórico.

**Mapa e reserva de estandes**
- O mapa usa a **planta do local** como fundo, com os estandes posicionados por cima, coloridos pela faixa.
- Um seletor de **dia da feira** mostra a ocupação daquele dia (livre, reservado, bloqueado).
- Durante a reunião, o responsável comercial seleciona estande(s) e dia(s) e clica em **"Reservar para [empresa]"**. Precisa funcionar bem no celular e no notebook.
- **Regra de banco:** um estande só pode ter **uma reserva ativa por dia**. Se dois organizadores clicarem ao mesmo tempo, só o primeiro vale; o segundo vê a mensagem "Estande já reservado por Fulano às 14:32".
- Reservas **não expiram**. Só o **Administrador** pode desfazer, bloquear/desbloquear ou remanejar estandes.
- Ao ter a primeira reserva, a empresa vira **Expositor**.
- Na Fase 6 o mapa passa a atualizar **em tempo real** para todos os organizadores conectados.

### 4.3 Mural da edição (todas as empresas aprovadas)

- **Linha do tempo** da edição: datas da feira, período de reuniões, prazos de envio de documentos, pagamento, montagem etc.
- **Avisos:** título, corpo (rich text), anexos, público-alvo e data de publicação (imediata ou agendada).
- O **público-alvo é calculado no momento do envio** (vale também para avisos agendados). Empresas que entram depois veem os avisos antigos no mural, mas não recebem o e-mail retroativamente.
- Cada aviso publicado dispara **e-mail automático** para os contatos do público-alvo, respeitando as preferências de cada um. Avisos marcados como **obrigatórios** (contrato, prazos) ignoram a preferência.
- **Confirmação de leitura:** o organizador vê quem abriu cada aviso **no portal**. (Rastreamento de abertura de e-mail não é usado: é impreciso e exige menção específica na política de privacidade.)
- Prazos geram **lembretes automáticos** (ex.: 7 dias, 2 dias e no dia), enviados apenas a quem ainda não cumpriu a pendência ligada ao prazo.

### 4.4 Inscrição e valores

- Botão "Quero participar" enquanto as inscrições estiverem abertas.
- Formulário: pacote de apoio desejado (opcional), número de dias de interesse, número de representantes, necessidades especiais, observações.
- **Composição do valor:**
  - **Estande (obrigatório):** preço da faixa conforme o número de dias reservados (tabela de 1, 2 e 3 dias por faixa, cadastrada a cada edição).
  - **Pacote de apoio (opcional):** preço fixo, com **vagas limitadas** (o portal impede vender acima do limite).
  - **Itens avulsos (opcional):** atividades e divulgação fora de pacote.
  - Sem desconto por ora: o valor é o da tabela.
- **Pagamento:** parcela única. O portal registra vencimento, confirmação de pagamento e a **nota fiscal emitida pela SanFran Jr.** (upload do PDF, visível só para Gestores).
- **Status da inscrição (pipeline):**
  `Interesse → Reunião agendada → Estande reservado (vira Expositor) → Contrato enviado → Contrato assinado → Pagamento confirmado → NF emitida → (Cancelado)`
- O status ligado ao contrato **é atualizado pelo próprio contrato** (seção 4.6), não manualmente, para não haver divergência.
- **Cancelamento:** registra o motivo, avisa a empresa e deixa os estandes para o Administrador liberar. A empresa perde o acesso de Expositor quando não tiver mais reservas ativas.
- Cada mudança de status fica registrada no histórico e notifica a empresa.

### 4.5 Portal do Expositor

Painel principal com **checklist de pendências** (ex.: "Enviar logo em alta resolução até 10/03", "Assinar contrato", "Informar representantes"). Cada item mostra prazo e status **por empresa**.

- **Meu estande:** código, faixa, **dias reservados**, localização destacada no mapa e o que está incluído (mesa, três cadeiras, armário, tomada 220V).
- **Atividades:** lista das atividades a que a empresa tem direito (pelo pacote ou avulsas), com tema e horário definidos pela SanFran Jr. A empresa indica **quem vai representá-la** (nome e cargo).
- **Representantes no estande:** **apenas nome e cargo** (coleta mínima; sem CPF/RG).
- **Documentos:** arquivos enviados pela organização (manual do expositor, regulamento, planta) e pelo expositor (logo, materiais, comprovantes).
- **Contrato** (só Gestores): ver seção 4.6.
- **Mensagens:** canal direto com a organização, por empresa (substitui threads de e-mail).

### 4.6 Contrato (negociação e assinatura)

- A organização sobe a **minuta inicial** (DOCX/PDF), gerada a partir de um modelo com os dados da empresa preenchidos automaticamente.
- **Versionamento completo:** a negociação tem vai e volta com os jurídicos das empresas. Cada envio cria uma nova versão (v1, v2, v3…) com autor, data e comentário ("ajustamos a cláusula 5"). Nenhuma versão é apagada.
- **Status com responsável claro:** `Aguardando SanFran Jr.` / `Aguardando empresa` / `Versão final aprovada` / `Enviado para assinatura` / `Assinado`.
- Cada troca de versão notifica a outra parte por e-mail.
- **Signatários:**
  - Pela empresa: o Gestor informa nome, e-mail e CPF de quem assina (pode ser sócio ou procurador **sem acesso ao portal**, que recebe só o link de assinatura).
  - Pela SanFran Jr.: **dois presidentes + uma testemunha** (normalmente o diretor financeiro), configuráveis por edição.
- **Assinatura eletrônica** por integração com provedor brasileiro (ZapSign, Clicksign ou D4Sign, a definir na Fase 5), via API. O provedor precisa aceitar múltiplos signatários e testemunhas. O webhook atualiza o status automaticamente e o PDF assinado é arquivado no portal.
- O status do contrato **move o pipeline da inscrição** (enviado → assinado).
- O portal **não implementa assinatura própria**.

### 4.7 Painel do Organizador (acesso master)

- **Visão geral da edição:** número de empresas por status, receita prevista e confirmada, estandes ocupados e livres **por dia**, vagas de pacotes restantes, pendências atrasadas.
- **Lista de empresas** com filtros (segmento, status, pacote, faixa, responsável comercial, pendências) e busca.
- **Ficha da empresa:** todos os dados, contatos, responsável comercial, histórico de todas as edições, linha do tempo de interações, documentos, contrato, mensagens e notas internas (nunca visíveis à empresa).
- **Comunicação:** criar avisos, escolher público (todas as empresas, só expositores, por pacote, por segmento, empresas específicas), agendar envio, ver taxa de entrega e de leitura no portal.
- **Mapa de estandes em tempo real** (evolução do mapa da seção 4.2).
- **Pendências:** criar itens de checklist para todos os expositores ou para empresas específicas.
- **Exportações:** CSV/Excel de empresas, contatos, estandes por dia e representantes (para credenciamento e gráfica).
- **Gestão de edições:** criar nova edição copiando a estrutura da anterior (dias, faixas, estandes, pacotes, modelos de documentos, prazos ajustados).
- **Gestão de organizadores** (só Administrador): incluir, mudar papel, desativar.
- **Log de auditoria:** quem fez o quê e quando.

### 4.8 E-mails automáticos

| Gatilho | Destinatários |
|---|---|
| Código de acesso | Quem está entrando |
| Cadastro aprovado | Contatos da empresa |
| Convite de contato | Pessoa convidada |
| Pedido de vínculo por domínio | Gestores da empresa (ou organização) |
| Reunião agendada, remarcada ou cancelada | Contatos da empresa e organizador responsável |
| Estande reservado ou alterado | Contatos do expositor |
| Novo aviso publicado | Público-alvo do aviso |
| Lembrete de prazo | Quem ainda não cumpriu |
| Mudança de status da inscrição | Contatos da empresa (valores só para Gestores) |
| Nova versão de contrato | Outra parte |
| Contrato assinado | Ambas as partes |
| Nova mensagem | Outra parte (com resumo) |

Todos os e-mails: remetente da SanFran Jr. em subdomínio próprio (ex.: `avisos@expositor.sanfranjr.com.br`), layout padrão com a identidade da Semana do Estágio, link direto para a tela relevante no portal e link para gerenciar preferências.

---

## 5. Modelo de dados (rascunho v0.2)

```
-- Edição
editions            id, name, year, registration_opens_at, registration_closes_at, status
edition_days        id, edition_id, date, shifts (json: [{"starts":"08:00","ends":"13:00"}, ...])

-- Empresas e pessoas
companies           id, legal_name, trade_name, cnpj (unique), segment, website, logo_path, description,
                    practice_areas[], email_domains[], approval_status, origin (self|organizer|import),
                    account_manager_id (organizers), created_at
contacts            id, user_id (auth), company_id, name, email, phone, job_title, relationship_role,
                    company_role (manager|member), status (active|pending|inactive),
                    notification_prefs (json), anonymized_at, created_at
                    -- um user pode ter vários contacts ao longo do tempo (troca de emprego), só um ativo
contact_join_requests  id, company_id, user_id, email, status, decided_by, decided_at
invitations         id, company_id, email, company_role, invited_by, token_hash, expires_at, accepted_at
organizers          id, user_id (auth), name, role (organizer|admin), active, deactivated_at

-- Comercial
stand_tiers         id, edition_id, name, color, price_1_day_cents, price_2_days_cents, price_3_days_cents
stands              id, edition_id, code, tier_id, x, y, width, height, is_blocked, notes
support_packages    id, edition_id, name, price_cents, max_slots, benefits (json)
addons              id, edition_id, name, kind (activity|promotion), price_cents
registrations       id, edition_id, company_id, support_package_id (nullable), status, num_representatives,
                    special_needs, notes, payment_due_at, paid_at, cancel_reason, created_at
                    (unique edition_id + company_id)
registration_addons id, registration_id, addon_id
registration_status_history  id, registration_id, from_status, to_status, changed_by, changed_at, note

-- Reuniões e estandes
meeting_slots       id, edition_id, starts_at, ends_at, location, organizer_id
meeting_bookings    id, slot_id, registration_id, booked_by, booked_at, cancelled_at
                    (unique slot_id where cancelled_at is null; unique registration_id where cancelled_at is null)
stand_reservations  id, stand_id, edition_day_id, registration_id, reserved_by, reserved_at,
                    released_at, released_by, release_reason
                    (UNIQUE stand_id + edition_day_id WHERE released_at IS NULL)  <- regra "um estande, uma empresa por dia"

-- Atividades
activities          id, edition_id, kind (talk|workshop|roundtable|other), title, starts_at, ends_at, location
activity_participants  id, activity_id, registration_id, speaker_name, speaker_role

-- Comunicação
deadlines           id, edition_id, title, description, due_at, task_template_id (nullable)
notices             id, edition_id, title, body, audience (json), is_mandatory, publish_at, sent_at, created_by
notice_recipients   notice_id, contact_id, email_status   -- público congelado no envio
notice_reads        notice_id, contact_id, read_at
messages            id, company_id, edition_id, sender_user_id, body, attachments, created_at
message_reads       message_id, user_id, read_at
email_log           id, to, template, related_entity, sent_at, status

-- Pendências
tasks               id, edition_id, title, description, due_at, scope (all_exhibitors|specific)
task_assignments    id, task_id, registration_id, status, completed_at, completed_by   -- status por empresa

-- Documentos e contratos
documents           id, edition_id, company_id (nullable = geral), category, title,
                    visibility (all|managers|organizers), created_by
document_versions   id, document_id, version_number, file_path, uploaded_by, comment, created_at
contracts           id, registration_id, document_id, status, awaiting_party, signature_provider,
                    signature_provider_id, signed_file_path, signed_at
contract_signers    id, contract_id, party (company|sanfran), role (signer|witness), name, email, cpf, signed_at
representatives     id, registration_id, name, role

-- Organização e conformidade
internal_notes      id, company_id, author_id, body, created_at, deleted_at
audit_log           id, actor_id (nullable = sistema), action, entity, entity_id, diff (json), created_at
privacy_consents    id, user_id, policy_version, accepted_at, ip
```

---

## 6. Segurança

- **Row Level Security** em todas as tabelas. Contatos só leem e escrevem linhas da própria `company_id`; dados financeiros e contratuais só para Gestores. `internal_notes` e `audit_log` são exclusivos de organizadores.
- Arquivos no Storage em buckets privados, com URLs assinadas e temporárias. Mesmas regras por empresa e por nível.
- Ações de organizador validadas no servidor (nunca confiar no front-end), incluindo a regra "Organizador só reserva para as próprias empresas".
- Organizadores desativados perdem acesso imediatamente.
- Segredos apenas em variáveis de ambiente. Nunca no código nem no repositório.
- Ambientes separados: **teste** e **produção**.
- Limite de tentativas no envio e na validação do código de acesso, nos convites e nos pedidos de vínculo.
- Webhooks do provedor de assinatura com verificação de assinatura e processamento idempotente.

## 7. Requisitos não funcionais

- **Idioma:** interface 100% em português do Brasil. Datas no formato `dd/mm/aaaa`, fuso `America/Sao_Paulo`, valores em R$.
- **Responsivo:** funcionar bem no celular (recrutadores acessam pelo telefone; organizadores reservam estandes durante as reuniões).
- **Acessibilidade:** contraste adequado, navegação por teclado, labels em todos os campos.
- **LGPD:** política de privacidade, registro de consentimento, coleta mínima de dados, exportação de dados de um contato a pedido e **exclusão por anonimização** (nome, e-mail e telefone substituídos; histórico preservado sem identificar a pessoa).
- **Identidade visual:** a da **Semana do Estágio** (arquivos em `docs/marca/`):
  - Azul-marinho (aprox. `#001E50`) como cor principal; dourado em degradê (`#F5DC9A` → `#DDB143`) para destaques; cinza-claro (`#E5E4E2`) de fundo com o padrão de linhas da apresentação.
  - Fontes: **Noto Serif** (títulos) e **Montserrat** (textos).
  - Logo da Semana do Estágio no topo; logo da SanFran Jr. discreto no rodapé.
  - Os SVGs da Semana do Estágio usam a fonte **Aleo** no texto: usar PNG ou carregar a Aleo para não renderizar errado.
  - Aparência sóbria e profissional (o público é de grandes escritórios e bancos).
- **Continuidade:** o portal será passado a outro membro na próxima gestão. Preferir soluções simples e documentadas. Contas de serviços (GitHub, Supabase, Vercel, Resend) em nome do e-mail institucional **semanadoestagio@sanfranjr.com**, não pessoal.
- **Custo:** zero durante o desenvolvimento. Na temporada da feira, o mínimo necessário: Supabase Pro (backup e sem pausa) e Resend Pro (volume de e-mails). Plano da Vercel a decidir com a diretoria (o gratuito proíbe uso comercial).

## 8. Stack técnica

- **Next.js** (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Supabase:** Postgres, Auth (código por e-mail), Storage, Realtime, RLS
- **Resend** + React Email para e-mails transacionais
- **Vercel** para hospedagem; cron jobs (Vercel Cron ou Supabase pg_cron) para lembretes e avisos agendados
- **Playwright** para testes ponta a ponta; **Vitest** para testes unitários
- Provedor de assinatura eletrônica: a definir na Fase 5 (ZapSign, Clicksign ou D4Sign)

---

## 9. Fases de entrega e critérios de aceite

### Fase 0: Fundação
- Projeto criado, repositório privado no GitHub, deploy de teste na Vercel, Supabase conectado.
- Esquema inicial do banco com migrations e RLS.
- Layout base com a identidade da Semana do Estágio (cabeçalho, navegação, rodapé).
- ✅ *Aceite:* site de teste no ar com página inicial pública.

### Fase 1: Cadastro e contatos
- Login por código, cadastro de empresa, cadastro pela organização com convite, aprovação, níveis Gestor/Membro, vínculo por domínio, edição de dados, consentimento LGPD, importação das planilhas.
- ✅ *Aceite:* duas empresas de teste cadastradas, e uma não consegue ver os dados da outra; um Membro não vê dados financeiros (testes automatizados comprovando).

### Fase 2: Reuniões e estandes
- Agendamento de reuniões comerciais, cadastro de faixas e estandes, mapa sobre a planta, reserva por dia, bloqueio e remanejamento pelo Administrador.
- ✅ *Aceite:* dois organizadores tentando reservar o mesmo estande no mesmo dia ao mesmo tempo resulta em uma única reserva; um Organizador não consegue reservar para empresa de outro responsável.

### Fase 3: Mural e e-mails
- Linha do tempo, avisos com público-alvo, envio automático, agendamento, confirmação de leitura, lembretes de prazo.
- ✅ *Aceite:* publicar um aviso só para o segmento "bancos" faz apenas os contatos de bancos receberem o e-mail.

### Fase 4: Inscrição, valores e Portal do Expositor
- Inscrição, pacotes com vagas, itens avulsos, cálculo do valor, pagamento e NF, pipeline de status, checklist por empresa, atividades, representantes, documentos, mensagens.
- ✅ *Aceite:* uma empresa se inscreve, reserva estande, o organizador muda o status e a empresa recebe e-mail e vê o Portal do Expositor; a terceira empresa a pedir o pacote Master (2 vagas) é impedida.

### Fase 5: Contratos
- Versionamento, status com responsável, signatários, notificações e integração com assinatura eletrônica (ambiente sandbox do provedor).
- ✅ *Aceite:* um contrato passa por 3 versões e é assinado no sandbox por signatário externo, dois presidentes e testemunha, com o PDF final arquivado automaticamente.

### Fase 6: Painel master
- Dashboard, ficha completa da empresa, notas internas, mapa em tempo real, exportações, auditoria, gestão de organizadores, duplicação de edição.
- ✅ *Aceite:* dois organizadores em computadores diferentes veem a mesma reserva aparecer em tempo real.

### Fase 7: Lançamento
- Revisão de segurança, testes ponta a ponta dos fluxos principais, política de privacidade, README de passagem de bastão, migração de produção, domínio e e-mail configurados.
- Piloto com 2 ou 3 empresas parceiras antes da abertura geral.
- ✅ *Aceite:* piloto concluído sem bloqueios e checklist de lançamento completo.

---

## 10. Fora do escopo da v1

- App de celular nativo (o site responsivo basta).
- Pagamento online dentro do portal (apenas registro de pagamento e NF).
- Área do estudante: inscrição de alunos, currículos, BIP e agendamento de entrevistas *(candidato à v2)*.
- **Turnos de Processo Seletivo** na Sala Exclusiva: o formato vai mudar na próxima edição. Na v1, o pacote só registra quantos turnos inclui.
- **Sistema de Valorização** (pontuação das empresas para a primeira lista da edição seguinte): continua em planilha.
- Assinatura eletrônica própria.
- Geração automática da apresentação comercial personalizada por empresa *(ideia para v2)*.

## 11. Decisões e questões em aberto

### Decididas (21/10/2026)
| # | Tema | Decisão |
|---|---|---|
| 1 | Cotas | Mudam todo ano: o Administrador cadastra faixas de estande (preço por 1/2/3 dias) e pacotes de apoio (preço e vagas) por edição. Referência 2026 no PDF de `docs/referencias`. |
| 2 | Aprovação de cadastro | Manual para autocadastro; empresas criadas pela organização já nascem aprovadas. |
| 3 | Reuniões | A grade de disponibilidade vira **agendamento de reunião comercial** com a SanFran Jr. |
| 4 | Estandes | Só a organização reserva, durante a reunião; quem se reúne primeiro escolhe primeiro. Reserva por dia, sem prazo de expiração. |
| 5 | Planta | Existe (slides 33 e 34 da apresentação 2026). |
| 6 | Assinatura | Pela SanFran Jr.: dois presidentes + uma testemunha. Provedor a escolher na Fase 5. |
| 7 | Domínio | Subdomínio de `sanfranjr.com.br` (ex.: `expositor.sanfranjr.com.br`); e-mails de subdomínio próprio. |
| 8 | Histórico | Há planilhas; importador na Fase 1. |

### Ainda em aberto
1. **Encarregado de dados (LGPD):** a SanFran Jr. ainda não tem. Pendência da diretoria antes do lançamento. *(Fase 7)*
2. **Orçamento:** confirmar Supabase Pro e Resend Pro na temporada e o plano da Vercel. *(Fase 7)*
3. **Segunda testemunha:** avaliar se o contrato deve ter duas testemunhas (art. 784, III, CPC). *(Fase 5)*
4. **Datas da edição 2027:** dias da feira, período de reuniões e abertura das inscrições. *(Fase 2)*
5. **Preços 2027** das faixas (1, 2 e 3 dias) e dos pacotes. *(Fase 4)*
6. **Itens adicionais de estande** (fornecidos pela Lunar Eventos): passam pelo portal ou são contratados direto com o fornecedor? *(Fase 4)*
7. **Modelo de contrato** em Word e dados da SanFran Jr. para contrato e NF. *(Fase 5)*
8. **Acesso ao DNS** de `sanfranjr.com.br` (normalmente no Registro.br). *(Fase 7)*
