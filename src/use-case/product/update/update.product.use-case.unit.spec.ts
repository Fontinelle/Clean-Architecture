import ProductFactory from '../../../domain/product/factory/product.factory';
import UpdateProductUseCase from './update.product.use-case';

const product = ProductFactory.create('a', 'Product', 100);

const input = {
  id: product.id,
  name: 'Product',
  price: 200,
};

const MockProductRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit teste update product use case', () => {
  it('should update a product', async () => {
    const productRepository = MockProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
