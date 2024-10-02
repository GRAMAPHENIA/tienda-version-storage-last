"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PaymentFormValues {
  name: string;
  email: string;
  address: string;
  postalCode: string;
  dni: string;
}

export default function PaymentPage() {
  const { cart } = useStore();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>();

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const calculateDiscount = () => {
    return calculateTotal() * 0.1; // 10% de descuento para transferencia bancaria
  };

  const calculateFinalTotal = () => {
    return calculateTotal() - calculateDiscount();
  };

  const onSubmit: SubmitHandler<PaymentFormValues> = async (data) => {
    if (cart.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "No tienes productos en tu carrito para proceder al pago.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generar el contenido del correo para el cliente
      const emailContent = `
        Gracias por tu pedido, ${data.name},

        Hemos recibido correctamente tu pedido #${Math.floor(Math.random() * 100000)} y lo estamos procesando:

        [Pedido #${Math.floor(Math.random() * 100000)}] (${new Date().toLocaleDateString()})

        Producto          Cantidad          Precio
        ${cart.map((producto) => `
        ${producto.name}
        1                $${producto.price.toFixed(2)}
        `).join('')}

        Subtotal:          $${calculateTotal().toFixed(2)}
        Envío:             ¡Superaste el monto mínimo! Envío en moto gratuito.
        Descuento para Transferencia bancaria directa:   -$${calculateDiscount().toFixed(2)}
        Métodos de pago:   Transferencia bancaria directa
        Total:             $${calculateFinalTotal().toFixed(2)}

        DNI: ${data.dni}

        Dirección de facturación:
        ${data.name}
        DNI: ${data.dni}
        Dirección: ${data.address}
        Código postal: ${data.postalCode}

        ¡Gracias por usar nuestra tienda online!
      `;

      // Enviar el correo al cliente
      const customerResponse = await fetch("https://formspree.io/f/mrbznwnl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: data.email, // Correo del cliente
          mensaje: emailContent, // Contenido del correo
        }),
      });

      // Enviar solo los datos de la compra a tu cuenta de Formspree
      const formspreeResponse = await fetch("https://formspree.io/f/mrbznwnl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: data.name,
          Correo: data.email,
          Direccion: data.address,
          codigoPostal: data.postalCode,
          DNI: data.dni,
          Carro: cart.map((producto) => ({
            Item: producto.id,
            Nombre: producto.name,
            Cantidad: 1, // Puedes reemplazarlo con la cantidad correspondiente
            Precio: producto.price,
          })),
          Subtotal: calculateTotal().toFixed(2),
          Descuento: calculateDiscount().toFixed(2),
          Total: calculateFinalTotal().toFixed(2),
        }),
      });

      if (customerResponse.ok && formspreeResponse.ok) {
        toast({
          title: "Pago exitoso",
          description: "Hemos enviado un correo con los detalles de tu compra.",
        });
        router.push("/gracias-por-tu-compra");
      } else {
        toast({
          title: "Error",
          description: "Hubo un problema al procesar tu pago.",
          variant: "destructive",
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu pago.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Proceso de Pago</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de Envío</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Nombre Completo
                  </label>
                  <Input
                    id="name"
                    {...register("name", {
                      required: "Este campo es requerido",
                    })}
                    className="mt-1 block w-full"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Correo Electrónico
                  </label>
                  <Input
                    id="email"
                    {...register("email", {
                      required: "Este campo es requerido",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Correo no válido",
                      },
                    })}
                    className="mt-1 block w-full"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="dni" className="block text-sm font-medium">
                    DNI
                  </label>
                  <Input
                    id="dni"
                    {...register("dni", {
                      required: "Este campo es requerido",
                    })}
                    className="mt-1 block w-full"
                  />
                  {errors.dni && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.dni.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium"
                  >
                    Dirección
                  </label>
                  <Input
                    id="address"
                    {...register("address", {
                      required: "Este campo es requerido",
                    })}
                    className="mt-1 block w-full"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Procesando..." : "Completar Pedido"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de la Compra</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {cart.map((product) => (
                  <li
                    key={product.id}
                    className="flex justify-between border-b py-2"
                  >
                    <span>{product.name}</span>
                    <span>${product.price}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-4 font-bold">
                <span>Total:</span>
                <span>
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
