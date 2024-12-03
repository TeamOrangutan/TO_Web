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

interface billI {
  name: string;
  email: string;
  paymentMethod: string;
  date: string;
  hour: string;
  total: number;
}


interface salesI {
  ventasTotales: string,  
  ventasMensuales: string, 
  ventasSemana: string, 
  ventasHoy: string | 0
}