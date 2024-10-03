"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useStore } from "@/store/useStore";
import type { Product } from "@/store/useStore";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { Trash2, Heart } from "lucide-react";

export default function ShoppingCartPage() {
  const { cart, removeFromCart, addToFavorites, isInFavorites } = useStore();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(() =>
    cart.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );
  const { toast } = useToast();

  const updateQuantity = (productId: number, newQuantity: number) => {
    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      if (newQuantity >= 1) {
        updatedQuantities[productId] = newQuantity;
      }
      return updatedQuantities;
    });
  };

  const handleRemoveFromCart = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Producto eliminado",
      description: `${productName} ha sido eliminado del carrito.`,
      variant: "destructive",
    });
  };

  const handleAddToFavorites = (product: Product) => {
    if (!isInFavorites(product.id)) {
      addToFavorites(product);
      toast({
        title: "Agregado a favoritos",
        description: `${product.name} ha sido agregado a tus favoritos.`,
      });
    } else {
      toast({
        title: "Ya está en favoritos",
        description: `${product.name} ya se encuentra en tus favoritos.`,
        variant: "destructive",
      });
    }
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * (quantities[product.id] || 1),
      0
    );
  };

  const router = useRouter();

  const handlePayment = () => {
    router.push("/pagos");
  };

  return (
    <div>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Mi Carro de Compras</h1>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Tu carro está vacío</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-6 mb-8">
                {cart.map((product) => (
                  <Card key={product.id} className="w-full">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4">
                        <Image
                          src={product.image}
                          width={300}
                          height={300}
                          alt={product.name}
                          className="w-full h-auto object-cover p-10"
                        />
                      </div>
                      <div className="md:w-3/4 p-4">
                        <CardHeader>
                          <CardTitle>{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{product.description}</p>
                          <p className="text-lg font-bold mt-2">
                            ${product.price}
                          </p>
                          <div className="flex items-center mt-4">
                            <label
                              htmlFor={`quantity-${product.id}`}
                              className="mr-2"
                            >
                              Cantidad:
                            </label>
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                onClick={() =>
                                  updateQuantity(
                                    product.id,
                                    quantities[product.id] - 1
                                  )
                                }
                              >
                                -
                              </Button>
                              <span className="mx-4">
                                {quantities[product.id]}
                              </span>
                              <Button
                                variant="outline"
                                onClick={() =>
                                  updateQuantity(
                                    product.id,
                                    quantities[product.id] + 1
                                  )
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            className="bg-red-700/70 hover:bg-teal-700/70"
                            onClick={() =>
                              handleRemoveFromCart(product.id, product.name)
                            }
                          >
                            <Trash2 className="w-5 h-5 mr-2" />
                            Eliminar
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleAddToFavorites(product)}
                            disabled={isInFavorites(product.id)}
                          >
                            <Heart
                              className={`w-5 h-5 mr-2 ${
                                isInFavorites(product.id) ? "text-black" : ""
                              }`}
                            />
                            Guardar en favoritos
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Resumen de compra detallado */}
            <div className="bg-gray-100 p-6 rounded-lg lg:col-span-1">
              <h2 className="text-xl font-bold mb-4">Resumen de la compra</h2>
              <ul className="mb-4">
                {cart.map((product) => (
                  <li key={product.id} className="flex justify-between mb-2">
                    <span>
                      {product.name} (x{quantities[product.id] || 1})
                    </span>
                    <span>
                      $
                      {(product.price * (quantities[product.id] || 1)).toFixed(
                        2
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <Button className="w-full mt-4" size="lg" onClick={handlePayment}>
                Proceder al pago
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
