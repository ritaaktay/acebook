describe("Timeline", () => {
  it("cannot like their own posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Make a post").click();
    cy.visit("/posts/new");

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#submit").click();

    cy.get(".post:first")
      .find(".like:first")
      .within(() => {
        cy.get(".submit:first").should("have.attr", "disabled");
      });
  });

  it("cannot like a post twice", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Make a post").click();
    cy.visit("/posts/new");

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#submit").click();

    //sign out
    cy.get("#logout").click();

    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone five");
    cy.get("#email").type("someone5@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone5@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get(".post:first")
      .find(".like:first")
      .within(() => {
        cy.get(".submit:first").click();
      });

    cy.get(".post:first")
      .find(".like:first")
      .within(() => {
        cy.get(".submit:first").should("have.attr", "disabled");
      });
  });
});
