const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const cors = require('cors');
const { swaggerUi, specs } = require('./swagger');
const authController = require('./auth/authController');
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

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `uploads/${req.user.email}/${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    const result = await s3.upload(params).promise();
    
    res.json({ 
      message: 'Upload realizado com sucesso!', 
      url: result.Location,
      key: result.Key,
      user: req.user.email
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
});