"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function Model() {
  const gltf = useGLTF("/models/scene.gltf");

  useEffect(() => {
    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
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