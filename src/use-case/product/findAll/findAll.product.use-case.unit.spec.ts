import ProductFactory from '../../../domain/product/factory/product.factory';
import FindAllProductUseCase from './findAll.product.use-case';

describe('Unit test find product use case', () => {
  const productA = ProductFactory.create('a', 'Product a', 100);
  const productB = ProductFactory.create('b', 'Product b', 100);

  const MockProductRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  };

  it('should list a product', async () => {
    const productRepository = MockProductRepository();
    const useCase = new FindAllProductUseCase(productRepository);

    const result = await useCase.execute();

    expect(result.product.length).toBe(2);

    expect(result.product[0].id).toBe(productA.id);
    expect(result.product[0].name).toBe(productA.name);
    expect(result.product[0].price).toBe(productA.price);

    expect(result.product[1].id).toBe(productB.id);
    expect(result.product[1].name).toBe(productB.name);
    expect(result.product[1].price).toBe(productB.price);
  });
});
