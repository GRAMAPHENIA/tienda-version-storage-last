"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/store/useStore";
import { buildEmailContent } from "@/utils/emailContentBuilder";
import { PaymentFormValues } from "@/types/PaymentFormValues";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentForm() {
  const { cart } = useStore();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.length === 0) {
      toast({
        title: "Carro vacío",
        description: "No tienes productos en tu carrito para proceder al pago.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      const data: PaymentFormValues = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        dni: formData.get("dni") as string,
        address: formData.get("address") as string,
        postalCode: ""
      };

      const emailContent = buildEmailContent(data, cart);

      const formspreeResponse = await fetch("https://formspree.io/f/mrbznwnl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          message: emailContent,
        }),
      });

      if (formspreeResponse.ok) {
        toast({
          title: "Pago exitoso",
          description: "Hemos enviado un correo con los detalles de tu compra.",
        });

        router.push("/gracias-por-tu-compra");
      } else {
        throw new Error("Error en el pago");
      }
    } catch  {
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
    <Card>
      <CardHeader>
        <CardTitle>Detalles de Pago</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre Completo
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Correo Electrónico
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              className="mt-1 block w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="dni" className="block text-sm font-medium">
              DNI
            </label>
            <Input
              id="dni"
              type="text"
              name="dni"
              className="mt-1 block w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Dirección
            </label>
            <Input
              id="address"
              name="address"
              className="mt-1 block w-full"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Procesando..." : "Completar Pedido"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
