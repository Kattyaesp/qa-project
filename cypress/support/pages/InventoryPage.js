class InventoryPage {
  elements = {
    title: () => cy.get('.title'),
    cartBadge: () => cy.get('.shopping_cart_badge'),
    cartLink: () => cy.get('.shopping_cart_link'),
  };

  verifyPageLoaded() {
    cy.url().should('include', '/inventory.html');
    this.elements.title().should('have.text', 'Products');
  }

  addBackpackToCart() {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  addBikeLightToCart() {
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  }

  getProductByName(productName) {
    return cy.contains('.inventory_item_name', productName);
  }

  goToCart() {
    this.elements.cartLink().click();
  }
}

export default new InventoryPage();
