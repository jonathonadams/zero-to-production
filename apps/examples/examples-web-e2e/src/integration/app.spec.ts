import { getGreeting } from '../support/app.po';

describe('examples-web', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to examples-web!');
  });
});
