import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update.customer.use-case';

const customer = CustomerFactory.createWithAddress(
  'Customer 1',
  new Address('Street', 5, 'Zip', 'City', 'State'),
);

const input = {
  id: customer.id,
  name: 'Customer Updated',
  address: {
    street: 'Street Updated',
    number: 6,
    zip: 'Zip Updated',
    city: 'City Updated',
    state: 'State Updated',
  },
};

const MockCustomerRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit teste update customer use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockCustomerRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
