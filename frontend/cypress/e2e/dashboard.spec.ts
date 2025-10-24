describe('Dashboard', () => {
  it('displays projects chart', () => {
    cy.login('user@test.com', 'Test1234!'); // Comando custom definido en support/commands.ts
    cy.visit('http://localhost:3000/dashboard');
    cy.contains('Dashboard de Proyectos').should('exist');
    cy.get('svg').should('exist'); // chequear gráfico
  });
});
