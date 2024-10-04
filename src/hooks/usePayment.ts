"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/store/useStore";
import { buildEmailContent } from "@/utils/emailContentBuilder";
import { PaymentFormValues } from "@/types/PaymentFormValues";

export const usePayment = () => {
  const { cart } = useStore();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayment = async (data: PaymentFormValues) => {
    if (cart.length === 0) {
      toast({
        title: "Carro vacío",
        description: "No tienes productos en tu carro para proceder al pago.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const emailContent = buildEmailContent(data, cart);

      // Lógica para enviar correo
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: data.email, // Correo del cliente
          mensaje: emailContent, // El contenido del correo que se genera
        }),
      });

      if (response.ok) {
        toast({
          title: "Pago exitoso",
          description: "Hemos enviado un correo con los detalles de tu compra.",
        });
        router.push("/gracias-por-tu-compra");
      } else {
        throw new Error("Error en el pago");
      }
    } catch {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu pago.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handlePayment };
};
