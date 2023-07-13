import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { OutputFindAllProductDto } from './findAll.product.dto';

export default class FindAllProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<OutputFindAllProductDto> {
    const products = await this.productRepository.findAll();

    return {
      product: products.map(product => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      }),
    };
  }
}
