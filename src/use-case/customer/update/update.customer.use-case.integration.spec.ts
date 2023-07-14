import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infra/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infra/customer/repository/sequelize/customer.repository';
import UpdateCustomerUseCase from './update.customer.use-case';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';

describe('Integration test update customer use case', () => {
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

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street', 5, 'City', 'State', 'Zip');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const output = await customerUpdateUseCase.execute({
      id: customer.id,
      name: 'Customer Updated',
      address: {
        street: 'Street Updated',
        number: 6,
        zip: 'Zip Updated',
        city: 'City Updated',
        state: 'State Updated',
      },
    });

    expect(output).toEqual({
      id: customer.id,
      name: 'Customer Updated',
      address: {
        street: 'Street Updated',
        number: 6,
        zip: 'Zip Updated',
        city: 'City Updated',
        state: 'State Updated',
      },
    });
  });
});
