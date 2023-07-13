export interface InputUpdateCustomerDto {
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

export interface OutputUpdateCustomerDto {
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
