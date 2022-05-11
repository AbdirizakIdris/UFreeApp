describe("Registration", () => { 
  it("A user signs up and is redirected to sign in", () => {
    //sign-up
    cy.visit("/users/new");
    cy.get("#firstName").type("Eva");
    cy.get("#lastName").type("Smith");
    cy.get("#email").type("eva@test.com");
    cy.get("#confirmEmail").type("eva@test.com");
    cy.get("#password").type("password");
    cy.get("#confirmPassword").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
});

// describe("Email confirmation", () => { 
//     it("rejects user sign-up when emails don't match", () => {
//       //sign-up
//       cy.visit("/users/new");
//       cy.get("#firstName").type("Eva");
//       cy.get("#lastName").type("Smith");
//       cy.get("#email").type("eva@test.com");
//       cy.get("#confirmEmail").type("adam@test.com");
//       cy.get("#password").type("password");
//       cy.get("#confirmPassword").type("password");
//       cy.get("#submit").click();
  
//       cy.url().should("include", "/users/new");
//     });
//   });

