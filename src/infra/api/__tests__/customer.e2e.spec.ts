import request from 'supertest';
import { app, sequelize } from '../app';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Customer',
        address: {
          street: 'Street',
          number: 5,
          city: 'City',
          state: 'State',
          zip: 'Zip',
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Customer');
    expect(response.body.address.street).toBe('Street');
    expect(response.body.address.number).toBe(5);
    expect(response.body.address.city).toBe('City');
    expect(response.body.address.state).toBe('State');
    expect(response.body.address.zip).toBe('Zip');
  });

  it('should not create a customer', async () => {
    const response = await request(app).post('/customer').send({
      name: 'Customer',
    });

    expect(response.status).toBe(500);
  });

  it('should list all customer', async () => {
    const response1 = await request(app)
      .post('/customer')
      .send({
        name: 'Customer 1',
        address: {
          street: 'Street 1',
          number: 5,
          city: 'City 1',
          state: 'State 1',
          zip: 'Zip 1',
        },
      });

    expect(response1.status).toBe(200);

    const response2 = await request(app)
      .post('/customer')
      .send({
        name: 'Customer 2',
        address: {
          street: 'Street 2',
          number: 5,
          city: 'City 2',
          state: 'State 2',
          zip: 'Zip 2',
        },
      });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get('/customer').send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customer.length).toBe(2);

    const customer1 = listResponse.body.customer[0];
    expect(customer1.name).toBe('Customer 1');
    expect(customer1.address.street).toBe('Street 1');
    expect(customer1.address.number).toBe(5);
    expect(customer1.address.city).toBe('City 1');
    expect(customer1.address.state).toBe('State 1');
    expect(customer1.address.zip).toBe('Zip 1');

    const customer2 = listResponse.body.customer[1];
    expect(customer2.name).toBe('Customer 2');
    expect(customer2.address.street).toBe('Street 2');
    expect(customer2.address.number).toBe(5);
    expect(customer2.address.city).toBe('City 2');
    expect(customer2.address.state).toBe('State 2');
    expect(customer2.address.zip).toBe('Zip 2');
  });

  it('should not list all customer', async () => {
    jest
      .spyOn(CustomerRepository.prototype, 'findAll')
      .mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/customer');

    expect(response.status).toBe(500);
  });

  it('should list one customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Customer',
        address: {
          street: 'Street',
          number: 5,
          city: 'City',
          state: 'State',
          zip: 'Zip',
        },
      });

    expect(response.status).toBe(200);

    const findResponse = await request(app)
      .get(`/customer/${response.body.id}`)
      .send();

    expect(findResponse.status).toBe(200);
    expect(findResponse.body.name).toBe('Customer');
    expect(findResponse.body.address.street).toBe('Street');
    expect(findResponse.body.address.number).toBe(5);
    expect(findResponse.body.address.city).toBe('City');
    expect(findResponse.body.address.state).toBe('State');
    expect(findResponse.body.address.zip).toBe('Zip');
  });

  it('should not list one customer', async () => {
    const findResponse = await request(app).get(`/customer/id`).send();

    expect(findResponse.status).toBe(500);
  });

  it('should update a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Customer',
        address: {
          street: 'Street',
          number: 5,
          city: 'City',
          state: 'State',
          zip: 'Zip',
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Customer');
    expect(response.body.address.street).toBe('Street');
    expect(response.body.address.number).toBe(5);
    expect(response.body.address.city).toBe('City');
    expect(response.body.address.state).toBe('State');
    expect(response.body.address.zip).toBe('Zip');

    const update = await request(app)
      .put(`/customer/${response.body.id}`)
      .send({
        name: 'Customer updated',
        address: {
          street: 'Street updated',
          number: 6,
          city: 'City updated',
          state: 'State updated',
          zip: 'Zip updated',
        },
      });

    expect(update.status).toBe(200);
    expect(update.body.name).toBe('Customer updated');
    expect(update.body.address.street).toBe('Street updated');
    expect(update.body.address.number).toBe(6);
    expect(update.body.address.city).toBe('City updated');
    expect(update.body.address.state).toBe('State updated');
    expect(update.body.address.zip).toBe('Zip updated');
  });

  it('should not update a customer', async () => {
    const response = await request(app).put('/customer/id').send({
      name: 'Customer',
    });

    expect(response.status).toBe(500);
  });

  it('should delete a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Customer',
        address: {
          street: 'Street',
          number: 5,
          city: 'City',
          state: 'State',
          zip: 'Zip',
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Customer');
    expect(response.body.address.street).toBe('Street');
    expect(response.body.address.number).toBe(5);
    expect(response.body.address.city).toBe('City');
    expect(response.body.address.state).toBe('State');
    expect(response.body.address.zip).toBe('Zip');

    const deleteCustomer = await request(app)
      .delete(`/customer/${response.body.id}`)
      .send();

    expect(deleteCustomer.status).toBe(200);

    const findResponse = await request(app)
      .get(`/customer/${response.body.id}`)
      .send();

    expect(findResponse.status).toBe(500);
  });

  it('should not delete a customer', async () => {
    const response = await request(app).delete('/customer/id');

    expect(response.status).toBe(500);
  });
});
