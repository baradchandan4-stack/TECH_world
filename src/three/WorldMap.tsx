import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Grid, Lightformer, OrbitControls, Sparkles, Stars } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { CanvasTexture, DoubleSide, Quaternion, SRGBColorSpace, Vector3 } from 'three';
import type { Group, MeshStandardMaterial } from 'three';
import { WORLDS, pick } from '../content';
import type { Lang } from '../content/types';

/**
 * World name plate drawn into a canvas texture and shown as a sprite.
 * Labels stay inside the WebGL scene (no DOM portals), so they cannot collide
 * with React's commit when a screen with a canvas unmounts.
 */
function makeLabelTexture(text: string, color: string, locked: boolean) {
  const fontSize = 46;
  const pad = 30;
  const font = `700 ${fontSize}px system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans Gujarati", "Noto Sans Devanagari", sans-serif`;
  const measure = document.createElement('canvas').getContext('2d');
  if (!measure) return null;
  measure.font = font;
  const width = Math.ceil(measure.measureText(text).width) + pad * 2;
  const height = fontSize + pad * 2;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const r = 20;
  ctx.beginPath();
  ctx.moveTo(r, 2);
  ctx.lineTo(width - r, 2);
  ctx.quadraticCurveTo(width - 2, 2, width - 2, r);
  ctx.lineTo(width - 2, height - r);
  ctx.quadraticCurveTo(width - 2, height - 2, width - r, height - 2);
  ctx.lineTo(r, height - 2);
  ctx.quadraticCurveTo(2, height - 2, 2, height - r);
  ctx.lineTo(2, r);
  ctx.quadraticCurveTo(2, 2, r, 2);
  ctx.closePath();
  ctx.fillStyle = locked ? 'rgba(14,20,46,0.9)' : 'rgba(6,14,40,0.92)';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = locked ? '#3a4670' : color;
  ctx.stroke();
  ctx.fillStyle = locked ? '#93a0cc' : '#ffffff';
  ctx.fillText(text, width / 2, height / 2 + 2);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return { texture, aspect: width / height };
}

function WorldLabel({
  text,
  color,
  locked,
  position,
}: {
  text: string;
  color: string;
  locked: boolean;
  position: [number, number, number];
}) {
  const label = useMemo(() => makeLabelTexture(text, color, locked), [text, color, locked]);
  useEffect(() => () => label?.texture.dispose(), [label]);
  if (!label) return null;
  const height = 0.66;
  return (
    <sprite position={position} scale={[height * label.aspect, height, 1]} renderOrder={3}>
      <spriteMaterial map={label.texture} transparent depthWrite={false} toneMapped={false} />
    </sprite>
  );
}

/** Spinning holographic ring that hovers over each island. */
function TorusSpin({ color, unlocked }: { color: string; unlocked: boolean }) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * (unlocked ? 0.55 : 0.15);
  });
  return (
    <group ref={ref} position={[0, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[1.16, 0.02, 6, 48]} />
        <meshBasicMaterial
          color={unlocked ? color : '#2a3560'}
          transparent
          opacity={unlocked ? 0.95 : 0.3}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** Energy conduit from the central hub out to an unlocked world. */
function Beam({ to, color }: { to: [number, number, number]; color: string }) {
  const mat = useRef<MeshStandardMaterial>(null);
  const { position, quaternion, length } = useMemo(() => {
    const start = new Vector3(0, 0.35, 0);
    const end = new Vector3(to[0], to[1] + 0.25, to[2]);
    const dir = end.clone().sub(start);
    const len = dir.length();
    const mid = start.clone().add(dir.clone().multiplyScalar(0.5));
    const q = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), dir.clone().normalize());
    return { position: mid, quaternion: q, length: len };
  }, [to]);

  useFrame(({ clock }) => {
    if (mat.current) mat.current.opacity = 0.16 + Math.sin(clock.elapsedTime * 1.8 + to[0]) * 0.08;
  });

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.014, 0.014, length, 5, 1, true]} />
      <meshStandardMaterial
        ref={mat}
        color={color}
        emissive={color}
        emissiveIntensity={2.4}
        transparent
        opacity={0.2}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/** Three glowing motes orbiting the hub core. */
function OrbitDots() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.6;
  });
  return (
    <group ref={ref} position={[0, 1.4, 0]}>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.6, Math.sin(a * 2) * 0.18, Math.sin(a) * 1.6]}>
            <sphereGeometry args={[0.07, 12, 10]} />
            <meshBasicMaterial color="#38f2ff" toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

interface IslandProps {  index: number;
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
            <meshBasicMaterial
              color={world.accent}
              transparent
              opacity={0.1}
              side={DoubleSide}
              toneMapped={false}
              depthWrite={false}
            />
          </mesh>
        )}
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.44, 1.66, 7]} />
          <meshBasicMaterial
            color={unlocked ? world.accent : '#2a3560'}
            transparent
            opacity={unlocked ? 0.8 : 0.22}
            toneMapped={false}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <TorusSpin color={world.accent} unlocked={unlocked} />
        <mesh position={[0, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.62, 22, 18]} />
          <meshStandardMaterial
            color={unlocked ? world.accent : '#2a3560'}
            emissive={unlocked ? world.accent : '#101838'}
            emissiveIntensity={unlocked ? (hover ? 1.5 : 0.9) : 0.2}
            metalness={0.55}
            roughness={0.22}
          />
        </mesh>
        <WorldLabel
          text={`${unlocked ? world.emoji : '\u{1F512}'} ${pick(world.title, lang)}${done ? ' \u2714' : ''}`}
          color={world.accent}
          locked={!unlocked}
          position={[0, 2.45, 0]}
        />
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
        <meshStandardMaterial color="#9d6bff" emissive="#7b3dff" emissiveIntensity={1.15} metalness={0.9} roughness={0.16} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[1.3, 24, 18]} />
        <meshBasicMaterial color="#38f2ff" transparent opacity={0.09} toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.05, 3.32, 64]} />
        <meshBasicMaterial color="#38f2ff" transparent opacity={0.4} toneMapped={false} side={DoubleSide} depthWrite={false} />
      </mesh>
      <OrbitDots />
    </group>
  );
}

export default function WorldMapScene({
  lang,
  unlockedIds,
  completedIds,
  onSelect,
  quality = 'high',
}: {
  lang: Lang;
  unlockedIds: string[];
  completedIds: string[];
  onSelect: (id: string) => void;
  quality?: string;
}) {
  const rich = quality !== 'low';
  return (
    <Canvas
      shadows
      dpr={rich ? [1, 2] : [1, 1.4]}
      camera={{ position: [0, 9.5, 13.5], fov: 45 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#050a20']} />
      <fog attach="fog" args={['#050a20', 20, 46]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 12, 8]} intensity={1.6} castShadow />
      <pointLight position={[-8, 6, -6]} intensity={60} color="#9d6bff" distance={30} />
      <pointLight position={[8, 5, 6]} intensity={45} color="#38f2ff" distance={30} />
      <spotLight position={[0, 17, 0]} angle={0.75} penumbra={1} intensity={110} color="#5b8cff" distance={42} />
      <Environment resolution={rich ? 128 : 32} frames={1}>
        <Lightformer intensity={2.4} position={[0, 7, -8]} scale={[12, 6, 1]} color="#3b7bff" />
        <Lightformer intensity={1.7} position={[-8, 3, 6]} scale={[9, 5, 1]} color="#38f2ff" />
        <Lightformer intensity={1.5} position={[8, 2, 6]} scale={[9, 5, 1]} color="#9d6bff" />
      </Environment>
      <Stars radius={70} depth={40} count={rich ? 2600 : 1200} factor={3.4} fade speed={0.6} />
      {rich && (
        <Sparkles count={90} scale={[28, 10, 28]} size={2.6} speed={0.35} opacity={0.65} color="#a8ecff" />
      )}
      <Grid
        position={[0, -2.3, 0]}
        args={[70, 70]}
        cellSize={0.9}
        cellThickness={0.6}
        cellColor="#16336e"
        sectionSize={4.5}
        sectionThickness={1.1}
        sectionColor="#2b7fbf"
        fadeDistance={40}
        fadeStrength={1.4}
        infiniteGrid
      />
      <Hub />
      {WORLDS.map((w, i) => {
        if (!unlockedIds.includes(w.id)) return null;
        const a = (i / WORLDS.length) * Math.PI * 2 - Math.PI / 2;
        return <Beam key={`beam-${w.id}`} color={w.accent} to={[Math.cos(a) * 6.4, 0.1, Math.sin(a) * 6.4]} />;
      })}
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
      {rich && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={1.1} luminanceThreshold={0.2} luminanceSmoothing={0.55} mipmapBlur radius={0.72} />
          <Vignette offset={0.26} darkness={0.72} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
