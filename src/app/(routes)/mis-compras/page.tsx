"use client";

import { Navbar } from "@/components/Navbar";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/store/useStore";
import { Trash2, Heart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

export default function ShoppingCartPage() {
  const { cart, removeFromCart, addToFavorites, isInFavorites } = useStore(); // Verificación de favoritos
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(() =>
    cart.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );
  const { toast } = useToast();

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
    }
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

  return (
    <div>
      <Navbar />
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
                          src={"https://placehold.co/300x300"}
                          width={300}
                          height={300}
                          alt={product.name}
                          className="w-full h-[300px] object-cover"
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
                            disabled={isInFavorites(product.id)} // Deshabilitar si ya está en favoritos
                          >
                            <Heart
                              className={`w-5 h-5 mr-2 ${
                                isInFavorites(product.id) ? "text-black" : ""
                              }`} // Cambia a negro si está en favoritos
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

            <div className="bg-gray-100 p-6 rounded-lg lg:col-span-1">
              <h2 className="text-xl font-bold mb-4">Resumen de la compra</h2>
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
              <Button className="w-full mt-4" size="lg">
                Proceder al pago
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
