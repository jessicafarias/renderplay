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
        <div
          className="absolute top-2.5 right-12 font-mono text-xs z-10"
          style={{
            color: "#00ff2a",
            textShadow: "0 0 10px #00ff2a",
          }}
        >
          [TRACKING...]
        </div>

        <Canvas
          className="w-full h-full"
          style={{
            border: "1px solid #00ff2a",
            boxShadow: "0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1)",
          }}
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