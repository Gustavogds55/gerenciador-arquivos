# 🧪 Cenários e Casos de Teste - Login

## 📋 Cenário 1: Login com Sucesso

### CT-001: Login com credenciais válidas
**Pré-condição:** Usuário cadastrado (teste@email.com / 123456)

**Passos:**
1. Acessar página inicial (/)
2. Preencher email: "teste@email.com"
3. Preencher senha: "123456"
4. Clicar em "Entrar na Plataforma"

**Resultado Esperado:**
- Redireciona para /dashboard
- Modal de seleção de empresa aparece
- Token JWT salvo em cookie

---

## 📋 Cenário 2: Validações de Email

### CT-002: Email vazio
**Passos:**
1. Acessar página inicial
2. Deixar campo email vazio
3. Clicar no campo senha
4. Clicar fora dos campos

**Resultado Esperado:**
- Mensagem "Campo obrigatório" aparece
- Botão de login permanece habilitado
- Permanece na página de login

### CT-003: Email com formato inválido
**Passos:**
1. Acessar página inicial
2. Preencher email: "emailinvalido"
3. Clicar no campo senha

**Resultado Esperado:**
- Mensagem "Email inválido" aparece
- Permanece na página de login

### CT-004: Email não cadastrado
**Passos:**
1. Acessar página inicial
2. Preencher email: "naoexiste@email.com"
3. Preencher senha: "123456"
4. Clicar em "Entrar na Plataforma"

**Resultado Esperado:**
- Mensagem "Usuário não encontrado" aparece
- Permanece na página de login

---

## 📋 Cenário 3: Validações de Senha

### CT-005: Senha vazia
**Passos:**
1. Acessar página inicial
2. Preencher email: "teste@email.com"
3. Deixar campo senha vazio
4. Clicar no campo email

**Resultado Esperado:**
- Mensagem "Campo obrigatório" aparece
- Permanece na página de login

### CT-006: Senha fora do padrão (menos de 3 caracteres)
**Passos:**
1. Acessar página inicial
2. Preencher email: "teste@email.com"
3. Preencher senha: "12"
4. Clicar no campo email

**Resultado Esperado:**
- Mensagem "Senha deve ter entre 3 e 6 caracteres" aparece
- Permanece na página de login

### CT-007: Senha incorreta
**Passos:**
1. Acessar página inicial
2. Preencher email: "teste@email.com"
3. Preencher senha: "senhaerrada"
4. Clicar em "Entrar na Plataforma"

**Resultado Esperado:**
- Mensagem "Senha incorreta" aparece
- Permanece na página de login

---

## 📋 Cenário 4: Estados da Interface

### CT-008: Estado de loading durante login
**Passos:**
1. Acessar página inicial
2. Preencher email: "teste@email.com"
3. Preencher senha: "123456"
4. Clicar em "Entrar na Plataforma"
5. Observar botão durante requisição

**Resultado Esperado:**
- Texto do botão muda para "Entrando..."
- Botão fica desabilitado durante requisição
- Loading indicator visível

---

## 📋 Cenário 5: Navegação e Persistência

### CT-009: Redirecionamento após login bem-sucedido
**Passos:**
1. Fazer login com sucesso
2. Verificar URL

**Resultado Esperado:**
- URL muda para /dashboard
- Modal de empresa aparece automaticamente

### CT-010: Acesso direto ao dashboard sem autenticação
**Passos:**
1. Sem estar logado, acessar /dashboard diretamente

**Resultado Esperado:**
- Redireciona para página de login (/)
- Mensagem ou indicação de acesso negado

---

## 📊 Resumo dos Casos de Teste

| ID | Cenário | Prioridade |
|---|---|---|
| CT-001 | Login com sucesso | Alta |
| CT-002 | Email vazio | Alta |
| CT-003 | Email formato inválido | Média |
| CT-004 | Email não cadastrado | Alta |
| CT-005 | Senha vazia | Alta |
| CT-006 | Senha fora do padrão | Média |
| CT-007 | Senha incorreta | Alta |
| CT-008 | Estado de loading | Baixa |
| CT-009 | Redirecionamento | Alta |
| CT-010 | Proteção de rota | Alta |

**Total:** 10 casos de teste
**Prioridade Alta:** 7 casos
**Prioridade Média:** 2 casos
**Prioridade Baixa:** 1 caso
