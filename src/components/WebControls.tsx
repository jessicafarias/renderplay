"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

/**
 * Web Controls - Keyboard + Mouse controls for desktop
 * WASD for movement, Mouse for look around
 */
export default function WebControls() {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "w") setKeys((prev) => ({ ...prev, w: true }));
      if (e.key.toLowerCase() === "a") setKeys((prev) => ({ ...prev, a: true }));
      if (e.key.toLowerCase() === "s") setKeys((prev) => ({ ...prev, s: true }));
      if (e.key.toLowerCase() === "d") setKeys((prev) => ({ ...prev, d: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "w") setKeys((prev) => ({ ...prev, w: false }));
      if (e.key.toLowerCase() === "a") setKeys((prev) => ({ ...prev, a: false }));
      if (e.key.toLowerCase() === "s") setKeys((prev) => ({ ...prev, s: false }));
      if (e.key.toLowerCase() === "d") setKeys((prev) => ({ ...prev, d: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!camera) return;

    const speed = 0.1;

    // Get camera direction
    camera.getWorldDirection(direction.current);
    direction.current.y = 0;
    direction.current.normalize();

    // Get right direction
    const right = new THREE.Vector3()
      .crossVectors(direction.current, new THREE.Vector3(0, 1, 0))
      .normalize();

    // Calculate movement
    let move = new THREE.Vector3();

    if (keys.w) move.addScaledVector(direction.current, speed);
    if (keys.s) move.addScaledVector(direction.current, -speed);
    if (keys.d) move.addScaledVector(right, speed);
    if (keys.a) move.addScaledVector(right, -speed);

    // Apply movement to camera
    camera.position.add(move);
  });

  return null;
}
