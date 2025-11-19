const userService = require('./userService');
const { generateToken } = require('./authMiddleware');

class AuthController {
  // Registro de usuário
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validações básicas
      if (!name || !email || !password) {
        return res.status(400).json({ 
          error: 'Nome, email e senha são obrigatórios' 
        });
      }

      if (password.length < 6) {
        return res.status(400).json({ 
          error: 'Senha deve ter pelo menos 6 caracteres' 
        });
      }

      // Criar usuário
      const user = await userService.createUser({ name, email, password });

      // Gerar token
      const token = generateToken(user);

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user,
        token
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(400).json({ 
        error: error.message || 'Erro interno do servidor' 
      });
    }
  }

  // Login de usuário
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validações básicas
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email e senha são obrigatórios' 
        });
      }

      // Autenticar usuário
      const user = await userService.authenticateUser(email, password);

      // Gerar token
      const token = generateToken(user);

      res.json({
        message: 'Login realizado com sucesso',
        user,
        token
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(401).json({ 
        error: error.message || 'Credenciais inválidas' 
      });
    }
  }

  // Perfil do usuário (rota protegida)
  async profile(req, res) {
    try {
      // req.user vem do middleware de autenticação
      const { password, ...userWithoutPassword } = req.user;
      
      res.json({
        message: 'Perfil do usuário',
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }
}

module.exports = new AuthController();