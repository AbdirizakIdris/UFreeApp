describe("Registration", () => { 
  it("A user signs up and is redirected to log in", () => {
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

describe("Email confirmation", () => { 
  it("rejects user sign-up when emails don't match", () => {
    //sign-up
    cy.visit("/users/new");
    cy.get("#firstName").type("Eva");
    cy.get("#lastName").type("Smith");
    cy.get("#email").type("eva@test.com");
    cy.get("#confirmEmail").type("adam@test.com");
    cy.get("#password").type("password");
    cy.get("#confirmPassword").type("password");
    cy.get("#submit").click();
    
    cy.url().should("include", "/users/new");
  });
});

describe("Password confirmation", () => { 
  it("rejects user sign-up when passwords don't match", () => {
    //sign-up
    cy.visit("/users/new");
    cy.get("#firstName").type("Eva");
    cy.get("#lastName").type("Smith");
    cy.get("#email").type("eva@test.com");
    cy.get("#confirmEmail").type("eva@test.com");
    cy.get("#password").type("password");
    cy.get("#confirmPassword").type("12345");
    cy.get("#submit").click();
    
    cy.url().should("include", "/users/new");
  });
});

describe("Email duplicated", () => { 
  it("rejects user sign-up when email already exists", () => {
    //sign-up first time
    cy.visit("/users/new");
    cy.get("#firstName").type("Eva");
    cy.get("#lastName").type("Smith");
    cy.get("#email").type("eva@test.com");
    cy.get("#confirmEmail").type("eva@test.com");
    cy.get("#password").type("password");
    cy.get("#confirmPassword").type("12345");
    cy.get("#submit").click();

    //sign-up second time with the same email
    cy.visit("/users/new");
    cy.get("#firstName").type("Eva");
    cy.get("#lastName").type("Smith");
    cy.get("#email").type("eva@test.com");
    cy.get("#confirmEmail").type("eva@test.com");
    cy.get("#password").type("password");
    cy.get("#confirmPassword").type("12345");
    cy.get("#submit").click();
    
    cy.url().should("include", "/users/new");
  });
});



