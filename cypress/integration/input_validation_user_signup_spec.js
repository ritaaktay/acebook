describe("User input validation - user signup", () => {
  it("A user can't sign up with invalid user input", () => {
    cy.visit("/users/new");

    // Invalid name input
    cy.get("#name").type("1234!@£$");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get("#message").should(
      "contain",
      "Error: Name should not include numbers or special characters, other than '-' and spaces. Try again!"
    );

    // Invalid email input
    cy.get("#name").type("Jovi");
    cy.get("#email").type("someone@example");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get("#message").should(
      "contain",
      "Error: Invalid email, you dummy. Try again!"
    );

    // Invalid password input
    // todo: update this with future (more complex) password requirements
    cy.get("#name").type("Jovi");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("1234");
    cy.get("#submit").click();

    cy.get("#message").should(
      "contain",
      "Error: Password does not meet requirements. Try again!"
    );
  });
});
