import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';

const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón Hamburguesa (EL DUPLICADO)*/}
      <button 
        onClick={toggleMenu}
        className="fixed top-0 left-0 p-4 text-white hover:text-[#d92828] transition-colors z-[1000] lg:hidden"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {/* Overlay (Fondo oscuro) */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[100000] backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Sidebar Panel */}
      <aside 
        className={`fixed top-0 right-0 h-full w-full font-geist bg-[#1a1a1a] z-[100001] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header del Sidebar */}
          <div className="flex items-center justify-between mb-10">
            <Image 
              src="https://res.cloudinary.com/dqlvmeoii/image/upload/v1775527060/renderplay_papvqi.webp" 
              alt="Logo" 
              width={120} 
              height={50} 
              className="h-auto w-auto"
            />
            <button onClick={toggleMenu} className="text-white hover:text-[#d92828]">
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </button>
          </div>

          {/* Menú de Navegación */}
          <nav className="flex flex-col space-y-6">
            {['Inicio', 'Nosotros', 'Proyectos', 'Contacto'].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={toggleMenu}
                className="text-white font-geist text-lg font-medium hover:text-[#d92828] transition-colors border-b border-white/10 pb-2"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Footer del Sidebar (Redes sociales o Info) */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <p className="text-white/60 text-sm font-light mb-4">
              Diseñamos y transformamos tu idea en tu espacio ideal.
            </p>
            <div className="flex space-x-4">
                {/* Aquí podrías poner iconos de redes sociales */}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileNavbar;