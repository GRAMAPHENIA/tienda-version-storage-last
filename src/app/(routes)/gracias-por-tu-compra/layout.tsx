// app/seo/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "¡Gracias!",
  description: "Creado por Hexágono",
};

interface SEOLayoutProps {
  children: ReactNode;
}

const CustomDevelopmentLayout = ({ children }: SEOLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default CustomDevelopmentLayout;
