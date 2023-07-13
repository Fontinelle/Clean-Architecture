export interface InputFindCustomerDto {
  id: string;
}

export interface OutputFindCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    state: string;
    city: string;
    number: number;
    zip: string;
  };
}
