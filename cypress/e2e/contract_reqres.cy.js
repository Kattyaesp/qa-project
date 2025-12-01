import Ajv from 'ajv';

const ajv = new Ajv();

describe('Contract testing - ReqRes Users', () => {
  const userListSchema = {
    type: 'object',
    properties: {
      page: { type: 'number' },
      per_page: { type: 'number' },
      total: { type: 'number' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            avatar: { type: 'string' }
          },
          required: ['id', 'email', 'first_name', 'last_name', 'avatar']
        }
      }
    },
    required: ['page', 'per_page', 'total', 'data']
  };

  it('GET /api/users cumple el contrato', () => {
    cy.request('GET', 'https://reqres.in/api/users?page=1').then((response) => {
      // ASSERTIONS de status
      expect(response.status).to.eq(200);

      // Contract testing: validar el esquema
      const validate = ajv.compile(userListSchema);
      const valid = validate(response.body);

      expect(valid, JSON.stringify(validate.errors)).to.be.true;
    });
  });
});
