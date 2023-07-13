import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindAllCustomerUseCase from './findAll.customer.use-case';

describe('Unit test find customer use case', () => {
  const customer1 = new Customer('1', 'Customer 1');
  const address1 = new Address('Street 1', 5, 'City 1', 'State 1', 'Zip 1');
  customer1.changeAddress(address1);

  const customer2 = new Customer('2', 'Customer 2');
  const address2 = new Address('Street 2', 6, 'City 2', 'State 2', 'Zip 2');
  customer2.changeAddress(address2);

  const MockCustomerRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest
        .fn()
        .mockReturnValue(Promise.resolve([customer1, customer2])),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  };

  it('should list a customer', async () => {
    const customerRepository = MockCustomerRepository();
    const useCase = new FindAllCustomerUseCase(customerRepository);

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
