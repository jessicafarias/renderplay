"use client";

import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import Model from "@/components/Model";
import Scene from "@/components/Scene";
import VRControls from "@/components/VRControls";
import { useModelSwitcher } from "@/hooks/useModelSwitcher";
import * as THREE from "three";
// @ts-ignore
import "@/app/globals.css";

// Create XR store for v6
const store = createXRStore({
  hand: true,
  controller: true,
});

export default function VRPage() {
  const { current } = useModelSwitcher();
  const dollyRef = useRef<THREE.Group>(null);
  const router = useRouter();

  return (
    <div className="relative w-screen h-screen bg-black">
      {/* Enter VR Button (v6 style) */}
      <button
        onClick={() => store.enterVR()}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 font-mono text-[10px] px-6 py-2 border border-[#d92828] bg-[#d92828] text-white hover:bg-[#a02020] transition-all tracking-widest uppercase"
      >
        Enter VR Mode
      </button>

      {/* Exit Button */}
      <button
        onClick={() => router.push("/about")}
        className="fixed top-3 right-3 z-50 font-mono text-[10px] px-4 py-2 border border-[#8B1A1A] bg-[#8B1A1A] text-white hover:bg-[#a02020] transition-all tracking-widest uppercase"
      >
        Exit
      </button>

      <div className="fixed top-3 left-3 z-50 font-mono text-xs text-[#888] tracking-widest uppercase pointer-events-none">
        VR Mode
      </div>

      <Canvas
        key={current.path}
        className="w-full h-full"
        camera={{ position: [0, 1.6, 3], near: 0.01, far: 1000 }}
      >
        <XR store={store}>
          {/* Dolly group for camera movement without conflicting with head tracking */}
          <group ref={dollyRef}>
            <Scene />
            <Suspense fallback={null}>
              <Model path={current.path} scale={current.scale} />
            </Suspense>
          </group>

          {/* VR controls for joystick locomotion */}
          <VRControls dolly={dollyRef.current!} />
        </XR>
      </Canvas>
    </div>
  );
}
