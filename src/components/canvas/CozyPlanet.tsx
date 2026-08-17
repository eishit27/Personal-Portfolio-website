// src/components/canvas/CozyPlanet.tsx
"use client";
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import { Html, Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function CozyPlanet() {
  const planetRef = useRef<THREE.Group>(null);
  const wedgeRef = useRef<THREE.Group>(null);
  const mainGroupRef = useRef<THREE.Group>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  
  const isDragging = useRef(false);
  const rotationVelocity = useRef(0);
  const lastMouseX = useRef(0);

  const FRONT_FACING_ROTATION = 0.2; 

  useFrame((state) => {
    // 1. POSITIONING
    const moveProgress = Math.min(scrollProgress / 0.3, 1);
    const targetX = THREE.MathUtils.lerp(3.5, 0, moveProgress);
    if (mainGroupRef.current) mainGroupRef.current.position.x = targetX;

    // 2. DRAG PHYSICS
    if (isDragging.current) {
      const delta = state.pointer.x - lastMouseX.current;
      rotationVelocity.current = delta * 5;
      lastMouseX.current = state.pointer.x;
    } else {
      rotationVelocity.current *= 0.95; 
    }

    // 3. ROTATION & FORCED ALIGNMENT
    if (planetRef.current) {
      if (scrollProgress === 0) {
        planetRef.current.rotation.y += 0.005;
        if (isDragging.current) planetRef.current.rotation.y += (rotationVelocity.current * 0.1);
        
      } else if (scrollProgress > 0 && scrollProgress < 0.3) {
        const currentY = planetRef.current.rotation.y;
        const k = Math.round((currentY - FRONT_FACING_ROTATION) / (Math.PI * 2));
        const targetY = FRONT_FACING_ROTATION + k * Math.PI * 2;
        planetRef.current.rotation.y = THREE.MathUtils.lerp(currentY, targetY, 0.1);
        
      } else {
        if (isDragging.current) {
          planetRef.current.rotation.y += (rotationVelocity.current * 0.1);
        } else {
          const currentY = planetRef.current.rotation.y;
          const k = Math.round((currentY - FRONT_FACING_ROTATION) / (Math.PI * 2));
          const targetY = FRONT_FACING_ROTATION + k * Math.PI * 2;
          planetRef.current.rotation.y = THREE.MathUtils.lerp(currentY, targetY, 0.05);
        }
      }
      planetRef.current.rotation.z = 0.1; 
    }

    // 4. WEDGE ANIMATION
    if (wedgeRef.current) {
      let scale = 1;
      if (scrollProgress > 0.3) {
        scale = 1 - ((scrollProgress - 0.3) / 0.7);
        scale = Math.max(0, scale); 
      }
      wedgeRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  const PLANET_RADIUS = 2.5;

  return (
    <>
      <DynamicStars />
      <ShootingStar />

      <group 
        ref={mainGroupRef} 
        position={[3.5, -0.5, 0]} 
        onPointerDown={(e) => { 
          isDragging.current = true; 
          lastMouseX.current = e.pointer.x; 
          e.stopPropagation(); 
        }}
        onPointerUp={() => { isDragging.current = false; }}
        onPointerLeave={() => { isDragging.current = false; }}
      >
        <group ref={planetRef} rotation={[0, FRONT_FACING_ROTATION, 0]}>
          
          {/* --- BASE PLANET --- */}
          <group>
            <PlanetLayer radius={0.5} color="#ffffff" isWedge={false} /> 
            <PlanetLayer radius={1.0} color="#ffba08" isWedge={false} sectionName="Experience" /> 
            <PlanetLayer radius={1.6} color="#dc2f02" isWedge={false} sectionName="Tech Stack" /> 
            <PlanetLayer radius={2.1} color="#e85d04" isWedge={false} sectionName="Projects" /> 
            <PlanetLayer radius={PLANET_RADIUS} color="#8db580" isWedge={false} sectionName="Contact" /> 
          </group>

          {/* --- VANISHING WEDGE --- */}
          <group ref={wedgeRef}>
            <PlanetLayer radius={0.5} color="#ffffff" isWedge={true} /> 
            <PlanetLayer radius={1.0} color="#ffba08" isWedge={true} /> 
            <PlanetLayer radius={1.6} color="#dc2f02" isWedge={true} /> 
            <PlanetLayer radius={2.1} color="#e85d04" isWedge={true} /> 
            <PlanetLayer radius={PLANET_RADIUS} color="#8db580" isWedge={true} /> 
            
            <Mountain pivotRotation={[1.5, 0.3, 0.8]} radius={PLANET_RADIUS} scale={1.1} />
            <Mountain pivotRotation={[1.2, 0.5, 0.6]} radius={PLANET_RADIUS} scale={0.8} />
            <BirdFlock pivotRotation={[1.5, 0.3, 0.8]} radius={PLANET_RADIUS} hoverHeight={2.0} />
            
            <Tree pivotRotation={[0.1, 1.4, 0.3]} radius={PLANET_RADIUS} />
            <Tree pivotRotation={[1.8, -0.5, 0.2]} radius={PLANET_RADIUS} />
            <Tree pivotRotation={[1.6, 0.1, 0.4]} radius={PLANET_RADIUS} />
            <Tree pivotRotation={[0.3, 1.2, 0.5]} radius={PLANET_RADIUS} />
            <Tree pivotRotation={[1.4, -0.2, 0.7]} radius={PLANET_RADIUS} />
            
            {/* Wedge Clouds (Vanish when opened) */}
            <StylizedCloud pivotRotation={[0.2, 0.5, 0.1]} radius={PLANET_RADIUS} hoverHeight={0.6} />
            <StylizedCloud pivotRotation={[0.7, 0.2, 0.4]} radius={PLANET_RADIUS} hoverHeight={0.6} />
            <StylizedCloud pivotRotation={[-0.3, 0.8, -0.2]} radius={PLANET_RADIUS} hoverHeight={0.6} />
            <StylizedCloud pivotRotation={[1.1, 0.6, -0.3]} radius={PLANET_RADIUS} hoverHeight={0.6} />
            <StylizedCloud pivotRotation={[0.4, 1.2, 0.5]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          </group>

          {/* --- PERMANENT BIOMES --- */}
          <LakeOasis pivotRotation={[-0.4, 0.6, 0.2]} radius={PLANET_RADIUS} />
          <Mountain pivotRotation={[-0.8, -1.2, -0.3]} radius={PLANET_RADIUS} scale={0.9} />
          <Mountain pivotRotation={[-1.0, -0.9, -0.1]} radius={PLANET_RADIUS} scale={1.2} />
          <Mountain pivotRotation={[0.5, 2.2, -0.4]} radius={PLANET_RADIUS} scale={0.7} />
          
          <Tree pivotRotation={[-0.5, -0.2, -1.0]} radius={PLANET_RADIUS} />
          <Tree pivotRotation={[2.2, 1.0, -0.4]} radius={PLANET_RADIUS} />
          <Tree pivotRotation={[-1.2, -1.5, -0.5]} radius={PLANET_RADIUS} />
          <Tree pivotRotation={[1.0, -1.2, 0.8]} radius={PLANET_RADIUS} />
          <Tree pivotRotation={[0.5, 2.0, -0.2]} radius={PLANET_RADIUS} />
          <Tree pivotRotation={[-0.8, -0.8, 0.6]} radius={PLANET_RADIUS} />
          <Tree pivotRotation={[-0.2, -1.8, 0.3]} radius={PLANET_RADIUS} />
          <Tree pivotRotation={[2.0, 0.5, -0.8]} radius={PLANET_RADIUS} />
          <Tree pivotRotation={[-1.5, 0.8, -0.4]} radius={PLANET_RADIUS} />
          <Tree pivotRotation={[0.8, 1.6, 0.2]} radius={PLANET_RADIUS} />
          <Tree pivotRotation={[-0.6, 1.3, -0.7]} radius={PLANET_RADIUS} />
          
          {/* Subtle details: Just two elegant butterflies */}
          <Butterfly pivotRotation={[2.5, 1.5, -0.2]} radius={PLANET_RADIUS} hoverHeight={0.3} speed={1.0} color="#ffea00" />
          <Butterfly pivotRotation={[-1.2, -1.0, 0.5]} radius={PLANET_RADIUS} hoverHeight={0.6} speed={1.8} color="#bc13fe" />

          {/* Permanent Uniform Cloud Layer */}
          <StylizedCloud pivotRotation={[-1.2, 0.1, 0.2]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          <StylizedCloud pivotRotation={[1.6, -0.4, 0.1]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          <StylizedCloud pivotRotation={[0.1, -1.5, 0.5]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          <StylizedCloud pivotRotation={[0.6, -2.4, -0.4]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          <StylizedCloud pivotRotation={[-0.7, 2.5, 0.3]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          <StylizedCloud pivotRotation={[0.9, 3.14, -0.1]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          <StylizedCloud pivotRotation={[-0.4, -0.9, 0.7]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          <StylizedCloud pivotRotation={[1.3, -1.1, -0.5]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          <StylizedCloud pivotRotation={[-1.1, 1.7, -0.3]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          <StylizedCloud pivotRotation={[0.3, 2.1, 0.6]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          <StylizedCloud pivotRotation={[-1.5, -2.0, 0.0]} radius={PLANET_RADIUS} hoverHeight={0.6} />
          <StylizedCloud pivotRotation={[1.5, 1.5, -0.8]} radius={PLANET_RADIUS} hoverHeight={0.6} />
        </group>

        {/* --- GLOBAL ORBITERS --- */}
        <Satellite radius={PLANET_RADIUS} speed={0.4} offset={0} yOffset={0.5} zScale={2.2} />
        <Satellite radius={PLANET_RADIUS} speed={0.4} offset={Math.PI} yOffset={0.5} zScale={2.2} />
      </group>
    </>
  );
}

// ---------------------------------------------------------
// BACKGROUND EFFECTS
// ---------------------------------------------------------

function DynamicStars() {
  const starsRef = useRef<THREE.Points>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  useFrame(() => {
    if (starsRef.current && starsRef.current.material) {
      const mat = starsRef.current.material as THREE.Material;
      mat.transparent = true;
      mat.opacity = Math.max(0, Math.min(1, (scrollProgress - 0.2) * 2));
    }
  });

  return <Stars ref={starsRef} radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />;
}

function ShootingStar() {
  const starRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  useFrame((state) => {
    if (starRef.current && scrollProgress > 0.2) {
      const t = (state.clock.elapsedTime * 1.5) % 10; 
      if (t < 1) {
        starRef.current.position.set(10 - t * 30, 8 - t * 15, -15);
        starRef.current.visible = true;
      } else {
        starRef.current.visible = false;
      }
    } else if (starRef.current) {
      starRef.current.visible = false;
    }
  });

  return (
    <mesh ref={starRef}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
}

// ---------------------------------------------------------
// LAYER COMPONENT
// ---------------------------------------------------------

interface PlanetLayerProps {
  radius: number;
  color: string;
  isWedge: boolean;
  sectionName?: string;
}

function PlanetLayer({ radius, color, isWedge, sectionName }: PlanetLayerProps) {
  const [hovered, setHovered] = useState(false);
  const layerRef = useRef<THREE.Group>(null);
  
  const setActiveSection = useStore((state) => state.setActiveSection);
  const isInteractable = useStore((state) => state.scrollProgress > 0.3);

  useFrame(() => {
    if (layerRef.current && !isWedge) {
      const targetScale = (hovered && isInteractable) ? 1.05 : 1;
      layerRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    }
  });

  return (
    <group ref={layerRef}>
      <mesh
        onClick={(e) => { 
          if (!isInteractable) return; 
          if (!isWedge && sectionName) { e.stopPropagation(); setActiveSection(sectionName); } 
        }}
        onPointerOver={(e) => { 
          if (!isInteractable) return; 
          if (!isWedge && sectionName) { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; } 
        }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[radius, 16, 12, isWedge ? 0 : Math.PI * 0.5, isWedge ? Math.PI * 0.5 : Math.PI * 1.5]} />
        <meshStandardMaterial 
          color={color} flatShading={true} side={THREE.DoubleSide} 
          emissive={hovered && isInteractable ? color : "#000000"} 
          emissiveIntensity={hovered && isInteractable ? 0.3 : 0} 
        />
      </mesh>
      
      {hovered && isInteractable && !isWedge && sectionName && (
        <Html position={[radius * 0.7, radius * 0.7, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <div className="bg-[#0f1412]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200">
            <span className="text-white font-bold text-sm tracking-wide whitespace-nowrap">{sectionName}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

// ---------------------------------------------------------
// PREFABS
// ---------------------------------------------------------

function Butterfly({ pivotRotation, radius, hoverHeight, speed, color }: { pivotRotation: [number, number, number], radius: number, hoverHeight: number, speed: number, color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const offset = pivotRotation[0] + pivotRotation[1]; 

  useFrame((state) => {
    const time = state.clock.elapsedTime * speed + offset;
    if (groupRef.current) {
      groupRef.current.position.y = radius + hoverHeight + Math.sin(time * 1.5) * 0.15;
      groupRef.current.position.x = Math.cos(time * 0.8) * 0.2;
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.5;
    }
    if (leftWingRef.current && rightWingRef.current) {
      const flap = Math.sin(time * 30) * 0.8 + 0.2; 
      leftWingRef.current.rotation.z = -flap;
      rightWingRef.current.rotation.z = flap;
    }
  });

  return (
    <group rotation={pivotRotation}>
      <group ref={groupRef} position={[0, radius + hoverHeight, 0]} scale={[1.2, 1.2, 1.2]}>
        <mesh><capsuleGeometry args={[0.008, 0.04, 4, 8]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
        <group ref={leftWingRef} position={[-0.005, 0, 0]}>
           <mesh position={[-0.04, 0, 0]}><planeGeometry args={[0.08, 0.06]} /><meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.9} flatShading /></mesh>
        </group>
        <group ref={rightWingRef} position={[0.005, 0, 0]}>
           <mesh position={[0.04, 0, 0]}><planeGeometry args={[0.08, 0.06]} /><meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.9} flatShading /></mesh>
        </group>
      </group>
    </group>
  );
}

function BirdFlock({ pivotRotation, radius, hoverHeight }: { pivotRotation: [number, number, number], radius: number, hoverHeight: number }) {
  const flockRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (flockRef.current) {
      flockRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      flockRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });
  return (
    <group rotation={pivotRotation}>
      <group position={[0, radius + hoverHeight, 0]} ref={flockRef}>
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, 0.2]}><coneGeometry args={[0.03, 0.1, 3]} /><meshStandardMaterial color="#2c363f" flatShading={true} /></mesh>
        <mesh position={[-0.3, 0.1, 0.2]} rotation={[0, 0, -0.1]}><coneGeometry args={[0.02, 0.08, 3]} /><meshStandardMaterial color="#2c363f" flatShading={true} /></mesh>
        <mesh position={[0.1, -0.1, -0.3]} rotation={[0.1, 0, 0.1]}><coneGeometry args={[0.025, 0.09, 3]} /><meshStandardMaterial color="#2c363f" flatShading={true} /></mesh>
      </group>
    </group>
  );
}

function Tree({ pivotRotation, radius }: { pivotRotation: [number, number, number], radius: number }) {
  const leavesRef = useRef<THREE.Mesh>(null);
  const offset = pivotRotation[0] + pivotRotation[1];
  useFrame((state) => {
    if (leavesRef.current) {
      leavesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5 + offset) * 0.05;
      leavesRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 1.2 + offset) * 0.05;
    }
  });
  return (
    <group rotation={pivotRotation}>
      <group position={[0, radius - 0.1, 0]}>
        <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.08, 0.12, 0.6, 5]} /><meshStandardMaterial color="#7a5c43" flatShading={true} /></mesh>
        <mesh ref={leavesRef} position={[0, 0.8, 0]}><icosahedronGeometry args={[0.4, 0]} /><meshStandardMaterial color="#558257" flatShading={true} /></mesh>
      </group>
    </group>
  );
}

// Redesigned StylizedCloud for a uniform, flat atmospheric layer
function StylizedCloud({ pivotRotation, radius, hoverHeight }: { pivotRotation: [number, number, number], radius: number, hoverHeight: number }) {
  const cloudRef = useRef<THREE.Group>(null);
  const offset = pivotRotation[0] * 5 + pivotRotation[1] * 3;
  
  useFrame((state) => {
    if (cloudRef.current) {
      // Much more subtle bobbing to keep the "even layer" feel
      cloudRef.current.position.y = radius + hoverHeight + Math.sin(state.clock.elapsedTime * 0.5 + offset) * 0.03;
      // Very slow drift to simulate weather
      cloudRef.current.rotation.y = (state.clock.elapsedTime * 0.05) + offset;
    }
  });
  
  return (
    <group rotation={pivotRotation}>
      <group ref={cloudRef} position={[0, radius + hoverHeight, 0]}>
        {/* Adjusted scale to make the clouds flatter and wider, mimicking a real atmosphere */}
        <mesh position={[0, 0, 0]} scale={[1.2, 0.5, 1]}>
          <icosahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#ffffff" flatShading={true} transparent opacity={0.95} />
        </mesh>
        <mesh position={[-0.3, -0.05, 0.1]} scale={[0.8, 0.4, 0.8]}>
          <icosahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#ffffff" flatShading={true} transparent opacity={0.95} />
        </mesh>
        <mesh position={[0.3, -0.05, -0.1]} scale={[0.8, 0.4, 0.8]}>
          <icosahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#ffffff" flatShading={true} transparent opacity={0.95} />
        </mesh>
        <mesh position={[0, 0.1, 0.15]} scale={[0.6, 0.4, 0.6]}>
          <icosahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#ffffff" flatShading={true} transparent opacity={0.95} />
        </mesh>
      </group>
    </group>
  );
}

function Satellite({ radius, speed = 0.4, offset = 0, yOffset = 1, zScale = 2 }: { radius: number, speed?: number, offset?: number, yOffset?: number, zScale?: number }) {
  const satRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (satRef.current) {
      const time = state.clock.elapsedTime;
      satRef.current.position.x = Math.sin(time * speed + offset) * (radius + zScale);
      satRef.current.position.z = Math.cos(time * speed + offset) * (radius + zScale);
      satRef.current.position.y = Math.sin(time * speed * 2 + offset) * 0.5 + yOffset;
      const target = new THREE.Vector3(state.pointer.x * 10, state.pointer.y * 10, 5);
      satRef.current.lookAt(target);
    }
  });
  return (
    <group ref={satRef}>
      <mesh><boxGeometry args={[0.3, 0.3, 0.3]} /><meshStandardMaterial color="#e07a5f" flatShading={true} /></mesh>
      <mesh position={[0, 0, 0.16]}><planeGeometry args={[0.15, 0.15]} /><meshBasicMaterial color="#ffffff" /></mesh>
      <mesh position={[-0.4, 0, 0]}><boxGeometry args={[0.5, 0.05, 0.2]} /><meshStandardMaterial color="#2c363f" flatShading={true} /></mesh>
      <mesh position={[0.4, 0, 0]}><boxGeometry args={[0.5, 0.05, 0.2]} /><meshStandardMaterial color="#2c363f" flatShading={true} /></mesh>
    </group>
  );
}

function LakeOasis({ pivotRotation, radius }: { pivotRotation: [number, number, number], radius: number }) {
  return (
    <group rotation={pivotRotation}>
      <group position={[0, radius - 0.05, 0]}>
        <mesh position={[0, -0.02, 0]}><cylinderGeometry args={[0.8, 0.8, 0.05, 12]} /><meshStandardMaterial color="#4da8da" flatShading={true} transparent opacity={0.8} /></mesh>
        <LocalRock position={[0.7, 0.08, 0]} scale={1} />
        <LocalRock position={[-0.6, 0.08, 0.4]} scale={0.7} />
        <LocalRock position={[0.4, 0.08, 0.7]} scale={1.2} />
        <LocalRock position={[-0.4, 0.08, -0.6]} scale={0.8} />
        <LocalRock position={[0.1, 0.08, -0.75]} scale={1.3} />
        <LocalRock position={[0.65, 0.08, -0.4]} scale={0.6} />
      </group>
    </group>
  );
}

function LocalRock({ position, scale }: { position: [number, number, number], scale: number }) {
  return (<mesh position={position} scale={[scale, scale, scale]}><icosahedronGeometry args={[0.15, 0]} /><meshStandardMaterial color="#6e7876" flatShading={true} /></mesh>);
}

function Mountain({ pivotRotation, radius, scale }: { pivotRotation: [number, number, number], radius: number, scale: number }) {
  return (
    <group rotation={pivotRotation}>
      <group position={[0, radius - 0.2, 0]} scale={[scale, scale, scale]}>
        <mesh position={[0, 0.5, 0]}><coneGeometry args={[0.5, 1.2, 5]} /><meshStandardMaterial color="#8c9c9b" flatShading={true} /></mesh>
        <mesh position={[0, 1.0, 0]}><coneGeometry args={[0.2, 0.4, 5]} /><meshStandardMaterial color="#ffffff" flatShading={true} /></mesh>
      </group>
    </group>
  );
}