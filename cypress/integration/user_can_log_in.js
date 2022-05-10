describe("Authentication", () => {
    it("A user signs in and is redirected to /personal-page", () => {

        cy.visit("/sessions/new");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
    
        cy.url().should("include", "/personal-page");
        // cy.contains("a", "");
      });

  });