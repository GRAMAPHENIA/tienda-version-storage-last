"use client";

import { ShoppingCart, BaggageClaim, Heart, Store } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";

export const Navbar = () => {
  const { favorites, cart } = useStore();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-sm">
      <Link href="/" className="text-xl font-bold">
        <Store className="w-7 h-7 text-gray-700"/>
      </Link>
      <div className="flex gap-4">
        <Link href="/mis-favoritos">
          <Heart
            className={`w-7 h-7 text-gray-700 ${
              favorites.length > 0 ? "fill-current" : ""
            }`}
          />
        </Link>

        <Link href="/mis-compras">
          {cart.length > 0 ? (
            <BaggageClaim className="w-7 h-7 text-gray-700" />
          ) : (
            <ShoppingCart className="w-7 h-7 text-gray-700" />
          )}
        </Link>
      </div>
    </nav>
  );
};
