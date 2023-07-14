import { Sequelize } from 'sequelize-typescript';
import CreateProductUseCase from './create.product.use-case';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';

describe('Integration test create product use case', () => {
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

  it('should create a product a', async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const input = {
      type: 'a',
      name: 'Product a',
      price: 100,
    };

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it('should create a product b', async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const input = {
      type: 'b',
      name: 'Product b',
      price: 100,
    };

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price * 2,
    });
  });
});
