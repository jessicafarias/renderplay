import React from 'react';
import Image from 'next/image';

const FeaturesSection2: React.FC = () => {
  return (
    <section className="features-section2">
      <div className="container max-w-[1170px] mx-auto px-4">
        <div className="features-box2">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-4">
              <div className="images-box">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 p-2">
                    <div className="image-holder relative">
                      <Image src="https://res.cloudinary.com/dqlvmeoii/image/upload/v1775527060/renderplay_papvqi.webp" alt="feature1" fill className="object-cover" />
                      <span className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">Diseño & Construcción</span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <div className="image-holder relative">
                      <Image src="https://res.cloudinary.com/dqlvmeoii/image/upload/v1775527060/renderplay_papvqi.webp" alt="feature2" fill className="object-cover" />
                      <span className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">Modern Architecture</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="w-full lg:w-1/2 p-4">
              <div className="feature-content">
                <span className="block text-white text-[15px] font-geist font-light leading-[26px] m-0 mb-[16px]">amazing features</span>
                <h3 className="text-white text-[25px] font-bold m-0 mb-[12px]">RenderPlay</h3>
                <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0">Nuestra plataforma RenderPlay integra herramientas avanzadas de modelado 3D con realidad virtual, permitiendo a arquitectos y diseñadores presentar sus proyectos de manera inmersiva y revolucionaria a clientes y stakeholders.</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection2;