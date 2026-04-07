import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSquare, faEnvelopeSquare, faRulerCombined, faEdit, faChartLine, faLongArrowAltRight, faArrowAltCircleUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import 'owl.carousel/dist/assets/owl.carousel.css';
import "./globals.css";
import RenderExample from '@/components/RenderExample';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const About: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  return (
    <>
      <Head>
        <title>RenderPlay</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Rubik:wght@300;400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </Head>
      <div className={`ip-container relative w-full min-h-screen bg-[#191919] font-geist ${loaded ? 'loaded' : 'loading'}`}>
        {/* Initial loader */}
        <div className="ip-header absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <p className="m-auto">
            <Image src="https://res.cloudinary.com/dqlvmeoii/image/upload/v1775527060/renderplay_papvqi.webp" alt="Logo" width={250} height={100} className="max-w-[250px]" />
          </p>
          <div className="ip-loader absolute bottom-[20%] opacity-0">
            <svg className="ip-inner w-[100px] h-[100px]" viewBox="0 0 80 80">
              <path className="ip-loader-circlebg fill-[#191919] stroke-[#333333] stroke-[5]" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z" />
              <path id="ip-loader-circle" className="ip-loader-circle stroke-[#d92828] stroke-[2] fill-none" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z" />
            </svg>
          </div>
        </div>

        {/* Container */}
        <div id="container" className={`transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Header */}
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
                  <a href="/" className="block p-[36px_25px] text-white text-[16px] font-bold tracking-[1.5px] uppercase font-geist relative"><span><em>Home</em></span></a>
                  {/* &:after, span:before, span:after not replicable with Tailwind */}
                  <ul className="sub-menu hidden p-[0_10px] m-0 border-t-[#868686]">
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      {/* &:first-child border-top none not replicable with Tailwind */}
                      <a href="/" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Home 1</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/home2" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Home 2</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/home3" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Home 3</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/home4" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Home 4</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/home5" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Home 5</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/home6" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Home 6</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/home7" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Home 7</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/home8" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Home 8</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/home9" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Home 9</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/home10" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Home 10</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/home11" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Home 11</a>
                    </li>
                  </ul>
                </li>
                <li className="block ml-[-10px] mr-[-10px] border-b-[#868686] relative">
                  <a href="/portfolio" className="block p-[36px_25px] text-white text-[16px] font-bold tracking-[1.5px] uppercase font-geist relative"><span><em>Work</em></span></a>
                  <ul className="sub-menu hidden p-[0_10px] m-0 border-t-[#868686]">
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/portfolio" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Work default</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/portfolio-fullscreen-3col" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Work 3 col</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/portfolio-fullscreen-4col" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Work 4 col</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/portfolio-fullscreen-5col" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Work 5 col</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/portfolio-joined" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Work Joined</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/portfolio-combined" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Work combined</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/portfolio-alt" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Work alternative</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/single-project" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Project page 1</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/single-project2" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Project page 2</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/single-project3" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Project page 3</a>
                    </li>
                  </ul>
                </li>
                <li className="block ml-[-10px] mr-[-10px] border-b-[#868686] relative active">
                  <a href="/about" className="block p-[36px_25px] text-white text-[16px] font-bold tracking-[1.5px] uppercase font-geist relative"><span><em>About</em></span></a>
                  <ul className="sub-menu hidden p-[0_10px] m-0 border-t-[#868686]">
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/about" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">About 1</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/about2" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">About 2</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/services" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Services</a>
                    </li>
                  </ul>
                </li>
                <li className="block ml-[-10px] mr-[-10px] border-b-[#868686] relative">
                  <a href="/blog" className="block p-[36px_25px] text-white text-[16px] font-bold tracking-[1.5px] uppercase font-geist relative"><span><em>Blog</em></span></a>
                  <ul className="sub-menu hidden p-[0_10px] m-0 border-t-[#868686]">
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/blog" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Blog Grid</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/blog-list" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Blog List</a>
                    </li>
                    <li className="block bg-[#6b6b6b] border-t-[#868686]">
                      <a href="/single-post" className="block p-[12px_18px] text-white text-[14px] font-bold font-geist uppercase hover:text-[#d92828]">Single Post</a>
                    </li>
                  </ul>
                </li>
                <li className="block ml-[-10px] mr-[-10px] border-b-[#868686] relative border-t-[#868686]">
                  <a href="/contact" className="block p-[36px_25px] text-white text-[16px] font-bold tracking-[1.5px] uppercase font-geist relative"><span><em>Contact</em></span></a>
                </li>
              </ul>
            </nav>
          </header>

          <div id="content" className="pl-[100px]">
            {/* Page banner section */}
            <section className="page-banner-section py-[200px] pb-[100px] text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/renderplay/renderplayportada.webp')" }}>
              <div className="container max-w-[1170px] mx-auto px-4">
                <h1 className="text-white text-[20px] font-bold leading-[60px] font-geist m-0">Mérida, Yuc.</h1>
                <p className="text-white text-[15px] font-light leading-[26px] font-geist m-0">Renderizados arquitectónicos</p>
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

            {/* About section */}
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
                        <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0 mb-[16px]">Nuestro estudio se especializa en la creación de diseños arquitectónicos innovadores que transforman espacios en experiencias únicas. Con más de una década de experiencia, hemos desarrollado proyectos residenciales, comerciales y corporativos.</p>
                        <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0 mb-[16px]">Combinamos tecnología de vanguardia con principios de diseño sostenible, asegurando que cada proyecto no solo sea visualmente impactante, sino también funcional y ecológicamente responsable en su ejecución.</p>
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

            {/* Services section 3 */}
            <section className="services-section3">
              <div className="container max-w-[1170px] mx-auto px-4">
                <div className="services-box3">
                  <div className="flex">
                    <div className="w-full lg:w-1/3 p-4 text-center">
                      <div className="services-post3">
                        <FontAwesomeIcon icon={faRulerCombined} className="text-[40px] mb-[10px] text-white" />
                        <h4 className="text-white text-[20px] font-bold m-0 mb-[6px]">Planeación</h4>
                        <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0">Estimaciones de tiempo según el proyecto</p>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/3 p-4 text-center">
                      <div className="services-post3">
                        <FontAwesomeIcon icon={faEdit} className="text-[40px] mb-[10px] text-white" />
                        <h4 className="text-white text-[20px] font-bold m-0 mb-[6px]">Diseño</h4>
                        <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0">Diseño a la medida de tus necesidades</p>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/3 p-4 text-center">
                      <div className="services-post3">
                        <FontAwesomeIcon icon={faChartLine} className="text-[40px] mb-[10px] text-white" />
                        <h4 className="text-white text-[20px] font-bold m-0 mb-[6px]">Finalización</h4>
                        <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0">Entrega del proyecto terminado render o construcción</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features carousel section */}
            <section className="features-carousel-section mb-[130px]">
              <div className="container max-w-[1170px] mx-auto px-4">
                <div className="features-carousel-box">
                  <OwlCarousel className="owl-carousel owl-theme" items={1} loop nav margin={10}>
                    <div className="item">
                      <div className="feature-post pr-[212px] overflow-hidden pb-[31px] md:flex">
                        <div className="image-holder md:w-[60%] md:mr-[-10%] relative">
                          <Image src="/upload/home3/carousel-img1.jpg" alt="carousel1" fill className="object-cover object-center" />
                        </div>
                        <div className="feature-post-content md:w-[50%] p-4">
                          <span className="block text-white text-[15px] font-geist font-light leading-[26px] m-0 mb-[16px]">our specialty</span>
                          <h3 className="text-white text-[25px] font-bold m-0 mb-[12px]">Previsualización 3D para mayor interaccion con el cliente</h3>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="feature-post pr-[212px] overflow-hidden pb-[31px] md:flex">
                        <div className="image-holder md:w-[60%] md:mr-[-10%] relative">
                          <Image src="/upload/home3/services.jpg" alt="services" fill className="object-cover object-center" />
                        </div>
                        <div className="feature-post-content md:w-[50%] p-4">
                          <span className="block text-white text-[15px] font-geist font-light leading-[26px] m-0 mb-[16px]">planings</span>
                          <h3 className="text-white text-[25px] font-bold m-0 mb-[12px]">Interception Design</h3>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="feature-post pr-[212px] overflow-hidden pb-[31px] md:flex">
                        <div className="image-holder md:w-[60%] md:mr-[-10%] relative">
                          <Image src="/upload/home3/home3_slide-01.jpg" alt="home slide" fill className="object-cover object-center" />
                        </div>
                        <div className="feature-post-content md:w-[50%] p-4">
                          <span className="block text-white text-[15px] font-geist font-light leading-[26px] m-0 mb-[16px]">lot of features</span>
                          <h3 className="text-white text-[25px] font-bold m-0 mb-[12px]">Functional Finalisation</h3>
                        </div>
                      </div>
                    </div>
                  </OwlCarousel>
                </div>
              </div>
            </section>

            <div className="divider-line h-[1px] bg-[#212121]"></div>

            {/* Features section */}
            <section className="features-section">
              <div className="container max-w-[1170px] mx-auto px-4">
                <div className="features-box">
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-2/5 p-4">
                      <div className="feature-content">
                        <h3 className="text-white text-[25px] font-bold m-0 mb-[12px]">Renderizados interactivos en Web y Realidad Virtual</h3>
                        <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0 mb-[16px]">La visualización 3D es fundamental para presentar nuestros proyectos. Creamos renderizados de alta calidad que permiten a nuestros clientes experimentar el diseño antes de su construcción, facilitando decisiones informadas.</p>
                        <a href="" className="theme-button inline-block py-[14px] px-[30px] text-white uppercase font-bold font-geist border-[#212121] border relative">
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

            <div className="divider-line h-[1px] bg-[#212121]"></div>

            {/* Features section 2 */}
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
                    <div className="w-full lg:w-1/2 p-4">
                      <div className="feature-content">
                        <span className="block text-white text-[15px] font-geist font-light leading-[26px] m-0 mb-[16px]">amazing features</span>
                        <h3 className="text-white text-[25px] font-bold m-0 mb-[12px]">RenderPlay</h3>
                        <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0">Nuestra plataforma RenderPlay integra herramientas avanzadas de modelado 3D con realidad virtual, permitiendo a arquitectos y diseñadores presentar sus proyectos de manera inmersiva y revolucionaria a clientes y stakeholders.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services section 6 */}
            <section className="services-section6">
              <div className="container max-w-[1170px] mx-auto px-4">
                <div className="services-box6">
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/2 p-4">
                      <div className="title-box">
                        <span className="block text-white text-[15px] font-geist font-light leading-[26px] m-0 mb-[16px]">Firm of The Year</span>
                        <h2 className="text-white text-[30px] font-semibold m-0 mb-[20px]">Nuestra</h2>
                      </div>
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
                        <div className="icon mr-4">
                          <span className="material-icons-outlined text-[40px] text-white">crop_rotate</span>
                        </div>
                        <div className="serv-content">
                          <h4 className="text-white text-[20px] font-bold m-0 mb-[6px]">Confort y Bienestar</h4>
                          <p className="text-[rgba(255,255,255,0.8)] text-[15px] font-geist font-light leading-[26px] m-0">Priorizamos la comodidad en cada dimensión del espacio. Desde iluminación natural hasta flujo de aire, cada detalle arquitectónico es calculado para optimizar la experiencia del usuario.</p>
                        </div>
                      </div>
                      <div className="services-post6 flex mb-4">
                        <div className="icon mr-4">
                          <span className="material-icons-outlined text-[40px] text-white">straighten</span>
                        </div>
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

            {/* Footer */}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default About;