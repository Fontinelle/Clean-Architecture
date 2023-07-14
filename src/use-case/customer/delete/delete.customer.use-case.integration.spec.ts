import { Sequelize } from 'sequelize-typescript';
import DeleteCustomerUseCase from './delete.customer.use-case';
import CustomerModel from '../../../infra/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infra/customer/repository/sequelize/customer.repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';

describe('Integration test delete customer use case', () => {
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

  it('should delete a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customerDeleteUseCase = new DeleteCustomerUseCase(customerRepository);

    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street', 5, 'City', 'State', 'Zip');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const output = await customerDeleteUseCase.execute({ id: customer.id });

    expect(output).toEqual(void 0);
  });
});
