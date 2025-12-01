class LoginPage {
  elements = {
    username: () => cy.get('[data-test="username"]'),
    password: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
  };

  visit() {
    cy.visit('https://www.saucedemo.com/');
  }

  login(username, password) {
    this.elements.username().type(username);
    this.elements.password().type(password);
    this.elements.loginButton().click();
  }
}

export default new LoginPage();
