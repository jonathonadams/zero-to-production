import { t, Selector, ClientFunction } from 'testcafe';
import { AngularSelector } from 'testcafe-angular-selectors';
import { AUTHENTICATED_USER, UN_AUTHENTICATED_USER } from '../../config.e2e';
import { localStorageGet, getPageUrl } from './commands';

export class LoginPageObject {
  constructor(
    public usernameInput = Selector('input[formControlName="username"]'),
    public passwordInput = Selector('input[formControlName="password"]'),
    public singInButton = Selector('button[type="submit"]')
  ) {}

  async navigateTo() {
    return await t.navigateTo('login');
  }

  public async login() {
    return await t
      .typeText(this.usernameInput, AUTHENTICATED_USER.username)
      .typeText(this.passwordInput, AUTHENTICATED_USER.password)
      .click(this.singInButton);
  }

  public async loginWithIncorrectCredentials() {
    return await t
      .typeText(this.usernameInput, UN_AUTHENTICATED_USER.username)
      .typeText(this.passwordInput, UN_AUTHENTICATED_USER.password)
      .click(this.singInButton);
  }

  public async verifyUserIsNotLoggedIn() {
    await t.expect(await localStorageGet('access_token')).notOk();
  }

  public async verifyUserIsAuthenticated() {
    await t.expect(localStorageGet('access_token')).ok();
    await t.expect(localStorageGet('access_token')).typeOf('string');
  }

  public async verifyHomeRedirectFromLoginPage() {
    await t.expect(getPageUrl()).contains('home');
    await t.expect(getPageUrl()).notContains('login');
  }

  public async verifyNoHomeRedirect() {
    await t.expect(getPageUrl()).contains('login');
    await t.expect(getPageUrl()).notContains('home');
  }
}
