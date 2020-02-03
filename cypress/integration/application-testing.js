describe("App loads correctly, light/dark theme available & language switcher works", () => {
  it("App loads properly", () => {
    cy.visit("/");
    cy.get("[data-cy=application-wrapper]")
      .should("exist")
      .and("be.visible");
  });

  it("Header title is visible & contains correct text", () => {
    cy.get("[data-cy=header-title]")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "Select Language Pair To Translate");
  });

  it("Light/Dark theme works properly", () => {
    cy.get("[data-cy=theme-switcher]")
      .should("exist")
      .and("be.visible")
      .click();

    cy.get("[data-cy=dom-body]").should("have.class", "dark-mode");

    cy.get("[data-cy=theme-switcher]")
      .click()
      .should("not.have.class", "dark-mode");
  });

  it("Language selectors are visible & can select language options", () => {
    cy.get("[data-cy=language-selector]")
      .should("exist")
      .and("be.visible");

    cy.get("#__BVID__9")
      .should("exist")
      .and("be.visible")
      .and("have.value", "")
      .select("US English");

    cy.get("#__BVID__10")
      .should("exist")
      .and("be.visible")
      .and("have.value", "")
      .select("French");
  });

  it("App meta description is visible & contain correct links", () => {
    cy.get("[data-cy=meta-data]")
      .should("exist")
      .and("be.visible");

    cy.get("[data-cy=meta-data-link-vue]")
      .should("exist")
      .and("be.visible")
      .and("have.attr", "href", "https://vuejs.org/");

    cy.get("[data-cy=meta-data-link-yandex]")
      .should("exist")
      .and("be.visible")
      .and("have.attr", "href", "https://tech.yandex.com/translate/");

    cy.get("[data-cy=meta-data-link-responsivevoice]")
      .should("exist")
      .and("be.visible")
      .and("have.attr", "href", "https://responsivevoice.org/");

    cy.get("[data-cy=meta-data-link-github]")
      .should("exist")
      .and("be.visible")
      .and("have.attr", "href", "https://github.com/Manuel-Suarez-Abascal");
  });
});

describe("Translation functionality & form buttons works as intended", () => {
  it("Form buttons are disabled when no texts have been typed", () => {
    cy.get("[data-cy=delete-text-value-btn]")
      .should("not.exist")
      .and("not.be.visible");
    cy.get("[data-cy=source-form-copy-btn]")
      .should("be.visible")
      .and("have.attr", "disabled");
    cy.get("[data-cy=target-form-copy-btn]")
      .should("be.visible")
      .and("have.attr", "disabled");
    cy.get("[data-cy=responsespeak-btn]")
      .should("be.visible")
      .and("have.attr", "disabled");
  });

  it("Can type & translate text", () => {
    cy.get("[data-cy=source-text-translation-form]")
      .should("exist")
      .and("be.visible")
      .type(
        "I'm testing this application using Cypress.js and it's amazing!{enter}"
      );

    cy.get("[data-cy=target-text-translation-form]")
      .should("exist")
      .and("be.visible")
      .and(
        "have.value",
        "Je suis en essais à l'aide de cette application Cypress.js et c'est incroyable!"
      );
  });

  it("Form buttons are available after form has text value", () => {
    cy.get("[data-cy=source-form-copy-btn]")
      .should("exist")
      .and("be.visible")
      .and("not.have.attr", "disabled");
    cy.get("[data-cy=target-form-copy-btn]")
      .should("exist")
      .and("be.visible")
      .and("not.have.attr", "disabled");
    cy.get("[data-cy=responsespeak-btn]")
      .should("exist")
      .and("be.visible")
      .and("not.have.attr", "disabled");
  });

  it("Speech translation button works", () => {
    cy.get("[data-cy=responsespeak-btn]")
      .should("exist")
      .and("be.visible")
      .click();
  });
});

describe("Reverse translation works properly", () => {
  it("Can switch language options selection to be translated", () => {
    cy.get("[data-cy=interchange-language-btn]")
      .should("exist")
      .and("be.visible")
      .click();
  });

  it("Copy form text values buttons work", () => {
    cy.get("[data-cy=source-form-copy-btn]")
      .should("exist")
      .and("be.visible")
      .click();

    cy.get("[data-cy=source-form-copy-btn-tooltip]")
      .should("exist")
      .and("not.be.visible")
      .and("contain", "Text Copied");

    cy.get("[data-cy=target-form-copy-btn]")
      .should("exist")
      .and("be.visible")
      .click();

    cy.get("[data-cy=target-form-copy-btn-tooltip]")
      .should("exist")
      .and("not.be.visible")
      .and("contain", "Text Copied");
  });
});
