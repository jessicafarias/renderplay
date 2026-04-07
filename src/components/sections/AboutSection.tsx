import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const AboutSection: React.FC = () => {
  return (
    <section className="about-section pt-[130px]">
      <div className="container max-w-[1170px] mx-auto px-4">
        <div className="about-box">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
              <div className="images">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2">
                    <Image src="/images/renderplay/1.jpg" alt="about1" width={400} height={200} className="w-full h-[200px] object-cover object-center p-2" />
                    <Image src="/images/renderplay/2.jpg" alt="about2" width={400} height={200} className="w-full h-[200px] object-cover object-center p-2" />
                  </div>
                  <div className="w-full md:w-1/2">
                    <Image src="/images/renderplay/3.jpg" alt="about3" width={400} height={400} className="w-full h-[400px] object-cover object-center p-2" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="about-content pl-[10px]">
                <h3 className="text-white text-[26px] font-bold m-0 mb-[20px] mt-[26px]">Diseñamos y transoformamos tu idea en tiu espacio ideal</h3>
                <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-['Montserrat'] font-light leading-[26px] m-0 mb-[16px]">Nuestro estudio se especializa en la creación de diseños arquitectónicos innovadores que transforman espacios en experiencias únicas. Con más de una década de experiencia, hemos desarrollado proyectos residenciales, comerciales y corporativos.</p>
                <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-['Montserrat'] font-light leading-[26px] m-0 mb-[16px]">Combinamos tecnología de vanguardia con principios de diseño sostenible, asegurando que cada proyecto no solo sea visualmente impactante, sino también funcional y ecológicamente responsable en su ejecución.</p>
                <ul className="feature-list p-0 m-0">
                  <li className="flex items-center mb-[20px]"><FontAwesomeIcon icon={faCheck} className="text-white text-[22px] mr-[16px]" />Interior Design</li>
                  <li className="flex items-center mb-[20px]"><FontAwesomeIcon icon={faCheck} className="text-white text-[22px] mr-[16px]" />Vector Design</li>
                  <li className="flex items-center mb-[20px]"><FontAwesomeIcon icon={faCheck} className="text-white text-[22px] mr-[16px]" />Responsive Design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;