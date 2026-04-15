"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Model from "@/components/Model";
import { useModelSwitcher } from "@/hooks/useModelSwitcher";

const RenderExample = () => {
  const { current, next } = useModelSwitcher();

  return (
    <div className="relative w-full group">
      <div className="relative w-full h-[50vh] min-h-[200px] lg:max-h-[600px] overflow-hidden rounded-lg bg-black/20">
        
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20 pointer-events-none">
          <div className="hidden lg:block font-mono text-[10px] text-[#00ff2a] opacity-40">
            [E] KEYBOARD SHORTCUT
          </div>

          <button
            onClick={next}
            className="pointer-events-auto font-mono text-[10px] lg:text-xs px-4 py-2 border border-[#00ff2a] text-[#00ff2a] hover:bg-[#00ff2a] hover:text-black transition-all duration-300 backdrop-blur-sm"
          >
            NEXT MODEL →
          </button>
        </div>

        <div className="absolute bottom-4 left-4 z-20 pointer-events-none font-mono text-[10px] text-[#00ff2a]/60 uppercase tracking-widest">
            Model: {current.path.split('/').pop()?.replace('.glb', '')}
        </div>

        {/* EL CANVAS */}
        <Canvas
          key={current.path}
          // El estilo canvas-glow debe estar en tu globals.css
          className="canvas-glow w-full h-full"
          camera={{ position: [0, 2, 5], fov: 45 }}
          shadows
        >
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-5, 5, 5]} intensity={2} />

          <Suspense fallback={null}>
            <Model path={current.path} scale={current.scale} position={current.position} rotation={current.rotation} />
          </Suspense>

          <OrbitControls 
            enableDamping 
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={10}
            enablePan={false}
          />
        </Canvas>
      </div>
      
      <p className="mt-2 text-center text-[10px] font-mono text-white/20 uppercase tracking-tighter lg:hidden">
        Interact with 3D model
      </p>
    </div>
  );
};

export default RenderExample;