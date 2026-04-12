"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Model from "@/components/Model";
import Scene from "@/components/Scene";
import FirstPersonControls from "@/components/FirstPersonControls";
import ControllerVisualization from "@/components/ControllerVisualization";
import { useModelSwitcher } from "@/hooks/useModelSwitcher";
import { useLocomotion } from "@/hooks/useLocomotion";
import * as THREE from "three";
// @ts-ignore
import "@/app/globals.css";

// Wrapper component to handle XR rendering
function VRContent({ path, scale }: { path: string; scale: number }) {
  const dollyRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Initialize dolly
  useEffect(() => {
    if (dollyRef.current && camera) {
      dollyRef.current.add(camera);
    }
  }, [camera]);

  // Apply smooth locomotion using left joystick
  useLocomotion({
    dolly: dollyRef.current,
    camera: camera,
    speed: 0.05,
    enabled: true,
  });

  return (
    <group ref={dollyRef}>
      <Scene />
      <Suspense fallback={null}>
        <Model path={path} scale={scale} />
      </Suspense>
      <FirstPersonControls enabled={true} />
      <ControllerVisualization />
    </group>
  );
}

export default function VRPage() {
  const { current } = useModelSwitcher();
  const [xrStore, setXrStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize XR store once on mount (browser-only)
  useEffect(() => {
    const initXR = async () => {
      try {
        if (typeof window === "undefined" || !("xr" in navigator)) {
          throw new Error("WebXR not available");
        }

        // Check if immersive VR is supported
        const isSupported = await (navigator as any).xr?.isSessionSupported?.("immersive-vr");
        if (!isSupported) {
          throw new Error("Immersive VR not supported");
        }

        // Create XR store
        const store = createXRStore();
        setXrStore(store);
      } catch (error) {
        console.warn("XR initialization failed:", error);
        // Fallback: render without XR
        setXrStore(null);
      } finally {
        setLoading(false);
      }
    };

    initXR();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-black">
        <p className="font-mono text-[#888]">Initializing...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black">
      <div className="absolute top-3 left-3 font-mono text-xs z-10 text-[#888] tracking-widest uppercase pointer-events-none">
        VR Mode
      </div>

      {xrStore && (
        <button
          onClick={() => {
            try {
              xrStore.enterVR();
            } catch (error) {
              console.error("Error entering VR:", error);
            }
          }}
          className="absolute top-3 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] px-6 py-2 border border-[#d92828] bg-[#d92828] text-white hover:bg-[#a02020] transition-all tracking-widest uppercase"
        >
          Enter VR
        </button>
      )}

      <button
        onClick={() => router.push("/about")}
        className="absolute top-3 right-3 z-20 font-mono text-[10px] px-4 py-2 border border-[#8B1A1A] bg-[#8B1A1A] text-white hover:bg-[#a02020] transition-all tracking-widest uppercase"
      >
        Exit VR
      </button>

      <Canvas
        key={current.path}
        className="w-full h-full"
        camera={{ position: [0, 2, 5], near: 0.01, far: 1000 }}
      >
        {xrStore && (
          <XR store={xrStore}>
            <VRContent path={current.path} scale={current.scale} />
          </XR>
        )}
        {!xrStore && (
          <VRContent path={current.path} scale={current.scale} />
        )}
      </Canvas>
    </div>
  );
}
