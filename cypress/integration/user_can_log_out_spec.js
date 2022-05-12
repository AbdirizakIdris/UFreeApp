describe("Logging Out", () => {
    it("A user logs out and is redirected to /sessions/new", () => {

       cy.signUp()
       cy.logIn()
       cy.get("#logOut").click()
    
        cy.url().should("include", "/sessions/new");
      });
})