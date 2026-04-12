"use client";

import { useFrame } from "@react-three/fiber";
import { useXR } from "@react-three/xr";
import { useEffect } from "react";
import * as THREE from "three";

// Global debug state
let globalDebugInfo = "Waiting for XR session...";
let lastPresenting = false;
let inputSourcesWaitTime = 0;

export function getDebugInfo() {
    return globalDebugInfo;
}

export default function VRControls({ dolly }: { dolly: THREE.Group }) {
    const direction = new THREE.Vector3();
    const rightDir = new THREE.Vector3();

    // Acceder directamente al store de useXR (v6)
    const xrStore = useXR();

    // Registrar listener para inputsourceschange
    useEffect(() => {
        if (!xrStore?.session) return;

        const session = xrStore.session;

        const handleInputSourcesChange = () => {
            globalDebugInfo += `\n[Event] inputsourceschange fired!`;
        };

        session.addEventListener("inputsourceschange", handleInputSourcesChange);

        return () => {
            session.removeEventListener("inputsourceschange", handleInputSourcesChange);
        };
    }, [xrStore?.session]);

    useFrame((state) => {
        if (!dolly) return;

        try {
            // Verificar si hay sesión XR
            if (!xrStore || !xrStore.session) {
                globalDebugInfo = `Waiting for XR session...\nClick "Enter VR Mode" button`;
                lastPresenting = false;
                inputSourcesWaitTime = 0;
                return;
            }

            const session = xrStore.session;

            if (!session.inputSources) {
                globalDebugInfo = `Session OK\n⚠️ NO inputSources array`;
                lastPresenting = false;
                return;
            }

            if (session.inputSources.length === 0) {
                inputSourcesWaitTime++;
                const waitSeconds = (inputSourcesWaitTime / 60).toFixed(1);
                globalDebugInfo = `Session OK\n⚠️ inputSources EMPTY\nWaiting: ${waitSeconds}s`;
                lastPresenting = false;
                return;
            }

            // Si llegamos aquí, estamos en VR con inputs
            if (!lastPresenting) {
                globalDebugInfo = `✓✓✓ ENTERED VR MODE ✓✓✓\n`;
                lastPresenting = true;
                inputSourcesWaitTime = 0;
            }

            const deadzone = 0.1;
            const speed = 0.05;
            globalDebugInfo = `✓ VR ACTIVE\nInputSources: ${session.inputSources.length}\n`;

            // Iterar sobre las fuentes de entrada
            let foundGamepad = false;
            for (let i = 0; i < session.inputSources.length; i++) {
                const source = session.inputSources[i];
                if (!source.gamepad) continue;

                const axes = source.gamepad.axes;
                // Usamos ?? para intentar detectar el joystick en cualquier posición (2/3 o 0/1)
                const x = axes[2] ?? axes[0] ?? 0;
                const y = axes[3] ?? axes[1] ?? 0;

                if (source.handedness === "left") {
                    if (Math.abs(x) > deadzone || Math.abs(y) > deadzone) {
                        state.camera.getWorldDirection(direction);
                        direction.y = 0;
                        direction.normalize();
                        rightDir.crossVectors(direction, state.camera.up).normalize();

                        dolly.position.addScaledVector(direction, -y * speed);
                        dolly.position.addScaledVector(rightDir, x * speed);
                    }
                }

                if (source.handedness === "right") {
                    if (Math.abs(x) > deadzone) {
                        // Rotación suave del mundo (Dolly)
                        dolly.rotation.y -= x * 0.03;
                    }
                }
            }


            if (!foundGamepad && session.inputSources.length > 0) {
                globalDebugInfo += `\n⚠️ Sources found but no gamepad`;
            }
        } catch (error) {
            globalDebugInfo = `ERROR: ${error instanceof Error ? error.message : String(error)}`;
        }
    });

    return null;
}
