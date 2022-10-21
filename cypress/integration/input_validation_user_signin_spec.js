describe("User input validation - user signup", () => {
  it("A user can't sign up with invalid user input", () => {
    // User signs up
    cy.visit("/users/new");

    cy.get("#name").type("Jovi");
    cy.get("#email").type("jovi@jovi.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // User attempts sign-in with invalid email
    cy.visit("/sessions/new");

    cy.get("#email").type("jovi@jovi");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get("#message").should(
      "contain",
      "Error: Invalid email, you dummy. Try again!"
    );

    /*
    When password creation input validation refined (more complexd),
    add assertions for invalid password input (e.g. special HTML characters)
    */
  });
});
