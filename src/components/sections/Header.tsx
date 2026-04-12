"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ menuOpen, setMenuOpen }) => {
  
  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  const menuItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Proyectos', href: '/about' },
    { name: 'Contacto', href: '/contact' },
  ];

  return (
    <header className="relative z-[999]">
      {/* 1. LOGO: Siempre visible, se ajusta a la barra en LG */}
      <div className="fixed top-0 left-0 left-10 lg:left-[80px] w-full lg:w-[310px] h-[70px] lg:h-[90px] bg-[#272727] flex items-center z-[1001] transition-all px-6 lg:px-10">
        <Image
          src="https://res.cloudinary.com/dqlvmeoii/image/upload/v1775527060/renderplay_papvqi.webp"
          alt="Logo"
          width={150}
          height={50}
          className="h-auto w-auto max-h-[30px] lg:max-h-[40px] object-contain pl-5"
        />
      </div>

      {/* 2. BOTÓN DISPARADOR (El Cuadrado Rojo) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-0 left-0 w-[70px] lg:w-[80px] h-[70px] lg:h-[90px] bg-[#d92828] z-[1005] flex flex-col items-center justify-center transition-all"
      >
        <div className="flex flex-col items-center justify-center space-y-1.5">
          <span className={`block w-6 h-[2px] bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
          <span className={`block w-6 h-[2px] bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-4 h-[2px] bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-[8px] w-6' : ''}`}></span>
        </div>
      </button>

      {/* 3. BARRA LATERAL GRIS (Solo Desktop) */}
      <div className="fixed top-0 left-0 bottom-0 w-[80px] bg-[#3d3d3d] z-[1002] hidden lg:flex flex-col items-center">
         {/* Espacio para el botón rojo */}
         <div className="h-[90px]"></div>
         {/* Redes Sociales */}
         <div className="mt-auto mb-10 flex flex-col space-y-6">
            <a href="#" className="text-white/30 hover:text-[#d92828] text-xl transition-colors"><FontAwesomeIcon icon={faFacebookSquare} /></a>
            <a href="#" className="text-white/30 hover:text-[#d92828] text-xl transition-colors"><FontAwesomeIcon icon={faInstagram} /></a>
         </div>
         {/* Copyright Vertical */}
         <div className="h-[200px] flex items-center justify-center bg-[#272727] w-full border-t border-white/5">
            <p className="text-white/20 text-[10px] uppercase tracking-[3px] rotate-180 [writing-mode:vertical-lr] whitespace-nowrap">
              © RenderPlay 2026
            </p>
         </div>
      </div>

      {/* 4. EL MENÚ (SIDEBAR LG / FULLSCREEN MOBILE) */}
      <nav
        className={`fixed top-0 bottom-0 transition-all duration-500 ease-in-out z-[1004] overflow-y-auto 
          ${menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          w-full lg:w-[400px] bg-[#1a1a1a] lg:left-[80px] lg:top-[90px]`}
      >
        <div className="flex flex-col h-full p-10 lg:p-12">
          {/* Header del menú (Solo visible en móvil para cerrar) */}
          <div className="flex items-center justify-between mb-12 lg:hidden">
            <span className="text-white/20 font-mono text-xs uppercase tracking-widest">Menú</span>
            <button onClick={() => setMenuOpen(false)} className="text-white/50 hover:text-white">
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </button>
          </div>

          <ul className="space-y-4 lg:space-y-2">
            {menuItems.map((item, index) => (
              <li key={item.name} className="border-b border-white/5 lg:border-none">
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center py-5 lg:py-3 text-white hover:text-[#d92828] transition-all"
                >
                  <span className="text-[10px] font-mono text-white/20 mr-4 mt-1">0{index + 1}</span>
                  <span className="text-2xl lg:text-lg font-bold lg:font-medium uppercase tracking-tighter lg:tracking-widest">
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
             <p className="text-white/40 text-sm font-light leading-relaxed">
               Diseñamos y transformamos tu idea en tu espacio ideal.<br/>
               <span className="text-[#d92828] mt-2 block font-medium">Mérida, Yucatán.</span>
             </p>
          </div>
        </div>
      </nav>

      {/* 5. OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1003]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;