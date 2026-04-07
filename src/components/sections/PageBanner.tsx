import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSquare, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

const PageBanner: React.FC = () => {
  return (
    <section className="page-banner-section py-[200px] pb-[100px] text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/renderplay/renderplayportada.webp')" }}>
      <div className="container max-w-[1170px] mx-auto px-4">
        <h1 className="text-white text-[20px] font-bold leading-[60px] font-['Montserrat'] m-0">Mérida, Yuc.</h1>
        <p className="text-white text-[15px] font-light leading-[26px] font-['Montserrat'] m-0">Renderizados arquitectónicos</p>
      </div>
      <div className="info-box absolute top-[30px] right-[30px] p-[15px] z-[2] bg-[rgba(255,255,255,0.05)] hidden lg:block">
        <p className="text-white leading-[18px] flex items-center m-0">
          <FontAwesomeIcon icon={faPhoneSquare} className="text-[18px] mr-[7px]" />
          +1 234 5678 90 00
          <span className="divider-line mx-2 h-[18px] w-[1px] bg-white"></span>
          <FontAwesomeIcon icon={faEnvelopeSquare} className="text-[18px] mr-[7px]" />
          renderplay@gmail.com
        </p>
      </div>
    </section>
  );
};

export default PageBanner;