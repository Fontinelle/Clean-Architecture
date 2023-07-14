import Product from './product-b';

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'Product 1', 100);
    }).toThrowError('product: Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new Product('1', '', 100);
    }).toThrowError('product: Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      const product = new Product('1', 'Product 1', -1);
    }).toThrowError('product: Price must be greater than zero');
  });

  it('should throw error when id and name are empty and price is less than zero', () => {
    expect(() => {
      const product = new Product('', '', -1);
    }).toThrowError(
      'product: Id is required, product: Name is required, product: Price must be greater than zero',
    );
  });

  it('should change name', () => {
    const product = new Product('1', 'Product 1', 100);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should throw error when change name is empty', () => {
    expect(() => {
      const product = new Product('1', 'Product 1', 100);
      product.changeName('');
    }).toThrowError('product: Name is required');
  });

  it('should change price', () => {
    const product = new Product('1', 'Product 1', 100);
    product.changePrice(200);
    expect(product.price).toBe(400);
  });

  it('should throw error when change price is less than zero', () => {
    expect(() => {
      const product = new Product('1', 'Product 1', 100);
      product.changePrice(-1);
    }).toThrowError('product: Price must be greater than zero');
  });
});
