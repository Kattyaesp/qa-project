class CheckoutPage {
  elements = {
    firstName: () => cy.get('[data-test="firstName"]'),
    lastName: () => cy.get('[data-test="lastName"]'),
    postalCode: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    finishButton: () => cy.get('[data-test="finish"]'),
    completeHeader: () => cy.get('.complete-header'),
  };

  fillCustomerInfo(firstName, lastName, postalCode) {
    this.elements.firstName().type(firstName);
    this.elements.lastName().type(lastName);
    this.elements.postalCode().type(postalCode);
    this.elements.continueButton().click();
  }

  finishOrder() {
    this.elements.finishButton().click();
  }

  verifyOrderCompleted() {
    cy.url().should('include', '/checkout-complete.html');
    this.elements.completeHeader()
      .should('be.visible')
      .and('contain', 'THANK YOU FOR YOUR ORDER');
  }
}

export default new CheckoutPage();
