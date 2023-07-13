import ProductFactory from '../../../domain/product/factory/product.factory';
import DeleteProductUseCase from './delete.product.use-case';

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

describe('Unit teste delete product use case', () => {
  it('should delete a product', async () => {
    const productRepository = MockProductRepository();
    const productDeleteUseCase = new DeleteProductUseCase(productRepository);

    const output = await productDeleteUseCase.execute({ id: product.id });

    expect(output).toEqual(void 0);
  });

  it('should not delete a product', async () => {
    const productRepository = MockProductRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found');
    });

    const input = { id: '1' };

    const productDeleteUseCase = new DeleteProductUseCase(productRepository);

    expect(
      async () => await productDeleteUseCase.execute(input),
    ).rejects.toThrow('Product not found');
  });
});
