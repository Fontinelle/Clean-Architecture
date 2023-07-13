import express, { Request, Response } from 'express';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import CreateCustomerUseCase from '../../../use-case/customer/create/create.customer.use-case';
import FindAllCustomerUseCase from '../../../use-case/customer/findAll/findAll.customer.use-case';
import FindCustomerUseCase from '../../../use-case/customer/find/find.customer.use-case';
import UpdateCustomerUseCase from '../../../use-case/customer/update/update.customer.use-case';
import { InputUpdateCustomerDto } from '../../../use-case/customer/update/update.customer.dto';
import DeleteCustomerUseCase from '../../../use-case/customer/delete/delete.customer.use-case';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip,
      },
    };

    const output = await useCase.execute(customerDto);
    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});

customerRoute.get('/', async (req: Request, res: Response) => {
  try {
    const useCase = new FindAllCustomerUseCase(new CustomerRepository());
    const output = await useCase.execute();

    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});

customerRoute.get('/:id', async (req: Request, res: Response) => {
  const useCase = new FindCustomerUseCase(new CustomerRepository());

  const { id } = req.params;

  try {
    const output = await useCase.execute({ id });
    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});

customerRoute.put('/:id', async (req: Request, res: Response) => {
  const useCase = new UpdateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto: InputUpdateCustomerDto = {
      id: String(req.params.id),
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip,
      },
    };

    const output = await useCase.execute(customerDto);
    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});

customerRoute.delete('/:id', async (req: Request, res: Response) => {
  const useCase = new DeleteCustomerUseCase(new CustomerRepository());

  const { id } = req.params;

  try {
    const output = await useCase.execute({ id });
    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});
