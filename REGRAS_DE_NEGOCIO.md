# 📋 Regras de Negócio - CloudVault (ATUALIZADO)

## 🏢 **SISTEMA MULTI-TENANT**

### **Estrutura de Empresas**
- ✅ **Modelo:** Sistema multi-tenant por empresa
- ✅ **Isolamento:** Cada empresa tem dados completamente separados
- ✅ **Seleção:** Modal obrigatório para escolher empresa após login
- ✅ **Persistência:** Empresa selecionada salva em cookie
- ✅ **Troca:** Botão "Trocar Empresa" disponível no dashboard

### **CRUD de Empresas**
- ✅ **Criação:** Nome da empresa + CNPJ (14 dígitos)
- ✅ **Validação:** CNPJ único no sistema
- ✅ **Busca:** Modal com busca por nome ou CNPJ
- ✅ **Listagem:** Empresas do usuário logado
- ✅ **Armazenamento:** Arquivo JSON local (backend/data/companies.json)

---

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
- ✅ **Pós-login:** Modal de seleção de empresa obrigatório

---

## 📁 **GERENCIAMENTO DE ARQUIVOS**

### **Estrutura de Armazenamento S3**
- ✅ **Organização:** `uploads/company-{companyId}/pasta/arquivo.pdf`
- ✅ **Isolamento:** Cada empresa tem pasta separada no S3
- ✅ **Pastas:** Sistema de pastas hierárquico
- ✅ **Arquivo .keep:** Mantém pastas vazias (oculto da interface)

### **Sistema de Pastas**
- ✅ **Criação:** Botão "Nova Pasta" com nome personalizado
- ✅ **Navegação:** Clique na pasta para entrar
- ✅ **Breadcrumb:** Mostra caminho atual (Raiz/Pasta)
- ✅ **Edição:** Botão azul para renomear pasta
- ✅ **Exclusão:** Botão vermelho para deletar pasta e conteúdo
- ✅ **Confirmação:** Modal personalizado para confirmar exclusões

### **Upload de Arquivos**
- ✅ **Localização:** Dashboard (drag & drop) e Modal Documentos
- ✅ **Pasta atual:** Upload vai para pasta navegada
- ✅ **Múltiplos:** Suporte a múltiplos arquivos
- ✅ **Feedback:** Loading states e mensagens de sucesso
- ✅ **Atualização:** Lista recarrega automaticamente

### **Gerenciamento de Arquivos**
- ✅ **Visualização:** Modal "Documentos" com lista completa
- ✅ **Busca:** Campo de busca por nome de arquivo
- ✅ **Ações:** Abrir, Download, Excluir para cada arquivo
- ✅ **Informações:** Nome, tamanho, data de modificação
- ✅ **Exclusão:** Modal de confirmação personalizado

---

## 🎨 **INTERFACE E EXPERIÊNCIA**

### **Dashboard**
- ✅ **Layout:** Header + conteúdo principal (sem sidebar)
- ✅ **Header:** Logo, empresa ativa, botão trocar empresa, usuário, logout
- ✅ **Cards:** Estatísticas (Arquivos, Armazenamento, Documentos)
- ✅ **Upload:** Área drag & drop integrada
- ✅ **Arquivos recentes:** Lista dos últimos 5 arquivos

### **Modal de Empresas**
- ✅ **Busca:** Campo para filtrar por nome ou CNPJ
- ✅ **Seleção:** Lista de empresas com radio buttons
- ✅ **Criação:** Formulário para nova empresa
- ✅ **Validação:** CNPJ único e formato correto
- ✅ **Obrigatório:** Não pode fechar sem selecionar empresa

### **Modal de Documentos**
- ✅ **Navegação:** Breadcrumb e navegação por pastas
- ✅ **Ações:** Upload, Nova Pasta, Busca
- ✅ **Listagem:** Pastas (amarelo) e arquivos (roxo) separados
- ✅ **Botões:** Editar/Excluir pastas, Abrir/Download/Excluir arquivos
- ✅ **Performance:** Limite de 100 itens por consulta S3

---

## 🛠️ **TECNOLOGIAS E INFRAESTRUTURA**

### **Backend (NodeJS)**
- ✅ **Framework:** Express.js
- ✅ **Usuários:** DynamoDB (tabela: gerenciador-users)
- ✅ **Empresas:** Arquivo JSON local
- ✅ **Storage:** AWS S3 com estrutura multi-tenant
- ✅ **Documentação:** Swagger UI disponível
- ✅ **Porta:** 3001

### **Rotas de API**
- ✅ **Empresas:** GET/POST /companies, GET /companies/:id/stats
- ✅ **Pastas:** POST /companies/:id/folders, DELETE /companies/:id/folders/:path
- ✅ **Arquivos:** GET /companies/:id/files, DELETE /files/:key
- ✅ **Upload:** POST /upload (com companyId e folder)

### **Frontend (NuxtJS)**
- ✅ **Framework:** Nuxt 3 + Vue 3
- ✅ **Estilo:** TailwindCSS com glassmorphism
- ✅ **Componentes:** CompanyModal, DocumentsModal
- ✅ **Estado:** Cookies para empresa selecionada
- ✅ **Porta:** 3000

---

## 🔄 **FLUXOS PRINCIPAIS ATUALIZADOS**

### **Fluxo Completo de Login**
1. Usuário acessa `/` e faz login
2. Redireciona para `/dashboard`
3. **Modal de empresa abre automaticamente**
4. Se tem empresas: lista para seleção + busca
5. Se não tem: formulário para criar primeira empresa
6. Após seleção: modal fecha e dashboard carrega dados da empresa

### **Fluxo de Gerenciamento de Arquivos**
1. No dashboard: upload drag & drop ou clique no card "Documentos"
2. Modal Documentos abre mostrando estrutura de pastas
3. Navegação: clique em pasta para entrar, breadcrumb para voltar
4. Upload: botão verde seleciona arquivos e envia para pasta atual
5. Gerenciamento: botões para criar/editar/excluir pastas e arquivos

### **Fluxo de Troca de Empresa**
1. No dashboard: clique em "Trocar Empresa"
2. Modal de empresas abre com lista atual
3. Busca e seleção de nova empresa
4. Dashboard recarrega com dados da nova empresa selecionada

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
- ✅ **Sistema:** Multi-tenant funcional
- ✅ **Empresas:** CRUD completo com validações
- ✅ **Arquivos:** Upload, download, exclusão por empresa
- ✅ **Pastas:** Sistema hierárquico completo
- ✅ **Interface:** Dashboard moderno sem sidebar
- ✅ **Performance:** Otimizado com limites S3
- ✅ **Testes:** 73 testes automatizados mantidos

---

**Última atualização:** 22/01/2025
**Versão:** 3.0 - Sistema Multi-Tenant com Gerenciamento de Pastas