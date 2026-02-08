# 🏢 Casos de Teste - Modal de Empresa

## 📊 Status: ✅ 6 casos implementados

---

## **CT-020: Abertura Automática do Modal após Login**

**Objetivo:** Validar exibição automática do modal de seleção de empresa

**Pré-condições:**
- Usuário cadastrado: teste@email.com / 123456

**Passos:**
1. Acessar página inicial
2. Fazer login com teste@email.com / 123456
3. Aguardar redirecionamento para /dashboard

**Resultado Esperado:**
- Modal com título "Selecionar Empresa" visível
- Modal não pode ser fechado (sem botão X ou clique fora)

---

## **CT-021: Formulário de Criação para Usuário sem Empresas**

**Objetivo:** Validar exibição de formulário de criação para novo usuário

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Clicar em "Não tem conta? Criar uma agora"
3. Preencher nome: Usuario Teste
4. Preencher email: semempresa@email.com
5. Preencher senha: 123456
6. Clicar em "Criar Minha Conta"
7. Aguardar mensagem de sucesso
8. Fazer login com semempresa@email.com / 123456
9. Aguardar redirecionamento para /dashboard

**Resultado Esperado:**
- Modal visível com título "Nova Empresa"
- Campo "Nome da empresa" visível
- Campo "CNPJ" visível
- Botão "Criar" visível

---

## **CT-022: Validação de CNPJ Obrigatório**

**Objetivo:** Validar campo obrigatório de CNPJ

**Pré-condições:** Nenhuma

**Passos:**
1. Criar novo usuário com email único
2. Fazer login
3. No modal de empresa, preencher apenas nome: Empresa Teste
4. Deixar campo CNPJ vazio
5. Clicar em "Criar"

**Resultado Esperado:**
- Mensagem: "Nome da empresa e CNPJ são obrigatórios"

---

## **CT-023: Validação de CNPJ Inválido**

**Objetivo:** Validar rejeição de CNPJ com dígitos verificadores incorretos

**Pré-condições:** Nenhuma

**Passos:**
1. Criar novo usuário com email único
2. Fazer login
3. No modal de empresa:
   - Preencher nome: Empresa Teste
   - Preencher CNPJ: 11.222.333/0001-00 (inválido)
4. Clicar em "Criar"

**Resultado Esperado:**
- Modal permanece aberto (criação falhou)
- Empresa não é criada

---

## **CT-024: Criação de Empresa com CNPJ Válido**

**Objetivo:** Validar criação bem-sucedida de empresa com CNPJ válido

**Pré-condições:** Nenhuma

**Passos:**
1. Criar novo usuário com email único
2. Fazer login
3. No modal de empresa:
   - Preencher nome: Empresa Válida
   - Preencher CNPJ: 11.222.333/0001-81 (válido)
4. Clicar em "Criar"

**Resultado Esperado:**
- Modal fecha automaticamente
- Empresa criada com sucesso
- Dashboard exibido

---

## **CT-025: Lista de Empresas para Usuário com Empresas Existentes**

**Objetivo:** Validar exibição de lista de empresas para seleção

**Pré-condições:**
- Usuário com empresas cadastradas: teste@email.com

**Passos:**
1. Acessar página inicial
2. Fazer login com teste@email.com / 123456
3. Aguardar modal de empresa

**Resultado Esperado:**
- Título "Selecionar Empresa" visível
- Campo de busca "Buscar nome ou CNPJ..." visível
- Botão "Nova Empresa" visível
- Lista de empresas do usuário exibida

---

**Arquivo de Implementação:** `/tests/e2e/empresa-modal.spec.js`
