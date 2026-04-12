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
 * - gamepad.axes[3]: forward/backward (negative = forward, positive = backward)
 * - gamepad.axes[2]: strafe (negative = left, positive = right)
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
        const xrSession = (window as any).navigator?.xr?.getSession?.();
        
        if (!xrSession || !xrSession.inputSources) {
          animationFrameId = requestAnimationFrame(updateLocomotion);
          return;
        }

        // Find left controller
        let leftController: XRInputSource | null = null;
        for (const source of xrSession.inputSources) {
          if (source.handedness === "left" && source.gamepad) {
            leftController = source;
            break;
          }
        }

        if (leftController && leftController.gamepad) {
          const gamepad = leftController.gamepad;
          
          // Get joystick axes (left thumbstick)
          const forwardAxis = gamepad.axes[3] || 0;    // Y-axis (forward/backward)
          const strafeAxis = gamepad.axes[2] || 0;     // X-axis (left/right)

          // Get camera direction (relative to world)
          camera.getWorldDirection(directionRef.current);
          
          // Remove Y component so movement is horizontal only
          directionRef.current.y = 0;
          directionRef.current.normalize();

          // Create strafe direction (perpendicular to forward)
          const strafeDirection = new THREE.Vector3()
            .crossVectors(new THREE.Vector3(0, 1, 0), directionRef.current)
            .normalize();

          // Calculate velocity based on joystick input
          velocityRef.current
            .copy(directionRef.current)
            .multiplyScalar(-forwardAxis * speed)
            .addScaledVector(strafeDirection, strafeAxis * speed);

          // Apply movement to dolly
          dolly.position.addScaledVector(velocityRef.current, 1);
        }

        animationFrameId = requestAnimationFrame(updateLocomotion);
      } catch (error) {
        // Silently handle errors
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
