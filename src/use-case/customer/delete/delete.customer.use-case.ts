import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import { InputDeleteCustomerDto } from './delete.customer.dto';

export default class DeleteCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputDeleteCustomerDto): Promise<void> {
    const customer = await this.customerRepository.find(input.id);

    await this.customerRepository.delete(customer.id);
  }
}
