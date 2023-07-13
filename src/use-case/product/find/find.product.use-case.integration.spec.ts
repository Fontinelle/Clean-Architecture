import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import FindProductUseCase from './find.product.use-case';
import ProductFactory from '../../../domain/product/factory/product.factory';

describe('Integration Test find product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a product a', async () => {
    const productRepository = new ProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    const product = ProductFactory.create('a', 'Product', 100);

    await productRepository.create(product);

    const input = { id: product.id };

    const output = {
      id: product.id,
      name: 'Product',
      price: 100,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });
});
