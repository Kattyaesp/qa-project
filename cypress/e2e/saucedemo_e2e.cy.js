describe('E2E - Compra completa en Saucedemo', () => {

  // HOOK: se ejecuta antes de cada test
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');

    // Locators buenos: usan data-test, son estables
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // ASSERTION: verificar que entramos al inventario
    cy.url().should('include', '/inventory.html');
    cy.contains('.title', 'Products').should('be.visible');
  });

  it('Debería completar la compra de 2 productos', () => {
    // Agregar 2 productos
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // ASSERTION: ícono del carrito con cantidad = 2
    cy.get('.shopping_cart_badge').should('have.text', '2');

    // Ir al carrito
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');

    // Verificar que los productos están listados
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible');
    cy.contains('.inventory_item_name', 'Sauce Labs Bike Light').should('be.visible');

    // Checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    // Datos del comprador
    cy.get('[data-test="firstName"]').type('Ana');
    cy.get('[data-test="lastName"]').type('Lumiere');
    cy.get('[data-test="postalCode"]').type('0000');
    cy.get('[data-test="continue"]').click();

    // Verificar resumen y finalizar
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('[data-test="finish"]').click();

    // ASSERTION final: compra realizada
    cy.url().should('include', '/checkout-complete.html');
    cy.contains('THANK YOU FOR YOUR ORDER').should('be.visible');
  });
});
