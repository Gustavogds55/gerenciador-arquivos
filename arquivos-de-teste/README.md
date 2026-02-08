# 📚 Índice de Testes E2E - CloudVault

## 📊 Resumo Geral

| Funcionalidade | Testes | Status | Arquivo |
|----------------|--------|--------|---------|
| **Login** | 8 | ✅ | [TESTES_LOGIN.md](./TESTES_LOGIN.md) |
| **Registro** | 7 | ✅ | [TESTES_REGISTRO.md](./TESTES_REGISTRO.md) |
| **Navegação** | 3 | ✅ | [TESTES_NAVEGACAO.md](./TESTES_NAVEGACAO.md) |
| **Toggle** | 1 | ✅ | [TESTES_TOGGLE.md](./TESTES_TOGGLE.md) |
| **Modal Empresa** | 6 | ✅ | [TESTES_EMPRESA_MODAL.md](./TESTES_EMPRESA_MODAL.md) |
| **TOTAL** | **25** | ✅ | - |

---

## 🔐 Login (8 testes)
- CT-001: Login Sucesso
- CT-002: Usuario Invalido
- CT-003: Senha Invalida
- CT-004: Email Vazio
- CT-005: Senha Vazia
- CT-006: Email Invalido
- CT-007: Senha Fora do Padrão
- CT-008: Loading Durante Login

**Documentação:** [TESTES_LOGIN.md](./TESTES_LOGIN.md)  
**Código:** `/tests/e2e/login.spec.js`

---

## 📝 Registro (7 testes)
- CT-009: Registro Sucesso
- CT-010: Email Duplicado
- CT-011: Registro sem Nome
- CT-012: Senha Curta
- CT-013: Registro sem Email
- CT-014: Registro sem Senha
- CT-015: Email Formato Inválido

**Documentação:** [TESTES_REGISTRO.md](./TESTES_REGISTRO.md)  
**Código:** `/tests/e2e/registro.spec.js`

---

## 🔄 Navegação (3 testes)
- CT-016: Acesso Dashboard sem Login
- CT-017: Logout
- CT-018: Persistência de Sessão

**Documentação:** [TESTES_NAVEGACAO.md](./TESTES_NAVEGACAO.md)  
**Código:** `/tests/e2e/navegacao.spec.js`

---

## 🔀 Toggle (1 teste)
- CT-019: Toggle entre Login e Registro

**Documentação:** [TESTES_TOGGLE.md](./TESTES_TOGGLE.md)  
**Código:** `/tests/e2e/toggle.spec.js`

---

## 🏢 Modal de Empresa (6 testes)
- CT-020: Modal abre automaticamente após login
- CT-021: Formulário de criação para usuário sem empresas
- CT-022: Validação CNPJ obrigatório
- CT-023: Validação CNPJ inválido
- CT-024: Validação CNPJ válido - criação bem-sucedida
- CT-025: Lista de empresas para usuário com empresas

**Documentação:** [TESTES_EMPRESA_MODAL.md](./TESTES_EMPRESA_MODAL.md)  
**Código:** `/tests/e2e/empresa-modal.spec.js`

---

## 🚀 Como Executar

### Todos os testes:
```bash
npm run test:e2e
```

### Teste específico:
```bash
npx playwright test tests/e2e/login.spec.js
npx playwright test tests/e2e/registro.spec.js
npx playwright test tests/e2e/navegacao.spec.js
npx playwright test tests/e2e/toggle.spec.js
npx playwright test tests/e2e/empresa-modal.spec.js
```

### Modo debug:
```bash
npx playwright test --debug
```

### Com interface gráfica:
```bash
npx playwright test --ui
```

---

## 📁 Estrutura de Arquivos

```
arquivos-de-teste/
├── README.md                    # Este arquivo (índice)
├── TESTES_LOGIN.md             # Documentação testes de login
├── TESTES_REGISTRO.md          # Documentação testes de registro
├── TESTES_NAVEGACAO.md         # Documentação testes de navegação
├── TESTES_TOGGLE.md            # Documentação testes de toggle
├── TESTES_EMPRESA_MODAL.md     # Documentação testes modal empresa
└── PLANO_TESTES.md             # Plano geral de testes

tests/e2e/
├── login.spec.js               # Código testes de login
├── registro.spec.js            # Código testes de registro
├── navegacao.spec.js           # Código testes de navegação
├── toggle.spec.js              # Código testes de toggle
└── empresa-modal.spec.js       # Código testes modal empresa
```

---

**Última atualização:** 2024
