import { ReactNode } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Mis Compras",
  description: "Creado por Hexágono",
};

interface SEOLayoutProps {
  children: ReactNode;
}

const CustomDevelopmentLayout = ({ children }: SEOLayoutProps) => {
  return (
    <div>
      <main>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default CustomDevelopmentLayout;
