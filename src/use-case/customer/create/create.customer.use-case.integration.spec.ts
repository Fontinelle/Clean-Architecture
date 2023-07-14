import { Sequelize } from 'sequelize-typescript';
import CreateCustomerUseCase from './create.customer.use-case';
import CustomerModel from '../../../infra/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infra/customer/repository/sequelize/customer.repository';

describe('Integration test create customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      id: '1',
      name: 'Customer 1',
      address: {
        street: 'Street',
        number: 5,
        zip: 'Zip',
        city: 'City',
        state: 'State',
      },
    };

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        state: input.address.state,
        zip: input.address.zip,
      },
    });
  });
});
