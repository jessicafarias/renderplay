import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ menuOpen, setMenuOpen }) => {
  return (
    <header className="relative z-[999]">
      <div className="ml-[100px] logo w-[310px] h-[100px] bg-[#272727] flex items-center justify-center h-[100px] bg-[#272727]">
        <a href="/"><Image src="/images/logo-image.png" alt="Logo" width={250} height={40} className="max-w-full h-auto" /></a>
      </div>
      <div className="header-line fixed top-0 left-0 bottom-0 w-[100px] bg-[#3d3d3d] z-[2] tablet:left-[-100px]">
        <a className={`open-menu-toggle block py-[41px] px-[36px] bg-[#d92828] transition-all duration-300 ${menuOpen ? 'mt-[100px] py-[49px]' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-[28px] h-[2px] bg-white mb-[6px] transition-all duration-300 ${menuOpen ? 'rotate-45 -mb-[2px]' : ''}`}></span>
          <span className={`block w-[28px] h-[2px] bg-white mb-[6px] transition-all duration-300 ${menuOpen ? 'rotate-[-45deg] -mb-[2px]' : ''}`}></span>
          <span className={`block w-[17px] h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'w-[28px] rotate-45 -mb-[2px]' : ''}`}></span>
        </a>
        <div className="social-line py-[30px] h-[calc(100vh-450px)] flex flex-col relative justify-end transition-all duration-300">
          <div className="absolute top-[30px] left-1/2 bottom-[30px] w-[1px] bg-[#4c4c4c]"></div>
          <ul className="social-list p-[20px_0] m-0 mb-[40px] bg-[#3d3d3d] relative z-[2]">
            <li className="flex items-center justify-center mb-[13px] ">
              <a href="#" className=" w-[40px] h-[40px] leading-[40px] border border-[#4c4c4c] rounded-full text-[rgba(255,255,255,0.4)] hover:bg-[#d92828] hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center"><FontAwesomeIcon icon={faFacebookSquare} /></a>
            </li>
            <li className="flex items-center justify-center mb-[13px]">
              <a href="https://www.instagram.com/renderplaymx/" className="flex items-center justify-center w-[40px] h-[40px] leading-[40px] border border-[#4c4c4c] rounded-full text-[rgba(255,255,255,0.4)] hover:bg-[#d92828] hover:text-white hover:border-transparent transition-all duration-300"><FontAwesomeIcon icon={faInstagram} /></a>
            </li>
            <li className="flex items-center justify-center mb-[13px]">
              <a href="#" className="flex items-center justify-center w-[40px] h-[40px] leading-[40px] border border-[#4c4c4c] rounded-full text-[rgba(255,255,255,0.4)] hover:bg-[#d92828] hover:text-white hover:border-transparent transition-all duration-300"><FontAwesomeIcon icon={faTwitterSquare} /></a>
            </li>
          </ul>
        </div>
        <div className="copyright-line h-[350px] w-full flex items-center justify-center bg-[#272727]">
          <p className="text-white text-[17px] transform rotate-270 m-0">© RenderPlay 2026</p>
        </div>
      </div>
      <nav className={`nav-menu-box fixed top-[100px] left-[-300px] w-[400px] bg-[#717171] p-[40px] text-right max-h-[calc(100vh-100px)] overflow-y-scroll transition-all duration-300 ${menuOpen ? 'left-[100px]' : ''}`}>
        <ul className="navigation-menu-list p-[10px_0] m-0 border-l-[#868686] border-r-[#868686]">
          {/* Counter not replicable with Tailwind, requires custom CSS */}
          <li className="block ml-[-10px] mr-[-10px] border-b-[#868686] relative border-t-[#868686]">
            {/* ::before and ::after not replicable with Tailwind, requires custom CSS for counter and hover effects */}
            <a href="/" className="block p-[36px_25px] text-white text-[16px] font-bold tracking-[1.5px] uppercase font-['Montserrat'] relative"><span><em>Home</em></span></a>
            {/* &:after, span:before, span:after not replicable with Tailwind */}
            <ul className="sub-menu hidden p-[0_10px] m-0 border-t-[#868686]">
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                {/* &:first-child border-top none not replicable with Tailwind */}
                <a href="/" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Home 1</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/home2" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Home 2</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/home3" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Home 3</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/home4" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Home 4</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/home5" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Home 5</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/home6" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Home 6</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/home7" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Home 7</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/home8" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Home 8</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/home9" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Home 9</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/home10" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Home 10</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/home11" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Home 11</a>
              </li>
            </ul>
          </li>
          <li className="block ml-[-10px] mr-[-10px] border-b-[#868686] relative">
            <a href="/portfolio" className="block p-[36px_25px] text-white text-[16px] font-bold tracking-[1.5px] uppercase font-['Montserrat'] relative"><span><em>Work</em></span></a>
            <ul className="sub-menu hidden p-[0_10px] m-0 border-t-[#868686]">
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/portfolio" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Work default</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/portfolio-fullscreen-3col" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Work 3 col</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/portfolio-fullscreen-4col" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Work 4 col</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/portfolio-fullscreen-5col" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Work 5 col</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/portfolio-joined" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Work Joined</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/portfolio-combined" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Work combined</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/portfolio-alt" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Work alternative</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/single-project" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Project page 1</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/single-project2" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Project page 2</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/single-project3" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Project page 3</a>
              </li>
            </ul>
          </li>
          <li className="block ml-[-10px] mr-[-10px] border-b-[#868686] relative active">
            <a href="/about" className="block p-[36px_25px] text-white text-[16px] font-bold tracking-[1.5px] uppercase font-['Montserrat'] relative"><span><em>About</em></span></a>
            <ul className="sub-menu hidden p-[0_10px] m-0 border-t-[#868686]">
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/about" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">About 1</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/about2" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">About 2</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/services" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Services</a>
              </li>
            </ul>
          </li>
          <li className="block ml-[-10px] mr-[-10px] border-b-[#868686] relative">
            <a href="/blog" className="block p-[36px_25px] text-white text-[16px] font-bold tracking-[1.5px] uppercase font-['Montserrat'] relative"><span><em>Blog</em></span></a>
            <ul className="sub-menu hidden p-[0_10px] m-0 border-t-[#868686]">
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/blog" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Blog Grid</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/blog-list" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Blog List</a>
              </li>
              <li className="block bg-[#6b6b6b] border-t-[#868686]">
                <a href="/single-post" className="block p-[12px_18px] text-white text-[14px] font-bold font-['Montserrat'] uppercase hover:text-[#d92828]">Single Post</a>
              </li>
            </ul>
          </li>
          <li className="block ml-[-10px] mr-[-10px] border-b-[#868686] relative border-t-[#868686]">
            <a href="/contact" className="block p-[36px_25px] text-white text-[16px] font-bold tracking-[1.5px] uppercase font-['Montserrat'] relative"><span><em>Contact</em></span></a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;