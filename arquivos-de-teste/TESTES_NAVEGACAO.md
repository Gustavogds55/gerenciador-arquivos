# 🔄 Casos de Teste - Navegação

## 📊 Status: ✅ 3 casos implementados

---

## **CT-016: Acesso ao Dashboard sem Autenticação**

**Objetivo:** Validar proteção de rota autenticada

**Pré-condições:** Usuário não autenticado

**Passos:**
1. Acessar diretamente /dashboard

**Resultado Esperado:**
- Redirecionamento para /
- Exibição da página de login
- Texto "CloudVault" visível
- Texto "Seu gerenciador de arquivos na nuvem" visível

---

## **CT-017: Logout do Sistema**

**Objetivo:** Validar funcionalidade de logout

**Pré-condições:**
- Usuário cadastrado: teste@email.com / 123456

**Passos:**
1. Acessar página inicial
2. Fazer login com teste@email.com / 123456
3. Aguardar redirecionamento para /dashboard
4. Clicar no botão "Sair"

**Resultado Esperado:**
- Redirecionamento para /
- Exibição da página de login
- Texto "Seu gerenciador de arquivos na nuvem" visível

---

## **CT-018: Persistência de Sessão**

**Objetivo:** Validar manutenção de sessão após reload

**Pré-condições:**
- Usuário cadastrado: teste@email.com / 123456

**Passos:**
1. Acessar página inicial
2. Fazer login com teste@email.com / 123456
3. Aguardar redirecionamento para /dashboard
4. Recarregar a página (F5)

**Resultado Esperado:**
- Permanece em /dashboard
- Texto "Meus Arquivos" visível
- Sessão mantida

---

**Arquivo de Implementação:** `/tests/e2e/navegacao.spec.js`
