type Product = {
  id: string;
  name: string;
  price: number;
};

export interface OutputFindAllProductDto {
  product: Product[];
}
