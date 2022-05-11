describe("Home Page", () => {
  it("has a title", () => {
    cy.visit("/")
    cy.get(".title").should("contain", "UFree")
  })

  it("Shows 'log in' and 'sign up' in navbar", () => {
    cy.visit("/");

    cy.contains("a", "Log In")
    cy.contains("a", "Sign Up")
  })
})