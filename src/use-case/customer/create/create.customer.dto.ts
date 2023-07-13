export interface InputCreateCustomerDto {
  name: string;
  address: {
    street: string;
    state: string;
    number: number;
    zip: string;
    city: string;
  };
}

export interface OutputCreateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    state: string;
    number: number;
    zip: string;
    city: string;
  };
}
