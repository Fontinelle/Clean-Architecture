import ValidatorInterface from '../../@shared/validator/validator.interface';
import ProductYupValidator from '../validator/product.yup.validator';
import ProductInterface from '../entity/product.interface';

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductInterface> {
    return new ProductYupValidator();
  }
}
