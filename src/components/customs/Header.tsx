import React from "react";

const Header = () => {
  return (
    <header className="relative w-full h-[680px] shadow-sm bg-zinc-100">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700 z-10">
        <h1 className="text-9xl font-bold text-center">Tienda</h1>
        <p className="text-3xl mt-2">Descubre nuestros productos exclusivos</p>
      </div>
    </header>
  );
};

export default Header;
