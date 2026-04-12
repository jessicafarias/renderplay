"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Model from "@/components/Model";
import Scene from "@/components/Scene";
import FirstPersonControls from "@/components/FirstPersonControls";
import { MODELS } from "@/config/models";
import { useModelSwitcher } from "@/hooks/useModelSwitcher";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
// @ts-ignore
import "@/app/globals.css";

// ── Browser detection ─────────────────────────────────────────────────────────
function isOperaGX(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  return ua.includes("OPR") || ua.includes("Opera");
}

// ── VR Modal ──────────────────────────────────────────────────────────────────
function VRModal({ onEnter, onClose }: { onEnter: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a1a] border border-[#8B1A1A]/50 p-8 max-w-md w-full mx-4 rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#d92828] opacity-70 mb-1 uppercase">
          XR System
        </p>
        <h2 className="font-mono text-lg tracking-[0.1em] text-[#ededed] pb-4 mb-4 border-b border-[#8B1A1A]/30 uppercase">
          Immersive Mode
        </h2>
        {[
          ["Mode", "Immersive VR"],
          ["Reference Space", "Local Floor"],
          ["Frame Rate", "72 Hz · Auto"],
          ["Controllers", "Touch · L+R"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between items-center py-2 border-b border-white/10 font-mono text-[12px]"
          >
            <span className="text-[#999] tracking-wide uppercase">{label}</span>
            <span className="text-[#ededed] tracking-[0.1em]">{value}</span>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 font-mono text-[11px] tracking-[0.1em] py-2.5 border border-white/20
                       text-[#999] hover:text-[#ededed] hover:border-white/40 transition-all bg-transparent uppercase"
          >
            Cancel
          </button>
          <button
            onClick={onEnter}
            className="flex-1 font-mono text-[11px] tracking-[0.1em] py-2.5 border border-[#d92828]
                       bg-[#d92828] text-white hover:bg-[#a02020] transition-colors uppercase"
          >
            Enter VR →
          </button>
        </div>
      </div>
    </div>
  );
}

function BrowserBlocked() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#191919]">
      <div className="border border-[#d92828] p-10 max-w-md text-center">
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#d92828]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#d92828]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#d92828]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#d92828]" />
        <p className="font-mono text-[11px] tracking-[0.3em] text-[#d92828] mb-3 uppercase">
          Compatibility Error
        </p>
        <h2 className="font-mono text-base text-[#ededed] tracking-widest uppercase mb-4">
          Browser Not Supported
        </h2>
        <p className="font-mono text-xs text-[#777] leading-relaxed">
          Opera GX is not compatible with this viewer.<br />
          Please use Chrome, Firefox, or Safari.
        </p>
      </div>
    </div>
  );
}

export default function ModelViewer() {
  const { current, currentIndex, next } = useModelSwitcher();
  const [firstPerson, setFirstPerson] = useState(false);
  const [showVRModal, setShowVRModal] = useState(false);
  const [browserBlocked, setBrowserBlocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    if (typeof navigator !== "undefined" && "xr" in navigator) {
      router.push("/vr");
    } else {
      alert("WebXR is not supported in your browser. Please use a compatible device.");
    }
  };

  if (browserBlocked) return <BrowserBlocked />;

  return (
    <div className="relative w-full min-h-screen bg-[#191919] text-[#ededed]">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className={`transition-all duration-500 pt-[40px] lg:pt-0 lg:pl-[80px] ${menuOpen ? 'blur-sm lg:blur-none' : ''}`}>
        
        {/* Canvas Section */}
        <div className="relative w-full h-[70vh] lg:h-screen">
          {showVRModal && (
            <VRModal onEnter={handleEnterVR} onClose={() => setShowVRModal(false)} />
          )}

          {/* Model Info - Top Left */}
          <div className="absolute top-6 left-6 font-mono text-xs z-20 text-[#777] tracking-widest uppercase">
            {currentIndex + 1} / {MODELS.length} — {current.name}
          </div>

          {/* Controls Info - Bottom Center */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] z-20 text-[#555] tracking-widest uppercase text-center">
            {firstPerson
              ? "[F] Exit · WASD Move · Click to capture"
              : "[E] Next · [F] First Person"}
          </div>

          {/* FP Crosshair */}
          {firstPerson && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="w-4 h-[1px] bg-[#d92828] opacity-60" />
              <div className="w-[1px] h-4 bg-[#d92828] opacity-60 -mt-[0.5rem] ml-[0.47rem]" />
            </div>
          )}

          {/* Canvas */}
          <Canvas
            key={current.path}
            className="w-full h-full"
            camera={{ position: [0, 2, 5], near: 0.01, far: 1000 }}
          >
            <Scene />
            <Suspense fallback={null}>
              <Model path={current.path} scale={current.scale} />
            </Suspense>
            {firstPerson
              ? <FirstPersonControls enabled={true} />
              : <OrbitControls maxPolarAngle={Math.PI / 2} />
            }
          </Canvas>

          {/* Buttons - Bottom Right */}
          <div className="absolute bottom-6 right-6 z-20 flex gap-3">
            {!firstPerson && (
              <button
                onClick={next}
                className="font-mono text-[11px] px-5 py-2.5 border border-white/15 text-[#999]
                           hover:border-[#d92828] hover:text-[#ededed] transition-all tracking-widest uppercase"
              >
                Next Model →
              </button>
            )}
            <button
              onClick={() => setShowVRModal(true)}
              className="font-mono text-[11px] px-5 py-2.5 border border-[#d92828] text-[#d92828]
                         hover:bg-[#d92828] hover:text-white transition-all tracking-widest uppercase"
            >
              Enter VR
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-line h-[1px] bg-white/5 mx-10" />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}