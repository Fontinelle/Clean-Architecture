import request from 'supertest';
import { app, sequelize } from '../app';
import ProductRepository from '../../product/repository/sequelize/product.repository';

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productA = await request(app).post('/product').send({
      type: 'a',
      name: 'Product a',
      price: 100,
    });

    expect(productA.status).toBe(200);
    expect(productA.body.name).toBe('Product a');
    expect(productA.body.price).toBe(100);

    const productB = await request(app).post('/product').send({
      type: 'b',
      name: 'Product b',
      price: 100,
    });

    expect(productB.status).toBe(200);
    expect(productB.body.name).toBe('Product b');
    expect(productB.body.price).toBe(200);
  });

  it('should not create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product',
    });

    expect(response.status).toBe(500);
  });

  it('should list all product', async () => {
    const productA = await request(app).post('/product').send({
      type: 'a',
      name: 'Product a',
      price: 100,
    });

    expect(productA.status).toBe(200);

    const productB = await request(app).post('/product').send({
      type: 'b',
      name: 'Product b',
      price: 100,
    });

    expect(productB.status).toBe(200);

    const listResponse = await request(app).get('/product').send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.product.length).toBe(2);

    const product1 = listResponse.body.product[0];
    expect(product1.name).toBe('Product a');
    expect(product1.price).toBe(100);

    const product2 = listResponse.body.product[1];
    expect(product2.name).toBe('Product b');
    expect(product2.price).toBe(200);
  });

  it('should not list all product', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'findAll')
      .mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/product');

    expect(response.status).toBe(500);
  });

  it('should list a product', async () => {
    const product = await request(app).post('/product').send({
      type: 'a',
      name: 'Product a',
      price: 100,
    });

    expect(product.status).toBe(200);

    const response = await request(app)
      .get(`/product/${product.body.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(product.body.id);
    expect(response.body.name).toBe('Product a');
    expect(response.body.price).toBe(100);
  });

  it('should not list a product', async () => {
    const response = await request(app).get(`/product/id`).send();

    expect(response.status).toBe(500);
  });

  it('should update a customer', async () => {
    const product = await request(app).post('/product').send({
      type: 'a',
      name: 'Product a',
      price: 100,
    });

    expect(product.status).toBe(200);
    expect(product.body.name).toBe('Product a');
    expect(product.body.price).toBe(100);

    const update = await request(app).put(`/product/${product.body.id}`).send({
      name: 'Product b',
      price: 200,
    });

    expect(update.status).toBe(200);
    expect(update.body.name).toBe('Product b');
    expect(update.body.price).toBe(200);
  });

  it('should not update a product', async () => {
    const response = await request(app).put('/product/id').send({
      name: 'Product',
    });

    expect(response.status).toBe(500);
  });

  it('should delete a product', async () => {
    const product = await request(app).post('/product').send({
      type: 'a',
      name: 'Product a',
      price: 100,
    });

    expect(product.status).toBe(200);
    expect(product.body.name).toBe('Product a');
    expect(product.body.price).toBe(100);

    const response = await request(app)
      .delete(`/product/${product.body.id}`)
      .send();

    expect(response.status).toBe(200);

    const findResponse = await request(app)
      .get(`/product/${response.body.id}`)
      .send();

    expect(findResponse.status).toBe(500);
  });

  it('should not delete a product', async () => {
    const response = await request(app).delete('/product/id');

    expect(response.status).toBe(500);
  });
});
