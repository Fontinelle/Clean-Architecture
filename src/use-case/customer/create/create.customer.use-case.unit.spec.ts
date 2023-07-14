import CreateCustomerUseCase from './create.customer.use-case';
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

const MockCustomerRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit test create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockCustomerRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

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

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockCustomerRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = '';

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Name is required',
    );
  });

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockCustomerRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = '';

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Street is required',
    );
  });
});
