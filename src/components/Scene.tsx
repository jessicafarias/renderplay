"use client";

import { Environment } from "@react-three/drei";

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <Environment
        files="/hdri/citrus_orchard_road_puresky_4k.exr"
        background={true}
        backgroundBlurriness={0}
        backgroundIntensity={1}
      />
    </>
  );
}