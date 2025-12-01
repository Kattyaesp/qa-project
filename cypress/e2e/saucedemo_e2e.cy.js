import loginPage from '../support/pages/LoginPage';
import inventoryPage from '../support/pages/InventoryPage';
import cartPage from '../support/pages/CartPage';
import checkoutPage from '../support/pages/CheckoutPage';

describe('E2E - Compra completa en Saucedemo (POM)', () => {

  beforeEach(() => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');
    inventoryPage.verifyPageLoaded();
  });

  it('Debería completar la compra de 2 productos', () => {
    // Agregar 2 productos al carrito
    inventoryPage.addBackpackToCart();
    inventoryPage.addBikeLightToCart();

    // Assert cantidad de carrito
    inventoryPage.elements.cartBadge().should('have.text', '2');

    // Ir al carrito y verificar productos
    inventoryPage.goToCart();
    cartPage.verifyCartPage();
    cartPage.verifyProductInCart('Sauce Labs Backpack');
    cartPage.verifyProductInCart('Sauce Labs Bike Light');

    // Checkout
    cartPage.goToCheckout();
    cy.url().should('include', '/checkout-step-one.html');

    // Datos del cliente
    checkoutPage.fillCustomerInfo('Ana', 'Lumiere', '0000');
    cy.url().should('include', '/checkout-step-two.html');

    // Finalizar compra
    checkoutPage.finishOrder();
    checkoutPage.verifyOrderCompleted();
  });
});
