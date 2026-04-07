import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="template-footer">
      <a className="go-top fixed bottom-4 right-4 z-10 text-white" href="#">
        <FontAwesomeIcon icon={faArrowAltCircleUp} />
      </a>
      <div className="instagram-line">
        <div className="container max-w-[1170px] mx-auto px-4">
          <ul className="insta-list flex flex-wrap">
            <li className="basis-1/2 lg:basis-1/4 lg:max-w-[25vw]"><a href="#" className="block">
              <Image width={300} height={300} src="/images/renderplay/hokk.jpg" alt=""
                className='object-cover' /></a>
            </li>
            <li className="basis-1/2 lg:basis-1/4 lg:max-w-[25%]"><a href="#" className="block">
              <Image width={300} height={300} src="/images/renderplay/5.jpg" alt="" className='object-cover' /></a></li>
            <li className="basis-1/2 lg:basis-1/4 lg:max-w-[25%]"><a href="#" className="block">
              <Image width={300} height={300} src="/images/renderplay/dubai.jpg" alt="" className='object-cover' /></a></li>
            <li className="basis-1/2 lg:basis-1/4 lg:max-w-[25%]"><a href="#" className="block">
              <Image width={300} height={300} src="/images/renderplay/7.jpg" alt="" className='object-cover' /></a></li>
               <li className="basis-1/2 lg:basis-1/4 lg:max-w-[25vw]"><a href="#" className="block">
              <Image width={300} height={300} src="/images/renderplay/hokk.jpg" alt=""
                className='object-cover' /></a>
            </li>
            <li className="basis-1/2 lg:basis-1/4 lg:max-w-[25%]"><a href="#" className="block">
              <Image width={300} height={300} src="/images/renderplay/5.jpg" alt="" className='object-cover' /></a></li>
            <li className="basis-1/2 lg:basis-1/4 lg:max-w-[25%]"><a href="#" className="block">
              <Image width={300} height={300} src="/images/renderplay/dubai.jpg" alt="" className='object-cover' /></a></li>
            <li className="basis-1/2 lg:basis-1/4 lg:max-w-[25%]"><a href="#" className="block">
              <Image width={300} height={300} src="/images/renderplay/7.jpg" alt="" className='object-cover' /></a></li>
          </ul>
        </div>
      </div>
      <div className="widget-part-area flex flex-wrap justify-between px-4 py-8">
        <div className="basis-full lg:basis-1/2 m-auto flex flex-col items-center text-center mb-4">
          <h5 className="text-white text-[20px] font-bold m-0 mb-[6px]">Sígenos en redes</h5>
          <ul className="custom-list p-0 m-0 justify-center flex">
            <li className="mb-2"><a href="#" className="block text-white text-[40px]"><FontAwesomeIcon icon={faInstagram} /></a></li>
            <li className="mb-2"><a href="#" className="block text-white text-[40px]"><FontAwesomeIcon icon={faFacebookSquare} /></a></li>
          </ul>
        </div>
        <div className="basis-full lg:basis-1/2 m-auto">
          <h5 className="text-white text-[20px] font-bold m-0 mb-[6px] font-geist text-center">Get in Touch</h5>
          <ul className="flex flex-col p-0 m-auto justify-center items-center gap-x-4">
            <li className="mb-2"><a href="#" className="block text-white font-geist">renderplay@gmail.com.com</a></li>
            <li className="mb-2"><a href="#" className="block text-white font-geist">0055 1200 6700</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;