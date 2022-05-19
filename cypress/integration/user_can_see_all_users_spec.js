describe("All users page", () => {
    it("A user goes on to the add a friend and can see a list of all users", () => {

        cy.visit("/users/new");
        cy.get("#firstName").type("Juliana");
        cy.get("#lastName").type("Geee");
        cy.get("#email").type("julianageee@example.com");
        cy.get("#confirmEmail").type("julianageee@example.com");
        cy.get("#password").type("p4ssw4rd");
        cy.get("#confirmPassword").type("p4ssw4rd");
        cy.get("#submit").click();
        cy.contains("Sign Up").click(); //May fail later as navbar is removed.

        cy.visit("/users/new");
        cy.get("#firstName").type("Andrew");
        cy.get("#lastName").type("Michaels");
        cy.get("#email").type("amichaels@example.com");
        cy.get("#confirmEmail").type("amichaels@example.com");
        cy.get("#password").type("password");
        cy.get("#confirmPassword").type("password");
        cy.get("#submit").click();
        cy.contains("Sign Up").click(); //May fail later as navbar is removed.

        cy.visit("/users/new");
        cy.get("#firstName").type("Ashley");
        cy.get("#lastName").type("Carrot");
        cy.get("#email").type("acarrot@example.com");
        cy.get("#confirmEmail").type("acarrot@example.com");
        cy.get("#password").type("12345");
        cy.get("#confirmPassword").type("12345");
        cy.get("#submit").click();
        cy.contains("Sign Up").click(); //May fail later as navbar is removed.

        cy.signUp();
        cy.logIn();
        cy.contains("Add a Friend").click();
        cy.contains("Andrew Michaels");
        cy.contains("Juliana Gee");
        cy.contains("Ashley Carrot");
    });

    it("A logged in user cannot see their name on the all users list", () => {

        cy.logIn();
        cy.contains("Add a Friend").click();
        cy.contains("John Doe").should('not.exist')
    });
});