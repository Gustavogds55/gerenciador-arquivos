const dynamodb = require('../../config/dynamodb');
const bcrypt = require('bcryptjs');

const TABLE_NAME = process.env.DYNAMODB_TABLE_USERS || 'gerenciador-users';

class UserService {
  // Criar usuário
  async createUser(userData) {
    const { name, email, password } = userData;
    
    // Verificar se usuário já existe
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      throw new Error('Usuário já existe com este email');
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Dados do usuário
    const user = {
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    // Salvar no DynamoDB
    const params = {
      TableName: TABLE_NAME,
      Item: user
    };

    await dynamodb.put(params).promise();
    
    // Retornar sem a senha
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Buscar usuário por email
  async getUserByEmail(email) {
    const params = {
      TableName: TABLE_NAME,
      Key: { email }
    };

    const result = await dynamodb.get(params).promise();
    return result.Item;
  }

  // Validar senha
  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Autenticar usuário
  async authenticateUser(email, password) {
    const user = await this.getUserByEmail(email);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (!user.isActive) {
      throw new Error('Usuário inativo');
    }

    const isValidPassword = await this.validatePassword(password, user.password);
    
    if (!isValidPassword) {
      throw new Error('Senha incorreta');
    }

    // Retornar sem a senha
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = new UserService();