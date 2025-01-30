
describe('Testing E2E Login Dashboard Hotel Miranda ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')

  });
  
  it('Allows login with the right credentials', () => {
    cy.get('[data-cy="email-input"]').type('user@testing.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').contains('Login').click();

  });

  it ('Dont allow login when the credentials are wrong',() => {
    cy.get('input[type="email"]').type('notuser@testing.com'); 
    cy.get('[data-cy="password-input"]').type('notpassword');
    cy.get('[data-cy="login-button"]').contains('Login').click();

  });
})
