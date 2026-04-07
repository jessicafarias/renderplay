import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="template-footer">
      <a className="go-top fixed bottom-4 right-4 z-10 text-white" href="#">
        <FontAwesomeIcon icon={faArrowAltCircleUp} />
      </a>
      <div className="instagram-line">
        <div className="container max-w-[1170px] mx-auto px-4">
          <ul className="insta-list flex flex-wrap">
            <li className="w-1/4 p-1"><a href="#" className="block"><Image src="/images/renderplay/hokk.jpg" alt="" width={200} height={200} className="w-[200px] h-[200px] object-cover" /></a></li>
            <li className="w-1/4 p-1"><a href="#" className="block"><Image src="/images/renderplay/5.jpg" alt="" width={200} height={200} className="w-[200px] h-[200px] object-cover" /></a></li>
            <li className="w-1/4 p-1"><a href="#" className="block"><Image src="/images/renderplay/dubai.jpg" alt="" width={200} height={200} className="w-[200px] h-[200px] object-cover" /></a></li>
            <li className="w-1/4 p-1"><a href="#" className="block"><Image src="/images/renderplay/7.jpg" alt="" width={200} height={200} className="w-[200px] h-[200px] object-cover" /></a></li>
            <li className="w-1/4 p-1"><a href="#" className="block"><Image src="/images/renderplay/8.jpg" alt="" width={200} height={200} className="w-[200px] h-[200px] object-cover" /></a></li>
            <li className="w-1/4 p-1"><a href="#" className="block"><Image src="/images/renderplay/bayan.jpg" alt="" width={200} height={200} className="w-[200px] h-[200px] object-cover" /></a></li>
            <li className="w-1/4 p-1"><a href="#" className="block"><Image src="/images/renderplay/2.jpg" alt="" width={200} height={200} className="w-[200px] h-[200px] object-cover" /></a></li>
            <li className="w-1/4 p-1"><a href="#" className="block"><Image src="/images/renderplay/omán.jpg" alt="" width={200} height={200} className="w-[200px] h-[200px] object-cover" /></a></li>
          </ul>
        </div>
      </div>
      <div className="widget-part-area flex flex-wrap justify-between px-4 py-8">
        <div className="footer-widget-line w-full md:w-1/4 mb-4">
          <div className="image-widget">
            <a href="/"><Image src="/images/renderplay/logo_rojo.jpg" alt="" width={100} height={50} /></a>
          </div>
        </div>
        <div className="footer-widget-line w-full md:w-1/4 mb-4">
          <h5 className="text-white text-[20px] font-bold m-0 mb-[6px]">Ubicación</h5>
          <ul className="custom-list p-0 m-0">
            <li className="mb-2"><a href="#" className="block text-white">Mérida</a></li>
            <li className="mb-2"><a href="#" className="block text-white">Yucatán</a></li>
            <li className="mb-2"><a href="#" className="block text-white">México</a></li>
          </ul>
        </div>
        <div className="footer-widget-line w-full md:w-1/4 mb-4">
          <h5 className="text-white text-[20px] font-bold m-0 mb-[6px]">Connect</h5>
          <ul className="custom-list p-0 m-0">
            <li className="mb-2"><a href="#" className="block text-white">instagram</a></li>
            <li className="mb-2"><a href="#" className="block text-white">facebook</a></li>
          </ul>
        </div>
        <div className="footer-widget-line w-full md:w-1/4 mb-4">
          <h5 className="text-white text-[20px] font-bold m-0 mb-[6px]">Get in Touch</h5>
          <ul className="custom-list p-0 m-0">
            <li className="mb-2"><a href="#" className="block text-white">renderplay@gmail.com.com</a></li>
            <li className="mb-2"><a href="#" className="block text-white">0055 1200 6700</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;