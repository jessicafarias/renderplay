import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined, faEdit, faChartLine } from '@fortawesome/free-solid-svg-icons';

const ServicesSection3: React.FC = () => {
  return (
    <section className="services-section3">
      <div className="container max-w-[1170px] mx-auto px-4">
        <div className="services-box3">
          <div className="flex">
            <div className="w-full lg:w-1/3 p-4 text-center">
              <div className="services-post3">
                <FontAwesomeIcon icon={faRulerCombined} className="text-[40px] mb-[10px] text-white" />
                <h4 className="text-white text-[20px] font-bold m-0 mb-[6px]">Planeación</h4>
                <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-['Montserrat'] font-light leading-[26px] m-0">Estimaciones de tiempo según el proyecto</p>
              </div>
            </div>
            <div className="w-full lg:w-1/3 p-4 text-center">
              <div className="services-post3">
                <FontAwesomeIcon icon={faEdit} className="text-[40px] mb-[10px] text-white" />
                <h4 className="text-white text-[20px] font-bold m-0 mb-[6px]">Diseño</h4>
                <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-['Montserrat'] font-light leading-[26px] m-0">Diseño a la medida de tus necesidades</p>
              </div>
            </div>
            <div className="w-full lg:w-1/3 p-4 text-center">
              <div className="services-post3">
                <FontAwesomeIcon icon={faChartLine} className="text-[40px] mb-[10px] text-white" />
                <h4 className="text-white text-[20px] font-bold m-0 mb-[6px]">Finalización</h4>
                <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-['Montserrat'] font-light leading-[26px] m-0">Entrega del proyecto terminado render o construcción</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection3;