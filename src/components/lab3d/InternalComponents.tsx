import { useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { createFanTexture, createPCBTexture } from "./textures";
import { PartHotspot } from "./PartHotspot";
import { LAPTOP_PARTS, type PartId } from "./laptopParts";

interface InternalComponentsProps {
  isExploded: boolean;
  activePart: PartId | null;
  onSelectPart: (id: PartId | null) => void;
}

type Vec3 = [number, number, number];

type InteriorPartId = "placa-base" | "ram" | "ssd" | "bateria" | "ventilacion";

/** Punto de partida "guardado dentro del chasis" (oculto por la carcasa
 * sólida), punto de destino cuando la vista despiezada está activa, y un
 * offset opcional para la etiqueta — la placa base es grande y su centro
 * queda muy cerca (en pantalla) de las etiquetas de RAM/SSD, así que su
 * etiqueta se ancla en una esquina libre en vez del centro. */
const LAYOUT: Record<
  InteriorPartId,
  { rest: Vec3; exploded: Vec3; hotspotOffset?: Vec3 }
> = {
  "placa-base": {
    rest: [0, -0.05, -0.2],
    exploded: [0, 0.42, -0.2],
    hotspotOffset: [-0.85, 0.06, 0.4],
  },
  ram: { rest: [0.5, -0.05, -0.55], exploded: [0.8, 0.85, -0.6] },
  ssd: { rest: [0.5, -0.05, 0.15], exploded: [0.8, 0.62, 0.3] },
  bateria: { rest: [-0.3, -0.05, 0.5], exploded: [-0.75, 0.75, 0.45] },
  // El ventilador está acostado (rotado 90°), así que su dimensión que
  // queda vertical es el diámetro (0.32), no el grosor (0.05) — con
  // rest.y=-0.05 sobresalía por encima del chasis (0.14 de alto) sin
  // importar la vista. -0.22 deja todo el disco por debajo de la tapa.
  ventilacion: { rest: [-0.5, -0.22, -0.55], exploded: [-0.8, 0.95, -0.6] },
};

/**
 * El elemento JSX <line> minúsculo choca con el tipo global SVGLineElement
 * bajo los tipos de React 18.3 (problema conocido del ecosistema R3F), así
 * que construimos el THREE.Line a mano y lo montamos con <primitive> —
 * evita la ambigüedad de tipos por completo.
 */
function useGuideLine() {
  return useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    const material = new THREE.LineDashedMaterial({
      color: "#22d3ee",
      dashSize: 0.04,
      gapSize: 0.03,
      transparent: true,
      opacity: 0.55,
    });
    return new THREE.Line(geometry, material);
  }, []);
}

function AnimatedPart({
  id,
  isExploded,
  activePart,
  onSelectPart,
  children,
}: InternalComponentsProps & { id: InteriorPartId; children: ReactNode }) {
  const layout = LAYOUT[id];
  const groupRef = useRef<THREE.Group>(null!);
  const progressRef = useRef(0);
  const restVec = useMemo(() => new THREE.Vector3(...layout.rest), [layout]);
  const explodedVec = useMemo(() => new THREE.Vector3(...layout.exploded), [layout]);
  const current = useRef(new THREE.Vector3(...layout.rest));
  const lineObject = useGuideLine();

  useFrame((_, delta) => {
    const target = isExploded ? 1 : 0;
    progressRef.current = THREE.MathUtils.damp(progressRef.current, target, 4, delta);
    current.current.lerpVectors(restVec, explodedVec, progressRef.current);
    if (groupRef.current) groupRef.current.position.copy(current.current);

    const geometry = lineObject.geometry as THREE.BufferGeometry;
    geometry.setFromPoints([restVec, current.current]);
    lineObject.computeLineDistances();
  });

  const part = LAPTOP_PARTS[id];

  return (
    <>
      {/* Los <Html> de drei no se ocluyen con la geometría 3D por sí solos:
          si esta etiqueta se montara siempre, se vería flotando "a través"
          del chasis cerrado aunque la pieza esté oculta dentro. Por eso el
          hotspot solo existe en el árbol mientras la vista despiezada está
          activa. */}
      <primitive object={lineObject} />
      <group ref={groupRef}>
        {children}
        {isExploded && (
          <PartHotspot
            position={layout.hotspotOffset ?? [0, 0.14, 0]}
            part={part}
            isActive={activePart === id}
            onSelect={onSelectPart}
          />
        )}
      </group>
    </>
  );
}

export function InternalComponents(props: InternalComponentsProps) {
  const pcbTexture = useMemo(() => createPCBTexture("#0b3d24"), []);
  const pcbTextureBlue = useMemo(() => createPCBTexture("#0b2340"), []);
  const fanTexture = useMemo(() => createFanTexture(), []);

  return (
    <group>
      <AnimatedPart id="placa-base" {...props}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.9, 0.03, 1.3]} />
          <meshStandardMaterial map={pcbTexture} roughness={0.6} metalness={0.2} />
        </mesh>
        {[
          [-0.6, 0.03, -0.3],
          [0.1, 0.03, 0.35],
          [0.5, 0.03, -0.4],
        ].map((p, i) => (
          <mesh key={i} position={p as Vec3} castShadow>
            <boxGeometry args={[0.16, 0.03, 0.16]} />
            <meshStandardMaterial color="#101215" roughness={0.5} metalness={0.4} />
          </mesh>
        ))}
      </AnimatedPart>

      <AnimatedPart id="ram" {...props}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.52, 0.02, 0.1]} />
          <meshStandardMaterial map={pcbTextureBlue} roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.025, 0]} castShadow>
          <boxGeometry args={[0.46, 0.02, 0.06]} />
          <meshStandardMaterial color="#0d0e10" roughness={0.4} metalness={0.3} />
        </mesh>
      </AnimatedPart>

      <AnimatedPart id="ssd" {...props}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.28, 0.015, 0.09]} />
          <meshStandardMaterial map={pcbTexture} roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[-0.05, 0.018, 0]} castShadow>
          <boxGeometry args={[0.1, 0.014, 0.07]} />
          <meshStandardMaterial color="#0d0e10" roughness={0.4} metalness={0.3} />
        </mesh>
      </AnimatedPart>

      <AnimatedPart id="bateria" {...props}>
        <RoundedBox args={[0.75, 0.09, 0.55]} radius={0.03} smoothness={3} castShadow receiveShadow>
          <meshStandardMaterial color="#e7eaed" roughness={0.4} metalness={0.25} />
        </RoundedBox>
      </AnimatedPart>

      <AnimatedPart id="ventilacion" {...props}>
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.05, 32]} />
            <meshStandardMaterial map={fanTexture} roughness={0.5} metalness={0.3} />
          </mesh>
          <group position={[0.32, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.32, 0.05, 0.22]} />
              <meshStandardMaterial color="#b06a3a" roughness={0.35} metalness={0.65} />
            </mesh>
            <HeatsinkFins />
          </group>
        </group>
      </AnimatedPart>
    </group>
  );
}

const FIN_COUNT = 9;
// Constante de módulo, no un literal en el JSX: así `args` conserva siempre
// la misma referencia y R3F nunca reconstruye la malla instanciada en un
// re-render (ver nota en Keyboard.tsx sobre este mismo bug).
const FIN_ARGS: [undefined, undefined, number] = [undefined, undefined, FIN_COUNT];

function HeatsinkFins() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < FIN_COUNT; i++) {
      dummy.position.set(-0.15 + i * 0.037, 0.045, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={FIN_ARGS} castShadow>
      <boxGeometry args={[0.02, 0.06, 0.2]} />
      <meshStandardMaterial color="#c9793f" roughness={0.3} metalness={0.7} />
    </instancedMesh>
  );
}
