// src/components/Payment/PaymentSummary.tsx
"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentSummary = () => {
  const { cart } = useStore();

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de la Compra</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
