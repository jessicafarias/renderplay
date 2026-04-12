"use client";

import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Model from "@/components/Model";
import Scene from "@/components/Scene";
import FirstPersonControls from "@/components/FirstPersonControls";
import { useModelSwitcher } from "@/hooks/useModelSwitcher";

// Wrapper component to handle XR rendering
function VRContent({ path, scale }: { path: string; scale: number }) {
  return (
    <>
      <Scene />
      <Suspense fallback={null}>
        <Model path={path} scale={scale} />
      </Suspense>
      <FirstPersonControls enabled={true} />
    </>
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
