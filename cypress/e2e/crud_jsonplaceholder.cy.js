describe('CRUD - JSONPlaceholder /posts', () => {
  let createdId;

  it('CREATE - POST /posts', () => {
    cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', {
      title: 'Mi post de prueba',
      body: 'Contenido de prueba',
      userId: 1
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('id');
      createdId = res.body.id;
    });
  });

  it('READ - GET /posts/:id', () => {
    // Usar un id ya conocido, porque JSONPlaceholder no persiste
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('title');
    });
  });

  it('UPDATE - PUT /posts/:id', () => {
    cy.request('PUT', 'https://jsonplaceholder.typicode.com/posts/1', {
      id: 1,
      title: 'Título actualizado',
      body: 'Contenido actualizado',
      userId: 1
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('title', 'Título actualizado');
    });
  });

  it('DELETE - DELETE /posts/:id', () => {
    cy.request('DELETE', 'https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      // Esta API devuelve 200 ó 204
      expect([200, 204]).to.include(res.status);
    });
  });
});
