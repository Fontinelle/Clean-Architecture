import { Sequelize } from 'sequelize-typescript';
import FindAllCustomerUseCase from './findAll.customer.use-case';
import CustomerModel from '../../../infra/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infra/customer/repository/sequelize/customer.repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';

describe('Integration test find customer use case', () => {
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

  it('should list a customer', async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new FindAllCustomerUseCase(customerRepository);

    const customer1 = new Customer('1', 'Customer 1');
    const address1 = new Address('Street 1', 5, 'City 1', 'State 1', 'Zip 1');
    customer1.changeAddress(address1);
    await customerRepository.create(customer1);

    const customer2 = new Customer('2', 'Customer 2');
    const address2 = new Address('Street 2', 5, 'City 2', 'State 2', 'Zip 2');
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const result = await useCase.execute();

    expect(result.customer.length).toBe(2);

    expect(result.customer[0].id).toBe(customer1.id);
    expect(result.customer[0].name).toBe(customer1.name);
    expect(result.customer[0].address.street).toBe(customer1.address.street);

    expect(result.customer[1].id).toBe(customer2.id);
    expect(result.customer[1].name).toBe(customer2.name);
    expect(result.customer[1].address.street).toBe(customer2.address.street);
  });
});
