const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const COMPANIES_FILE = path.join(__dirname, '../../data/companies.json');

// Garantir que o diretório existe
const dataDir = path.dirname(COMPANIES_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Garantir que o arquivo existe
if (!fs.existsSync(COMPANIES_FILE)) {
  fs.writeFileSync(COMPANIES_FILE, JSON.stringify([]));
}

// Ler empresas
const readCompanies = () => {
  try {
    const data = fs.readFileSync(COMPANIES_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Salvar empresas
const saveCompanies = (companies) => {
  fs.writeFileSync(COMPANIES_FILE, JSON.stringify(companies, null, 2));
};

// Validar CNPJ
const isValidCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, '');
  return cnpj.length === 14;
};

// Listar empresas do usuário
const getCompanies = async (req, res) => {
  try {
    const companies = readCompanies();
    const userCompanies = companies.filter(c => c.ownerId === req.user.email);
    res.json({ companies: userCompanies });
  } catch (error) {
    console.error('Erro ao listar empresas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Criar empresa
const createCompany = async (req, res) => {
  try {
    const { name, cnpj } = req.body;

    if (!name || !cnpj) {
      return res.status(400).json({ error: 'Nome e CNPJ são obrigatórios' });
    }

    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    if (!isValidCNPJ(cleanCNPJ)) {
      return res.status(400).json({ error: 'CNPJ inválido' });
    }

    const companies = readCompanies();
    
    // Verificar se CNPJ já existe
    const existing = companies.find(c => c.cnpj === cleanCNPJ);
    if (existing) {
      return res.status(400).json({ error: 'CNPJ já cadastrado' });
    }

    const company = {
      id: uuidv4(),
      name,
      cnpj: cleanCNPJ,
      ownerId: req.user.email,
      createdAt: new Date().toISOString()
    };

    companies.push(company);
    saveCompanies(companies);
    
    res.status(201).json({ company });
  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Obter estatísticas da empresa
const getCompanyStats = async (req, res) => {
  try {
    const { companyId } = req.params;
    const companies = readCompanies();
    
    const company = companies.find(c => c.id === companyId && c.ownerId === req.user.email);
    if (!company) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }

    // Buscar arquivos reais do S3
    try {
      const AWS = require('aws-sdk');
      const s3 = new AWS.S3({
        region: process.env.AWS_S3_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      });

      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Prefix: `uploads/company-${companyId}/`
      };

      const result = await s3.listObjectsV2(params).promise();
      
      const totalFiles = result.Contents.length;
      const totalSize = result.Contents.reduce((sum, file) => sum + file.Size, 0);
      const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);

      const stats = {
        files: totalFiles,
        storage: `${sizeInMB} MB`
      };

      res.json({ stats });
    } catch (s3Error) {
      // Se der erro no S3, retorna valores padrão
      console.log('Erro S3, usando valores padrão:', s3Error.message);
      const stats = {
        files: 0,
        storage: '0 MB'
      };
      res.json({ stats });
    }
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getCompanies,
  createCompany,
  getCompanyStats
};