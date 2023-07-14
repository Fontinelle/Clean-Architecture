import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import UpdateProductUseCase from './update.product.use-case';
import ProductFactory from '../../../domain/product/factory/product.factory';

describe('Integration test update product use case', () => {
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

  it('should update a product', async () => {
    const productRepository = new ProductRepository();

    const product = ProductFactory.create('a', 'Product', 100);

    await productRepository.create(product);

    const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    const output = await productUpdateUseCase.execute({
      id: product.id,
      name: 'Product b',
      price: 200,
    });

    expect(output).toEqual({
      id: product.id,
      name: 'Product b',
      price: 200,
    });
  });
});
