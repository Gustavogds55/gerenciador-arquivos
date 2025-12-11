# 📋 Regras de Negócio - CloudVault

## 🔐 **AUTENTICAÇÃO E USUÁRIOS**

### **Registro de Usuário**
- ✅ **Nome:** Obrigatório, texto livre
- ✅ **Email:** Obrigatório, formato válido, único no sistema
- ✅ **Senha:** Mínimo 6 caracteres, criptografada com bcrypt
- ✅ **Verificação:** Sistema impede emails duplicados
- ✅ **Auto-login:** Após registro, usuário é logado automaticamente
- ✅ **Token JWT:** Gerado automaticamente com validade de 7 dias

### **Login de Usuário**
- ✅ **Email:** Obrigatório, deve existir no sistema
- ✅ **Senha:** Obrigatório, entre 3-6 caracteres (validação frontend)
- ✅ **Autenticação:** Verificação de senha com bcrypt
- ✅ **Token JWT:** Gerado com validade de 7 dias
- ✅ **Sessão:** Mantida via cookie seguro

### **Segurança**
- ✅ **Criptografia:** Senhas hasheadas com bcrypt (salt 10)
- ✅ **JWT:** Tokens com expiração de 7 dias
- ✅ **Middleware:** Rotas protegidas requerem autenticação
- ✅ **Validação:** Dupla validação (frontend + backend)

---

## 📁 **GERENCIAMENTO DE ARQUIVOS**

### **Upload de Arquivos**
- ✅ **Autenticação:** Apenas usuários logados podem fazer upload
- ✅ **Organização:** Arquivos organizados por usuário no S3
- ✅ **Estrutura:** `uploads/{email_usuario}/{nome_arquivo}`
- ✅ **Múltiplos:** Suporte a upload de múltiplos arquivos
- ✅ **Interface:** Drag & drop visual

### **Armazenamento AWS S3**
- ✅ **Bucket:** `gerenciador-arquivos-gustavo`
- ✅ **Região:** `us-east-1`
- ✅ **Permissões:** Usuário IAM com AmazonS3FullAccess
- ✅ **URLs:** Geração automática de URLs públicas
- ✅ **Organização:** Separação por usuário

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

### **Navegação**
- ✅ **Proteção:** Middleware redireciona não-autenticados
- ✅ **Fluxo:** Login → Dashboard → Upload
- ✅ **Persistência:** Sessão mantida entre recarregamentos

---

## 🛠️ **TECNOLOGIAS E INFRAESTRUTURA**

### **Backend (NodeJS)**
- ✅ **Framework:** Express.js
- ✅ **Banco:** DynamoDB (tabela: gerenciador-users)
- ✅ **Storage:** AWS S3
- ✅ **Documentação:** Swagger UI disponível
- ✅ **Porta:** 3001

### **Frontend (NuxtJS)**
- ✅ **Framework:** Nuxt 3 + Vue 3
- ✅ **Estilo:** TailwindCSS
- ✅ **HTTP:** Axios para requisições
- ✅ **Porta:** 3000

### **AWS Services**
- ✅ **S3:** Armazenamento de arquivos
- ✅ **DynamoDB:** Banco de dados de usuários
- ✅ **IAM:** Controle de permissões

---

## 📊 **VALIDAÇÕES E LIMITES**

### **Campos Obrigatórios**
- ✅ **Registro:** Nome, email, senha
- ✅ **Login:** Email, senha
- ✅ **Upload:** Arquivo selecionado, usuário autenticado

### **Limites Atuais**
- ✅ **Email:** Máximo 50 caracteres
- ✅ **Senha Login:** 3-6 caracteres (frontend)
- ✅ **Senha Registro:** Mínimo 6 caracteres
- ✅ **Token JWT:** 7 dias de validade

### **Tratamento de Erros**
- ✅ **Email duplicado:** "Usuário já existe com este email"
- ✅ **Login inválido:** "Credenciais inválidas"
- ✅ **Campos vazios:** Validação em tempo real
- ✅ **Upload:** Feedback visual de progresso

---

## 🔄 **FLUXOS PRINCIPAIS**

### **Fluxo de Registro**
1. Usuário acessa `/`
2. Clica em "Criar conta"
3. Preenche nome, email, senha
4. Sistema valida e cria usuário
5. Gera token JWT automaticamente
6. Redireciona para `/dashboard`

### **Fluxo de Login**
1. Usuário acessa `/`
2. Preenche email e senha
3. Sistema autentica credenciais
4. Gera token JWT
5. Redireciona para `/dashboard`

### **Fluxo de Upload**
1. Usuário autenticado acessa `/dashboard`
2. Seleciona arquivos (drag & drop ou clique)
3. Sistema faz upload para S3
4. Organiza em pasta do usuário
5. Retorna URL pública
6. Atualiza lista de arquivos

---

## 🎯 **STATUS ATUAL**
- ✅ **Sistema:** 100% funcional
- ✅ **Autenticação:** Completa e segura
- ✅ **Upload:** Funcionando com AWS S3
- ✅ **Interface:** Design moderno implementado
- ✅ **Testes:** Validado e operacional

---

**Última atualização:** 19/11/2025
**Versão:** 1.0 - Sistema CloudVault Completo