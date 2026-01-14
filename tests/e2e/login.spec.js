import { test, expect } from '@playwright/test';

test.describe('Testes E2E - Tela de Login', () => {
  
  // CT-001: Fluxo de Login com Sucesso
  test('Login sucesso', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
    await page.getByPlaceholder('Digite sua senha').fill('123456');
    await page.getByRole('button', { name: 'Entrar na Plataforma' }).click();
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
  });

  // CT-002: Login com Email Inválido
  test('Usuario invalido', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Digite seu email').fill('naoexiste@email.com');
    await page.getByPlaceholder('Digite sua senha').fill('123456');
    await page.getByRole('button', { name: 'Entrar na Plataforma' }).click();
    await expect(page.getByText('Usuário não encontrado')).toBeVisible();
    await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
  });

  // CT-003: Login com Senha Incorreta
  test('Senha invalida', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
    await page.getByPlaceholder('Digite sua senha').fill('senhaerrada');
    await page.getByRole('button', { name: 'Entrar na Plataforma' }).click();
    await expect(page.getByText('Senha incorreta')).toBeVisible();
    await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
  });

  // CT-004: Login com Email Vazio
  test('Email vazio', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Digite sua senha').fill('123456');
    await page.getByPlaceholder('Digite seu email').click();
    await page.getByPlaceholder('Digite sua senha').click();
    await expect(page.getByText('Campo obrigatório')).toBeVisible();
    await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
  });

  // CT-005: Login com Senha Vazia
  test('Senha vazia', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
    await page.getByPlaceholder('Digite sua senha').click();
    await page.getByPlaceholder('Digite seu email').click();
    await expect(page.getByText('Campo obrigatório')).toBeVisible();
    await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
  });

});
