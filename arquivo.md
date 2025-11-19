# 📌 Descritivo do Sistema – Upload de Arquivos S3 (NuxtJS + NodeJS + AWS S3)

## 1. Visão Geral do Sistema
Este sistema permite que um usuário envie arquivos através de um frontend desenvolvido em **NuxtJS**, que por sua vez envia o arquivo para um **backend em NodeJS**, responsável por fazer o upload para um **bucket S3 da AWS**.

```
Usuário → Frontend (NuxtJS) → Backend (NodeJS) → AWS S3
```

## 2. Arquitetura do Sistema

### 2.1 Frontend – NuxtJS
Responsável por:
- Interface onde o usuário seleciona o arquivo
- Envio do arquivo via chamada HTTP (multipart/form-data)
- Exibir mensagens de sucesso ou erro

### 2.2 Backend – NodeJS / Express
Responsável por:
- Receber o arquivo
- Validar extensão/tamanho (opcional)
- Enviar o arquivo para o S3 usando AWS SDK
- Retornar URL pública ou confirmação de upload

### 2.3 AWS S3
Utilizado como repositório de armazenamento com:
- Bucket público ou privado (conforme necessidade)
- Upload feito diretamente pelo backend

## 3. Criando o Bucket S3

### 3.1 Acessar o S3
1. Acesse o Console AWS  
2. Pesquise por `S3`  
3. Clique em **Create bucket**

### 3.2 Configurações recomendadas
- **Bucket name:** nome único global (ex.: `meu-bucket-upload`)
- **Region:** us-east-1 ou outra desejada
- **Block Public Access:** manter habilitado (segurança)

## 4. Criando Usuário IAM para Acesso ao S3

### 4.1 Criar usuário
1. `IAM > Users > Create user`
2. Nome do usuário: `s3-upload-user`
3. Tipo de acesso: ✔ Programmatic access

### 4.2 Permissões
Selecione:

```
Attach policies directly
```

Política sugerida:

```
AmazonS3FullAccess
```

Ou política específica:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::meu-bucket-upload/*"
    }
  ]
}
```

### 4.3 Salve as credenciais
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## 5. Backend (NodeJS + Express)

### 5.1 Dependências
```bash
npm install express multer aws-sdk dotenv
```

### 5.2 Arquivo `.env`
```
AWS_ACCESS_KEY_ID=XXXX
AWS_SECRET_ACCESS_KEY=YYYY
AWS_S3_BUCKET=meu-bucket-upload
AWS_S3_REGION=us-east-1
```

### 5.3 Código base
```javascript
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
require("dotenv").config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const s3 = new AWS.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: req.file.originalname,
      Body: req.file.buffer,
    };

    const result = await s3.upload(params).promise();
    return res.json({ message: "Upload completo", url: result.Location });
  } catch (error) {
    return res.status(500).json({ error: "Erro no upload", details: error });
  }
});

app.listen(3001, () => console.log("Backend rodando na porta 3001"));
```

## 6. Frontend – NuxtJS

### 6.1 Componente
```vue
<template>
  <div>
    <input type="file" @change="handleFile" />
    <button @click="sendFile">Enviar</button>
    <p v-if="uploadedUrl">Arquivo enviado: {{ uploadedUrl }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      uploadedUrl: null,
    };
  },
  methods: {
    handleFile(event) {
      this.file = event.target.files[0];
    },
    async sendFile() {
      const form = new FormData();
      form.append("file", this.file);

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      this.uploadedUrl = data.url;
    },
  },
};
</script>
```

## 7. Fluxo Completo
1. Usuário seleciona arquivo  
2. Nuxt envia ao backend  
3. Backend faz upload ao S3  
4. AWS retorna URL  
5. Backend retorna ao Nuxt  
6. Nuxt exibe ao usuário

## 8. Opções Avançadas
- Upload direto com Signed URLs  
- Subpastas no bucket  
- CloudFront  
- Logs de upload

