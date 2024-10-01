import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

interface StoreState {
  cart: Product[];
  favorites: Product[];
  addToCart: (product: Product) => boolean;
  removeFromCart: (productId: number) => void;
  addToFavorites: (product: Product) => boolean;
  removeFromFavorites: (productId: number) => void;
  isInCart: (productId: number) => boolean;
  isInFavorites: (productId: number) => boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      addToCart: (product) => {
        const validatedProduct = ProductSchema.parse(product);
        if (get().isInCart(validatedProduct.id)) {
          return false; // Ya está en el carrito
        }
        set((state) => ({
          cart: [...state.cart, validatedProduct],
        }));
        return true; // Se agregó exitosamente
      },
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      addToFavorites: (product) => {
        const validatedProduct = ProductSchema.parse(product);
        if (get().isInFavorites(validatedProduct.id)) {
          return false; // Ya está en favoritos
        }
        set((state) => ({
          favorites: [...state.favorites, validatedProduct],
        }));
        return true; // Se agregó exitosamente
      },
      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== productId),
        })),
      isInCart: (productId) => 
        get().cart.some(item => item.id === productId),
      isInFavorites: (productId) => 
        get().favorites.some(item => item.id === productId),
    }),
    {
      name: 'store-storage',
    }
  )
);