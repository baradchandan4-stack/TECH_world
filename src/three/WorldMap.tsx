import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Stars } from '@react-three/drei';
import type { Group } from 'three';
import { WORLDS, pick } from '../content';
import type { Lang } from '../content/types';

interface IslandProps {
  index: number;
  total: number;
  world: (typeof WORLDS)[number];
  lang: Lang;
  unlocked: boolean;
  done: boolean;
  onSelect: (id: string) => void;
}

function Island({ index, total, world, lang, unlocked, done, onSelect }: IslandProps) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 6.4;
  const pos: [number, number, number] = [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
  const ref = useRef<Group>(null);
  const [hover, setHover] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.8 + index) * 0.16;
    const target = hover ? 1.12 : 1;
    ref.current.scale.setScalar(ref.current.scale.x + (target - ref.current.scale.x) * 0.15);
  });

  return (
    <group position={pos}>
      <group
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(world.id);
        }}
      >
        <mesh position={[0, -0.42, 0]} receiveShadow>
          <cylinderGeometry args={[1.5, 1.25, 0.55, 7]} />
          <meshStandardMaterial color={unlocked ? world.color : '#243055'} roughness={0.6} metalness={0.35} />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[1.45, 1.45, 0.14, 7]} />
          <meshStandardMaterial
            color={unlocked ? world.accent : '#33406b'}
            emissive={unlocked ? world.accent : '#1a2244'}
            emissiveIntensity={unlocked ? 0.7 : 0.15}
            roughness={0.4}
          />
        </mesh>
        {unlocked && (
          <mesh position={[0, 2.1, 0]}>
            <cylinderGeometry args={[0.85, 1.05, 4, 14, 1, true]} />
            <meshStandardMaterial color={world.accent} transparent opacity={0.14} side={2} />
          </mesh>
        )}
        <mesh position={[0, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.62, 22, 18]} />
          <meshStandardMaterial
            color={unlocked ? world.accent : '#2a3560'}
            emissive={unlocked ? world.accent : '#101838'}
            emissiveIntensity={unlocked ? 0.85 : 0.2}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        <Html center distanceFactor={11} position={[0, 1.85, 0]} zIndexRange={[20, 0]}>
          <div className={`map-tag ${unlocked ? '' : 'locked'}`} style={{ borderColor: unlocked ? world.accent : '#3a4670' }}>
            <span className="map-emoji">{unlocked ? world.emoji : '🔒'}</span>
            <strong>{pick(world.title, lang)}</strong>
            <small>{done ? '✔ ' + (lang === 'gu' ? 'પૂર્ણ' : lang === 'hi' ? 'पूर्ण' : 'Completed') : unlocked ? pick(world.subtitle, lang) : `${lang === 'gu' ? 'લેવલ' : lang === 'hi' ? 'लेवल' : 'Level'} ${world.unlockLevel}`}</small>
          </div>
        </Html>
      </group>
    </group>
  );
}

function Hub() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <group ref={ref} position={[0, -0.6, 0]}>
      <mesh>
        <cylinderGeometry args={[3.4, 3.4, 0.3, 40]} />
        <meshStandardMaterial color="#101a3c" metalness={0.6} roughness={0.4} emissive="#123a7a" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <torusGeometry args={[2.6, 0.06, 8, 60]} />
        <meshStandardMaterial color="#25e0f0" emissive="#25e0f0" emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  );
}

export default function WorldMapScene({
  lang,
  unlockedIds,
  completedIds,
  onSelect,
}: {
  lang: Lang;
  unlockedIds: string[];
  completedIds: string[];
  onSelect: (id: string) => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 9.5, 13.5], fov: 45 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#050a20']} />
      <fog attach="fog" args={['#050a20', 18, 42]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 12, 8]} intensity={1.5} castShadow />
      <pointLight position={[-8, 6, -6]} intensity={40} color="#8b5cf6" />
      <pointLight position={[8, 5, 6]} intensity={30} color="#25e0f0" />
      <Stars radius={70} depth={40} count={2200} factor={3.4} fade speed={0.6} />
      <Hub />
      {WORLDS.map((w, i) => (
        <Island
          key={w.id}
          index={i}
          total={WORLDS.length}
          world={w}
          lang={lang}
          unlocked={unlockedIds.includes(w.id)}
          done={completedIds.includes(w.id)}
          onSelect={onSelect}
        />
      ))}
      <OrbitControls
        enablePan={false}
        minDistance={9}
        maxDistance={22}
        minPolarAngle={0.35}
        maxPolarAngle={1.32}
        autoRotate
        autoRotateSpeed={0.35}
        target={[0, 0.4, 0]}
      />
    </Canvas>
  );
}
