/// <reference types="Cypress" />

describe("App loads correctly, light/dark theme available & language switcher works", () => {
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

  it("App meta description is visible & contain correct links", () => {
    cy.get("[data-test=META_DATA]").should("be.visible");

    cy.get("[data-test=META_DATA_LINK_VUE]").should(
      "have.attr",
      "href",
      "https://vuejs.org/"
    );

    cy.get("[data-test=META_DATA_LINK_YANDEX]").should(
      "have.attr",
      "href",
      "https://tech.yandex.com/translate/"
    );

    cy.get("[data-test=META_DATA_LINK_RESPONSIVEVOICE]").should(
      "have.attr",
      "href",
      "https://responsivevoice.org/"
    );

    cy.get("[data-test=META_DATA_LINK_GITHUB]").should(
      "have.attr",
      "href",
      "https://github.com/Manuel-Suarez-Abascal"
    );
  });
});

describe("Translation functionality & form buttons works as intended", () => {
  it("Form buttons are disabled when no texts have been typed", () => {
    cy.get("[data-test=DELETE_TEXT_VALUE_BTN]").should("not.be.visible");
    cy.get("[data-test=SOURCE_FORM_COPY_BTN]").should("have.attr", "disabled");
    cy.get("[data-test=TARGET_FORM_COPY_BTN]").should("have.attr", "disabled");
    cy.get("[data-test=RESPONSESPEAK_BTN]").should("have.attr", "disabled");
  });

  it("Can type & translate text", () => {
    cy.get("[data-test=SOURCE_TEXT_TRANSLATION_FORM]").type(
      "I'm testing this application using Cypress.js and it's amazing!{enter}"
    );
    cy.get("[data-test=TARGET_TEXT_TRANSLATION_FORM]").should(
      "have.value",
      "Je suis en essais à l'aide de cette application Cypress.js et c'est incroyable!"
    );
  });

  it("Form buttons are available after form has text value", () => {
    cy.get("[data-test=SOURCE_FORM_COPY_BTN]").should(
      "not.have.attr",
      "disabled"
    );
    cy.get("[data-test=TARGET_FORM_COPY_BTN]").should(
      "not.have.attr",
      "disabled"
    );
    cy.get("[data-test=RESPONSESPEAK_BTN]").should("not.have.attr", "disabled");
  });

  it("Speech translation button works", () => {
    cy.get("[data-test=RESPONSESPEAK_BTN]").click();
  });
});

describe("Reverse translation works properly", () => {
  it("Can switch language options selection to be translated", () => {
    cy.get("[data-test=INTERCHANGE_LANGUAGE_BTN]").click();
  });

  it("Copy form text values buttons work", () => {
    cy.get("[data-test=SOURCE_FORM_COPY_BTN]").click();

    cy.get("[data-test=SOURCE_FORM_COPY_BTN_TOOLTIP]").should(
      "contain",
      "Text Copied"
    );
    cy.get("[data-test=TARGET_FORM_COPY_BTN]").click();

    cy.get("[data-test=TARGET_FORM_COPY_BTN_TOOLTIP]").should(
      "contain",
      "Text Copied"
    );
  });
});
