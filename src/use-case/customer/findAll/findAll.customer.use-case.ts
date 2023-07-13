import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { OutputFindAllCustomerDto } from './findAll.customer.dto';

export default class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepositoryInterface: CustomerRepositoryInterface) {
    this.customerRepository = customerRepositoryInterface;
  }

  async execute(): Promise<OutputFindAllCustomerDto> {
    const customers = await this.customerRepository.findAll();

    return {
      customer: customers.map(customer => {
        return {
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            state: customer.address.state,
            zip: customer.address.zip,
          },
        };
      }),
    };
  }
}
