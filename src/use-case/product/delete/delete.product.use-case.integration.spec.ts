import { Sequelize } from 'sequelize-typescript';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import DeleteProductUseCase from './delete.product.use-case';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductFactory from '../../../domain/product/factory/product.factory';

describe('Integration test delete product use case', () => {
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

  it('should delete a product', async () => {
    const productRepository = new ProductRepository();
    const productDeleteUseCase = new DeleteProductUseCase(productRepository);

    const product = ProductFactory.create('a', 'Product', 100);

    await productRepository.create(product);

    const output = await productDeleteUseCase.execute({ id: product.id });

    expect(output).toEqual(void 0);
  });
});
