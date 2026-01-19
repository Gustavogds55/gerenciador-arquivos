import { test, expect } from '@playwright/test';

test.describe('Testes E2E - Toggle Formulários', () => {
  
  // CT-019: Toggle entre Login e Registro
  test('Toggle formularios', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByPlaceholder('Digite seu email')).toBeVisible();
    await expect(page.getByPlaceholder('Digite sua senha')).toBeVisible();
    await page.getByText('Não tem conta? Criar uma agora').click();
    await expect(page.getByPlaceholder('Seu nome completo')).toBeVisible();
    await expect(page.getByPlaceholder('Seu melhor email')).toBeVisible();
    await expect(page.getByPlaceholder('Crie uma senha segura')).toBeVisible();
    await page.getByText('Já tem conta? Fazer login').click();
    await expect(page.getByPlaceholder('Digite seu email')).toBeVisible();
    await expect(page.getByPlaceholder('Digite sua senha')).toBeVisible();
  });

});
