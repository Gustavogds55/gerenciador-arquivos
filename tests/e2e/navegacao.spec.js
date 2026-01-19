import { test, expect } from '@playwright/test';

test.describe('Testes E2E - Navegação', () => {
  
  // CT-016: Proteção de Rota
  test('Acesso dashboard sem login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/', { timeout: 5000 });
    await expect(page.getByText('CloudVault')).toBeVisible();
    await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
  });

  // CT-017: Logout do Sistema
  test('Logout', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
    await page.getByPlaceholder('Digite sua senha').fill('123456');
    await page.getByRole('button', { name: 'Entrar na Plataforma' }).click();
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
    await page.getByRole('button', { name: 'Sair' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Seu gerenciador de arquivos na nuvem')).toBeVisible();
  });

  // CT-018: Persistência de Sessão
  test('Persistencia sessao', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Digite seu email').fill('teste@email.com');
    await page.getByPlaceholder('Digite sua senha').fill('123456');
    await page.getByRole('button', { name: 'Entrar na Plataforma' }).click();
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
    await page.reload();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Teste User')).toBeVisible();
  });

});
