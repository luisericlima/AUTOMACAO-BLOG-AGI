describe("Busca de artigos no Blog do Agi", () => {
  beforeEach(function () {
    cy.fixture("searchData").as("search");
    cy.fixture("messages").as("msg");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/", { timeout: 30000 });
  });

  it("deve retornar artigos quando pesquisar por um termo válido", function () {
    cy.abrirBusca();
    cy.preencherBusca(this.search.validTerm);

    cy.location("search", { timeout: 15000 }).should("include", "s=");
    
    const regexMsg = new RegExp(this.msg.resultsFoundFor, "i");
    cy.contains(regexMsg, { timeout: 15000 }).should("be.visible");
    
    cy.contains(this.search.validTerm, { timeout: 15000 }).should("be.visible");
    
    cy.contains(this.search.targetArticle, { timeout: 15000 }).should("be.visible");
    
    cy.get("article, .entry-content", { timeout: 15000 })
      .should("be.visible")
      .and("have.length.greaterThan", 0);
  });

  it("deve exibir estado sem resultados para termo inexistente", function () {
    cy.abrirBusca();
    cy.preencherBusca(this.search.invalidTerm);

    cy.location("search", { timeout: 15000 }).should("include", this.search.invalidTerm);
    
    const regex = new RegExp(this.msg.noResults, "i");
    cy.contains(regex, { timeout: 15000 }).should("be.visible");
  });

  it("deve retornar resultados para termo em maiúsculo", function () {
    cy.abrirBusca();
    cy.preencherBusca(this.search.upperCaseTerm);

    cy.location("search", { timeout: 15000 }).should("include", "s=");
    const regexMsg = new RegExp(this.msg.resultsFoundFor, "i");
    cy.contains(regexMsg, { timeout: 15000 }).should("be.visible");
    
    cy.contains(this.search.targetArticle, { timeout: 15000 }).should("be.visible");
    
    cy.get("article", { timeout: 15000 }).should("have.length.greaterThan", 0);
  });

  it("deve normalizar termo com espaços extras e manter resultados", function () {
    cy.abrirBusca();
    cy.preencherBusca(this.search.termWithSpaces);

    cy.location("search", { timeout: 15000 }).should("include", "s=");
    const regexMsg = new RegExp(this.msg.resultsFoundFor, "i");
    cy.contains(regexMsg, { timeout: 15000 }).should("be.visible");
    
    cy.contains(this.search.targetArticle, { timeout: 15000 }).should("be.visible");
    
    cy.get("article", { timeout: 15000 }).should("have.length.greaterThan", 0);
  });

  it("deve permitir abrir um artigo a partir da lista de resultados", function () {
    cy.abrirBusca();
    cy.preencherBusca(this.search.validTerm);

    cy.get("article h2 a, h2.entry-title a", { timeout: 15000 })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.location("hostname", { timeout: 15000 }).should("include", "blog.agibank.com.br");
    cy.get("h1", { timeout: 15000 }).should("be.visible").and("not.be.empty");
  });
});