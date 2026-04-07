import React from 'react';
import RenderExample from '@/components/RenderExample';

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section py-16 lg:py-32 bg-[#191919] overflow-hidden">
      <div className="container max-w-[1300px] mx-auto px-6">
        <div className="features-box">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* LADO IZQUIERDO: TEXTO (40%) */}
            <div className="w-full lg:w-[40%] order-2 lg:order-1">
              <div className="feature-content relative">
                {/* Decoración sutil de fondo */}
                <span className="absolute -top-10 -left-6 text-[100px] font-bold text-white/[0.02] select-none pointer-events-none">
                  01
                </span>
                
                <h3 className="font-geist text-white text-[32px] lg:text-[42px] font-bold leading-tight m-0 mb-6 tracking-tighter">
                  Renderizados <span className="text-[#d92828]">interactivos</span> y VR.
                </h3>
                
                <p className="text-white/60 text-[16px] lg:text-[18px] font-geist font-light leading-relaxed m-0 mb-10">
                  La visualización 3D no es solo una imagen, es una experiencia. 
                  Creamos entornos donde puedes interactuar con el diseño, 
                  facilitando decisiones estratégicas antes de la primera piedra.
                </p>

                <div className="flex items-center gap-6">
                  <a 
                    href="/portfolio" 
                    className="group relative inline-flex items-center justify-center py-4 px-8 text-white uppercase text-[12px] tracking-widest font-bold transition-all duration-300 border border-white/10 hover:border-[#d92828] bg-transparent"
                  >
                    <span className="relative z-10">Ver Proyectos</span>
                    <div className="absolute inset-0 w-0 group-hover:w-full bg-[#d92828] transition-all duration-300 ease-out z-0"></div>
                  </a>
                  
                  <span className="hidden sm:block h-[1px] w-12 bg-white/10"></span>
                </div>
              </div>
            </div>

            {/* LADO DERECHO: 3D CANVAS (60%) */}
            <div className="w-full lg:w-[60%] order-1 lg:order-2">
              <div className="relative">
                {/* El componente RenderExample ahora respira con sombras */}
                <div className="relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <RenderExample />
                </div>
                
                {/* Elemento decorativo detrás del 3D */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#d92828]/5 rounded-full blur-[100px]"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;