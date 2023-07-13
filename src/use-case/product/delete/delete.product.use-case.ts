import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputDeleteProductDto } from './delete.product.dto';

export default class DeleteProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputDeleteProductDto): Promise<void> {
    const customer = await this.productRepository.find(input.id);

    await this.productRepository.delete(customer.id);
  }
}
