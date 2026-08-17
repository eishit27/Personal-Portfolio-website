"use client";
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import * as THREE from 'three';

export default function CameraRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);

  // Define key coordinates along our pipeline path
  const p0 = new THREE.Vector3(0, 0, 5);      // Intro view
  const p1 = new THREE.Vector3(3, -2, -2);    // Skills cluster view
  const p2 = new THREE.Vector3(-4, 1, -8);    // Projects monolith view
  const p3 = new THREE.Vector3(0, 5, -15);    // Final terminal view

  const targetPosition = new THREE.Vector3();
  const targetLookAt = new THREE.Vector3();

  useFrame((state) => {
    if (scrollProgress < 0.33) {
      const t = scrollProgress / 0.33;
      targetPosition.lerpVectors(p0, p1, t);
      targetLookAt.set(0, 0, 0); 
    } else if (scrollProgress < 0.66) {
      const t = (scrollProgress - 0.33) / 0.33;
      targetPosition.lerpVectors(p1, p2, t);
      targetLookAt.set(-2, 0, -5); 
    } else {
      const t = (scrollProgress - 0.66) / 0.34;
      targetPosition.lerpVectors(p2, p3, t);
      targetLookAt.set(0, 5, -20); 
    }

    state.camera.position.lerp(targetPosition, 0.05);
    state.camera.lookAt(targetLookAt);
  });

  return null;
}