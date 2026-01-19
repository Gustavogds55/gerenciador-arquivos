# 📋 Regras de Negócio - CloudVault (ATUALIZADO)

## 🔐 **AUTENTICAÇÃO E USUÁRIOS**

### **Registro de Usuário**
- ✅ **Nome:** Obrigatório, texto livre
- ✅ **Email:** Obrigatório, formato válido, único no sistema
- ✅ **Senha:** Mínimo 6 caracteres, criptografada com bcrypt
- ✅ **Verificação:** Sistema impede emails duplicados
- ❌ **Auto-login:** REMOVIDO - Após registro, usuário deve fazer login manualmente
- ✅ **Mensagem:** "Conta criada com sucesso! Faça login para continuar."

### **Login de Usuário**
- ✅ **Email:** Obrigatório, deve existir no sistema
- ✅ **Senha:** Obrigatório, entre 3-6 caracteres (validação frontend)
- ✅ **Autenticação:** Verificação de senha com bcrypt
- ✅ **Token JWT:** Gerado com validade de 7 dias
- ✅ **Sessão:** Mantida via cookie seguro

### **Validações de Email**
- ✅ **Formato:** Regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- ✅ **Frontend:** Validação em tempo real no login
- ✅ **Backend:** Validação no registro e login
- ✅ **Mensagens:** "Email inválido" para formato incorreto

### **Segurança**
- ✅ **Criptografia:** Senhas hasheadas com bcrypt (salt 10)
- ✅ **JWT:** Tokens com expiração de 7 dias
- ✅ **Middleware:** Rotas protegidas requerem autenticação
- ✅ **Validação:** Dupla validação (frontend + backend)
- ✅ **Proteção de Rotas:** Acesso direto ao `/dashboard` redireciona para `/`

---

## 📁 **GERENCIAMENTO DE ARQUIVOS**

### **Upload de Arquivos**
- ✅ **Autenticação:** Apenas usuários logados podem fazer upload
- ✅ **Organização:** Arquivos organizados por usuário no S3
- ✅ **Estrutura:** `uploads/{email_usuario}/{timestamp}-{nome_arquivo}`
- ✅ **Múltiplos:** Suporte a upload de múltiplos arquivos
- ✅ **Interface:** Drag & drop visual com progresso

### **Armazenamento AWS S3**
- ✅ **Bucket:** `gerenciador-arquivos-gustavo`
- ✅ **Região:** `us-east-1`
- ✅ **Permissões:** Usuário IAM com AmazonS3FullAccess
- ✅ **URLs:** Geração automática de URLs públicas
- ✅ **Organização:** Separação por usuário com timestamp

### **Listagem de Arquivos**
- ✅ **Filtro:** Usuário vê apenas seus próprios arquivos
- ✅ **Informações:** Nome, URL, data de upload
- ✅ **Acesso:** Links diretos para visualização/download

---

## 🎨 **INTERFACE E EXPERIÊNCIA**

### **Design**
- ✅ **Tema:** Glassmorphism com gradientes
- ✅ **Responsivo:** Funciona em desktop e mobile
- ✅ **Animações:** Transições suaves e efeitos visuais
- ✅ **Feedback:** Mensagens de sucesso/erro em tempo real
- ✅ **Toggle:** Alternância entre formulários de login e registro

### **Navegação**
- ✅ **Proteção:** Middleware redireciona não-autenticados para `/`
- ✅ **Fluxo:** Login → Dashboard → Upload
- ✅ **Persistência:** Sessão mantida entre recarregamentos
- ✅ **Logout:** Botão "Sair" remove cookie e redireciona para `/`

---

## 🛠️ **TECNOLOGIAS E INFRAESTRUTURA**

### **Backend (NodeJS)**
- ✅ **Framework:** Express.js
- ✅ **Banco:** DynamoDB (tabela: gerenciador-users)
- ✅ **Storage:** AWS S3
- ✅ **Documentação:** Swagger UI disponível
- ✅ **Porta:** 3001
- ✅ **Testes:** Jest + Supertest (13 testes de API)

### **Frontend (NuxtJS)**
- ✅ **Framework:** Nuxt 3 + Vue 3
- ✅ **Estilo:** TailwindCSS
- ✅ **HTTP:** $fetch para requisições
- ✅ **Porta:** 3000
- ✅ **Testes:** Vitest + Vue Test Utils (41 testes unitários)

### **Testes E2E (Playwright)**
- ✅ **Framework:** Playwright
- ✅ **Browsers:** Chromium, Firefox, WebKit, Mobile
- ✅ **Testes:** 19 testes implementados
- ✅ **Cobertura:** Login, Registro, Navegação, Toggle

### **AWS Services**
- ✅ **S3:** Armazenamento de arquivos
- ✅ **DynamoDB:** Banco de dados de usuários
- ✅ **IAM:** Controle de permissões

---

## 📊 **VALIDAÇÕES E LIMITES**

### **Campos Obrigatórios**
- ✅ **Registro:** Nome, email (formato válido), senha (6+ caracteres)
- ✅ **Login:** Email (formato válido), senha (3-6 caracteres)
- ✅ **Upload:** Arquivo selecionado, usuário autenticado

### **Limites e Validações**
- ✅ **Email:** Formato obrigatório com regex
- ✅ **Senha Login:** 3-6 caracteres (frontend)
- ✅ **Senha Registro:** Mínimo 6 caracteres (backend)
- ✅ **Token JWT:** 7 dias de validade
- ✅ **Unicidade:** Email único no sistema

### **Tratamento de Erros**
- ✅ **Email duplicado:** "Usuário já existe com este email"
- ✅ **Email inválido:** "Email inválido"
- ✅ **Login inválido:** "Usuário não encontrado" / "Senha incorreta"
- ✅ **Campos vazios:** "Campo obrigatório" / "Nome, email e senha são obrigatórios"
- ✅ **Senha curta:** "Senha deve ter pelo menos 6 caracteres"
- ✅ **Upload:** Feedback visual de progresso

---

## 🔄 **FLUXOS PRINCIPAIS ATUALIZADOS**

### **Fluxo de Registro (ATUALIZADO)**
1. Usuário acessa `/`
2. Clica em "Não tem conta? Criar uma agora"
3. Preenche nome, email (formato válido), senha (6+ caracteres)
4. Sistema valida formato de email e cria usuário
5. **NOVO:** Exibe mensagem "Conta criada com sucesso! Faça login para continuar."
6. **NOVO:** Volta para formulário de login (não faz login automático)

### **Fluxo de Login**
1. Usuário acessa `/`
2. Preenche email e senha (3-6 caracteres)
3. Sistema autentica credenciais
4. Gera token JWT
5. Redireciona para `/dashboard`

### **Fluxo de Upload**
1. Usuário autenticado acessa `/dashboard`
2. Seleciona arquivos (drag & drop ou clique)
3. Sistema faz upload para S3 com timestamp
4. Organiza em `uploads/{email}/{timestamp}-{arquivo}`
5. Retorna URL pública
6. Atualiza lista de arquivos

### **Fluxo de Logout (NOVO)**
1. Usuário no `/dashboard`
2. Clica no botão "Sair"
3. Sistema remove cookie de autenticação
4. Redireciona para `/`
5. Usuário não consegue mais acessar `/dashboard`

---

## 🧪 **COBERTURA DE TESTES**

### **Testes de API (Backend)**
- ✅ **13 testes** com Jest + Supertest
- ✅ Registro, Login, Perfil protegido
- ✅ Validações de erro e sucesso

### **Testes Unitários (Frontend)**
- ✅ **41 testes** com Vitest + Vue Test Utils
- ✅ Validações de email e senha
- ✅ Middleware de autenticação
- ✅ Utilitários e helpers

### **Testes E2E (Playwright)**
- ✅ **19 testes** implementados
- ✅ **Login:** 8 testes (sucesso, validações, loading)
- ✅ **Registro:** 7 testes (sucesso, validações, campos obrigatórios)
- ✅ **Navegação:** 3 testes (proteção, logout, persistência)
- ✅ **Toggle:** 1 teste (alternância de formulários)

---

## 🎯 **STATUS ATUAL**
- ✅ **Sistema:** 100% funcional
- ✅ **Autenticação:** Completa e segura
- ✅ **Upload:** Funcionando com AWS S3
- ✅ **Interface:** Design moderno implementado
- ✅ **Testes:** 73 testes automatizados (API + Unitários + E2E)
- ✅ **Validações:** Dupla validação frontend/backend
- ✅ **Segurança:** Proteção de rotas e JWT

---

**Última atualização:** 14/01/2025
**Versão:** 2.0 - Sistema CloudVault com Testes Completos