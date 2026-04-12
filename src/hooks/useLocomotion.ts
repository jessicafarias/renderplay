import { useEffect, useRef } from "react";
import * as THREE from "three";

interface UseLocomotionOptions {
  dolly: THREE.Group | null;
  camera: THREE.Camera | null;
  speed?: number;
  enabled?: boolean;
}

/**
 * Smooth Locomotion Hook for Meta Quest left joystick
 * Maps left joystick to forward/backward/strafe movement relative to camera direction
 * - gamepad.axes[1]: forward/backward
 * - gamepad.axes[0]: strafe (left/right)
 */
export function useLocomotion({
  dolly,
  camera,
  speed = 0.05,
  enabled = true,
}: UseLocomotionOptions) {
  const velocityRef = useRef(new THREE.Vector3());
  const directionRef = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!enabled || !dolly || !camera) return;

    let animationFrameId: number;

    const updateLocomotion = () => {
      try {
        if (typeof navigator === "undefined" || !navigator.getGamepads) {
          animationFrameId = requestAnimationFrame(updateLocomotion);
          return;
        }

        // Get all gamepads (XR controllers appear as gamepads)
        const gamepads = navigator.getGamepads();
        if (!gamepads) {
          animationFrameId = requestAnimationFrame(updateLocomotion);
          return;
        }

        // Find left controller - usually the first gamepad with XR standard mapping
        let leftGamepad: Gamepad | null = null;
        for (let i = 0; i < gamepads.length; i++) {
          const gamepad = gamepads[i];
          if (gamepad && gamepad.mapping === "xr-standard") {
            // In Meta Quest, left controller is usually index 0
            if (i === 0 || gamepad.hand === "left") {
              leftGamepad = gamepad;
              break;
            }
          }
        }

        // Fallback: grab first available gamepad with axes
        if (!leftGamepad && gamepads[0] && gamepads[0].axes && gamepads[0].axes.length >= 2) {
          leftGamepad = gamepads[0];
        }

        if (leftGamepad && leftGamepad.axes && leftGamepad.axes.length >= 2) {
          // Get joystick axes (left thumbstick)
          const strafeAxis = leftGamepad.axes[0] || 0;      // X-axis (left/right)
          const forwardAxis = -(leftGamepad.axes[1] || 0);  // Y-axis inverted (forward/backward)

          // Deadzone threshold
          const magnitude = Math.sqrt(forwardAxis * forwardAxis + strafeAxis * strafeAxis);
          
          if (magnitude > 0.15) {
            // Get camera forward direction  
            camera.getWorldDirection(directionRef.current);
            
            // Keep movement horizontal
            directionRef.current.y = 0;
            directionRef.current.normalize();

            // Create right direction perpendicular to forward
            const rightDirection = new THREE.Vector3()
              .crossVectors(directionRef.current, new THREE.Vector3(0, 1, 0))
              .normalize();

            // Calculate movement relative to where camera is looking
            velocityRef.current
              .copy(directionRef.current)
              .multiplyScalar(forwardAxis * speed)
              .addScaledVector(rightDirection, strafeAxis * speed);

            // Move dolly (camera container)
            dolly.position.addScaledVector(velocityRef.current, 1);
          }
        }

        animationFrameId = requestAnimationFrame(updateLocomotion);
      } catch (error) {
        // Silently handle errors and continue
        animationFrameId = requestAnimationFrame(updateLocomotion);
      }
    };

    animationFrameId = requestAnimationFrame(updateLocomotion);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [dolly, camera, speed, enabled]);
}
