"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Model from "@/components/Model";
import { MODELS } from "@/config/models";
import { useModelSwitcher } from "@/hooks/useModelSwitcher";

export default function ModelViewer() {
  const { current, currentIndex, next } = useModelSwitcher();

  return (
    <div className="flex justify-center items-center w-screen h-screen pt-16">
      <div className="relative w-[75vw] h-[75vh]">

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-[3px] border-l-[3px] border-[#00ff2a] z-10" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t-[3px] border-r-[3px] border-[#00ff2a] z-10" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-[3px] border-l-[3px] border-[#00ff2a] z-10" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[3px] border-r-[3px] border-[#00ff2a] z-10" />

        {/* HUD — tracking */}
        <div className="absolute top-2.5 right-12 font-mono text-xs z-10 text-[#00ff2a]" style={{ textShadow: '0 0 10px #00ff2a' }}>
          [TRACKING...]
        </div>

        {/* HUD — model name */}
        <div className="absolute top-2.5 left-12 font-mono text-xs z-10 text-[#00ff2a]" style={{ textShadow: '0 0 10px #00ff2a' }}>
          {currentIndex + 1} / {MODELS.length} — {current.name.toUpperCase()}
        </div>

        {/* E hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs z-10 text-[#00ff2a] opacity-60">
          [E] NEXT MODEL
        </div>

        {/* Single button */}
        <div className="absolute bottom-[-3rem] left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={next}
            className="font-mono text-xs px-6 py-1.5 border border-[#00ff2a] text-[#00ff2a] hover:bg-[#00ff2a] hover:text-black transition-colors duration-150"
          >
            NEXT MODEL →
          </button>
        </div>

        <Canvas
          key={current.path}
          className="w-full h-full"
          style={{
            border: '1px solid #00ff2a',
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1)'
          }}
          camera={{ position: [0, 2, 5] }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} intensity={2} />

          <Suspense fallback={null}>
            <Model path={current.path} scale={current.scale} />
          </Suspense>

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}