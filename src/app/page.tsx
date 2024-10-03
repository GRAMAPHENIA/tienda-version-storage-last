import Header from "@/components/customs/Header";
import { ProductCard } from "@/components/customs/ProductCard";
import Products from "@/components/customs/Products";
import { mockProducts } from "@/data/mockProducts"; // Mover el mock a un archivo separado
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <main className="container mx-auto">
        <Navbar />
        <Header />
        <Products />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:px-20 gap-10 mx-4 my-10">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
