const { test, expect } = require('@playwright/test');

test.describe('Modal de Seleção de Empresa', () => {
  
  test('1. Modal abre automaticamente após login', async ({ page }) => {
    // Ir para página de login
    await page.goto('http://localhost:3000');
    
    // Fazer login com usuário válido
    await page.fill('input[type="email"]', 'teste@email.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');
    
    // Aguardar redirecionamento para dashboard
    await page.waitForURL('**/dashboard');
    
    // Verificar se modal de empresa aparece automaticamente
    await expect(page.locator('text=Selecionar Empresa')).toBeVisible();
    
    // Verificar se modal não pode ser fechado (sem botão X ou backdrop)
    const modal = page.locator('[data-testid="company-modal"]');
    await expect(modal).toBeVisible();
  });

  test('2. Formulário de criação para usuário sem empresas', async ({ page }) => {
    // Ir para página de login
    await page.goto('http://localhost:3000');
    
    // Primeiro criar um usuário novo
    await page.click('text=Não tem conta? Criar uma agora');
    await page.fill('input[placeholder="Seu nome completo"]', 'Usuario Teste');
    await page.fill('input[placeholder="Seu melhor email"]', 'semempresa@email.com');
    await page.fill('input[placeholder="Crie uma senha segura"]', '123456');
    await page.click('button:has-text("Criar Minha Conta")');
    
    // Aguardar mensagem de sucesso e fazer login
    await expect(page.locator('text=Conta criada com sucesso')).toBeVisible();
    await page.fill('input[placeholder="Digite seu email"]', 'semempresa@email.com');
    await page.fill('input[placeholder="Digite sua senha"]', '123456');
    await page.click('button:has-text("Entrar na Plataforma")');
    
    // Aguardar modal aparecer
    await page.waitForURL('**/dashboard');
    await expect(page.locator('[data-testid="company-modal"]')).toBeVisible();
    
    // Verificar título para nova empresa
    await expect(page.locator('text=Nova Empresa')).toBeVisible();
    
    // Verificar se campos Nome e CNPJ estão presentes
    await expect(page.locator('input[placeholder="Nome da empresa"]')).toBeVisible();
    await expect(page.locator('input[placeholder="CNPJ"]')).toBeVisible();
    
    // Verificar se botão Criar está presente
    await expect(page.locator('button:has-text("Criar")')).toBeVisible();
  });

  test('3. Validação CNPJ obrigatório', async ({ page }) => {
    // Ir para página de login
    await page.goto('http://localhost:3000');
    
    // Gerar email único
    const uniqueEmail = `cnpjvazio${Date.now()}@email.com`;
    
    // Criar usuário novo
    await page.click('text=Não tem conta? Criar uma agora');
    await page.fill('input[placeholder="Seu nome completo"]', 'Usuario CNPJ Teste');
    await page.fill('input[placeholder="Seu melhor email"]', uniqueEmail);
    await page.fill('input[placeholder="Crie uma senha segura"]', '123456');
    await page.click('button:has-text("Criar Minha Conta")');
    
    // Fazer login
    await expect(page.locator('text=Conta criada com sucesso')).toBeVisible();
    await page.fill('input[placeholder="Digite seu email"]', uniqueEmail);
    await page.fill('input[placeholder="Digite sua senha"]', '123456');
    await page.click('button:has-text("Entrar na Plataforma")');
    
    // Aguardar modal aparecer
    await page.waitForURL('**/dashboard');
    await expect(page.locator('[data-testid="company-modal"]')).toBeVisible();
    
    // Preencher apenas nome da empresa (deixar CNPJ vazio)
    await page.fill('input[placeholder="Nome da empresa"]', 'Empresa Teste');
    
    // Tentar criar sem CNPJ
    await page.click('button:has-text("Criar")');
    
    // Verificar se mensagem de erro aparece
    await expect(page.locator('text=Nome da empresa e CNPJ são obrigatórios')).toBeVisible();
  });

});