"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function VRControls({ dolly }: { dolly: THREE.Group }) {
  const direction = new THREE.Vector3();
  const rightDir = new THREE.Vector3();

  useFrame((state) => {
    try {
      // Verificar que xr existe y tiene el método getSession
      if (!state.gl.xr || !state.gl.xr.getSession) return;

      const session = state.gl.xr.getSession();
      if (!session || !session.inputSources) return;

      // Buscamos el mando izquierdo para caminar
      for (const source of session.inputSources) {
        if (source.gamepad && source.handedness === "left") {
          const axes = source.gamepad.axes; // [x, y, rotatedX, rotatedY]
          
          if (!axes) continue;

          // En Quest, el joystick suele usar los índices 2 y 3 en WebXR
          const x = axes[2] || 0; 
          const y = axes[3] || 0;

          const deadzone = 0.1;
          if (Math.abs(x) > deadzone || Math.abs(y) > deadzone) {
            const speed = 0.05;
            
            // Moverse hacia donde mira la cámara
            state.camera.getWorldDirection(direction);
            direction.y = 0;
            direction.normalize();

            rightDir.crossVectors(direction, state.camera.up).normalize();

            // Aplicar al Dolly (el contenedor)
            dolly.position.addScaledVector(direction, -y * speed);
            dolly.position.addScaledVector(rightDir, x * speed);
          }
        }
      }
    } catch (error) {
      // Silently fail if XR is not available
    }
  });

  return null;
}
