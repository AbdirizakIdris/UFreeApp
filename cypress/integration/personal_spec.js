describe('Personal Page', () => {
  it("goes to users/personal-page", () => {
    cy.visit("/");
    cy.signUp();
    cy.logIn();
    
    cy.url().should("include", "/users/personal-page");
  })
  
  it('has a users name', () => {
    cy.visit('/')
    cy.signUp()
    cy.logIn()

    cy.get('.userName').should('have.text', 'John Doe')
  })
})