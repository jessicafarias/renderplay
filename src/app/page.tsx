"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import RenderExample from '@/components/RenderExample';
import Header from '@/components/sections/Header';
import Loader from '@/components/sections/Loader';
import PageBanner from '@/components/sections/PageBanner';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection3 from '@/components/sections/ServicesSection3';
import FeaturesSection from '@/components/sections/FeaturesSection';
import FeaturesSection2 from '@/components/sections/FeaturesSection2';
import ServicesSection6 from '@/components/sections/ServicesSection6';
import Footer from '@/components/sections/Footer';


const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
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
      <div className={`relative w-full min-h-screen bg-[#191919] text-[#ededed] font-['Arial, Helvetica, sans-serif'] ${loaded ? 'loaded' : 'loading'}`}>
        <Loader loaded={loaded} />

        <div id="container" className={`transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

          <div id="content" className="pl-[100px]">
            <PageBanner />
            <AboutSection />
            <ServicesSection3 />
            <div className="divider-line h-[1px] bg-[#212121]"></div>
            <FeaturesSection />
            <div className="divider-line h-[1px] bg-[#212121]"></div>
            <FeaturesSection2 />
            <ServicesSection6 />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;