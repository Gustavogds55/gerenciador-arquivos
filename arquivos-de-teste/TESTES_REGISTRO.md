# 📝 Casos de Teste - Registro

## 📊 Status: ✅ 7 casos implementados

---

## **CT-009: Registro com Sucesso**

**Objetivo:** Validar criação de nova conta com dados válidos

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Clicar em "Não tem conta? Criar uma agora"
3. Preencher nome: Novo Usuário
4. Preencher email: novo-[timestamp]@email.com
5. Preencher senha: 123456
6. Clicar em "Criar Minha Conta"

**Resultado Esperado:**
- Mensagem: "Conta criada com sucesso! Faça login para continuar."

---

## **CT-010: Registro com Email Duplicado**

**Objetivo:** Validar rejeição de email já cadastrado

**Pré-condições:**
- Usuário já cadastrado: teste@email.com

**Passos:**
1. Acessar página inicial
2. Clicar em "Não tem conta? Criar uma agora"
3. Preencher nome: Teste
4. Preencher email: teste@email.com
5. Preencher senha: 123456
6. Clicar em "Criar Minha Conta"

**Resultado Esperado:**
- Mensagem: "Usuário já existe com este email"

---

## **CT-011: Registro sem Nome**

**Objetivo:** Validar campo obrigatório de nome

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Clicar em "Não tem conta? Criar uma agora"
3. Preencher email: novo@email.com
4. Preencher senha: 123456
5. Clicar em "Criar Minha Conta"

**Resultado Esperado:**
- Mensagem: "Nome, email e senha são obrigatórios"

---

## **CT-012: Registro com Senha Curta**

**Objetivo:** Validar tamanho mínimo da senha

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Clicar em "Não tem conta? Criar uma agora"
3. Preencher nome: Teste
4. Preencher email: novo@email.com
5. Preencher senha: 12345
6. Clicar em "Criar Minha Conta"

**Resultado Esperado:**
- Mensagem: "Senha deve ter pelo menos 6 caracteres"

---

## **CT-013: Registro sem Email**

**Objetivo:** Validar campo obrigatório de email

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Clicar em "Não tem conta? Criar uma agora"
3. Preencher nome: Teste
4. Preencher senha: 123456
5. Clicar em "Criar Minha Conta"

**Resultado Esperado:**
- Mensagem: "Nome, email e senha são obrigatórios"

---

## **CT-014: Registro sem Senha**

**Objetivo:** Validar campo obrigatório de senha

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Clicar em "Não tem conta? Criar uma agora"
3. Preencher nome: Teste
4. Preencher email: novo@email.com
5. Clicar em "Criar Minha Conta"

**Resultado Esperado:**
- Mensagem: "Nome, email e senha são obrigatórios"

---

## **CT-015: Registro com Email em Formato Inválido**

**Objetivo:** Validar formato de email

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Clicar em "Não tem conta? Criar uma agora"
3. Preencher nome: Teste
4. Preencher email: emailinvalido
5. Preencher senha: 123456
6. Clicar em "Criar Minha Conta"

**Resultado Esperado:**
- Mensagem: "Email inválido"

---

**Arquivo de Implementação:** `/tests/e2e/registro.spec.js`
