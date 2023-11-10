describe("Login with valid userdata", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://127.0.0.1:5500/");
    cy.wait(500);
    cy.get("header [data-auth='login']").click({ force: true });
  });

  const email = "irob@noroff.no";
  const password = "irob1234";

  it("user can log in and access the profile", () => {
    cy.get("#registerForm button")
      .contains("Login")
      .should("be.visible")
      .click({ force: true });

    cy.get("#loginEmail").should("be.visible").focus().type(email);

    cy.get("#loginPassword").should("be.visible").focus().type(password);

    cy.get("#loginForm button[type=submit]").focus().click({ force: true });

    cy.wait(1000);

    //somehow it does not work :(
    cy.get(".profile-name").contains("irob").should("be.visible");
  });

  it("can log out with the logout button", () => {
    cy.get("#registerForm button")
      .contains("Login")
      .should("be.visible")
      .click({ force: true });

    cy.get("#loginEmail").should("be.visible").focus().type(email);

    cy.get("#loginPassword").should("be.visible").focus().type(password);

    cy.get(".btn-success").contains("Login").click();

    cy.get(".btn-outline-warning").contains("Logout").click({ force: true });
  });
});

describe("Login with invalid userdata", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://127.0.0.1:5500/");
    cy.wait(500);
    cy.get("header [data-auth='login']").click({ force: true });
  });

  const email = "invalid@invalid.no";
  const password = "irob1234";

  it("user can't submit the login form", () => {
    cy.get("#registerForm button")
      .contains("Login")
      .should("be.visible")
      .click({ force: true });

    cy.get("#loginEmail").should("be.visible").focus().type(email);

    cy.get("#loginPassword").should("be.visible").focus().type(password);

    cy.get(".btn-success").contains("Login").click();

    cy.url().should("not.contain", "profile");
  });

  it("shows an error message", () => {
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "Either your username was not found or your password is incorrect",
      );
    });
  });
});
