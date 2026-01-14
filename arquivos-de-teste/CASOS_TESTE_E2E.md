# 🧪 Casos de Teste E2E - Fase 3 (Playwright)

## 📋 **Cenários de Teste da Tela de Login**

### **CT-001: Fluxo de Login com Sucesso**
**Objetivo:** Validar login completo com credenciais válidas

**Pré-condições:**
- Backend rodando na porta 3001
- Frontend rodando na porta 3000
- Usuário cadastrado: teste@email.com / senha: 123456

**Passos:**
1. Acessar `http://localhost:3000`
2. Preencher campo email: `teste@email.com`
3. Preencher campo senha: `123456`
4. Clicar no botão "Entrar na Plataforma"

**Resultado Esperado:**
- ✅ Redirecionamento para `/dashboard`
- ✅ Nome do usuário visível no header
- ✅ Email do usuário visível no header
- ✅ Token salvo no cookie

---

### **CT-002: Login com Email Inválido**
**Objetivo:** Validar rejeição de email inexistente

**Passos:**
1. Acessar `http://localhost:3000`
2. Preencher email: `naoexiste@email.com`
3. Preencher senha: `123456`
4. Clicar em "Entrar na Plataforma"

**Resultado Esperado:**
- ❌ Permanece na página de login
- ❌ Mensagem de erro exibida
- ❌ Texto: "Credenciais inválidas" ou similar

---

### **CT-003: Login com Senha Incorreta**
**Objetivo:** Validar rejeição de senha errada

**Passos:**
1. Acessar `http://localhost:3000`
2. Preencher email: `teste@email.com`
3. Preencher senha: `senhaerrada`
4. Clicar em "Entrar na Plataforma"

**Resultado Esperado:**
- ❌ Permanece na página de login
- ❌ Mensagem de erro exibida
- ❌ Texto: "Credenciais inválidas" ou "Senha incorreta"

---

### **CT-004: Validação de Email Vazio**
**Objetivo:** Validar campo obrigatório de email

**Passos:**
1. Acessar `http://localhost:3000`
2. Deixar campo email vazio
3. Preencher senha: `123456`
4. Clicar fora do campo email (blur)

**Resultado Esperado:**
- ❌ Mensagem de erro abaixo do campo
- ❌ Texto: "Campo obrigatório"
- ❌ Borda vermelha no campo email

---

### **CT-005: Validação de Email com Formato Inválido**
**Objetivo:** Validar formato de email

**Passos:**
1. Acessar `http://localhost:3000`
2. Preencher email: `emailinvalido`
3. Clicar fora do campo (blur)

**Resultado Esperado:**
- ❌ Mensagem de erro: "Email inválido"
- ❌ Borda vermelha no campo

---

### **CT-006: Validação de Senha Vazia**
**Objetivo:** Validar campo obrigatório de senha

**Passos:**
1. Acessar `http://localhost:3000`
2. Preencher email: `teste@email.com`
3. Deixar senha vazia
4. Clicar fora do campo senha (blur)

**Resultado Esperado:**
- ❌ Mensagem de erro: "Campo obrigatório"
- ❌ Borda vermelha no campo senha

---

### **CT-007: Validação de Senha Fora do Padrão**
**Objetivo:** Validar tamanho da senha (3-6 caracteres)

**Passos:**
1. Acessar `http://localhost:3000`
2. Preencher email: `teste@email.com`
3. Preencher senha: `12` (muito curta)
4. Clicar fora do campo (blur)

**Resultado Esperado:**
- ❌ Mensagem: "Senha deve ter entre 3 e 6 caracteres"
- ❌ Borda vermelha no campo

---

### **CT-008: Estado de Loading Durante Login**
**Objetivo:** Validar feedback visual durante requisição

**Passos:**
1. Acessar `http://localhost:3000`
2. Preencher credenciais válidas
3. Clicar em "Entrar na Plataforma"
4. Observar botão durante requisição

**Resultado Esperado:**
- ✅ Botão desabilitado
- ✅ Texto muda para "Entrando..."
- ✅ Spinner/loading visível
- ✅ Botão volta ao normal após resposta

---

## 📋 **Cenários de Teste de Registro**

### **CT-009: Registro de Novo Usuário com Sucesso**
**Objetivo:** Validar criação de conta completa

**Passos:**
1. Acessar `http://localhost:3000`
2. Clicar em "Não tem conta? Criar uma agora"
3. Preencher nome: `Novo Usuário`
4. Preencher email: `novo-${timestamp}@email.com`
5. Preencher senha: `123456`
6. Clicar em "Criar Minha Conta"

**Resultado Esperado:**
- ✅ Mensagem de sucesso
- ✅ Redirecionamento para `/dashboard`
- ✅ Login automático realizado
- ✅ Token salvo no cookie

---

### **CT-010: Registro com Email Duplicado**
**Objetivo:** Validar rejeição de email já cadastrado

**Passos:**
1. Acessar `http://localhost:3000`
2. Clicar em "Criar conta"
3. Preencher nome: `Teste`
4. Preencher email: `teste@email.com` (já existe)
5. Preencher senha: `123456`
6. Clicar em "Criar Minha Conta"

**Resultado Esperado:**
- ❌ Mensagem de erro
- ❌ Texto: "Usuário já existe com este email"
- ❌ Permanece na tela de registro

---

### **CT-011: Registro sem Nome**
**Objetivo:** Validar campo obrigatório nome

**Passos:**
1. Acessar `http://localhost:3000`
2. Clicar em "Criar conta"
3. Deixar nome vazio
4. Preencher email e senha
5. Clicar em "Criar Minha Conta"

**Resultado Esperado:**
- ❌ Mensagem de erro
- ❌ Registro não realizado

---

### **CT-012: Registro com Senha Curta**
**Objetivo:** Validar senha mínima de 6 caracteres

**Passos:**
1. Acessar `http://localhost:3000`
2. Clicar em "Criar conta"
3. Preencher nome e email
4. Preencher senha: `12345` (5 caracteres)
5. Clicar em "Criar Minha Conta"

**Resultado Esperado:**
- ❌ Validação HTML5 impede envio
- ❌ Mensagem: mínimo 6 caracteres

---

### **CT-013: Toggle entre Login e Registro**
**Objetivo:** Validar alternância entre formulários

**Passos:**
1. Acessar `http://localhost:3000`
2. Clicar em "Não tem conta? Criar uma agora"
3. Verificar formulário de registro visível
4. Clicar em "Já tem conta? Fazer login"
5. Verificar formulário de login visível

**Resultado Esperado:**
- ✅ Formulário de registro aparece/desaparece
- ✅ Texto do botão alterna corretamente
- ✅ Campos corretos visíveis em cada modo

---

## 📋 **Cenários de Teste de Navegação**

### **CT-014: Acesso Direto ao Dashboard sem Login**
**Objetivo:** Validar proteção de rota

**Passos:**
1. Limpar cookies
2. Acessar diretamente `http://localhost:3000/dashboard`

**Resultado Esperado:**
- ✅ Redirecionamento automático para `/`
- ✅ Middleware de autenticação funcionando

---

### **CT-015: Logout do Sistema**
**Objetivo:** Validar saída do usuário

**Passos:**
1. Fazer login com sucesso
2. Estar no `/dashboard`
3. Clicar no botão "Sair"

**Resultado Esperado:**
- ✅ Redirecionamento para `/`
- ✅ Cookie removido
- ✅ Não consegue acessar `/dashboard` novamente

---

### **CT-016: Persistência de Sessão**
**Objetivo:** Validar que sessão persiste após reload

**Passos:**
1. Fazer login com sucesso
2. Estar no `/dashboard`
3. Recarregar página (F5)

**Resultado Esperado:**
- ✅ Permanece no `/dashboard`
- ✅ Dados do usuário ainda visíveis
- ✅ Token ainda válido

---

## 📋 **Cenários de Teste de Responsividade**

### **CT-017: Layout Mobile (375px)**
**Objetivo:** Validar interface em mobile

**Passos:**
1. Configurar viewport: 375x667
2. Acessar `http://localhost:3000`
3. Verificar elementos

**Resultado Esperado:**
- ✅ Formulário responsivo
- ✅ Botões acessíveis
- ✅ Textos legíveis
- ✅ Sem scroll horizontal

---

### **CT-018: Layout Tablet (768px)**
**Objetivo:** Validar interface em tablet

**Passos:**
1. Configurar viewport: 768x1024
2. Acessar `http://localhost:3000`
3. Verificar elementos

**Resultado Esperado:**
- ✅ Layout adaptado
- ✅ Elementos bem posicionados

---

### **CT-019: Layout Desktop (1920px)**
**Objetivo:** Validar interface em desktop

**Passos:**
1. Configurar viewport: 1920x1080
2. Acessar `http://localhost:3000`
3. Verificar elementos

**Resultado Esperado:**
- ✅ Layout centralizado
- ✅ Espaçamento adequado
- ✅ Design premium visível

---

## 📋 **Cenários de Teste de Acessibilidade**

### **CT-020: Navegação por Teclado**
**Objetivo:** Validar acessibilidade via teclado

**Passos:**
1. Acessar `http://localhost:3000`
2. Usar TAB para navegar entre campos
3. Usar ENTER para submeter

**Resultado Esperado:**
- ✅ Foco visível em cada campo
- ✅ Ordem lógica de navegação
- ✅ ENTER submete formulário

---

### **CT-021: Labels e Placeholders**
**Objetivo:** Validar textos descritivos

**Passos:**
1. Acessar `http://localhost:3000`
2. Verificar placeholders dos campos

**Resultado Esperado:**
- ✅ Placeholder: "Digite seu email"
- ✅ Placeholder: "Digite sua senha"
- ✅ Textos claros e descritivos

---

## 📊 **Resumo dos Casos de Teste**

| Categoria | Quantidade | Prioridade |
|-----------|------------|------------|
| **Login** | 8 testes | Alta |
| **Registro** | 5 testes | Alta |
| **Navegação** | 3 testes | Média |
| **Responsividade** | 3 testes | Média |
| **Acessibilidade** | 2 testes | Baixa |
| **TOTAL** | **21 testes** | - |

---

## 🎯 **Priorização para Implementação**

### **Prioridade ALTA (Implementar primeiro):**
- CT-001: Login com sucesso
- CT-002: Login com email inválido
- CT-003: Login com senha incorreta
- CT-009: Registro com sucesso
- CT-014: Proteção de rota

### **Prioridade MÉDIA:**
- CT-004 a CT-008: Validações de campos
- CT-010 a CT-013: Validações de registro
- CT-015 a CT-016: Navegação

### **Prioridade BAIXA:**
- CT-017 a CT-021: Responsividade e acessibilidade

---

**Status:** 📋 Casos de teste documentados  
**Próximo:** 🚀 Implementação com Playwright