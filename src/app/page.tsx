"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/sections/Header';
import Loader from '@/components/sections/Loader';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection3 from '@/components/sections/ServicesSection3';
import FeaturesSection from '@/components/sections/FeaturesSection';
import FeaturesSection2 from '@/components/sections/FeaturesSection2';
import ServicesSection6 from '@/components/sections/ServicesSection6';
import Footer from '@/components/sections/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSquare, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 1500);
  }, []);

  return (
    <>
      <div className={`relative w-full min-h-screen bg-[#191919] text-[#ededed] font-sans ${loaded ? 'loaded' : 'loading'}`}>
        <Loader loaded={loaded} />

        <div className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* USAMOS EL HEADER ÚNICO QUE YA ES RESPONSIVO */}
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

          {/* CONTENIDO: 
              - pt-[70px] para que el logo móvil no tape el banner.
              - lg:pt-0 y lg:pl-[80px] para respetar la barra lateral en desktop.
          */}
          <div id="content" className={`transition-all duration-500 pt-[40px] lg:pt-0 lg:pl-[80px] ${menuOpen ? 'blur-sm lg:blur-none' : ''}`}>
            
            <section className="relative min-h-[60vh] lg:min-h-screen flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/renderplay/renderplayportada.webp')" }}>
              <div className="absolute inset-0 w-full"></div>
              <div className="container relative z-10 w-full mx-auto px-4 top-[80px]">
                <h1 className="text-white text-[15px] lg:text-[30px] font-bold leading-tight font-geist m-0 tracking-tighter uppercase">
                  Mérida, Yuc.
                </h1>
                <p className="text-white/80 text-[16px] lg:text-[20px] font-light mt-4 tracking-[4px] uppercase font-geist">
                  Renderizados <br/> arquitectónicos
                </p>
              </div>

              {/* Info box superior derecha para Desktop */}
              <div className="info-box absolute top-[30px] right-[30px] p-[15px] z-[2] bg-black/20 backdrop-blur-md hidden xl:block border border-white/10">
                <p className="text-white leading-[18px] flex items-center m-0 text-sm">
                  <FontAwesomeIcon icon={faPhoneSquare} className="text-[#d92828] mr-[7px]" />
                  +1 234 5678 90 00
                  <span className="divider-line mx-3 h-[18px] w-[1px] bg-white/20"></span>
                  <FontAwesomeIcon icon={faEnvelopeSquare} className="text-[#d92828] mr-[7px]" />
                  renderplay@gmail.com
                </p>
              </div>
            </section>

            {/* SECCIONES: Eliminamos el bloque de menú móvil que estaba aquí en medio */}
            {/* <AboutSection /> */}
            <ServicesSection3 />
            
            <div className="divider-line h-[1px] bg-white/5 mx-10"></div>
            
            <FeaturesSection />
            <div className="divider-line h-[1px] bg-white/5 mx-10"></div>
            
            <FeaturesSection2 />
            <ServicesSection6 />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;