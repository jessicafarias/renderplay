"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group } from "three";


const RoadkillScene = () => {
  const group = useRef<Group>(null);
  // const presentador = useGLTF("/models/roadkill/presentador.gltf");
  // const payaso1 = useGLTF("/models/roadkill/payaso1/payaso1.gltf");
  // const { actions, names } = useAnimations(presentador.animations, presentador.scene);


  // presentador.scene.traverse((child: any) => {
  //   if (child.isMesh) {
  //     child.material.transparent = false;
  //     child.material.opacity = 1;
  //     child.material.depthWrite = true;
  //     child.material.alphaTest = 0;
  //     child.material.needsUpdate = true;
  //   }
  // }
// );

  useEffect(() => {
    // const presentadorAction = actions[names[0]];
    // presentadorAction?.reset().play();
    // const payaso1Action = actions[names[1]];
    // payaso1Action?.reset().play();
  }, []);

  return (
    <group ref={group}>
      {/* <primitive object={presentador.scene} scale={10} /> */}
      {/* <primitive object={payaso1.scene} scale={5} /> */}
    </group>
  );
};

export default RoadkillScene;