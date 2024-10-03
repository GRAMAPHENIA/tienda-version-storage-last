"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ThankYouPage = () => {
  const router = useRouter();

  const handleReturnToStore = () => {
    // Limpiar todo el localStorage
    // localStorage.clear();
    localStorage.removeItem('cart');

    // Redirigir a la tienda
    router.push("/"); // Cambia esta ruta según la ubicación de tu tienda

    // Recargar la página automáticamente después de redirigir
    setTimeout(() => {
      window.location.reload();
    }, 100); // Breve retardo para asegurar que la redirección ocurra antes del reload
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl lg:text-4xl font-bold mb-6 text-center">
        ¡Gracias por tu compra!
      </h1>
      <p className="text-lg lg:text-xl text-center mb-4">
        Te hemos enviado un correo con las instrucciones de pago y el código QR.
      </p>
      <Button onClick={handleReturnToStore} className="mt-6">
        Volver a la tienda
      </Button>
    </div>
  );
};

export default ThankYouPage;
