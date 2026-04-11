import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useFirstPerson(enabled: boolean) {
  const { camera, gl } = useThree();
  const keys = useRef<Record<string, boolean>>({});
  const isLocked = useRef(false);
  const yaw = useRef(0);
  const pitch = useRef(0);
  const SPEED = 0.05;
  const SENSITIVITY = 0.002;

  // Reusar estos objetos en lugar de crearlos en cada evento
  const _q = useRef(new THREE.Quaternion());
  const _qYaw = useRef(new THREE.Quaternion());
  const _qPitch = useRef(new THREE.Quaternion());
  const _yawAxis = useRef(new THREE.Vector3(0, 1, 0));
  const _pitchAxis = useRef(new THREE.Vector3(1, 0, 0));
  const _forward = useRef(new THREE.Vector3());
  const _right = useRef(new THREE.Vector3());
  const _move = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!enabled) return;
    const euler = new THREE.Euler().setFromQuaternion(camera.quaternion, "YXZ");
    yaw.current = euler.y;
    pitch.current = euler.x;
  }, [enabled, camera]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = gl.domElement;

    const onClick = () => canvas.requestPointerLock();

    const onPointerLockChange = () => {
      isLocked.current = document.pointerLockElement === canvas;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isLocked.current) return;

      yaw.current -= e.movementX * SENSITIVITY;
      pitch.current -= e.movementY * SENSITIVITY;
      pitch.current = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, pitch.current));

      // Reusar los refs en lugar de crear objetos nuevos
      _qYaw.current.setFromAxisAngle(_yawAxis.current, yaw.current);
      _qPitch.current.setFromAxisAngle(_pitchAxis.current, pitch.current);
      _q.current.multiplyQuaternions(_qYaw.current, _qPitch.current);
      camera.quaternion.copy(_q.current);
    };

    canvas.addEventListener("click", onClick);
    document.addEventListener("pointerlockchange", onPointerLockChange);
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      canvas.removeEventListener("click", onClick);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      document.removeEventListener("mousemove", onMouseMove);
      if (document.pointerLockElement === canvas) document.exitPointerLock();
    };
  }, [enabled, camera, gl]);

  useEffect(() => {
    if (!enabled) return;
    const onDown = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; };
    const onUp = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [enabled]);

  useFrame(() => {
    if (!enabled || !isLocked.current) return;

    // Reusar refs en lugar de new THREE.Vector3() cada frame
    camera.getWorldDirection(_forward.current);
    _right.current.crossVectors(_forward.current, camera.up).normalize();
    _move.current.set(0, 0, 0);

    if (keys.current["w"]) _move.current.addScaledVector(_forward.current, 1);
    if (keys.current["s"]) _move.current.addScaledVector(_forward.current, -1);
    if (keys.current["a"]) _move.current.addScaledVector(_right.current, -1);
    if (keys.current["d"]) _move.current.addScaledVector(_right.current, 1);

    if (_move.current.lengthSq() > 0) {
      _move.current.normalize();
      camera.position.addScaledVector(_move.current, SPEED);
    }
  });
}