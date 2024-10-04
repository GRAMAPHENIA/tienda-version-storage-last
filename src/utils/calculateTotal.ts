import { Product } from "@/types/Product";

export const calculateTotal = (cart: Product[]): number => {
  return cart.reduce((total, product) => total + product.price, 0);
};

export const calculateDiscount = (total: number): number => {
  return total * 0.1; // Descuento del 10%
};

export const calculateFinalTotal = (
  total: number,
  discount: number
): number => {
  return total - discount;
};
