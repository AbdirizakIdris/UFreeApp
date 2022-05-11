describe("Authentication", () => {
    it("A user signs in and is redirected to /personal-page", () => {

        cy.visit("/sessions/new");
        cy.get("#email").type("eva@test.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
    
        cy.url().should("include", "/personal-page");
        // cy.contains("a", "");
      });

    it("A user signs in with an email that doesn't exist and is redirected to /sessions/new", () => {

      cy.visit("/sessions/new");
      cy.get("#email").type("fishhead@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
      cy.get("#error_box").should("have.text", "Account not found")
    });

    it("Password does not match the user email and is redirected to /sessions/new", () => {
      
      cy.visit("/sessions/new");
      cy.get("#email").type("eva@test.com");
      cy.get("#password").type("p0ssw0rd");
      cy.get("#submit").click();
      cy.get("#error_box").should("have.text", "Incorrect Password")
    });
    

  });