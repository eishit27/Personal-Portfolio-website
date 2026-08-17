// src/components/canvas/EnvironmentRig.tsx
"use client";
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import * as THREE from 'three';

export default function EnvironmentRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const { scene } = useThree(); // Gives us direct access to the 3D background

  const mainLight = useRef<THREE.DirectionalLight>(null);
  const ambientLight = useRef<THREE.AmbientLight>(null);

  // Define our cinematic color palette
  const colors = useMemo(() => ({
    bg: {
      day: new THREE.Color("#e3eadd"),     // Soft Sky Blue
      sunset: new THREE.Color("#e6a47a"),  // Warm Sunset Orange
      night: new THREE.Color("#161a22"),   // Deep Space Navy
    },
    sun: {
      day: new THREE.Color("#fff1d0"),     // Bright Yellow/White
      sunset: new THREE.Color("#ff7433"),  // Deep Orange
      night: new THREE.Color("#5a7a8f"),   // Cool Moonlight
    }
  }), []);

  // Reusable color objects for performance (prevents memory leaks during animation)
  const currentBg = useMemo(() => new THREE.Color(), []);
  const currentSun = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    // Phase 1: Day to Sunset (Scroll 0% to 50%)
    if (scrollProgress < 0.5) {
      const t = scrollProgress / 0.5; // Normalize to 0-1
      
      currentBg.lerpColors(colors.bg.day, colors.bg.sunset, t);
      currentSun.lerpColors(colors.sun.day, colors.sun.sunset, t);

      // Dim the lights slightly as the sun sets
      if (mainLight.current) mainLight.current.intensity = THREE.MathUtils.lerp(1.5, 1.0, t);
      if (ambientLight.current) ambientLight.current.intensity = THREE.MathUtils.lerp(0.7, 0.4, t);
    } 
    // Phase 2: Sunset to Night (Scroll 50% to 100%)
    else {
      const t = (scrollProgress - 0.5) / 0.5; // Normalize to 0-1
      
      currentBg.lerpColors(colors.bg.sunset, colors.bg.night, t);
      currentSun.lerpColors(colors.sun.sunset, colors.sun.night, t);

      // Drop the light intensity heavily for night time
      if (mainLight.current) mainLight.current.intensity = THREE.MathUtils.lerp(1.0, 0.4, t);
      if (ambientLight.current) ambientLight.current.intensity = THREE.MathUtils.lerp(0.4, 0.1, t);
    }

    // Apply the newly calculated colors directly to the WebGL Engine
    scene.background = currentBg;
    if (mainLight.current) mainLight.current.color.copy(currentSun);
  });

  return (
    <group>
      {/* These lights are now dynamically controlled by the refs above */}
      <ambientLight ref={ambientLight} />
      <directionalLight ref={mainLight} position={[10, 10, 5]} castShadow />
      
      {/* A static fill light to ensure shadows are never 100% pitch black */}
      <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#a0c4cd" />
    </group>
  );
}