import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infra/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infra/customer/repository/sequelize/customer.repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.use-case';

describe('Test find customer use case', () => {
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

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street', 5, 'City', 'State', 'Zip');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = { id: '1' };

    const output = {
      id: '1',
      name: 'Customer 1',
      address: {
        street: 'Street',
        number: 5,
        city: 'City',
        state: 'State',
        zip: 'Zip',
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });
});
