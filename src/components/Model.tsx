"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group } from "three";

interface ModelProps {
  path: string;
  scale: number;
}

export default function Model({ path, scale }: ModelProps) {
  const group = useRef<Group>(null);
  const gltf = useGLTF(path);
  const { actions, names } = useAnimations(gltf.animations, group);

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

  useEffect(() => {
    if (!names.length) return;
    const action = actions[names[0]];
    action?.reset().play();
    return () => { action?.stop(); };
  }, [actions, names]);

  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={scale} />
    </group>
  );
}