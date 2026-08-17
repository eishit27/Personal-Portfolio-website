// src/components/canvas/Scene.tsx
"use client";
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Noise } from '@react-three/postprocessing';
import CameraRig from './CameraRig';
import CozyPlanet from './CozyPlanet';
import EnvironmentRig from './EnvironmentRig'; // <-- Import the new dynamic rig

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 bg-black">
      <Canvas 
        gl={{ antialias: true }}
        dpr={[1, 2]} 
      >
        <CameraRig />
        
        {/* The dynamic weather/lighting controller replaces the static lights */}
        <EnvironmentRig />

        {/* The New Tiny Planet */}
        <CozyPlanet />

        <EffectComposer>
          {/* Subtle noise is the secret to the Abeto 'handcrafted' feel */}
          <Noise opacity={0.06} /> 
        </EffectComposer>
      </Canvas>
    </div>
  );
}