import { User } from "../../../src/models";

describe("User Sign-up and Login", function () {
  beforeEach(function () {
    cy.task("db:seed");
  });

  it("should redirect unauthenticated user to signin page", function () {
    /**
     * visit '/account' page
     * then verify that the user is being redirected to the 'signin' page
     */
  });

  xit("should remember a user for 30 days after login", function () {
    cy.database("find", "users").then((user: User) => {
      cy.login(user.username, "s3cret", true);
    });

    // Verify Session Cookie
    cy.getCookie("connect.sid").should("have.property", "expiry");

    // Logout User
    cy.getBySel("sidenav-signout").click();
    cy.location("pathname").should("eq", "/signin");
    cy.visualSnapshot("Redirect to SignIn");
  });

  xit("should allow a visitor to sign-up, login, and logout", function () {
    // Given
    const userInfo = {
      firstName: "Bob",
      lastName: "Ross",
      username: "PainterJoy90",
      password: "s3cret",
    };

    /**
     * 1- User should sign-up, then redirect to login page
     * 2- User should login
     * 3- User should follow the onboarding process
     * 4- User should logout after the onboarding process is completed
     */

    // Onboarding Process
    // Verify that the onboarding dialog is visible
    // Once it's visible, click on the next button
    // You should arrive on the screen that contain "Create Bank Account"
    // Enter the following information
    // Bank name="The Best Bank"
    // Account number=123456789
    // Routing Number=987654321
    // Then submit and the bank account should be created
    // The title should contain 'Finished'
    // The content should contain "You're all set"
    // You then click on the next button
    // You should be able to see the transaction list (should be visible)
  });

  xit("should display login errors", function () {
    // Should display the list of errors if the user enter incorrect credential
  });

  xit("should display signup errors", function () {
    // Should display the list of errors if the user enter incorrect credential
  });

  xit("should error for an invalid user", function () {});

  xit("should error for an invalid password for existing user", function () {});
});
