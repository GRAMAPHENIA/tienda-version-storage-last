export interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  export interface OrderSummaryProps {
    cart: Product[];
    calculateTotal: () => number;
  }
  