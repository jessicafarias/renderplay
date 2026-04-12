import { useFrame } from "@react-three/fiber";
import { useXR } from "@react-three/xr";
import { useEffect, useRef } from "react";
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

    const verticalVelocity = useRef(0);
    const isGrounded = useRef(true);
    const gravity = 0.005; // Ahora positivo - atrae hacia ABAJO
    const jumpStrength = -0.05; // Negativo - impulsa hacia ABAJO

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
            globalDebugInfo += `Grounded: ${isGrounded.current ? "✓" : "✗"}\n`;

            // --- 1. LÓGICA DE GRAVEDAD (INVERTIDA) ---
            // Aplicamos velocidad vertical al Dolly (ahora hacia ABAJO)
            dolly.position.y += verticalVelocity.current;

            // Simulación simple de suelo - ahora el suelo está en Y=0, hacia ABAJO
            if (dolly.position.y < 0) {
                verticalVelocity.current += gravity;
                isGrounded.current = false;
            } else {
                dolly.position.y = 0;
                verticalVelocity.current = 0;
                isGrounded.current = true;
            }

            // Iterar sobre las fuentes de entrada
            for (const source of session.inputSources) {
                if (!source.gamepad) continue;

                // --- 2. DETECTAR BOTÓN X (Mando Izquierdo) ---
                if (source.handedness === "left") {
                    // El botón X suele ser el índice 4 o 5 dependiendo del perfil
                    const buttonX = source.gamepad.buttons[4] || source.gamepad.buttons[5];

                    if (buttonX?.pressed && isGrounded.current) {
                        verticalVelocity.current = jumpStrength;
                        isGrounded.current = false;
                        globalDebugInfo += `JUMP!\n`;
                    }
                }

                // --- 3. MOVIMIENTO (TU CÓDIGO ACTUAL) ---
                const axes = source.gamepad.axes;
                const x = axes[2] ?? axes[0] ?? 0;
                const y = axes[3] ?? axes[1] ?? 0;

                if (source.handedness === "left") {
                    if (Math.abs(x) > deadzone || Math.abs(y) > deadzone) {
                        state.camera.getWorldDirection(direction);
                        direction.y = 0;
                        direction.normalize();
                        rightDir.crossVectors(direction, state.camera.up).normalize();

                        dolly.position.addScaledVector(direction, y * speed);
                        dolly.position.addScaledVector(rightDir, -x * speed);
                    }
                }

                if (source.handedness === "right") {
                    if (Math.abs(x) > deadzone) {
                        // Rotar el Dolly (todo el usuario) en su propio eje
                        dolly.rotation.y -= x * 0.03;
                    }
                }
            }
        } catch (error) {
            globalDebugInfo = `ERROR: ${error instanceof Error ? error.message : String(error)}`;
        }
    });

    return null;
}
