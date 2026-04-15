"use client";

import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Model from "@/components/Model";
import Scene from "@/components/Scene";
import VRControls from "@/components/VRControls";
import { useModelSwitcher } from "@/hooks/useModelSwitcher";
import * as THREE from "three";
// @ts-ignore
import "@/app/globals.css";

// Import debug info getter
import { getDebugInfo } from "@/components/VRControls";

// Create XR store for v6
const store = createXRStore({
  hand: true,
  controller: true,
});

// Debug Display Component
const DebugDisplay = ({ enterVRClicked, enterXRText }: { enterVRClicked: boolean; enterXRText: string }) => {
  const [debugText, setDebugText] = useState("Initializing...");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        let text = getDebugInfo();
        if (enterVRClicked) {
          text = `[✓ Clicked ENTER VR MODE]\n${text}`;
        }
        if (enterXRText) {
          text = `[${enterXRText}]\n${text}`;
        }
        setDebugText(text);
      } catch (e) {
        setDebugText("Debug unavailable");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [enterVRClicked, enterXRText]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(debugText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        left: "10px",
        background: "rgba(0,0,0,0.85)",
        color: "#0f0",
        fontFamily: "monospace",
        fontSize: "11px",
        padding: "8px",
        whiteSpace: "pre-wrap",
        zIndex: 9999,
        border: "1px solid #0f0",
        maxWidth: "320px",
        pointerEvents: "auto",
        lineHeight: "1.3",
        textShadow: "0 0 5px #0f0",
      }}
    >
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "4px",
          right: "4px",
          background: "#0f0",
          color: "#000",
          border: "none",
          padding: "2px 6px",
          fontSize: "9px",
          cursor: "pointer",
          fontFamily: "monospace",
          fontWeight: "bold",
          borderRadius: "2px",
          zIndex: 10000,
        }}
        title="Copy debug output"
      >
        {copied ? "✓ Copied!" : "Copy"}
      </button>
      <div style={{ paddingTop: "20px" }}>
        {debugText}
      </div>
    </div>
  );
};

export default function VRPage() {
  const { current } = useModelSwitcher();
  const router = useRouter();
  const [enterVRClicked, setEnterVRClicked] = useState(false);
  const [enterXRText, setEnterXRText] = useState("");
  const [dolly, setDolly] = useState<THREE.Group | null>(null);

  return (
    <div className="relative w-screen h-screen bg-black">
      {/* Enter VR Button (v6 style) */}
      <button
        onClick={() => {
          setEnterVRClicked(true);
          setEnterXRText("→ Requesting XR Session...");
          store.enterVR().then(() => {
            setEnterXRText("✓ XR Session Started!");
          }).catch((err) => {
            setEnterXRText(`✗ XR Error: ${err.message}`);
          });
        }}
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
      >
        <XR store={store}>
          {/* Dolly group for camera movement without conflicting with head tracking */}
          <group ref={setDolly}>
            <PerspectiveCamera makeDefault position={[0, 1.6, 3]} near={0.01} far={1000} />
            <Scene />
            <Suspense fallback={null}>
              <Model path={current.path} scale={current.scale} position={current.position} rotation={current.rotation} />
            </Suspense>
          </group>

          {/* VR controls for joystick locomotion - renders only when dolly exists */}
          {dolly && <VRControls dolly={dolly} />}
        </XR>
      </Canvas>

      {/* Debug Display Overlay */}
      <DebugDisplay enterVRClicked={enterVRClicked} enterXRText={enterXRText} />
    </div>
  );
}
