// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("signUp", () => {
  cy.visit("/users/new");
  cy.get("#firstName").type("John")
  cy.get("#lastName").type("Doe")
  cy.get("#email").type("johndoe@example.com");
  cy.get("#confirmEmail").type("johndoe@example.com");
  cy.get("#password").type("password");
  cy.get("#confirmPassword").type("password");
  cy.get("#submit").click();
})

Cypress.Commands.add("logIn", () => {
  // sign in
  cy.visit("/sessions/new");
  cy.get("#email").type("johndoe@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();
})