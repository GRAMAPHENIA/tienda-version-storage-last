"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import { useStore } from "@/store/useStore";
import type { Product } from "@/store/useStore";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, addToFavorites, isInCart, isInFavorites } = useStore();
  const { toast } = useToast();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isProductInFavorites, setIsProductInFavorites] = useState(false);

  // Solo verificar el estado en el cliente
  useEffect(() => {
    setIsProductInCart(isInCart(product.id));
    setIsProductInFavorites(isInFavorites(product.id));
  }, [product.id, isInCart, isInFavorites]);

  const handleAddToCart = () => {
    const wasAdded = addToCart(product);
    if (wasAdded) {
      toast({
        title: "Agregado al carro",
        description: `${product.name} ha sido agregado a tu carro de compras.`,
      });
      setIsProductInCart(true);
    } else {
      toast({
        title: "Ya está en el carro",
        description: `${product.name} ya se encuentra en tu carro de compras.`,
        variant: "default",
      });
    }
  };

  const handleAddToFavorites = () => {
    const wasAdded = addToFavorites(product);
    if (wasAdded) {
      toast({
        title: "Agregado a favoritos",
        description: `${product.name} ha sido agregado a tus favoritos.`,
      });
      setIsProductInFavorites(true);
    } else {
      toast({
        title: "Ya está en favoritos",
        description: `${product.name} ya se encuentra en tus favoritos.`,
        variant: "default",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={"https://placehold.co/600x400"}
          height={600}
          width={400}
          alt={product.name}
          className="w-full h-48 object-cover mb-4"
        />
        <p className="text-gray-600">{product.description}</p>
        <p className="text-lg font-bold mt-2">${product.price}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handleAddToCart}
          variant={isProductInCart ? "secondary" : "default"}
        >
          {isProductInCart ? "En el carro" : "Agregar al carro"}
        </Button>
        <Button
          variant={isProductInFavorites ? "secondary" : "ghost"}
          onClick={handleAddToFavorites}
        >
          <Heart
            className={`w-5 h-5 ${isProductInFavorites ? "fill-current" : ""}`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};
