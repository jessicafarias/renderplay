"use client";

import { useFrame } from "@react-three/fiber";
import { useXR } from "@react-three/xr";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Debug global
let globalDebugInfo = "Waiting for XR session...";
let lastPresenting = false;
let inputSourcesWaitTime = 0;

export function getDebugInfo() {
    return globalDebugInfo;
}

export default function VRControls({ dolly }: { dolly: THREE.Group }) {
    const direction = new THREE.Vector3();
    const rightDir = new THREE.Vector3();
    const xrStore = useXR();

    // --- VARIABLES DE FÍSICA INVERTIDA ---
    const verticalVelocity = useRef(0);
    const isGrounded = useRef(true);
    const currentGravity = useRef(0.005);

    // Configuración Salto X (Normal)
    const gravityX = 0.005;
    const jumpStrengthX = -0.05;

    // Configuración Salto A (Largo y Lento)
    const gravityA = 0.004;      // Valor pequeño = subida muy lenta
    const jumpStrengthA = -0.07; // Valor más negativo = salto más profundo

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
            if (!xrStore || !xrStore.session) {
                globalDebugInfo = `Waiting for XR session...\nClick "Enter VR Mode"`;
                lastPresenting = false;
                return;
            }

            const session = xrStore.session;
            if (!session.inputSources || session.inputSources.length === 0) {
                inputSourcesWaitTime++;
                globalDebugInfo = `Session OK\n⚠️ No inputs detected...`;
                return;
            }

            if (!lastPresenting) {
                globalDebugInfo = `✓✓✓ VR ACTIVE ✓✓✓\n`;
                lastPresenting = true;
            }

            const deadzone = 0.1;
            const speed = 0.05;

            // --- 1. PROCESAR FÍSICA (INVERTIDA) ---
            dolly.position.y += verticalVelocity.current;

            if (dolly.position.y < 0) {
                // Estamos "en el aire" (bajo el suelo Y=0)
                verticalVelocity.current += currentGravity.current;
                isGrounded.current = false;
            } else {
                // Tocando el suelo
                dolly.position.y = 0;
                verticalVelocity.current = 0;
                isGrounded.current = true;
            }

            // --- 2. PROCESAR MANDOS ---
            for (const source of session.inputSources) {
                if (!source.gamepad) continue;

                const axes = source.gamepad.axes;
                const buttons = source.gamepad.buttons;
                
                // Mando Izquierdo: Movimiento + Salto X
                if (source.handedness === "left") {
                    // Botón X (Índice 4 o 5)
                    const buttonX = buttons[4] || buttons[5];
                    if (buttonX?.pressed && isGrounded.current) {
                        verticalVelocity.current = jumpStrengthX;
                        currentGravity.current = gravityX;
                        isGrounded.current = false;
                    }

                    const x = axes[2] ?? axes[0] ?? 0;
                    const y = axes[3] ?? axes[1] ?? 0;

                    if (Math.abs(x) > deadzone || Math.abs(y) > deadzone) {
                        state.camera.getWorldDirection(direction);
                        direction.y = 0;
                        direction.normalize();
                        rightDir.crossVectors(direction, state.camera.up).normalize();

                        dolly.position.addScaledVector(direction, y * speed);
                        dolly.position.addScaledVector(rightDir, -x * speed);
                    }
                }

                // Mando Derecho: Rotación + Salto A
                if (source.handedness === "right") {
                    // Botón A (Índice 4 o 5 en el mando derecho)
                    const buttonA = buttons[4] || buttons[5];
                    if (buttonA?.pressed && isGrounded.current) {
                        verticalVelocity.current = jumpStrengthA;
                        currentGravity.current = gravityA; // Gravedad lenta
                        isGrounded.current = false;
                    }

                    const rotX = axes[2] ?? axes[0] ?? 0;
                    if (Math.abs(rotX) > deadzone) {
                        dolly.rotation.y -= rotX * 0.03;
                    }
                }
            }

            globalDebugInfo = `✓ VR ACTIVE\nY: ${dolly.position.y.toFixed(2)}\nGrounded: ${isGrounded.current}`;

        } catch (error) {
            globalDebugInfo = `ERROR: ${error instanceof Error ? error.message : String(error)}`;
        }
    });

    return null;
}
