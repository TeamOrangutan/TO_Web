interface productI {
  id: Number;
  name: string;
  description: string;
  price: number;
  path: string;
  hoverPath: string;
  estado: string;
  detalles?: string[];
  onProductDeleted?: any;
}
