"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group, LoopRepeat, Object3D } from "three";

interface ModelProps {
  path: string;
  scale: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function Model({ path, scale, position = [0, 0, 0], rotation = [0, 0, 0] }: ModelProps) {
  const group = useRef<Group>(null);
  const gltfRef = useRef<Group>(null);
  
  const gltf = useGLTF(path);
  const { actions, names } = useAnimations(gltf.animations, gltfRef);

  // const payaso1 = useGLTF("/models/roadkill/presentador.gltf");
  const payasoGroupRef = useRef<Group>(null);
  // const { actions: payasoActions, names: payasoNames } = useAnimations(payaso1.animations, payasoGroupRef);

  useEffect(() => {
    // payaso1.scene.traverse((child: Object3D) => {
    //   const c = child as any;
    //   if (c.isMesh) {
    //     c.material.transparent = false;
    //     c.material.opacity = 1;
    //     c.material.depthWrite = true;
    //     c.material.alphaTest = 0;
    //     c.material.needsUpdate = true;
    //   }
    // });

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
  }, [gltf]);

  useEffect(() => {
    if (names.length && actions[names[0]]) {
      const action = actions[names[0]]!;
      action.reset();
      action.setLoop(LoopRepeat, Infinity);
      action.play();
      return () => {
        action.stop();
      };
    }
  }, [actions, names]);

  // useEffect(() => {
  //   if (payasoNames.length && payasoActions[payasoNames[23]]) {
  //     const paction = payasoActions[payasoNames[23]]!;
  //     paction.reset();
  //     paction.setLoop(LoopRepeat, Infinity);
  //     paction.play();
  //     return () => {
  //       paction.stop();
  //     };
  //   }
  // }, [payasoNames, payasoActions]);

  return (
    <group ref={group}>
      <group ref={gltfRef} rotation={rotation} position={position}>
        <primitive object={gltf.scene} scale={scale} />
      </group>
      {/* <group ref={payasoGroupRef}>
        <primitive object={payaso1.scene} scale={1.5} position={[2, 0, 0]} rotation={[0, -Math.PI/2, 0]} />
      </group> */}
      {/* <ambientLight intensity={1} /> */}
    </group>
  );
}

useGLTF.preload("/models/test_house/housetest.glb");
useGLTF.preload("/models/chozav4/chozav4.glb");
useGLTF.preload("/models/roadkill/presentador.gltf");
useGLTF.preload("/models/test_house/casa2.glb");
