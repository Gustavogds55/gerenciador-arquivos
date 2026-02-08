# 🔀 Casos de Teste - Toggle Login/Registro

## 📊 Status: ✅ 1 caso implementado

---

## **CT-019: Alternância entre Telas de Login e Registro**

**Objetivo:** Validar navegação entre formulários de login e registro

**Pré-condições:** Nenhuma

**Passos:**
1. Acessar página inicial
2. Verificar tela de login exibida
3. Clicar em "Não tem conta? Criar uma agora"
4. Verificar tela de registro exibida
5. Clicar em "Já tem conta? Fazer login"
6. Verificar retorno à tela de login

**Resultado Esperado:**

**Tela Inicial (Login):**
- Texto "Bem-vindo de volta!" visível
- Campo "Digite seu email" visível

**Após Clicar em Criar Conta:**
- Texto "Crie sua conta" visível
- Campo "Seu nome completo" visível

**Após Clicar em Fazer Login:**
- Texto "Bem-vindo de volta!" visível
- Campo "Digite seu email" visível

---

**Arquivo de Implementação:** `/tests/e2e/toggle.spec.js`
