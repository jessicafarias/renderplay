"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group, Object3D } from "three";

interface ModelProps {
  path: string;
  scale: number;
}

export default function Model({ path, scale }: ModelProps) {
  const group = useRef<Group>(null);
  
  const gltf = useGLTF(path);
  const { actions, names } = useAnimations(gltf.animations, group);

  const payaso1 = useGLTF("/models/roadkill/presentador.gltf");
  const payasoGroupRef = useRef<Group>(null);
  const { actions: payasoActions, names: payasoNames } = useAnimations(payaso1.animations, payasoGroupRef);

  useEffect(() => {
    payaso1.scene.traverse((child: Object3D) => {
      const c = child as any;
      if (c.isMesh) {
        c.material.transparent = false;
        c.material.opacity = 1;
        c.material.depthWrite = true;
        c.material.alphaTest = 0;
        c.material.needsUpdate = true;
      }
    });

    gltf.scene.traverse((child: Object3D) => {
      const c = child as any;
      if (c.isMesh) {
        c.material.transparent = false;
        c.material.opacity = 1;
        c.material.depthWrite = true;
        c.material.alphaTest = 0;
        c.material.needsUpdate = true;
      }
    });
  }, [gltf, payaso1]);

  useEffect(() => {
    if (names.length && actions[names[0]]) {
      const action = actions[names[0]]!;
      action.reset().play();
      return () => {
        action.stop();
      };
    }
  }, [actions, names]);

  useEffect(() => {
    if (payasoNames.length && payasoActions[payasoNames[23]]) {
      const paction = payasoActions[payasoNames[23]]!;
      console.log("Playing Payaso animation:", payasoNames);
      paction.reset().play();
      return () => {
        paction.stop();
      };
    }
  }, [payasoNames, payasoActions]);

  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={scale} position={[-2, 0, 5]} rotation={[0, -Math.PI / 10, 0]} />
      <group ref={payasoGroupRef}>
        <primitive object={payaso1.scene} scale={1.5} position={[2, -1, 0]} rotation={[0, -Math.PI/2, 0]} />
      </group>
    </group>
  );
}