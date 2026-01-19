const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION || 'us-east-1'
});

const COMPANIES_TABLE = process.env.DYNAMODB_TABLE_COMPANIES || 'gerenciador-companies';

// Validar CNPJ
const isValidCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  
  // Validação básica de dígitos verificadores
  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj[i]) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj[i]) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
  return parseInt(cnpj[12]) === digit1 && parseInt(cnpj[13]) === digit2;
};

// Listar empresas do usuário
const getCompanies = async (req, res) => {
  try {
    const params = {
      TableName: COMPANIES_TABLE,
      FilterExpression: 'ownerId = :ownerId',
      ExpressionAttributeValues: {
        ':ownerId': req.user.email
      }
    };

    const result = await dynamodb.scan(params).promise();
    res.json({ companies: result.Items });
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

    // Verificar se CNPJ já existe
    const existingParams = {
      TableName: COMPANIES_TABLE,
      FilterExpression: 'cnpj = :cnpj',
      ExpressionAttributeValues: {
        ':cnpj': cleanCNPJ
      }
    };

    const existing = await dynamodb.scan(existingParams).promise();
    if (existing.Items.length > 0) {
      return res.status(400).json({ error: 'CNPJ já cadastrado' });
    }

    const company = {
      id: uuidv4(),
      name,
      cnpj: cleanCNPJ,
      ownerId: req.user.email,
      createdAt: new Date().toISOString()
    };

    const params = {
      TableName: COMPANIES_TABLE,
      Item: company
    };

    await dynamodb.put(params).promise();
    res.status(201).json({ company });
  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getCompanies,
  createCompany
};