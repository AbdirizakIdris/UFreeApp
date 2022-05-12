describe("Personal Homepage", () => {
  it("goes to users/personal-page", () => {
    cy.visit("/");
    cy.signUp();
    cy.logIn();
    
    cy.url().should("include", "/users/personal-page");
  })
  
//   it("has the users name", () => {
//     cy.visit('/');
//     cy.signUp();
//     cy.logIn();

//     cy.get('.userName').should('have.text', 'John Doe')
//   })

it("has the users name", () => {
  cy.visit("/users/new");
  cy.get("#firstName").type("Jemima");
  cy.get("#lastName").type("Puddleduck");
  cy.get("#email").type("someone@example.com");
  cy.get("#confirmEmail").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#confirmPassword").type("password");
  cy.get("#submit").click();

  // cy.url().should("include", "/users/personal-page");

  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();

  cy.visit("/users/personal-page");
  cy.get("#userName").should("have.text", "Jemima Puddleduck");
  })
})