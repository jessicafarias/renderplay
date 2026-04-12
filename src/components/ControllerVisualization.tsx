"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface ControllerVisualizationProps {
  demoMode?: boolean; // Show controllers even without XR
}

export default function ControllerVisualization({ demoMode = false }: ControllerVisualizationProps) {
  const { gl } = useThree();
  const leftRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);

  // Memoize geometries and materials to prevent infinite re-renders
  const cylinderGeom = useMemo(() => new THREE.CylinderGeometry(0.02, 0.02, 0.15, 8), []);
  const sphereGeom = useMemo(() => new THREE.SphereGeometry(0.03, 8, 8), []);
  const leftMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: "#ff6b6b" }), []);
  const rightMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: "#4ecdc4" }), []);

  useFrame(() => {
    try {
      const xrSession = (gl as any).xr?.getSession?.();
      
      // Demo mode - show controllers in fixed positions without XR
      if (demoMode && !xrSession) {
        if (leftRef.current) {
          leftRef.current.position.set(-0.2, 0.8, -0.5);
          leftRef.current.quaternion.setFromEuler(new THREE.Euler(-0.3, 0.2, -0.1));
          leftRef.current.visible = true;
        }
        if (rightRef.current) {
          rightRef.current.position.set(0.2, 0.8, -0.5);
          rightRef.current.quaternion.setFromEuler(new THREE.Euler(-0.3, -0.2, 0.1));
          rightRef.current.visible = true;
        }
        return;
      }

      // Normal XR mode
      if (!xrSession || !xrSession.inputSources) return;

      for (const source of xrSession.inputSources) {
        if (!source.gripSpace) continue;

        const frame = (gl as any).xr?.getFrame?.();
        if (!frame) continue;

        const pose = frame.getPose(source.gripSpace, xrSession.getReferenceSpace?.());
        if (!pose || !pose.transform) continue;

        const group = source.handedness === "right" ? rightRef.current : leftRef.current;
        if (!group) continue;

        const { position, orientation } = pose.transform;
        group.position.set(position.x, position.y, position.z);
        group.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w);
        group.visible = true;
      }
    } catch (error) {
      // Silently handle errors
    }
  });

  return (
    <>
      {/* Left Controller */}
      <group ref={leftRef} visible={demoMode}>
        <mesh geometry={cylinderGeom} material={leftMaterial} />
        <mesh geometry={sphereGeom} material={new THREE.MeshBasicMaterial({ color: "#ff8787" })} position={[0, -0.08, 0]} />
      </group>

      {/* Right Controller */}
      <group ref={rightRef} visible={demoMode}>
        <mesh geometry={cylinderGeom} material={rightMaterial} />
        <mesh geometry={sphereGeom} material={new THREE.MeshBasicMaterial({ color: "#6ee7de" })} position={[0, -0.08, 0]} />
      </group>
    </>
  );
}
