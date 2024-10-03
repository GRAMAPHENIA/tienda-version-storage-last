import { OrderSummaryProps } from "@/types/cart";

export const OrderSummary = ({ cart, calculateTotal }: OrderSummaryProps) => {
  return (
    <div>
      <ul>
        {cart.map((product) => (
          <li key={product.id} className="flex justify-between border-b py-2">
            <span>{product.name}</span>
            <span>${product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4 font-bold">
        <span>Total:</span>
        <span>${calculateTotal().toFixed(2)}</span>
      </div>
    </div>
  );
};
