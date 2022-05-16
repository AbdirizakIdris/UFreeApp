describe("Group Page", () => {
    it("has a calendar", () => {
        cy.visit("/users/groups")
        cy.get(".cellButton").contains("UFree?")
    })

    it("has the month of May", () => {
        cy.visit("/users/groups")
        cy.contains("May 2022")
    })
    
})