Cypress.Commands.add("abrirBusca", () => {
  const seletorLupa = 'button[aria-label*="pesquisa"], button[aria-label*="buscar"], .search-toggle, .ast-search-icon';
  
  cy.get(seletorLupa, { timeout: 10000 })
    .filter(":visible")
    .first()
    .click({ force: true });
  
  cy.wait(500); 
});

Cypress.Commands.add("preencherBusca", (termo) => {
  const termoLimpo = termo.trim();
  cy.visit(`/?s=${encodeURIComponent(termoLimpo)}`, { timeout: 30000 });
    
  cy.get('#main, .site-content, #primary', { timeout: 20000 })
    .should('be.visible');
});