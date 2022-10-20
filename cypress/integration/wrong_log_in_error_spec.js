describe("Authentication", () => {
  it("A message is displayed for wrong password", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password").type("passsword");
    cy.get("#submit").click();

    cy.get("#message").should("contain", "You entered a wrong password");
  });

  it("A message is displayed for no user with email", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someoneakdjas@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password").type("passsword");
    cy.get("#submit").click();

    cy.get("#message").should("contain", "No user exists with that email");
  });
});
