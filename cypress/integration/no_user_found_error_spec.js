describe("No user found", () => {
  it("displays error message if no user exists for profile url", () => {
    cy.visit("/users/3294114915924859478294728947234");
    cy.get("#error").should("contain", "This user does not exist");
  });
});
