"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation"; // <---- Asegúrate de usarlo
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PaymentFormValues } from "@/types/payment";
import { OrderSummary } from "@/components/customs/OrderSummary";

export const PaymentForm = () => {
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

  const onSubmit: SubmitHandler<PaymentFormValues> = async () => {
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
      // Lógica de envío del formulario
      toast({
        title: "Pago exitoso",
        description: "Gracias por tu compra.",
      });

      // Redirigir después del éxito
      router.push("/gracias-por-tu-compra"); // <---- Redirige al usuario
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
              <OrderSummary cart={cart} calculateTotal={calculateTotal} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
