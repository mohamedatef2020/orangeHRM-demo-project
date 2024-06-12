class LoginPage {
    // ***** Elements ***** \\
    userNameField = () => cy.get('input[name="username"');
    passwordField = () => cy.get('input[name="password"');
    loginBTN = () => cy.get('button.orangehrm-login-button');

    // ***** Actions ***** \\
    fillUserName = (text) => this.userNameField().type(text);
    fillPassword = (text) => this.passwordField().type(text);
    clickLogin = () => this.loginBTN().click();

}

export const loginPage = new LoginPage();