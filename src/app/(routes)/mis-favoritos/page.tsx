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
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/store/useStore";

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, addToCart, isInCart } = useStore();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    if (isInCart(product.id)) {
      toast({
        title: "Ya está en el carro",
        description: `${product.name} ya está en tu carro de compras.`,
        variant: "destructive",
      });
    } else {
      addToCart(product);
      toast({
        title: "Agregado al carro",
        description: `${product.name} ha sido agregado a tu carro de compras.`,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Mis Favoritos</h1>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">
            No tienes productos favoritos
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <Card key={product.id} className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={"https://placehold.co/300x300"}
                    width={300}
                    height={300}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-lg font-bold mt-2">${product.price}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant={isInCart(product.id) ? "secondary" : "default"}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {isInCart(product.id) ? "En el carro" : "Agregar al carro"}
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => removeFromFavorites(product.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
