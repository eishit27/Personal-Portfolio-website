// src/components/canvas/CameraRig.tsx
"use client";
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import * as THREE from 'three';

export default function CameraRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);

  useFrame((state) => {
    // Start far back
    let targetZ = 8.5;
    let targetY = 0;

    if (scrollProgress > 0) {
       // CHANGED: Pulled the final zoom back from 4.5 to 6.0 so it breathes.
       // CHANGED: Raised the camera from 1.5 to 2.5 to look down into the layers.
       targetZ = THREE.MathUtils.lerp(8.5, 6.0, scrollProgress);
       targetY = THREE.MathUtils.lerp(0, 2.5, scrollProgress); 
    }

    // Smoothly animate the camera
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    
    // Lock focus on the center
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}