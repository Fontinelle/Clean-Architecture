import express, { Request, Response } from 'express';
import CreateProductUseCase from '../../../use-case/product/create/create.product.use-case';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import FindAllProductUseCase from '../../../use-case/product/findAll/findAll.product.use-case';
import FindProductUseCase from '../../../use-case/product/find/find.product.use-case';
import UpdateProductUseCase from '../../../use-case/product/update/update.product.use-case';
import DeleteProductUseCase from '../../../use-case/product/delete/delete.product.use-case';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDto = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
    };

    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});

productRoute.get('/', async (req: Request, res: Response) => {
  try {
    const useCase = new FindAllProductUseCase(new ProductRepository());
    const output = await useCase.execute();

    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});

productRoute.get('/:id', async (req: Request, res: Response) => {
  const useCase = new FindProductUseCase(new ProductRepository());

  const { id } = req.params;

  try {
    const output = await useCase.execute({ id });
    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});

productRoute.put('/:id', async (req: Request, res: Response) => {
  const useCase = new UpdateProductUseCase(new ProductRepository());

  try {
    const productDto = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
    };

    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});

productRoute.delete('/:id', async (req: Request, res: Response) => {
  const useCase = new DeleteProductUseCase(new ProductRepository());

  const { id } = req.params;

  try {
    const output = await useCase.execute({ id });
    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});
