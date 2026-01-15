import { test, expect } from '@playwright/test';

test.describe('Testes E2E - Registro de Usuário', () => {
  
  // CT-009: Registro com Sucesso
  test('Registro sucesso', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Não tem conta? Criar uma agora').click();
    await page.getByPlaceholder('Seu nome completo').fill('Novo Usuário');
    await page.getByPlaceholder('Seu melhor email').fill(`novo-${Date.now()}@email.com`);
    await page.getByPlaceholder('Crie uma senha segura').fill('123456');
    await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
    await expect(page.getByText('Conta criada com sucesso! Faça login para continuar.')).toBeVisible();
  });

  // CT-010: Email Duplicado
  test('Email duplicado', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Não tem conta? Criar uma agora').click();
    await page.getByPlaceholder('Seu nome completo').fill('Teste');
    await page.getByPlaceholder('Seu melhor email').fill('teste@email.com');
    await page.getByPlaceholder('Crie uma senha segura').fill('123456');
    await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
    await expect(page.getByText('Usuário já existe com este email')).toBeVisible();
  });

  // CT-011: Registro sem Nome
  test('Registro sem nome', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Não tem conta? Criar uma agora').click();
    await page.getByPlaceholder('Seu melhor email').fill('novo@email.com');
    await page.getByPlaceholder('Crie uma senha segura').fill('123456');
    await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
    await expect(page.getByText('Nome, email e senha são obrigatórios')).toBeVisible();
  });

  // CT-012: Senha Curta
  test('Senha curta', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Não tem conta? Criar uma agora').click();
    await page.getByPlaceholder('Seu nome completo').fill('Teste');
    await page.getByPlaceholder('Seu melhor email').fill('novo@email.com');
    await page.getByPlaceholder('Crie uma senha segura').fill('12345');
    await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
    await expect(page.getByText('Senha deve ter pelo menos 6 caracteres')).toBeVisible();
  });

  // CT-013: Registro sem Email
  test('Registro sem email', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Não tem conta? Criar uma agora').click();
    await page.getByPlaceholder('Seu nome completo').fill('Teste');
    await page.getByPlaceholder('Crie uma senha segura').fill('123456');
    await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
    await expect(page.getByText('Nome, email e senha são obrigatórios')).toBeVisible();
  });

  // CT-014: Registro sem Senha
  test('Registro sem senha', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Não tem conta? Criar uma agora').click();
    await page.getByPlaceholder('Seu nome completo').fill('Teste');
    await page.getByPlaceholder('Seu melhor email').fill('novo@email.com');
    await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
    await expect(page.getByText('Nome, email e senha são obrigatórios')).toBeVisible();
  });

  // CT-015: Email Formato Inválido
  test('Email formato invalido', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Não tem conta? Criar uma agora').click();
    await page.getByPlaceholder('Seu nome completo').fill('Teste');
    await page.getByPlaceholder('Seu melhor email').fill('emailinvalido');
    await page.getByPlaceholder('Crie uma senha segura').fill('123456');
    await page.getByRole('button', { name: 'Criar Minha Conta' }).click();
    await expect(page.getByText('Email inválido')).toBeVisible();
  });

});