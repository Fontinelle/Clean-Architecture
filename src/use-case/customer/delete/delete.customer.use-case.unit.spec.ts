import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import DeleteCustomerUseCase from './delete.customer.use-case';

const customer = CustomerFactory.createWithAddress(
  'Customer 1',
  new Address('Street', 5, 'Zip', 'City', 'State'),
);

const MockCustomerRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit test delete customer use case', () => {
  it('should delete a customer', async () => {
    const customerRepository = MockCustomerRepository();
    const customerDeleteUseCase = new DeleteCustomerUseCase(customerRepository);

    const output = await customerDeleteUseCase.execute({ id: customer.id });

    expect(output).toEqual(void 0);
  });

  it('should not delete a customer', async () => {
    const customerRepository = MockCustomerRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });

    const input = { id: '1' };

    const customerDeleteUseCase = new DeleteCustomerUseCase(customerRepository);

    expect(
      async () => await customerDeleteUseCase.execute(input),
    ).rejects.toThrow('Customer not found');
  });
});
