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

  it("Light/Dark theme works properly", () => {
    cy.get("[data-test=THEME_SWITCHER]")
      .should("be.visible")
      .click();

    cy.get("[data-test=DOM_BODY]").should("have.class", "dark-mode");

    cy.get("[data-test=THEME_SWITCHER]")
      .click()
      .should("not.have.class", "dark-mode");
  });

  it("Language selectors are visible & can select language options", () => {
    cy.get("[data-test=LANGUAGE_SELECTOR]").should("be.visible");

    cy.get("#__BVID__9")
      .should("have.value", "")
      .select("US English");

    cy.get("#__BVID__10")
      .should("have.value", "")
      .select("French");
  });
});
