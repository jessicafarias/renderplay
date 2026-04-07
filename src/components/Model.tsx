"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

interface ModelProps {
  path: string;
  scale: number;
}

export default function Model({ path, scale }: ModelProps) {
  const gltf = useGLTF(path);

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

  return <primitive object={gltf.scene} scale={scale} />;
}
