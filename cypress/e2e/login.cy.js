
describe('Testing E2E Login Dashboard Hotel Miranda ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')

  });
  
  it('Allows login with the right credentials', () => {
    cy.get('[data-cy="email-input"]');
    cy.get('[data-cy="password-input"]');
    cy.get('[data-cy="login-button"]').contains('Login').click();

    cy.location('pathname', { timeout: 2000 }).should('eq', '/');

    });

    it ('Dont allow login when the credentials are wrong',() => {
      cy.get('[data-cy="email-input"]').type('notuser@testing.com'); 
      cy.get('[data-cy="password-input"]').type('workpls');;
      cy.get('[data-cy="login-button"]').contains('Login').click();

    cy.location('pathname', { timeout: 2000 }).should('eq', '/login');
  });

})