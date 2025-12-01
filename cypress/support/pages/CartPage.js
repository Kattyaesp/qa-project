class CartPage {
  elements = {
    cartTitle: () => cy.get('.title'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
  };

  verifyCartPage() {
    cy.url().should('include', '/cart.html');
    this.elements.cartTitle().should('have.text', 'Your Cart');
  }

  verifyProductInCart(productName) {
    cy.contains('.inventory_item_name', productName).should('be.visible');
  }

  goToCheckout() {
    this.elements.checkoutButton().click();
  }
}

export default new CartPage();
