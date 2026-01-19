# 🧪 Casos de Teste E2E - CloudVault (IMPLEMENTADOS)

## 📊 **Status dos Testes Implementados**

### ✅ **COMPLETOS (19 testes)**
- **Login:** 8 testes
- **Registro:** 7 testes  
- **Navegação:** 3 testes
- **Toggle:** 1 teste

---

## 🔐 **Testes de Login (8 testes)**

### **CT-001: Login Sucesso**
```javascript
test('Login sucesso', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
  await page.getByPlaceholder('Digite sua senha').fill('123456');
  await page.getByRole('button', { name: 'Entrar na Plataforma' }).click();
  await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
});
```

### **CT-002: Usuario Invalido**
```javascript
test('Usuario invalido', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Digite seu email').fill('naoexiste@email.com');
  await page.getByPlaceholder('Digite sua senha').fill('123456');
  await page.getByRole('button', { name: 'Entrar na Plataforma' }).click();
  await expect(page.getByText('Usuário não encontrado')).toBeVisible();
  await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
});
```

### **CT-003: Senha Invalida**
```javascript
test('Senha invalida', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
  await page.getByPlaceholder('Digite sua senha').fill('senhaerrada');
  await page.getByRole('button', { name: 'Entrar na Plataforma' }).click();
  await expect(page.getByText('Senha incorreta')).toBeVisible();
  await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
});
```

### **CT-004: Email Vazio**
```javascript
test('Email vazio', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Digite sua senha').fill('123456');
  await page.getByPlaceholder('Digite seu email').click();
  await page.getByPlaceholder('Digite sua senha').click();
  await expect(page.getByText('Campo obrigatório')).toBeVisible();
  await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
});
```

### **CT-005: Senha Vazia**
```javascript
test('Senha vazia', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
  await page.getByPlaceholder('Digite sua senha').click();
  await page.getByPlaceholder('Digite seu email').click();
  await expect(page.getByText('Campo obrigatório')).toBeVisible();
  await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
});
```

### **CT-006: Email Invalido**
```javascript
test('Email invalido', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Digite seu email').fill('emailinvalido');
  await page.getByPlaceholder('Digite sua senha').click();
  await expect(page.getByText('Email inválido')).toBeVisible();
  await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
});
```

### **CT-007: Senha Fora do Padrão**
```javascript
test('Senha fora do padrao', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
  await page.getByPlaceholder('Digite sua senha').fill('12');
  await page.getByPlaceholder('Digite seu email').click();
  await expect(page.getByText('Senha deve ter entre 3 e 6 caracteres')).toBeVisible();
  await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
});
```

### **CT-008: Loading Durante Login**
```javascript
test('Loading durante login', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
  await page.getByPlaceholder('Digite sua senha').fill('123456');
  const loginButton = page.getByRole('button', { name: 'Entrar na Plataforma' });
  await loginButton.click();
  await expect(page.getByText('Entrando...')).toBeVisible();
});
```

---

## 📝 **Testes de Registro (7 testes)**

### **CT-009: Registro Sucesso**
```javascript
test('Registro sucesso', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Não tem conta? Criar uma agora').click();
  await page.getByPlaceholder('Seu nome completo').fill('Novo Usuário');
  await page.getByPlaceholder('Seu melhor email').fill(`novo-${Date.now()}@email.com`);
  await page.getByPlaceholder('Crie uma senha segura').fill('123456');
  await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
  await expect(page.getByText('Conta criada com sucesso! Faça login para continuar.')).toBeVisible();
});
```

### **CT-010: Email Duplicado**
```javascript
test('Email duplicado', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Não tem conta? Criar uma agora').click();
  await page.getByPlaceholder('Seu nome completo').fill('Teste');
  await page.getByPlaceholder('Seu melhor email').fill('teste@email.com');
  await page.getByPlaceholder('Crie uma senha segura').fill('123456');
  await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
  await expect(page.getByText('Usuário já existe com este email')).toBeVisible();
});
```

### **CT-011: Registro sem Nome**
```javascript
test('Registro sem nome', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Não tem conta? Criar uma agora').click();
  await page.getByPlaceholder('Seu melhor email').fill('novo@email.com');
  await page.getByPlaceholder('Crie uma senha segura').fill('123456');
  await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
  await expect(page.getByText('Nome, email e senha são obrigatórios')).toBeVisible();
});
```

### **CT-012: Senha Curta**
```javascript
test('Senha curta', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Não tem conta? Criar uma agora').click();
  await page.getByPlaceholder('Seu nome completo').fill('Teste');
  await page.getByPlaceholder('Seu melhor email').fill('novo@email.com');
  await page.getByPlaceholder('Crie uma senha segura').fill('12345');
  await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
  await expect(page.getByText('Senha deve ter pelo menos 6 caracteres')).toBeVisible();
});
```

### **CT-013: Registro sem Email**
```javascript
test('Registro sem email', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Não tem conta? Criar uma agora').click();
  await page.getByPlaceholder('Seu nome completo').fill('Teste');
  await page.getByPlaceholder('Crie uma senha segura').fill('123456');
  await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
  await expect(page.getByText('Nome, email e senha são obrigatórios')).toBeVisible();
});
```

### **CT-014: Registro sem Senha**
```javascript
test('Registro sem senha', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Não tem conta? Criar uma agora').click();
  await page.getByPlaceholder('Seu nome completo').fill('Teste');
  await page.getByPlaceholder('Seu melhor email').fill('novo@email.com');
  await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
  await expect(page.getByText('Nome, email e senha são obrigatórios')).toBeVisible();
});
```

### **CT-015: Email Formato Inválido**
```javascript
test('Email formato invalido', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Não tem conta? Criar uma agora').click();
  await page.getByPlaceholder('Seu nome completo').fill('Teste');
  await page.getByPlaceholder('Seu melhor email').fill('emailinvalido');
  await page.getByPlaceholder('Crie uma senha segura').fill('123456');
  await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
  await expect(page.getByText('Email inválido')).toBeVisible();
});
```

---

## 🔄 **Testes de Navegação (3 testes)**

### **CT-016: Acesso Dashboard sem Login**
```javascript
test('Acesso dashboard sem login', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL('/', { timeout: 5000 });
  await expect(page.getByText('CloudVault')).toBeVisible();
  await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
});
```

### **CT-017: Logout**
```javascript
test('Logout', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
  await page.getByPlaceholder('Digite sua senha').fill('123456');
  await page.getByRole('button', { name: 'Entrar na Plataforma' }).click();
  await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
  await page.getByRole('button', { name: 'Sair' }).click();
  await expect(page).toHaveURL('/');
  await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
});
```

### **CT-018: Persistência de Sessão**
```javascript
test('Persistencia sessao', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
  await page.getByPlaceholder('Digite sua senha').fill('123456');
  await page.getByRole('button', { name: 'Entrar na Plataforma' }).click();
  await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
  await page.reload();
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Teste User')).toBeVisible();
});
```

---

## 🎭 **Testes de Toggle (1 teste)**

### **CT-019: Toggle Formulários**
```javascript
test('Toggle formularios', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByPlaceholder('Digite seu email')).toBeVisible();
  await expect(page.getByPlaceholder('Digite sua senha')).toBeVisible();
  await page.getByText('Não tem conta? Criar uma agora').click();
  await expect(page.getByPlaceholder('Seu nome completo')).toBeVisible();
  await expect(page.getByPlaceholder('Seu melhor email')).toBeVisible();
  await expect(page.getByPlaceholder('Crie uma senha segura')).toBeVisible();
  await page.getByText('Já tem conta? Fazer login').click();
  await expect(page.getByPlaceholder('Digite seu email')).toBeVisible();
  await expect(page.getByPlaceholder('Digite sua senha')).toBeVisible();
});
```

---

## 🚀 **Como Executar os Testes**

### **Pré-requisitos:**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

### **Executar Testes:**
```bash
# Todos os testes E2E
npm run test:e2e

# Testes específicos
npx playwright test login.spec.js
npx playwright test registro.spec.js
npx playwright test navegacao.spec.js
npx playwright test toggle.spec.js

# Interface visual
npm run test:e2e:ui

# Ver relatório
npm run test:e2e:report
```

---

## 📊 **Cobertura de Testes Total**

| Tipo | Framework | Quantidade | Status |
|------|-----------|------------|--------|
| **API Backend** | Jest + Supertest | 13 testes | ✅ |
| **Frontend Unit** | Vitest + Vue Test Utils | 41 testes | ✅ |
| **E2E** | Playwright | 19 testes | ✅ |
| **TOTAL** | - | **73 testes** | ✅ |

---

**Status:** ✅ Todos os testes implementados e funcionando  
**Última atualização:** 14/01/2025  
**Versão:** 2.0 - CloudVault com Cobertura Completa