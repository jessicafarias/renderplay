"use client";

import { useFrame } from "@react-three/fiber";
import { useXR } from "@react-three/xr";
import * as THREE from "three";

// Global debug state
let globalDebugInfo = "Waiting for XR session...";
let lastPresenting = false;

export function getDebugInfo() {
  return globalDebugInfo;
}

export default function VRControls({ dolly }: { dolly: THREE.Group }) {
  const direction = new THREE.Vector3();
  const rightDir = new THREE.Vector3();
  
  // Acceder directamente al store de useXR (v6)
  const xrStore = useXR();

  useFrame((state) => {
    if (!dolly) return;
    
    try {
      // Verificar si hay sesión XR
      if (!xrStore || !xrStore.session) {
        globalDebugInfo = `Waiting for XR session...\nClick "Enter VR Mode" button`;
        lastPresenting = false;
        return;
      }

      const session = xrStore.session;
      
      // En v6, simplemente verificar que la sesión existe es suficiente para saber que estamos en VR
      globalDebugInfo = `Session Detected!\nLooking for inputSources...\n`;

      if (!session.inputSources) {
        globalDebugInfo += `⚠️ NO inputSources array`;
        lastPresenting = false;
        return;
      }

      if (session.inputSources.length === 0) {
        globalDebugInfo += `⚠️ inputSources empty\nEnable controllers in emulator`;
        lastPresenting = false;
        return;
      }

      // Si llegamos aquí, estamos en VR con inputs
      if (!lastPresenting) {
        globalDebugInfo = `✓✓✓ ENTERED VR MODE ✓✓✓\n`;
        lastPresenting = true;
      }

      const deadzone = 0.1;
      const speed = 0.05;
      globalDebugInfo = `✓ VR ACTIVE\nInputSources: ${session.inputSources.length}\n`;

      // Iterar sobre las fuentes de entrada
      let foundGamepad = false;
      for (let i = 0; i < session.inputSources.length; i++) {
        const source = session.inputSources[i];
        globalDebugInfo += `\n[${i}] ${source.handedness}\n`;
        globalDebugInfo += `    GP: ${source.gamepad ? "✓" : "✗"}\n`;
        globalDebugInfo += `    Hand: ${source.hand ? "✓" : "✗"}\n`;

        if (!source.gamepad) continue;
        if (source.hand) continue;

        foundGamepad = true;
        const axes = source.gamepad.axes;
        
        if (!axes || axes.length < 2) {
          globalDebugInfo += `    No axes\n`;
          continue;
        }

        const x = axes[0] || 0;
        const y = axes[1] || 0;

        globalDebugInfo += `    X: ${x.toFixed(2)}\n`;
        globalDebugInfo += `    Y: ${y.toFixed(2)}\n`;

        if (Math.abs(x) > deadzone || Math.abs(y) > deadzone) {
          globalDebugInfo += `    ✓ MOVING\n`;

          state.camera.getWorldDirection(direction);
          direction.y = 0;
          direction.normalize();

          rightDir.crossVectors(direction, state.camera.up).normalize();

          dolly.position.addScaledVector(direction, -y * speed);
          dolly.position.addScaledVector(rightDir, x * speed);

          globalDebugInfo += `    Z: ${dolly.position.z.toFixed(1)}\n`;
        }
      }

      if (!foundGamepad && session.inputSources.length > 0) {
        globalDebugInfo += `\n⚠️ Sources found but no gamepad\nEnable controllers in emulator`;
      }
    } catch (error) {
      globalDebugInfo = `ERROR: ${error instanceof Error ? error.message : String(error)}`;
    }
  });

  return null;
}
