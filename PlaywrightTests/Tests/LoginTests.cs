using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightTests.Tests;

public class PrimeiroTeste : PageTest
{
    
    [Test]
    public async Task LoginSucesso()
    {
        await Page.GotoAsync("http://localhost:3000/");
        await Page.GetByPlaceholder("Digite seu email").FillAsync("teste@email.com");
        await Page.GetByPlaceholder("Digite sua Senha").FillAsync("123456)");
        await Page.Locator("button[type='submit']").ClickAsync();
        await Expect(Page.GetByTestId("company-modal")).ToBeVisibleAsync();
        
    }



}


