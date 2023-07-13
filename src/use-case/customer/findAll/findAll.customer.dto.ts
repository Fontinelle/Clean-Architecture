type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    state: string;
    city: string;
    number: number;
    zip: string;
  };
};

export interface OutputFindAllCustomerDto {
  customer: Customer[];
}
