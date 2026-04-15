"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Model from "@/components/Model";
import Scene from "@/components/Scene";
import FirstPersonControls from "@/components/FirstPersonControls";
import { MODELS } from "@/config/models";
import { useModelSwitcher } from "@/hooks/useModelSwitcher";

const xrStore = createXRStore();

// ── Browser detection ─────────────────────────────────────────────────────────
function isOperaGX(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  return ua.includes("OPR") || ua.includes("Opera");
}

// ── VR Modal ──────────────────────────────────────────────────────────────────
function VRModal({ onEnter, onClose }: { onEnter: () => void; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative border border-[#8B1A1A] bg-[#0a0a0a] p-8 w-[380px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#8B1A1A]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#8B1A1A]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#8B1A1A]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#8B1A1A]" />

        {/* Header */}
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#8B1A1A] opacity-60 mb-1 uppercase">
          XR System
        </p>
        <h2 className="font-mono text-sm tracking-[0.15em] text-[#c0c0c0] pb-4 mb-4 border-b border-[#8B1A1A]/30 uppercase">
          Immersive Mode
        </h2>

        {/* Info rows */}
        {[
          ["Mode", "Immersive VR"],
          ["Reference Space", "Local Floor"],
          ["Frame Rate", "72 Hz · Auto"],
          ["Controllers", "Oculus Touch · L+R"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between items-center py-2 border-b border-white/5 font-mono text-[11px]"
          >
            <span className="text-[#888] tracking-wide uppercase">{label}</span>
            <span className="text-[#c0c0c0] tracking-[0.1em]">{value}</span>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 font-mono text-[10px] tracking-[0.15em] py-2.5 border border-white/20
                       text-[#888] hover:text-[#c0c0c0] hover:border-white/40 transition-all bg-transparent uppercase"
          >
            Cancel
          </button>
          <button
            onClick={onEnter}
            className="flex-1 font-mono text-[10px] tracking-[0.15em] py-2.5 border border-[#8B1A1A]
                       bg-[#8B1A1A] text-white hover:bg-[#a02020] transition-colors uppercase"
          >
            Enter VR →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Browser blocked overlay ───────────────────────────────────────────────────
function BrowserBlocked() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]">
      <div className="border border-[#8B1A1A] p-10 max-w-md text-center">
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#8B1A1A]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#8B1A1A]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#8B1A1A]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#8B1A1A]" />
        <p className="font-mono text-[10px] tracking-[0.3em] text-[#8B1A1A] mb-3 uppercase">
          Compatibility Error
        </p>
        <h2 className="font-mono text-sm text-[#c0c0c0] tracking-widest uppercase mb-4">
          Browser Not Supported
        </h2>
        <p className="font-mono text-xs text-[#666] leading-relaxed">
          Opera GX is not compatible with this viewer.<br />
          Please use Chrome, Firefox, or Safari.
        </p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ModelViewer() {
  const { current, currentIndex, next } = useModelSwitcher();
  const [firstPerson, setFirstPerson] = useState(false);
  const [showVRModal, setShowVRModal] = useState(false);
  const [browserBlocked, setBrowserBlocked] = useState(false);
  const router = useRouter();

  // Check browser on mount
  useEffect(() => {
    if (isOperaGX()) setBrowserBlocked(true);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") setFirstPerson((prev) => !prev);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleEnterVR = () => {
    setShowVRModal(false);
    router.push("/vr"); // Redirige a página fullscreen de VR
  };

  if (browserBlocked) return <BrowserBlocked />;

  return (
    <div className="flex justify-center items-center w-screen h-screen pt-16">
      {showVRModal && (
        <VRModal onEnter={handleEnterVR} onClose={() => setShowVRModal(false)} />
      )}

      <div className="relative w-[75vw] h-[75vh]">
        {/* Model name — top left */}
        <div className="absolute top-3 left-3 font-mono text-xs z-10 text-[#888] tracking-widest uppercase">
          {currentIndex + 1} / {MODELS.length} — {current.name}
        </div>

        {/* Controls hint — bottom center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] z-10 text-[#555] tracking-widest uppercase">
          {firstPerson
            ? "[F] Exit · WASD Move · Click to capture"
            : "[E] Next · [F] First Person"}
        </div>

        {/* FP crosshair */}
        {firstPerson && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="w-4 h-[1px] bg-[#8B1A1A] opacity-60" />
            <div className="w-[1px] h-4 bg-[#8B1A1A] opacity-60 -mt-[0.5rem] ml-[0.47rem]" />
          </div>
        )}

        <Canvas
          key={current.path}
          className="w-full h-full"
          camera={{ position: [0, 2, 5], near: 0.01, far: 1000 }}
        >
          <XR store={xrStore}>
            <Scene />
            <Suspense fallback={null}>
              <Model path={current.path} scale={current.scale} position={current.position} rotation={current.rotation} />
            </Suspense>
            {firstPerson
              ? <FirstPersonControls enabled={true} />
              : <OrbitControls maxPolarAngle={Math.PI / 2} />
            }
          </XR>
        </Canvas>

        {/* Buttons — below canvas */}
        <div className="absolute bottom-[-3rem] left-1/2 -translate-x-1/2 z-10 flex gap-4">
          {!firstPerson && (
            <button
              onClick={next}
              className="font-mono text-[10px] px-6 py-2 border border-white/15 text-[#888]
                         hover:border-[#8B1A1A] hover:text-[#c0c0c0] transition-all tracking-widest uppercase"
            >
              Next Model →
            </button>
          )}
          <button
            onClick={() => setShowVRModal(true)}
            className="font-mono text-[10px] px-6 py-2 border border-[#8B1A1A] text-[#8B1A1A]
                       hover:bg-[#8B1A1A] hover:text-white transition-all tracking-widest uppercase"
          >
            Enter VR
          </button>
        </div>
      </div>
    </div>
  );
}