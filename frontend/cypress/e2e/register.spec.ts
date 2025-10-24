describe('Register', () => {
  it('should register new user', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('input[placeholder="Tu nombre de usuario"]').type('nuevoUsuario');
    cy.get('input[placeholder="ejemplo@correo.com"]').type('nuevo@test.com');
    cy.get('input[placeholder="••••••••"]').type('Test1234!');
    cy.get('input[placeholder="••••••••"]').eq(1).type('Test1234!');
    cy.contains('Registrarse').click();
    cy.url().should('include', '/dashboard');
  });
});
