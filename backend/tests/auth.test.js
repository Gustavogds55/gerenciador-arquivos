const request = require('supertest');
const app = require('../src/server');

describe('Auth API - Testes de Autenticação', () => {
  let authToken;
  const testUser = {
    name: 'Test User Jest',
    email: `test-${Date.now()}@jest.com`,
    password: '123456'
  };

  describe('POST /auth/register', () => {
    test('Deve registrar novo usuário com sucesso', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(testUser.email);
      expect(response.body.user.name).toBe(testUser.name);
      
      authToken = response.body.token;
    });

    test('Deve rejeitar registro com email duplicado', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send(testUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve rejeitar registro sem nome', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@test.com',
          password: '123456'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve rejeitar registro sem email', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Test',
          password: '123456'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve rejeitar registro sem senha', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Test',
          email: 'test@test.com'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /auth/login', () => {
    test('Deve fazer login com credenciais válidas', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(testUser.email);
    });

    test('Deve rejeitar login com email inexistente', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'naoexiste@test.com',
          password: '123456'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve rejeitar login com senha incorreta', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'senhaerrada'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve rejeitar login sem email', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          password: '123456'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve rejeitar login sem senha', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: testUser.email
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /auth/profile', () => {
    test('Deve retornar perfil com token válido', async () => {
      const response = await request(app)
        .get('/auth/profile')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(testUser.email);
    });

    test('Deve rejeitar acesso sem token', async () => {
      const response = await request(app)
        .get('/auth/profile');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve rejeitar acesso com token inválido', async () => {
      const response = await request(app)
        .get('/auth/profile')
        .set('Authorization', 'Bearer token_invalido');

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error');
    });
  });
});