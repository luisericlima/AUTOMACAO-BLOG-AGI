Cypress.Commands.add("abrirBusca", () => {
  const seletorLupa = 'button[aria-label*="pesquisa"], button[aria-label*="buscar"], .search-toggle, .ast-search-icon';
  
  cy.get(seletorLupa, { timeout: 10000 })
    .filter(":visible")
    .first()
    .click({ force: true });
  
  cy.wait(500); 
});

Cypress.Commands.add("preencherBusca", (termo) => {
  const seletorInput = 'input[type="search"], input[aria-label*="pesquisa"], input[name="s"], #search-field';
  
  cy.get(seletorInput, { timeout: 10000 })
    .first()
    .should('exist')
    .focus()
    .clear({ force: true })
    .type(`${termo}{enter}`, { force: true, delay: 50 });
    
  cy.get('#main, .site-content, #primary', { timeout: 15000 })
    .should('be.visible');
});