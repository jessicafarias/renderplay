"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";

function Model() {
  const gltf = useGLTF("/models/scene.gltf");

  useEffect(() => {
    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        // Forzar material sólido
        child.material.transparent = false;
        child.material.opacity = 1;
        child.material.depthWrite = true;
        child.material.alphaTest = 0;

        child.material.needsUpdate = true;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} scale={1.5} />;
}

export default function ModelViewer() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      paddingTop: "60px"
    }}>
      <div style={{
        position: "relative",
        width: "75vw",
        height: "75vh"
      }}>
        {/* Corner brackets */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderTop: "3px solid #00ff2a",
          borderLeft: "3px solid #00ff2a",
          zIndex: 10
        }}></div>
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40px",
          height: "40px",
          borderTop: "3px solid #00ff2a",
          borderRight: "3px solid #00ff2a",
          zIndex: 10
        }}></div>
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderBottom: "3px solid #00ff2a",
          borderLeft: "3px solid #00ff2a",
          zIndex: 10
        }}></div>
        <div style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "40px",
          height: "40px",
          borderBottom: "3px solid #00ff2a",
          borderRight: "3px solid #00ff2a",
          zIndex: 10
        }}></div>

        {/* HUD text */}
        <div style={{
          position: "absolute",
          top: "10px",
          right: "50px",
          color: "#00ff2a",
          fontFamily: "monospace",
          fontSize: "12px",
          zIndex: 10,
          textShadow: "0 0 10px #00ff2a"
        }}>
          [TRACKING...]
        </div>

        <Canvas 
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #00ff2a",
            boxShadow: "0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1)"
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