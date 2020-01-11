/// <reference types="Cypress" />

describe("Testing application works as intended", () => {
  it("App loads properly", () => {
    cy.visit("http://localhost:8080/");
    cy.get("[data-test=APPLICATION_WRAPPER]").should("be.visible");
  });

  it("Header title is visible & contains correct text", () => {
    cy.get("[data-test=HEADER_TITLE]")
      .should("be.visible")
      .should("contain.text", "Select Language Pair To Translate");
  });
});
