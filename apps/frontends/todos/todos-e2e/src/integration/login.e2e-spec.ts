import { waitForAngular } from 'testcafe-angular-selectors';
import { LoginPageObject } from '../support/login.po';
import { SITE_URL } from '../../config.e2e';

fixture(`Login Fixture`)
  .page(`${SITE_URL}/login`)
  .beforeEach(async t => {
    t.ctx.loginPage = new LoginPageObject();
    await waitForAngular();
  });

test('should log a user in and redirect to the home page', async t => {
  const page: LoginPageObject = t.ctx.loginPage;

  await page.verifyUserIsNotLoggedIn();
  await page.login();
  await page.verifyUserIsAuthenticated();
  await page.verifyHomeRedirectFromLoginPage();
});

test('should not authenticate a user with incorrect credentials', async t => {
  const page: LoginPageObject = t.ctx.loginPage;

  await page.loginWithIncorrectCredentials();
  await page.verifyNoHomeRedirect();
});

test('should redirect to home if already signed in', async t => {
  const page: LoginPageObject = t.ctx.loginPage;

  await page.login();
  await page.navigateTo();
  await page.verifyHomeRedirectFromLoginPage();
});
