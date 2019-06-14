import { getGreeting } from '../support/app.po';

describe('frontends-todos-todos', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to frontends-todos-todos!');
  });
});
