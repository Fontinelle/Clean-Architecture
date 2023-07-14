import CreateProductUseCase from './create.product.use-case';

const input = {
  type: 'a',
  name: 'Product 1',
  price: 100,
};

const MockProductRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit test create product use case', () => {
  it('should create a product a', async () => {
    const productRepository = MockProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it('should create a product b', async () => {
    const productRepository = MockProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.type = 'b';

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price * 2,
    });
  });

  it('should throw an error when price must be greater than zero', async () => {
    const productRepository = MockProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.price = -1;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'Price must be greater than zero',
    );
  });

  it('should throw an error when name is missing', async () => {
    const productRepository = MockProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = '';

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'Name is required',
    );
  });

  it('should throw an error when product type is not supported', async () => {
    const productRepository = MockProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.type = 'c';

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'Product type not supported',
    );
  });
});
