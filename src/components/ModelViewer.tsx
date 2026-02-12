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
      height: "100vh"
    }}>
      <Canvas 
        style={{
          width: "75vw",
          height: "75vh"
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
  );
}