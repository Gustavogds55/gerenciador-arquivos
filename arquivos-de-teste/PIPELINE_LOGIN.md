# 🚀 Pipeline CI/CD - Testes de Login

## 📋 Visão Geral

Pipeline automatizado para executar os 8 casos de teste de login do CloudVault.

---

## ⚙️ Configuração

**Arquivo:** `.github/workflows/login-tests.yml`

**Triggers:**
- Push para branches `main` ou `develop`
- Pull Requests para `main` ou `develop`
- Execução manual via GitHub Actions

---

## 🔧 Etapas do Pipeline

### 1. **Checkout do Código**
- Clona o repositório

### 2. **Setup Node.js**
- Instala Node.js 18
- Configura cache de dependências

### 3. **Instalação de Dependências**
- Backend: `npm ci`
- Frontend: `npm ci`
- Playwright: `npx playwright install --with-deps chromium`

### 4. **Inicialização dos Serviços**
- Backend na porta 3001
- Frontend na porta 3000
- Aguarda 15 segundos para estabilização

### 5. **Execução dos Testes**
- Executa: `npx playwright test tests/e2e/login.spec.js`
- Gera relatório HTML

### 6. **Upload de Artefatos**
- Relatório completo (sempre)
- Screenshots de falhas (apenas se houver erro)

---

## 🔐 Secrets Necessários

Configure no GitHub: `Settings > Secrets and variables > Actions`

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET
AWS_S3_REGION
```

---

## 📊 Testes Executados

| ID | Caso de Teste | Validação |
|----|---------------|-----------|
| CT-001 | Login com Sucesso | Credenciais válidas |
| CT-002 | Usuário Inválido | Usuário não cadastrado |
| CT-003 | Senha Inválida | Senha incorreta |
| CT-004 | Email Vazio | Campo obrigatório |
| CT-005 | Senha Vazia | Campo obrigatório |
| CT-006 | Email Inválido | Formato de email |
| CT-007 | Senha Fora do Padrão | Tamanho mínimo |
| CT-008 | Loading Durante Login | Feedback visual |

---

## 🎯 Como Usar

### Execução Automática
O pipeline roda automaticamente em:
- Cada push para `main` ou `develop`
- Cada Pull Request

### Execução Manual
1. Acesse GitHub Actions
2. Selecione "Login Tests Pipeline"
3. Clique em "Run workflow"
4. Escolha a branch
5. Clique em "Run workflow"

---

## 📈 Visualizar Resultados

### No GitHub Actions:
1. Acesse a aba "Actions"
2. Clique no workflow executado
3. Veja o status de cada etapa

### Relatório HTML:
1. Acesse o workflow executado
2. Baixe o artefato "playwright-report-login"
3. Extraia e abra `index.html`

### Screenshots de Falhas:
1. Disponível apenas se houver falhas
2. Baixe o artefato "test-failures-login"
3. Veja screenshots e vídeos dos erros

---

## 🔄 Próximos Passos

Criar pipelines para:
- Testes de Registro
- Testes de Navegação
- Testes de Modal de Empresa
- Testes Completos (todos juntos)

---

**Status:** ✅ Pronto para uso
