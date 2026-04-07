import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

const ServicesSection6: React.FC = () => {
  return (
    <section className="services-section6">
      <div className="container max-w-[1170px] mx-auto px-4">
        <div className="services-box6">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-4">
              {/* <div className="title-box">
                <span className="block text-white text-[15px] font-geist font-light leading-[26px] m-0 mb-[16px]">Firm of The Year</span>
                <h2 className="text-white text-[30px] font-semibold m-0 mb-[20px]">Nuestra</h2>
              </div> */}
              <div className="services-post6 flex mb-4">
                {/* <div className="icon mr-4">
                  <span className="material-icons-outlined text-[40px] text-white">app_registration</span>
                </div> */}
                <div className="serv-content">
                  <h4 className="text-white text-[20px] font-bold m-0 mb-[6px]">Diseño Arquitectónico Creativo</h4>
                  <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0">Creamos diseños arquitectónicos únicos que establecen nuevas tendencias. Cada proyecto refleja la visión de nuestros clientes con soluciones contemporáneas y funcionales.</p>
                </div>
              </div>
              <div className="services-post6 flex mb-4">
                {/* <div className="icon mr-4">
                  <span className="material-icons-outlined text-[40px] text-white">crop_rotate</span>
                </div> */}
                <div className="serv-content">
                  <h4 className="text-white text-[20px] font-bold m-0 mb-[6px]">Confort y Bienestar</h4>
                  <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0">Priorizamos la comodidad en cada dimensión del espacio. Desde iluminación natural hasta flujo de aire, cada detalle arquitectónico es calculado para optimizar la experiencia del usuario.</p>
                </div>
              </div>
              <div className="services-post6 flex mb-4">
                {/* <div className="icon mr-4">
                  <span className="material-icons-outlined text-[40px] text-white">straighten</span>
                </div> */}
                <div className="serv-content">
                  <h4 className="text-white text-[20px] font-bold m-0 mb-[6px]">Planificación Profesional</h4>
                  <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0">Cada proyecto comienza con planificación exhaustiva. Analizamos contextos, normativas y necesidades específicas para crear soluciones arquitectónicas estratégicas y sostenibles.</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-4">
              <div className="image-holder relative">
                <Image src="/images/renderplay/4.jpg" alt="services" width={540} height={506} className="w-full h-[506px] w-[540px] object-cover" />
                <a className="serv-link absolute bottom-0 right-0 bg-black bg-opacity-50 text-white p-4 flex items-center" href="/services">
                  Services
                  <FontAwesomeIcon icon={faLongArrowAltRight} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection6;