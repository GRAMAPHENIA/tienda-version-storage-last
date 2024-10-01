import Image from "next/image";

const Header = () => {
  return (
    <header className="relative w-full h-[450px] shadow-sm">
      <Image
        src="/fondo-header.png"
        alt="Fondo Header"
        layout="fill"
        objectFit="cover"
        priority
        className="z-0 contrast-[50%] brightness-50 blur-[.5px] "
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-100/70 z-10">
        <h1 className="text-9xl font-bold text-center">Nuestra Tienda</h1>
        <p className="text-3xl mt-2">Descubre nuestros productos exclusivos</p>
      </div>
    </header>
  );
};

export default Header;
