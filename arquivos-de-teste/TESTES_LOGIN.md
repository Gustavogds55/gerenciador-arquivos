# 🔐 Casos de Teste - Login

## 📊 Status: ✅ 8 casos implementados

---

## **CT-001: Login com Sucesso**

**Objetivo:** Validar login com credenciais válidas

**Pré-condições:**
- Usuário cadastrado: teste@email.com / 123456

**Passos:**
1. Acessar página inicial
2. Preencher email: teste@email.com
3. Preencher senha: 123456
4. Clicar em "Entrar na Plataforma"

**Resultado Esperado:**
- Redirecionamento para /dashboard

---

## **CT-002: Login com Usuário Inválido**

**Objetivo:** Validar mensagem de erro para usuário não cadastrado

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Preencher email: naoexiste@email.com
3. Preencher senha: 123456
4. Clicar em "Entrar na Plataforma"

**Resultado Esperado:**
- Mensagem: "Usuário não encontrado"
- Permanece na página de login

---

## **CT-003: Login com Senha Inválida**

**Objetivo:** Validar mensagem de erro para senha incorreta

**Pré-condições:**
- Usuário cadastrado: teste@email.com

**Passos:**
1. Acessar página inicial
2. Preencher email: teste@email.com
3. Preencher senha: senhaerrada
4. Clicar em "Entrar na Plataforma"

**Resultado Esperado:**
- Mensagem: "Senha incorreta"
- Permanece na página de login

---

## **CT-004: Login com Email Vazio**

**Objetivo:** Validar campo obrigatório de email

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Preencher senha: 123456
3. Clicar no campo email
4. Clicar no campo senha (tirar foco do email)

**Resultado Esperado:**
- Mensagem: "Campo obrigatório"
- Permanece na página de login

---

## **CT-005: Login com Senha Vazia**

**Objetivo:** Validar campo obrigatório de senha

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Preencher email: teste@email.com
3. Clicar no campo senha
4. Clicar no campo email (tirar foco da senha)

**Resultado Esperado:**
- Mensagem: "Campo obrigatório"
- Permanece na página de login

---

## **CT-006: Login com Email Inválido**

**Objetivo:** Validar formato de email

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Preencher email: emailinvalido
3. Clicar no campo senha

**Resultado Esperado:**
- Mensagem: "Email inválido"
- Permanece na página de login

---

## **CT-007: Login com Senha Fora do Padrão**

**Objetivo:** Validar tamanho mínimo da senha

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Preencher email: teste@email.com
3. Preencher senha: 12
4. Clicar no campo email

**Resultado Esperado:**
- Mensagem: "Senha deve ter entre 3 e 6 caracteres"
- Permanece na página de login

---

## **CT-008: Exibição de Loading Durante Login**

**Objetivo:** Validar feedback visual durante processamento

**Pré-condições:**
- Usuário cadastrado: teste@email.com / 123456

**Passos:**
1. Acessar página inicial
2. Preencher email: teste@email.com
3. Preencher senha: 123456
4. Clicar em "Entrar na Plataforma"

**Resultado Esperado:**
- Texto do botão muda para "Entrando..."

---

**Arquivo de Implementação:** `/tests/e2e/login.spec.js`
