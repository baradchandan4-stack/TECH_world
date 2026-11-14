import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type { Group, Mesh } from 'three';

type Mood = 'happy' | 'cheer' | 'think' | 'oops';

function BotBody({ mood }: { mood: Mood }) {
  const body = useRef<Group>(null);
  const eyeL = useRef<Mesh>(null);
  const eyeR = useRef<Mesh>(null);
  const armL = useRef<Group>(null);
  const armR = useRef<Group>(null);
  const [blink, setBlink] = useState(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (body.current) {
      body.current.rotation.y = Math.sin(t * 0.6) * 0.28;
      body.current.position.y = Math.sin(t * 1.4) * 0.05;
    }
    const b = Math.sin(t * 1.6) > 0.985 ? 0.15 : 1;
    if (b !== blink) setBlink(b);
    if (eyeL.current) eyeL.current.scale.y = b;
    if (eyeR.current) eyeR.current.scale.y = b;
    const armWave = mood === 'cheer' ? Math.sin(t * 6) * 0.9 : Math.sin(t * 1.2) * 0.12;
    if (armR.current) armR.current.rotation.z = -0.5 - armWave;
    if (armL.current) armL.current.rotation.z = 0.5 + (mood === 'cheer' ? Math.sin(t * 6 + 1) * 0.9 : 0.1);
  });

  const eyeColor = mood === 'oops' ? '#fbbf24' : '#25e0f0';

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={body} position={[0, -0.3, 0]}>
        {/* head */}
        <mesh castShadow position={[0, 1.25, 0]}>
          <boxGeometry args={[1.7, 1.35, 1.25]} />
          <meshStandardMaterial color="#eef4ff" metalness={0.45} roughness={0.28} />
        </mesh>
        {/* face screen */}
        <mesh position={[0, 1.28, 0.66]}>
          <boxGeometry args={[1.35, 0.9, 0.08]} />
          <meshStandardMaterial color="#0b1235" metalness={0.6} roughness={0.2} emissive="#0d1c4a" emissiveIntensity={0.6} />
        </mesh>
        {/* eyes */}
        <mesh ref={eyeL} position={[-0.32, 1.35, 0.72]}>
          <sphereGeometry args={[0.15, 18, 14]} />
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={2.6} toneMapped={false} />
        </mesh>
        <mesh ref={eyeR} position={[0.32, 1.35, 0.72]}>
          <sphereGeometry args={[0.15, 18, 14]} />
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={2.6} toneMapped={false} />
        </mesh>
        {/* mouth */}
        <mesh position={[0, 1.0, 0.72]}>
          <boxGeometry args={[mood === 'happy' ? 0.5 : 0.34, 0.05, 0.04]} />
          <meshStandardMaterial color="#25e0f0" emissive="#25e0f0" emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
        {/* antenna */}
        <mesh position={[0, 2.1, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.4, 8]} />
          <meshStandardMaterial color="#9fb0d0" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 2.38, 0]}>
          <sphereGeometry args={[0.13, 16, 12]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2.4} toneMapped={false} />
        </mesh>
        {/* ears */}
        {[-0.95, 0.95].map((x) => (
          <mesh key={x} position={[x, 1.25, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.18, 16]} />
            <meshStandardMaterial color="#2f6bff" metalness={0.7} roughness={0.3} emissive="#2f6bff" emissiveIntensity={0.5} />
          </mesh>
        ))}
        {/* body */}
        <mesh castShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[1.3, 1.15, 1]} />
          <meshStandardMaterial color="#2f6bff" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 0.53]}>
          <sphereGeometry args={[0.24, 18, 14]} />
          <meshStandardMaterial color="#25e0f0" emissive="#25e0f0" emissiveIntensity={2} toneMapped={false} />
        </mesh>
        {/* arms */}
        <group ref={armL} position={[-0.78, 0.55, 0]}>
          <mesh position={[0, -0.4, 0]} castShadow>
            <capsuleGeometry args={[0.13, 0.6, 6, 12]} />
            <meshStandardMaterial color="#dbe6ff" metalness={0.5} roughness={0.3} />
          </mesh>
        </group>
        <group ref={armR} position={[0.78, 0.55, 0]}>
          <mesh position={[0, -0.4, 0]} castShadow>
            <capsuleGeometry args={[0.13, 0.6, 6, 12]} />
            <meshStandardMaterial color="#dbe6ff" metalness={0.5} roughness={0.3} />
          </mesh>
        </group>
        {/* hover base */}
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.45, 0.7, 0.3, 20]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.9} metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

export default function TechBot3D({ mood = 'happy', height = 200 }: { mood?: Mood; height?: number }) {
  return (
    <div style={{ height, width: '100%' }} className="techbot-canvas" aria-hidden>
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0.6, 5.2], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 5, 4]} intensity={1.8} />
        <pointLight position={[-3, 1, 3]} intensity={18} color="#8b5cf6" />
        <pointLight position={[3, -1, 3]} intensity={14} color="#25e0f0" />
        <BotBody mood={mood} />
      </Canvas>
    </div>
  );
}
