# ☁️ Configuração AWS S3 - Guia Passo a Passo

## 🎯 Objetivo
Configurar bucket S3 e usuário IAM para upload de arquivos

## 📋 Pré-requisitos
- Conta AWS ativa
- Acesso ao Console AWS

---

## 🪣 PASSO 1: Criar Bucket S3

### 1.1 Acessar S3
1. Faça login no [Console AWS](https://console.aws.amazon.com)
2. Pesquise por **"S3"** na barra de busca
3. Clique em **"S3"**

### 1.2 Criar Bucket
1. Clique em **"Create bucket"**
2. Configure:
   - **Bucket name**: `gerenciador-arquivos-[seu-nome]` (deve ser único globalmente)
   - **AWS Region**: `us-east-1` (ou sua região preferida)
   - **Block Public Access**: ✅ Manter habilitado (segurança)
3. Clique em **"Create bucket"**

### 1.3 Anotar informações
- ✅ Nome do bucket: `gerenciador-arquivos-gustavo`
- ✅ Região: `us-east-1`

---

## 👤 PASSO 2: Criar Usuário IAM

### 2.1 Acessar IAM
1. No Console AWS, pesquise por **"IAM"**
2. Clique em **"IAM"**
3. No menu lateral, clique em **"Users"**

### 2.2 Criar Usuário
1. Clique em **"Create user"**
2. **User name**: `s3-upload-user`
3. Clique em **"Next"**

### 2.3 Configurar Permissões
1. Selecione **"Attach policies directly"**
2. Pesquise por **"AmazonS3FullAccess"**
3. ✅ Marque a política **"AmazonS3FullAccess"**
4. Clique em **"Next"**
5. Clique em **"Create user"**

---

## 🔐 PASSO 3: Gerar Credenciais

### 3.1 Criar Access Key
1. Clique no usuário **"s3-upload-user"** criado
2. Vá na aba **"Security credentials"**
3. Clique em **"Create access key"**
4. Selecione **"Application running outside AWS"**
5. Clique em **"Next"**
6. (Opcional) Adicione descrição: "Upload de arquivos"
7. Clique em **"Create access key"**

### 3.2 Salvar Credenciais ⚠️ IMPORTANTE
**COPIE AGORA - NÃO SERÁ MOSTRADO NOVAMENTE:**
- ✅ Access Key ID: ``
- ✅ Secret Access Key: ``

---

## ⚙️ PASSO 4: Configurar Backend

### 4.1 Atualizar arquivo .env
Substitua o conteúdo do arquivo `backend/.env`:

```env
AWS_ACCESS_KEY_ID=sua_access_key_aqui
AWS_SECRET_ACCESS_KEY=sua_secret_key_aqui
AWS_S3_BUCKET=seu_bucket_name_aqui
AWS_S3_REGION=us-east-1
PORT=3001
```

### 4.2 Exemplo preenchido:
```env
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_BUCKET=gerenciador-arquivos-gustavo
AWS_S3_REGION=us-east-1
PORT=3001
```

---

## 🧪 PASSO 5: Testar Configuração

### 5.1 Iniciar Backend
```bash
cd backend
npm run dev
```

### 5.2 Testar Upload
1. Acesse Swagger: `http://localhost:3001/api-docs`
2. Ou use Postman com a collection
3. Faça upload de um arquivo pequeno

### 5.3 Verificar no S3
1. Volte ao Console S3
2. Entre no seu bucket
3. Verifique se o arquivo apareceu na pasta `uploads/`

---

## ✅ Checklist Final

- [ ] Bucket S3 criado
- [ ] Usuário IAM criado
- [ ] Credenciais geradas e salvas
- [ ] Arquivo .env atualizado
- [ ] Backend testado
- [ ] Upload funcionando

---

## 🚨 Troubleshooting

### Erro: "Access Denied"
- Verifique se as credenciais estão corretas no .env
- Confirme se o usuário tem a política AmazonS3FullAccess

### Erro: "Bucket does not exist"
- Verifique se o nome do bucket no .env está correto
- Confirme se a região está correta

### Erro: "Invalid credentials"
- Regenere as credenciais no IAM
- Verifique se não há espaços extras no .env

---

## 🔒 Segurança

⚠️ **NUNCA COMMITE O ARQUIVO .env**
- Adicione `.env` no `.gitignore`
- Use apenas `.env.example` no repositório