"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Model from "@/components/Model";
import { MODELS } from "@/config/models";
import { useModelSwitcher } from "@/hooks/useModelSwitcher";

const RenderExample = () => {
  const { current, currentIndex, next } = useModelSwitcher();

  return (
    <div className="flex justify-center items-center">
      <div className=" font-mono text-xs z-10 text-[#00ff2a] opacity-60">
        [E] NEXT MODEL
      </div>
      {/* Single button */}
      <div className="z-10">
        <button
          onClick={next}
          className="font-mono text-xs px-6 py-1.5 border border-[#00ff2a] text-[#00ff2a] hover:bg-[#00ff2a] hover:text-black transition-colors duration-150"
        >
          NEXT MODEL →
        </button>
      </div>
      <div className="">
        {/* E hint */}

        <Canvas
          key={current.path}
          className="canvas-glow"
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
};

export default RenderExample;