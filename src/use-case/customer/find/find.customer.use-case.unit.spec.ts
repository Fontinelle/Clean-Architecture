import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.use-case';

describe('Unit test find customer use case', () => {
  const customer = new Customer('1', 'Customer 1');
  const address = new Address('Street', 5, 'City', 'State', 'Zip');
  customer.changeAddress(address);

  const MockCustomerRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  };

  it('should find a customer', async () => {
    const customerRepository = MockCustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

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

  it('should not find a customer', async () => {
    const customerRepository = MockCustomerRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });

    const useCase = new FindCustomerUseCase(customerRepository);

    const input = { id: '1' };

    expect(() => useCase.execute(input)).rejects.toThrow('Customer not found');
  });
});
