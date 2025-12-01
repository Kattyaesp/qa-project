import Ajv from 'ajv';
import loginPage from '../support/pages/LoginPage';
import inventoryPage from '../support/pages/InventoryPage';

const ajv = new Ajv();


const productsApiSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          price: { type: 'number' },
        },
        required: ['id', 'name', 'price'],
      },
    },
  },
  required: ['data'],
};

describe('Contrato entre UI y API - Lista de productos', () => {
  it('La API que alimenta la UI cumple el contrato y los productos aparecen en pantalla', () => {

   
    cy.intercept('GET', '**/api/products*').as('getProducts');

    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');

    
    cy.wait('@getProducts').then((interception) => {
      const { response } = interception;

    
      expect(response.statusCode).to.eq(200);

      
      const validate = ajv.compile(productsApiSchema);
      const valid = validate(response.body);

      expect(valid, JSON.stringify(validate.errors)).to.be.true;

   
      const productos = response.body.data;

      productos.forEach((producto) => {
       
        inventoryPage.getProductByName(producto.name).should('exist');
      });
    });
  });
});
