import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoaderProps {
    loaded: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loaded }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (loaded) {
            const timer = setTimeout(() => setIsVisible(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [loaded]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[99999] bg-[#242424] flex items-center justify-center transition-all duration-1000 ease-in-out
      ${loaded ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'}`}
        >
            <div className={`flex flex-col items-center justify-center transition-all duration-700 px-4
        ${loaded ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>

                {/* Contenedor del Logo Responsivo */}
                <div className="mb-6 md:mb-10 w-full flex justify-center">
                    <div className="relative w-[180px] sm:w-[220px] md:w-[280px] lg:w-[320px] aspect-[2.5/1]">
                        <Image
                            src="https://res.cloudinary.com/dqlvmeoii/image/upload/v1775527060/renderplay_papvqi.webp"
                            alt="Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Círculo de carga Responsivo */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                    <svg className="w-full h-full animate-spin" viewBox="0 0 80 80">
                        <path
                            className="fill-none stroke-[#333333] stroke-[5]"
                            d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"
                        />
                        <path
  className="stroke-[#d92828] stroke-[5] fill-none"
  style={{
    strokeDasharray: '150',
    strokeDashoffset: '75',
    strokeLinecap: 'round' // <--- Cambiado de lineCap a strokeLinecap
  }}
  d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"
/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Loader;