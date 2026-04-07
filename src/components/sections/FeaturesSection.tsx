import React from 'react';
import RenderExample from '@/components/RenderExample';

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <div className="container max-w-[1170px] mx-auto px-4">
        <div className="features-box">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-2/5 p-4">
              <div className="feature-content">
                <h3 className="text-white text-[25px] font-bold m-0 mb-[12px]">Renderizados interactivos en Web y Realidad Virtual</h3>
                <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-['Montserrat'] font-light leading-[26px] m-0 mb-[16px]">La visualización 3D es fundamental para presentar nuestros proyectos. Creamos renderizados de alta calidad que permiten a nuestros clientes experimentar el diseño antes de su construcción, facilitando decisiones informadas.</p>
                <a href="" className="theme-button inline-block py-[14px] px-[30px] text-white uppercase font-bold font-['Montserrat'] border-[#212121] border relative">
                  <span className="relative z-[2]">Learn More</span>
                  {/* Hover effect with :before not replicable with Tailwind */}
                </a>
              </div>
            </div>
            <div className="w-full lg:w-3/5 p-4">
              <div className="image-holder">
                {/* <Image src="/upload/home2/transformational_designs.png" alt="transformational designs" width={600} height={400} className="w-full" /> */}
                <RenderExample />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;