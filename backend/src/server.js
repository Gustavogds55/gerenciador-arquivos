const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const cors = require('cors');
const { swaggerUi, specs } = require('./swagger');
const authController = require('./auth/authController');
const companiesController = require('./companies/companiesController');
const { authenticateToken } = require('./auth/authMiddleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Configuração do multer para armazenar arquivos na memória
const upload = multer({ storage: multer.memoryStorage() });

// Configuração do AWS S3
const s3 = new AWS.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check da API
 *     responses:
 *       200:
 *         description: API funcionando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando!' });
});

// Rotas de autenticação
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
app.post('/auth/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Fazer login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
app.post('/auth/login', authController.login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Obter perfil do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       401:
 *         description: Token inválido
 */
app.get('/auth/profile', authenticateToken, authController.profile);

// Rotas de empresas
app.get('/companies', authenticateToken, companiesController.getCompanies);
app.post('/companies', authenticateToken, companiesController.createCompany);
app.get('/companies/:companyId/stats', authenticateToken, companiesController.getCompanyStats);
app.get('/companies/:companyId/files', authenticateToken, async (req, res) => {
  try {
    const { companyId } = req.params;
    const { folder = '' } = req.query;
    
    const prefix = folder ? 
      `uploads/company-${companyId}/${folder}/` : 
      `uploads/company-${companyId}/`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Prefix: prefix,
      Delimiter: '/',
      MaxKeys: 100 // Limitar resultados
    };

    const result = await s3.listObjectsV2(params).promise();
    
    // Pastas
    const folders = result.CommonPrefixes?.map(prefix => ({
      name: prefix.Prefix.split('/').filter(p => p).pop(),
      type: 'folder',
      path: prefix.Prefix.replace(`uploads/company-${companyId}/`, '').slice(0, -1)
    })) || [];

    // Arquivos
    const files = result.Contents
      .filter(file => file.Key !== prefix && !file.Key.endsWith('/.keep'))
      .map(file => ({
        key: file.Key,
        name: file.Key.split('/').pop().replace(/^\d+-/, ''),
        size: file.Size,
        lastModified: file.LastModified,
        type: 'file',
        url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${file.Key}`
      }));

    res.json({ folders, files });
  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/companies/:companyId/folders', authenticateToken, async (req, res) => {
  try {
    const { companyId } = req.params;
    const { name, parentFolder = '' } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Nome da pasta é obrigatório' });
    }

    const folderPath = parentFolder ? `${parentFolder}/${name}` : name;
    const key = `uploads/company-${companyId}/${folderPath}/.keep`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: '',
      ContentType: 'text/plain',
      ACL: 'private'
    };

    await s3.upload(params).promise();
    
    res.json({ 
      message: 'Pasta criada com sucesso!',
      folder: {
        name,
        path: folderPath,
        type: 'folder'
      }
    });
  } catch (error) {
    console.error('Erro ao criar pasta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.delete('/companies/:companyId/folders/:folderPath', authenticateToken, async (req, res) => {
  try {
    const { companyId, folderPath } = req.params;
    const decodedPath = decodeURIComponent(folderPath);

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Prefix: `uploads/company-${companyId}/${decodedPath}/`
    };

    const result = await s3.listObjectsV2(params).promise();
    
    if (result.Contents.length > 0) {
      const deleteParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Delete: {
          Objects: result.Contents.map(obj => ({ Key: obj.Key }))
        }
      };
      
      await s3.deleteObjects(deleteParams).promise();
    }
    
    res.json({ message: 'Pasta excluída com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir pasta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.delete('/files/:fileKey', authenticateToken, async (req, res) => {
  try {
    const { fileKey } = req.params;
    const decodedKey = decodeURIComponent(fileKey);

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: decodedKey
    };

    await s3.deleteObject(params).promise();
    
    res.json({ message: 'Arquivo excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir arquivo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload de arquivo para S3 (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 url:
 *                   type: string
 *                 key:
 *                   type: string
 *                 user:
 *                   type: string
 *       400:
 *         description: Nenhum arquivo enviado
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
app.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const { companyId, folder = '' } = req.body;
    if (!companyId) {
      return res.status(400).json({ error: 'ID da empresa é obrigatório' });
    }

    const folderPath = folder ? `${folder}/` : '';
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `uploads/company-${companyId}/${folderPath}${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    const result = await s3.upload(params).promise();
    
    res.json({ 
      message: 'Upload realizado com sucesso!', 
      url: result.Location,
      key: result.Key,
      user: req.user.email,
      companyId,
      folder
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor', 
      details: error.message 
    });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;