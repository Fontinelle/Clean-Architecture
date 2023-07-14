import Address from './address';

describe('Address unit tests', () => {
  it('should throw error when street is empty', () => {
    expect(() => {
      const address = new Address('', 5, '9000-90', 'São Paulo', 'São Paulo');
    }).toThrowError('Street is required');
  });

  it('should throw error when number is empty', () => {
    expect(() => {
      const address = new Address(
        'Rua A',
        0,
        'São Paulo',
        'São Paulo',
        '9000-90',
      );
    }).toThrowError('address: Number is required');
  });

  it('should throw error when zip code is empty', () => {
    expect(() => {
      const address = new Address('Rua A', 5, 'São Paulo', 'São Paulo', '');
    }).toThrowError('address: Zip Code is required');
  });

  it('should throw error when city is empty', () => {
    expect(() => {
      const address = new Address('Rua A', 5, '', 'São Paulo', '9000-90');
    }).toThrowError('address: City is required');
  });

  it('should throw error when state is empty', () => {
    expect(() => {
      const address = new Address('Rua A', 5, 'São Paulo', '', '9000-90');
    }).toThrowError('address: State is required');
  });

  it('should return address', () => {
    const address = new Address(
      'Rua A',
      5,
      'São Paulo',
      'São Paulo',
      '9000-90',
    );
    expect(address.toString()).toBe('Rua A, 5, São Paulo, São Paulo, 9000-90');
  });

  it('should throw an error if no information is filled', () => {
    expect(() => {
      const address = new Address('', 0, '', '', '');
    }).toThrowError(
      'address: Street is required, address: Number is required, address: City is required, address: State is required, address: Zip Code is required',
    );
  });
});
