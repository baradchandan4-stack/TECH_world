import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { ModelKind } from '../content/types';

export const PAL = {
  navy: '#0b1235',
  blue: '#2f6bff',
  cyan: '#25e0f0',
  purple: '#8b5cf6',
  white: '#e9eefc',
  gold: '#fbbf24',
  green: '#3ddc97',
  red: '#f87171',
  dark: '#161d3f',
  metal: '#9fb0d0',
  board: '#1f7a54',
};

const std = (color: string, extra: Record<string, unknown> = {}) => (
  <meshStandardMaterial color={color} metalness={0.35} roughness={0.45} {...extra} />
);

function Board({ w = 2.6, h = 0.12, d = 2.2, color = PAL.board }: { w?: number; h?: number; d?: number; color?: string }) {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
      {std(color, { metalness: 0.2, roughness: 0.7 })}
    </mesh>
  );
}

function Chip({ x = 0, y = 0.2, z = 0, s = 0.6, color = PAL.dark }: { x?: number; y?: number; z?: number; s?: number; color?: string }) {
  return (
    <mesh position={[x, y, z]} castShadow>
      <boxGeometry args={[s, s * 0.28, s]} />
      {std(color)}
    </mesh>
  );
}

function Legs({ count = 6, spread = 1, y = 0.1 }: { count?: number; spread?: number; y?: number }) {
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[-spread / 2 + (spread / (count - 1)) * i, y, 0]}>
          <boxGeometry args={[0.05, 0.3, 0.05]} />
          {std(PAL.gold, { metalness: 0.9, roughness: 0.3 })}
        </mesh>
      ))}
    </group>
  );
}

function Glow({ color = PAL.cyan, r = 0.2, pos = [0, 0.3, 0] as [number, number, number] }) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[r, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.4} toneMapped={false} />
    </mesh>
  );
}

function shape(kind: ModelKind): ReactNode {
  switch (kind) {
    case 'cpu':
      return (
        <group>
          <Board w={1.9} h={0.18} d={1.9} color="#1c3f2e" />
          <Chip y={0.22} s={1.1} color="#2b3358" />
          <Glow pos={[0, 0.34, 0]} r={0.26} />
          <Legs count={8} spread={1.5} y={0.05} />
        </group>
      );
    case 'ram':
      return (
        <group rotation={[0, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[3, 0.5, 0.16]} />
            {std(PAL.blue)}
          </mesh>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[-1.1 + i * 0.44, 0.42, 0]}>
              <boxGeometry args={[0.3, 0.34, 0.1]} />
              {std(PAL.dark)}
            </mesh>
          ))}
          <mesh position={[0, -0.32, 0]}>
            <boxGeometry args={[2.9, 0.16, 0.2]} />
            {std(PAL.gold, { metalness: 0.95, roughness: 0.25 })}
          </mesh>
        </group>
      );
    case 'rom':
      return (
        <group>
          <Chip y={0.3} s={1.2} color="#111827" />
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.6, 0.02, 0.2]} />
            {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 1.4 })}
          </mesh>
          <Legs count={6} spread={1.1} />
        </group>
      );
    case 'motherboard':
      return (
        <group>
          <Board w={3.2} h={0.14} d={2.6} />
          <Chip x={-0.7} y={0.24} s={0.9} color="#2b3358" />
          <mesh position={[0.7, 0.2, 0.5]} castShadow>
            <boxGeometry args={[1.6, 0.12, 0.3]} />
            {std(PAL.blue)}
          </mesh>
          <mesh position={[0.7, 0.2, 0.05]} castShadow>
            <boxGeometry args={[1.6, 0.12, 0.3]} />
            {std(PAL.blue)}
          </mesh>
          <Chip x={1.1} y={0.22} z={-0.7} s={0.5} color={PAL.metal} />
          <Glow pos={[-0.7, 0.4, 0]} r={0.14} />
        </group>
      );
    case 'hdd':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[2.2, 0.5, 1.5]} />
            {std(PAL.metal, { metalness: 0.85, roughness: 0.3 })}
          </mesh>
          <mesh position={[0, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.04, 32]} />
            {std(PAL.white, { metalness: 0.9, roughness: 0.15 })}
          </mesh>
          <mesh position={[0.75, 0.28, 0.4]}>
            <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
            {std(PAL.gold)}
          </mesh>
        </group>
      );
    case 'ssd':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[2.4, 0.22, 1.6]} />
            {std('#2a3559')}
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <boxGeometry args={[2.0, 0.06, 0.4]} />
            {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 0.9 })}
          </mesh>
          <Chip x={-0.6} y={0.2} s={0.4} />
          <Chip x={0.2} y={0.2} s={0.4} />
        </group>
      );
    case 'gpu':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[3.2, 0.7, 1.2]} />
            {std('#232c50')}
          </mesh>
          {[-0.8, 0.8].map((x) => (
            <mesh key={x} position={[x, 0, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.45, 0.45, 0.1, 24]} />
              {std(PAL.dark, { metalness: 0.7 })}
            </mesh>
          ))}
          <mesh position={[0, 0.42, 0]}>
            <boxGeometry args={[2.4, 0.1, 0.7]} />
            {std(PAL.purple, { emissive: PAL.purple, emissiveIntensity: 1.1 })}
          </mesh>
          <mesh position={[0, -0.42, -0.3]}>
            <boxGeometry args={[2.6, 0.16, 0.3]} />
            {std(PAL.gold, { metalness: 0.95, roughness: 0.25 })}
          </mesh>
        </group>
      );
    case 'psu':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[2.2, 1.2, 1.6]} />
            {std('#1b2340')}
          </mesh>
          <mesh position={[0, 0, 0.82]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.06, 24]} />
            {std(PAL.dark, { metalness: 0.6 })}
          </mesh>
          <mesh position={[0.8, -0.35, 0.5]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            {std(PAL.gold)}
          </mesh>
          <Glow pos={[0.6, 0.4, 0.82]} r={0.08} color={PAL.green} />
        </group>
      );
    case 'fan':
      return (
        <group>
          <mesh>
            <torusGeometry args={[0.9, 0.14, 12, 28]} />
            {std(PAL.dark)}
          </mesh>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} rotation={[0, 0, (i / 6) * Math.PI * 2]}>
              <boxGeometry args={[1.5, 0.16, 0.06]} />
              {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 0.7 })}
            </mesh>
          ))}
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            {std(PAL.metal)}
          </mesh>
        </group>
      );
    case 'heatsink':
      return (
        <group>
          <Board w={1.8} h={0.2} d={1.8} color={PAL.metal} />
          {Array.from({ length: 7 }).map((_, i) => (
            <mesh key={i} position={[-0.7 + i * 0.23, 0.55, 0]} castShadow>
              <boxGeometry args={[0.08, 0.9, 1.6]} />
              {std(PAL.metal, { metalness: 0.9, roughness: 0.25 })}
            </mesh>
          ))}
        </group>
      );
    case 'case':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[1.9, 2.8, 1.9]} />
            {std('#1a2244')}
          </mesh>
          <mesh position={[0, 0.3, 0.96]}>
            <boxGeometry args={[1.4, 1.4, 0.06]} />
            {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 0.55, transparent: true, opacity: 0.75 })}
          </mesh>
          <mesh position={[0, 1.1, 0.97]}>
            <boxGeometry args={[1.2, 0.1, 0.05]} />
            {std(PAL.purple, { emissive: PAL.purple, emissiveIntensity: 1.6 })}
          </mesh>
          <mesh position={[0.6, -1.0, 0.97]}>
            <boxGeometry args={[0.24, 0.06, 0.04]} />
            {std(PAL.green, { emissive: PAL.green, emissiveIntensity: 1.6 })}
          </mesh>
        </group>
      );
    case 'keyboard':
      return (
        <group rotation={[-0.35, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[3, 0.16, 1.1]} />
            {std('#1e2749')}
          </mesh>
          {Array.from({ length: 24 }).map((_, i) => (
            <mesh key={i} position={[-1.3 + (i % 8) * 0.37, 0.12, -0.3 + Math.floor(i / 8) * 0.3]}>
              <boxGeometry args={[0.28, 0.08, 0.24]} />
              {std(PAL.white, { emissive: PAL.cyan, emissiveIntensity: 0.35 })}
            </mesh>
          ))}
        </group>
      );
    case 'mouse':
      return (
        <group>
          <mesh castShadow scale={[1, 0.62, 1.5]}>
            <sphereGeometry args={[0.7, 24, 18]} />
            {std('#243059')}
          </mesh>
          <mesh position={[0, 0.34, -0.2]}>
            <boxGeometry args={[0.14, 0.06, 0.4]} />
            {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 1.4 })}
          </mesh>
        </group>
      );
    case 'monitor':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[3, 1.8, 0.14]} />
            {std('#161d3f')}
          </mesh>
          <mesh position={[0, 0, 0.09]}>
            <boxGeometry args={[2.8, 1.6, 0.04]} />
            {std(PAL.blue, { emissive: PAL.blue, emissiveIntensity: 0.9 })}
          </mesh>
          <mesh position={[0, -1.1, 0]}>
            <boxGeometry args={[0.3, 0.6, 0.3]} />
            {std(PAL.metal)}
          </mesh>
          <mesh position={[0, -1.45, 0]}>
            <boxGeometry args={[1.2, 0.1, 0.8]} />
            {std(PAL.metal)}
          </mesh>
        </group>
      );
    case 'usb':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[0.9, 0.35, 0.2]} />
            {std(PAL.metal, { metalness: 0.9, roughness: 0.2 })}
          </mesh>
          <mesh position={[-0.2, 0, 0.11]}>
            <boxGeometry args={[0.4, 0.16, 0.02]} />
            {std(PAL.dark)}
          </mesh>
          <mesh position={[0.7, 0, 0]}>
            <boxGeometry args={[0.6, 0.5, 0.4]} />
            {std(PAL.blue)}
          </mesh>
        </group>
      );
    case 'hdmi':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[1.1, 0.3, 0.2]} />
            {std(PAL.metal, { metalness: 0.95, roughness: 0.2 })}
          </mesh>
          <mesh position={[-0.9, 0, 0]}>
            <boxGeometry args={[0.8, 0.6, 0.5]} />
            {std('#243059')}
          </mesh>
        </group>
      );
    case 'bios':
      return (
        <group>
          <Board w={1.8} h={0.14} d={1.4} />
          <Chip y={0.22} s={0.7} color="#101828" />
          <Glow pos={[0, 0.4, 0]} r={0.12} color={PAL.gold} />
          <mesh position={[0, 0.22, 0.5]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 20]} />
            {std(PAL.metal, { metalness: 0.9 })}
          </mesh>
        </group>
      );
    case 'os':
      return (
        <group>
          <mesh>
            <boxGeometry args={[2.4, 1.6, 0.1]} />
            {std('#0f1730', { emissive: PAL.blue, emissiveIntensity: 0.25 })}
          </mesh>
          {[
            [-0.6, 0.35],
            [0.6, 0.35],
            [-0.6, -0.35],
            [0.6, -0.35],
          ].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0.09]}>
              <boxGeometry args={[0.9, 0.55, 0.04]} />
              {std(i % 2 ? PAL.cyan : PAL.purple, { emissive: i % 2 ? PAL.cyan : PAL.purple, emissiveIntensity: 1.1 })}
            </mesh>
          ))}
        </group>
      );
    case 'input':
      return (
        <group>
          <group position={[-0.9, 0, 0]} rotation={[-0.3, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[2, 0.15, 0.9]} />
              {std('#1e2749')}
            </mesh>
            {Array.from({ length: 12 }).map((_, i) => (
              <mesh key={i} position={[-0.8 + (i % 6) * 0.32, 0.11, -0.18 + Math.floor(i / 6) * 0.32]}>
                <boxGeometry args={[0.24, 0.07, 0.22]} />
                {std(PAL.white)}
              </mesh>
            ))}
          </group>
          <mesh position={[1.2, 0.1, 0]} scale={[1, 0.6, 1.4]}>
            <sphereGeometry args={[0.45, 20, 16]} />
            {std(PAL.blue)}
          </mesh>
        </group>
      );
    case 'output':
      return (
        <group>
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[2.6, 1.6, 0.12]} />
            {std('#161d3f')}
          </mesh>
          <mesh position={[0, 0.3, 0.08]}>
            <boxGeometry args={[2.4, 1.4, 0.04]} />
            {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 0.8 })}
          </mesh>
          <mesh position={[0, -0.75, 0]}>
            <boxGeometry args={[1, 0.12, 0.6]} />
            {std(PAL.metal)}
          </mesh>
        </group>
      );
    case 'resistor':
      return (
        <group rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.28, 0.28, 1.5, 20]} />
            {std('#d9c8a4', { roughness: 0.8 })}
          </mesh>
          {[PAL.red, PAL.purple, PAL.gold].map((c, i) => (
            <mesh key={i} position={[0, -0.35 + i * 0.35, 0]}>
              <cylinderGeometry args={[0.29, 0.29, 0.12, 20]} />
              {std(c)}
            </mesh>
          ))}
          <mesh position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.5, 10]} />
            {std(PAL.metal, { metalness: 0.9 })}
          </mesh>
          <mesh position={[0, -0.95, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.5, 10]} />
            {std(PAL.metal, { metalness: 0.9 })}
          </mesh>
        </group>
      );
    case 'capacitor':
      return (
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[0.55, 0.55, 1.5, 24]} />
            {std('#1f4fd8')}
          </mesh>
          <mesh position={[0, 0.76, 0]}>
            <cylinderGeometry args={[0.56, 0.56, 0.08, 24]} />
            {std(PAL.metal, { metalness: 0.9 })}
          </mesh>
          <mesh position={[0.2, 0.95, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
            {std(PAL.metal, { metalness: 0.95 })}
          </mesh>
          <mesh position={[-0.2, 0.95, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
            {std(PAL.metal, { metalness: 0.95 })}
          </mesh>
          <mesh position={[0.35, 0.2, 0.5]}>
            <boxGeometry args={[0.3, 0.1, 0.02]} />
            {std(PAL.white)}
          </mesh>
        </group>
      );
    case 'diode':
      return (
        <group rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.24, 0.24, 1.2, 18]} />
            {std('#111827', { metalness: 0.5 })}
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.1, 18]} />
            {std(PAL.white)}
          </mesh>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
            {std(PAL.metal, { metalness: 0.95 })}
          </mesh>
          <mesh position={[0, -1, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
            {std(PAL.metal, { metalness: 0.95 })}
          </mesh>
        </group>
      );
    case 'led':
      return (
        <group>
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.45, 0.5, 0.3, 24]} />
            {std('#2c3a63')}
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.5, 24, 20]} />
            <meshStandardMaterial color={PAL.red} emissive={PAL.red} emissiveIntensity={3} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.9, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
            {std(PAL.metal, { metalness: 0.95 })}
          </mesh>
        </group>
      );
    case 'transistor':
      return (
        <group>
          <mesh castShadow position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.6, 20, 1, false, 0, Math.PI]} />
            {std('#111827', { metalness: 0.6 })}
          </mesh>
          {[-0.25, 0, 0.25].map((x) => (
            <mesh key={x} position={[x, -0.35, 0]}>
              <boxGeometry args={[0.06, 0.7, 0.06]} />
              {std(PAL.metal, { metalness: 0.95 })}
            </mesh>
          ))}
        </group>
      );
    case 'inductor':
      return (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.16, 14, 26]} />
            {std('#8a5a2b', { metalness: 0.6 })}
          </mesh>
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh key={i} rotation={[0, (i / 10) * Math.PI * 2, 0]}>
              <torusGeometry args={[0.5, 0.02, 6, 20]} />
              {std(PAL.gold, { metalness: 0.95 })}
            </mesh>
          ))}
        </group>
      );
    case 'relay':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[1.6, 1.1, 1]} />
            <meshStandardMaterial color={PAL.cyan} transparent opacity={0.3} roughness={0.1} metalness={0.1} />
          </mesh>
          <mesh position={[-0.3, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.7, 16]} />
            {std('#b45309', { metalness: 0.8 })}
          </mesh>
          <mesh position={[0.4, 0.15, 0]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.7, 0.08, 0.12]} />
            {std(PAL.metal, { metalness: 0.95 })}
          </mesh>
        </group>
      );
    case 'fuse':
      return (
        <group rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.22, 1.4, 20]} />
            <meshStandardMaterial color="#cfe8ff" transparent opacity={0.45} roughness={0.1} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.05, 1.1, 0.05]} />
            {std(PAL.metal, { metalness: 0.95 })}
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.2, 20]} />
            {std(PAL.metal, { metalness: 0.9 })}
          </mesh>
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.2, 20]} />
            {std(PAL.metal, { metalness: 0.9 })}
          </mesh>
        </group>
      );
    case 'switch':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[1.8, 0.3, 1]} />
            {std('#1f2937')}
          </mesh>
          <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0.35]}>
            <boxGeometry args={[1.1, 0.14, 0.3]} />
            {std(PAL.metal, { metalness: 0.9, roughness: 0.2 })}
          </mesh>
          <Glow pos={[0.6, 0.3, 0.35]} r={0.09} color={PAL.green} />
        </group>
      );
    case 'battery':
      return (
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[0.5, 0.5, 1.9, 24]} />
            {std('#1c1f2e')}
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.51, 0.51, 0.45, 24]} />
            {std(PAL.gold, { metalness: 0.85 })}
          </mesh>
          <mesh position={[0, 1.02, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.16, 16]} />
            {std(PAL.metal, { metalness: 0.95 })}
          </mesh>
          <mesh position={[0, -0.3, 0.45]}>
            <boxGeometry args={[0.3, 0.5, 0.02]} />
            {std(PAL.white)}
          </mesh>
        </group>
      );
    case 'motor':
      return (
        <group rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.6, 0.6, 1.5, 24]} />
            {std(PAL.metal, { metalness: 0.85, roughness: 0.3 })}
          </mesh>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.6, 12]} />
            {std(PAL.metal, { metalness: 0.95 })}
          </mesh>
          <mesh position={[0, 1.35, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.6, 0.08, 0.12]} />
            {std(PAL.red)}
          </mesh>
        </group>
      );
    case 'ic':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[1.6, 0.25, 1.6]} />
            {std('#0f172e')}
          </mesh>
          {Array.from({ length: 5 }).map((_, i) => (
            <group key={i}>
              <mesh position={[-0.65 + i * 0.33, -0.05, 0.95]}>
                <boxGeometry args={[0.1, 0.12, 0.35]} />
                {std(PAL.metal, { metalness: 0.95 })}
              </mesh>
              <mesh position={[-0.65 + i * 0.33, -0.05, -0.95]}>
                <boxGeometry args={[0.1, 0.12, 0.35]} />
                {std(PAL.metal, { metalness: 0.95 })}
              </mesh>
            </group>
          ))}
          <Glow pos={[-0.55, 0.2, -0.55]} r={0.07} color={PAL.cyan} />
        </group>
      );
    case 'breadboard':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[3.4, 0.24, 2]} />
            {std('#e8eefc', { metalness: 0.05, roughness: 0.85 })}
          </mesh>
          {Array.from({ length: 40 }).map((_, i) => (
            <mesh key={i} position={[-1.4 + (i % 10) * 0.31, 0.14, -0.6 + Math.floor(i / 10) * 0.4]}>
              <boxGeometry args={[0.09, 0.04, 0.09]} />
              {std('#26304f')}
            </mesh>
          ))}
          <mesh position={[0, 0.14, 0]}>
            <boxGeometry args={[3, 0.03, 0.12]} />
            {std('#c3cfe6')}
          </mesh>
        </group>
      );
    case 'sensor':
      return (
        <group>
          <Board w={1.6} h={0.12} d={1.2} />
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[0.35, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 1.2, metalness: 0.6 })}
          </mesh>
          <Glow pos={[0.55, 0.2, 0.35]} r={0.07} color={PAL.green} />
        </group>
      );
    case 'wire':
      return (
        <group>
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[1, 0.08, 10, 40, Math.PI * 1.4]} />
            {std(PAL.red, { roughness: 0.6 })}
          </mesh>
          <mesh position={[0.7, -0.7, 0]} rotation={[0, 0, 0.6]}>
            <boxGeometry args={[0.6, 0.16, 0.16]} />
            {std(PAL.metal, { metalness: 0.9 })}
          </mesh>
        </group>
      );
    case 'connector':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[1.8, 0.4, 0.6]} />
            {std('#111827')}
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[-0.75 + i * 0.21, 0.35, 0]}>
              <boxGeometry args={[0.07, 0.4, 0.07]} />
              {std(PAL.gold, { metalness: 0.95 })}
            </mesh>
          ))}
        </group>
      );
    case 'router':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[2.2, 0.5, 1.4]} />
            {std('#1b2340')}
          </mesh>
          {[-0.7, 0, 0.7].map((x, i) => (
            <mesh key={x} position={[x, 1.1, -0.5]} rotation={[0.25, 0, i === 1 ? 0 : i === 0 ? -0.2 : 0.2]}>
              <cylinderGeometry args={[0.05, 0.05, 1.6, 10]} />
              {std(PAL.metal)}
            </mesh>
          ))}
          {[-0.6, -0.3, 0, 0.3].map((x, i) => (
            <Glow key={x} pos={[x, 0.3, 0.72]} r={0.06} color={i === 0 ? PAL.green : PAL.cyan} />
          ))}
        </group>
      );
    case 'modem':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[2, 0.5, 1.2]} />
            {std('#232c50')}
          </mesh>
          {[0, 1, 2, 3].map((i) => (
            <Glow key={i} pos={[-0.6 + i * 0.4, 0.3, 0.4]} r={0.07} color={i % 2 ? PAL.gold : PAL.green} />
          ))}
          <mesh position={[-0.8, -0.05, 0.61]}>
            <boxGeometry args={[0.4, 0.3, 0.04]} />
            {std(PAL.dark)}
          </mesh>
        </group>
      );
    case 'ethernet':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[1, 0.7, 1.4]} />
            <meshStandardMaterial color={PAL.cyan} transparent opacity={0.55} roughness={0.2} metalness={0.2} />
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[-0.35 + (i % 4) * 0.23, 0.2, 0.2]}>
              <boxGeometry args={[0.05, 0.05, 0.5]} />
              {std(PAL.gold, { metalness: 0.95 })}
            </mesh>
          ))}
          <mesh position={[0, 0, -1.4]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 1.6, 12]} />
            {std('#1d4ed8', { roughness: 0.7 })}
          </mesh>
        </group>
      );
    case 'netswitch':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[2.8, 0.5, 1.2]} />
            {std('#1b2340')}
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[-1.1 + i * 0.31, 0.05, 0.62]}>
              <boxGeometry args={[0.2, 0.18, 0.06]} />
              {std(PAL.dark)}
            </mesh>
          ))}
          {[-1, 0, 1].map((x, i) => (
            <Glow key={x} pos={[x, 0.3, 0.3]} r={0.05} color={i === 0 ? PAL.green : PAL.cyan} />
          ))}
        </group>
      );
    case 'ip':
      return (
        <group>
          <mesh>
            <sphereGeometry args={[1.1, 24, 18]} />
            {std(PAL.blue, { emissive: PAL.blue, emissiveIntensity: 0.35, transparent: true, opacity: 0.75 })}
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}>
              <torusGeometry args={[1.12, 0.015, 6, 40]} />
              {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 1.4 })}
            </mesh>
          ))}
          <Glow pos={[0.7, 0.6, 0.7]} r={0.08} color={PAL.gold} />
        </group>
      );
    case 'wifi':
      return (
        <group>
          {[0.5, 0.85, 1.2].map((r, i) => (
            <mesh key={r} rotation={[0, 0, 0]}>
              <torusGeometry args={[r, 0.07, 8, 30, Math.PI]} />
              <meshStandardMaterial color={PAL.cyan} emissive={PAL.cyan} emissiveIntensity={1.2 + i * 0.2} toneMapped={false} />
            </mesh>
          ))}
          <mesh position={[0, -0.2, 0]}>
            <sphereGeometry args={[0.16, 16, 12]} />
            {std(PAL.white)}
          </mesh>
        </group>
      );
    case 'lan':
      return (
        <group>
          <mesh position={[0, -0.8, 0]}>
            <boxGeometry args={[2.6, 0.2, 2.2]} />
            {std(PAL.board, { metalness: 0.2 })}
          </mesh>
          {[
            [-0.8, 0, -0.6],
            [0.8, 0, -0.6],
            [0, 0, 0.7],
          ].map(([x, y, z], i) => (
            <group key={i} position={[x, y, z]}>
              <mesh castShadow>
                <boxGeometry args={[0.7, 0.5, 0.6]} />
                {std('#1b2340')}
              </mesh>
              <Glow pos={[0, 0.3, 0]} r={0.06} color={PAL.green} />
            </group>
          ))}
          <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.9, 0.03, 6, 30]} />
            {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 1.2 })}
          </mesh>
        </group>
      );
    case 'robot':
      return (
        <group>
          <mesh castShadow position={[0, 0.1, 0]}>
            <boxGeometry args={[1.2, 1.2, 0.8]} />
            {std(PAL.white, { metalness: 0.3 })}
          </mesh>
          <mesh castShadow position={[0, 1.15, 0]}>
            <boxGeometry args={[0.95, 0.8, 0.75]} />
            {std(PAL.blue)}
          </mesh>
          {[-0.22, 0.22].map((x) => (
            <Glow key={x} pos={[x, 1.2, 0.4]} r={0.1} color={PAL.cyan} />
          ))}
          {[-0.85, 0.85].map((x) => (
            <mesh key={x} position={[x, 0.1, 0]} castShadow>
              <boxGeometry args={[0.28, 0.9, 0.3]} />
              {std(PAL.metal)}
            </mesh>
          ))}
          <mesh position={[0, 1.65, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.3, 8]} />
            {std(PAL.metal)}
          </mesh>
          <Glow pos={[0, 1.85, 0]} r={0.09} color={PAL.gold} />
        </group>
      );
    case 'microcontroller':
      return (
        <group>
          <Board w={2} h={0.14} d={1.4} color="#1b6f8a" />
          <Chip x={-0.2} y={0.22} s={0.8} color="#0f172e" />
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[-0.9 + i * 0.25, 0.2, 0.62]}>
              <boxGeometry args={[0.06, 0.16, 0.12]} />
              {std(PAL.gold, { metalness: 0.95 })}
            </mesh>
          ))}
          <Glow pos={[0.7, 0.25, -0.4]} r={0.07} color={PAL.green} />
        </group>
      );
    case 'servo':
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[1.2, 1.1, 0.6]} />
            {std('#1f4fd8')}
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
            {std(PAL.white)}
          </mesh>
          <mesh position={[0.5, 0.7, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.9, 0.1, 0.14]} />
            {std(PAL.white)}
          </mesh>
        </group>
      );
    case 'ai':
      return (
        <group>
          {[-1, 0, 1].map((row, ri) => (
            <group key={row} position={[0, 0.9 - ri * 0.9, 0]}>
              {Array.from({ length: 3 }).map((_, i) => (
                <mesh key={i} position={[(i - 1) * 1.1, 0, 0]}>
                  <sphereGeometry args={[0.2, 16, 12]} />
                  <meshStandardMaterial
                    color={ri === 1 ? PAL.cyan : PAL.purple}
                    emissive={ri === 1 ? PAL.cyan : PAL.purple}
                    emissiveIntensity={1.6}
                    toneMapped={false}
                  />
                </mesh>
              ))}
            </group>
          ))}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 1.8, 6]} />
            {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 0.8 })}
          </mesh>
        </group>
      );
    case 'iot':
      return (
        <group>
          <Glow pos={[0, 0.4, 0]} r={0.3} color={PAL.purple} />
          {[
            [1.2, 0, 0],
            [-1.2, 0, 0],
            [0, 0, 1.2],
            [0, 0, -1.2],
          ].map(([x, y, z], i) => (
            <group key={i} position={[x, y, z]}>
              <mesh castShadow>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                {std(PAL.white, { metalness: 0.4 })}
              </mesh>
              <Glow pos={[0, 0.35, 0]} r={0.06} color={PAL.cyan} />
            </group>
          ))}
        </group>
      );
    case 'cloud':
      return (
        <group>
          {[
            [0, 0, 0, 0.8],
            [0.8, -0.15, 0, 0.6],
            [-0.8, -0.15, 0, 0.6],
            [0.3, 0.5, 0.2, 0.5],
          ].map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[r, 20, 16]} />
              {std(PAL.white, { metalness: 0.2, roughness: 0.5 })}
            </mesh>
          ))}
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[0, -0.75 - i * 0.35, 0]}>
              <boxGeometry args={[1.6, 0.08, 0.5]} />
              {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 0.7 })}
            </mesh>
          ))}
        </group>
      );
    case 'security':
      return (
        <group>
          <mesh castShadow scale={[1, 1.15, 0.35]}>
            <sphereGeometry args={[1, 20, 16, 0, Math.PI * 2, 0, Math.PI / 1.35]} />
            {std(PAL.blue, { metalness: 0.7, roughness: 0.3 })}
          </mesh>
          <mesh position={[0, 0.1, 0.28]}>
            <boxGeometry args={[0.14, 0.6, 0.1]} />
            {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 1.8 })}
          </mesh>
          <mesh position={[0, -0.3, 0.28]}>
            <boxGeometry args={[0.14, 0.14, 0.1]} />
            {std(PAL.cyan, { emissive: PAL.cyan, emissiveIntensity: 1.8 })}
          </mesh>
        </group>
      );
    case 'architecture':
      return (
        <group>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[0, -0.6 + i * 0.42, 0]} castShadow>
              <boxGeometry args={[2.2 - i * 0.35, 0.16, 1.8 - i * 0.3]} />
              {std(i % 2 ? PAL.purple : PAL.blue, { metalness: 0.6, emissive: i % 2 ? PAL.purple : PAL.blue, emissiveIntensity: 0.25 })}
            </mesh>
          ))}
        </group>
      );
    case 'automation':
      return (
        <group>
          <mesh>
            <cylinderGeometry args={[0.8, 0.8, 0.25, 24]} />
            {std(PAL.metal, { metalness: 0.9, roughness: 0.3 })}
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} rotation={[0, (i / 8) * Math.PI * 2, 0]} position={[0.85, 0, 0]}>
              <boxGeometry args={[0.3, 0.24, 0.18]} />
              {std(PAL.cyan, { metalness: 0.8 })}
            </mesh>
          ))}
          <Glow pos={[0, 0.3, 0]} r={0.22} color={PAL.purple} />
        </group>
      );
    default:
      return (
        <group>
          <mesh castShadow>
            <boxGeometry args={[1.4, 1.4, 1.4]} />
            {std(PAL.blue)}
          </mesh>
          <Glow pos={[0, 0.9, 0]} r={0.16} />
        </group>
      );
  }
}

export function ComponentModel({
  kind,
  spin = true,
  scale = 1,
  bob = true,
}: {
  kind: ModelKind;
  spin?: boolean;
  scale?: number;
  bob?: boolean;
}) {
  const ref = useRef<Group>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    if (spin) ref.current.rotation.y += dt * 0.55;
    if (bob) ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.3) * 0.07;
  });
  return (
    <group ref={ref} scale={scale}>
      {shape(kind)}
    </group>
  );
}
