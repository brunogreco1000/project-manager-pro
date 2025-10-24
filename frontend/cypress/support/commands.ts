Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000/login');
  cy.get('input[placeholder="ejemplo@correo.com"]').type(email);
  cy.get('input[placeholder="••••••••"]').type(password);
  cy.contains('Login').click();
});
