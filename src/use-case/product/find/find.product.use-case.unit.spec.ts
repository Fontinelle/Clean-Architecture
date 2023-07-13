import ProductFactory from '../../../domain/product/factory/product.factory';
import FindProductUseCase from './find.product.use-case';

describe('Unit test find product use case', () => {
  const product = ProductFactory.create('a', 'Product', 100);

  const MockProductRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  };

  it('should find a product', async () => {
    const productRepository = MockProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = { id: product.id };

    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it('should not find a product', async () => {
    const productRepository = MockProductRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found');
    });

    const useCase = new FindProductUseCase(productRepository);

    const input = { id: '1' };

    expect(() => useCase.execute(input)).rejects.toThrow('Product not found');
  });
});
