# 🔐 Autenticação com DynamoDB - Guia Completo

## 🎯 Objetivo
Implementar sistema de login/registro usando DynamoDB como banco de dados

## 📋 Pré-requisitos
- AWS configurada (já temos)
- Backend funcionando (já temos)

---

## 🗄️ PASSO 1: Configurar DynamoDB

### 1.1 Criar Tabela no Console AWS
1. Acesse o [Console AWS](https://console.aws.amazon.com)
2. Pesquise por **"DynamoDB"**
3. Clique em **"Create table"**

### 1.2 Configurações da Tabela
- **Table name**: `gerenciador-users`
- **Partition key**: `email` (String)
- **Settings**: Use default settings
- Clique em **"Create table"**

### 1.3 Anotar informações
- ✅ Nome da tabela: `gerenciador-users`
- ✅ Partition key: `email`

---

## 🔧 PASSO 2: Atualizar Permissões IAM

### 2.1 Adicionar Política DynamoDB
1. Vá para **IAM > Users > s3-upload-user**
2. Clique em **"Add permissions"**
3. Selecione **"Attach policies directly"**
4. Pesquise e adicione: **"AmazonDynamoDBFullAccess"**
5. Clique em **"Add permissions"**

---

## 💻 PASSO 3: Implementar Backend

### 3.1 Instalar Dependências
```bash
cd backend
npm install bcryptjs jsonwebtoken
```

### 3.2 Atualizar .env
Adicione ao arquivo `backend/.env`:
```env
# Existentes
AWS_ACCESS_KEY_ID=sua_access_key
AWS_SECRET_ACCESS_KEY=sua_secret_key
AWS_S3_BUCKET=seu_bucket
AWS_S3_REGION=us-east-1
PORT=3001

# Novos para Auth
DYNAMODB_TABLE_USERS=gerenciador-users
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
JWT_EXPIRES_IN=7d
```

### 3.3 Estrutura de Arquivos
```
backend/src/
├── server.js          # Servidor principal
├── swagger.js         # Documentação
├── auth/              # Novo - Autenticação
│   ├── authController.js
│   ├── authMiddleware.js
│   └── userService.js
└── config/
    └── dynamodb.js    # Novo - Config DynamoDB
```

---

## 🔑 PASSO 4: Funcionalidades Implementadas

### 4.1 Rotas de Autenticação
- `POST /auth/register` - Criar conta
- `POST /auth/login` - Fazer login
- `GET /auth/profile` - Dados do usuário (protegida)

### 4.2 Proteção de Rotas
- Middleware JWT para proteger `/upload`
- Header: `Authorization: Bearer <token>`

### 4.3 Estrutura do Usuário (DynamoDB)
```json
{
  "email": "user@email.com",
  "password": "hash_bcrypt",
  "name": "Nome do Usuário",
  "createdAt": "2024-01-01T10:00:00Z",
  "isActive": true
}
```

---

## 🧪 PASSO 5: Testar Autenticação

### 5.1 Registro de Usuário
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste User",
    "email": "teste@email.com",
    "password": "123456"
  }'
```

### 5.2 Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "password": "123456"
  }'
```

### 5.3 Upload Protegido
```bash
curl -X POST http://localhost:3001/upload \
  -H "Authorization: Bearer SEU_JWT_TOKEN" \
  -F "file=@arquivo.txt"
```

---

## ✅ Checklist de Implementação

### DynamoDB
- [ ] Tabela `gerenciador-users` criada
- [ ] Permissões IAM atualizadas

### Backend
- [ ] Dependências instaladas
- [ ] Arquivo .env atualizado
- [ ] Arquivos de auth criados
- [ ] Rotas implementadas
- [ ] Middleware JWT funcionando

### Testes
- [ ] Registro funcionando
- [ ] Login funcionando
- [ ] Upload protegido funcionando
- [ ] Swagger atualizado

---

## 🚨 Troubleshooting

### Erro: "Table not found"
- Verifique se a tabela foi criada no DynamoDB
- Confirme o nome da tabela no .env

### Erro: "Access Denied" (DynamoDB)
- Verifique se adicionou AmazonDynamoDBFullAccess ao usuário IAM

### Erro: "Invalid token"
- Verifique se o JWT_SECRET está configurado
- Confirme se está enviando o token no header Authorization

---

## 🔒 Segurança

### Senhas
- ✅ Criptografadas com bcrypt
- ✅ Nunca retornadas nas APIs

### JWT
- ✅ Expira em 7 dias
- ✅ Secret seguro no .env

### Validações
- ✅ Email único
- ✅ Senha mínima 6 caracteres
- ✅ Campos obrigatórios