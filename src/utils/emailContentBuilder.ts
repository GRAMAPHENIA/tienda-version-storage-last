import { Product } from "@/types/Product";
import { PaymentFormValues } from "@/types/PaymentFormValues";
import {
  calculateTotal,
  calculateDiscount,
  calculateFinalTotal,
} from "@/utils/calculateTotal";

export const buildEmailContent = (
  data: PaymentFormValues,
  cart: Product[]
): string => {
  const total = calculateTotal(cart);
  const discount = calculateDiscount(total);
  const finalTotal = calculateFinalTotal(total, discount);

  return `
    Gracias por tu pedido, ${data.name},

    Hemos recibido correctamente tu pedido #${Math.floor(
      Math.random() * 100000
    )} y lo estamos procesando:

    [Pedido #${Math.floor(
      Math.random() * 100000
    )}] (${new Date().toLocaleDateString()})

    Producto          Cantidad          Precio
    ${cart
      .map(
        (producto) => `
    ${producto.name}
    1                $${producto.price.toFixed(2)}
    `
      )
      .join("")}

    Subtotal:          $${total.toFixed(2)}
    Descuento para Transferencia bancaria directa:   -$${discount.toFixed(2)}
    Total:             $${finalTotal.toFixed(2)}

    DNI: ${data.dni}

    Dirección de facturación:
    ${data.name}
    DNI: ${data.dni}
    Dirección: ${data.address}
    Código postal: ${data.postalCode}

    ¡Gracias por usar nuestra tienda online!
  `;
};
