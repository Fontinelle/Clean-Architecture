import Address from '../../../../domain/customer/value-object/address';
import Customer from '../../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../../domain/customer/repository/customer-repository.interface';
import CustomerModel from './customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      state: entity.address.state,
      zipcode: entity.address.zip,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(id: string, entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        city: entity.address.city,
        state: entity.address.state,
        zipcode: entity.address.zip,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: { id },
      },
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('Customer not found');
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.city,
      customerModel.state,
      customerModel.zipcode,
    );
    customer.changeAddress(address);
    customer.addRewardPoints(customerModel.rewardPoints);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    const customers = customerModels.map(customerModel => {
      const customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardPoints(customerModel.rewardPoints);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.city,
        customerModel.state,
        customerModel.zipcode,
      );
      customer.changeAddress(address);
      if (customerModel.active) {
        customer.activate();
      }
      return customer;
    });
    return customers;
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.destroy({ where: { id } });
  }
}
