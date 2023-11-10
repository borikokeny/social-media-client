describe("Login with valid userdata", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://127.0.0.1:5500/");
    cy.wait(500);
    cy.get("header [data-auth='login']").click({ force: true });
  });

  it("user can log in and access the profile", () => {
    cy.get("#registerForm button")
      .contains("Login")
      .should("be.visible")
      .click();
  });
  const email = "irob@noroff.no";
  const password = "irob1234";
});
