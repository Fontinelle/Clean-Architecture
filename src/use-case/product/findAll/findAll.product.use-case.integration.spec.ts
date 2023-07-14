import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import FindAllProductUseCase from './findAll.product.use-case';
import ProductFactory from '../../../domain/product/factory/product.factory';

describe('Integration test find product use case', () => {
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

  it('should list a product', async () => {
    const productRepository = new ProductRepository();
    const useCase = new FindAllProductUseCase(productRepository);

    const productA = ProductFactory.create('a', 'Product a', 100);
    await productRepository.create(productA);

    const productB = ProductFactory.create('b', 'Product b', 100);
    await productRepository.create(productB);

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
