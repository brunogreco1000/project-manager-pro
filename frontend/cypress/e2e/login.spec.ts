describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[placeholder="ejemplo@correo.com"]').type('user@test.com');
    cy.get('input[placeholder="••••••••"]').type('Test1234!');
    cy.contains('Login').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard de Proyectos').should('exist');
  });
});
