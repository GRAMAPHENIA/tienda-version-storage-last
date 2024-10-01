import Header from '@/components/customs/Header';
import { ProductCard } from '@/components/customs/ProductCard';
import Products from '@/components/customs/products';
import { Navbar } from '@/components/Navbar';

const mockProducts = [
  {
    id: 1,
    name: "Camiseta Casual",
    price: 29.99,
    description: "Camiseta de algodón 100% de alta calidad",
    image: "/images/camiseta.jpg"
  },
  {
    id: 2,
    name: "Jeans Clásicos",
    price: 59.99,
    description: "Jeans duraderos y cómodos para uso diario",
    image: "/images/jeans.jpg"
  },
  {
    id: 3,
    name: "Jeans Clásicos",
    price: 59.99,
    description: "Jeans duraderos y cómodos para uso diario",
    image: "/images/jeans.jpg"
  },
  {
    id: 4,
    name: "Jeans Clásicos",
    price: 59.99,
    description: "Jeans duraderos y cómodos para uso diario",
    image: "/images/jeans.jpg"
  },
  // Agrega más productos según necesites
];

export default function Home() {
  return (
    <div>
      <Navbar />

      <main className="container mx-auto ">
        <Header/>
        <Products/>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:px-20 gap-10 mx-4 my-10">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}