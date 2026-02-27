"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Model from "@/components/Model";

export default function ModelViewer() {
  return (
    <div className="flex justify-center items-center w-screen h-screen pt-16">
      <div className="relative w-[75vw] h-[75vh]">

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-[3px] border-l-[3px] border-[#00ff2a] z-10" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t-[3px] border-r-[3px] border-[#00ff2a] z-10" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-[3px] border-l-[3px] border-[#00ff2a] z-10" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[3px] border-r-[3px] border-[#00ff2a] z-10" />

        {/* HUD text */}
        <div className="absolute top-2.5 right-12 font-mono text-xs z-10 text-[#00ff2a] text-shadow-glow">
          [TRACKING...]
        </div>

        <Canvas
          className="w-full h-full canvas-glow"
          camera={{ position: [0, 2, 5] }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} intensity={2} />

          <Suspense fallback={null}>
            <Model />
          </Suspense>

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}