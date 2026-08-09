import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Keyboard } from "./Keyboard";
import { InternalComponents } from "./InternalComponents";
import { PartHotspot } from "./PartHotspot";
import { createEmblemTexture, createScreenTexture } from "./textures";
import { LAPTOP_PARTS, type PartId } from "./laptopParts";

interface LaptopModelProps {
  isExploded: boolean;
  activePart: PartId | null;
  onSelectPart: (id: PartId | null) => void;
}

const LID_CLOSED = 0;
const LID_OPEN = THREE.MathUtils.degToRad(105);
const LID_OPEN_EXPLODED = THREE.MathUtils.degToRad(118);

const BODY_COLOR = "#b7bcc4";
const DECK_COLOR = "#797e88";
const DARK_COLOR = "#111318";
const HINGE_Z = -1.15;

export function LaptopModel({ isExploded, activePart, onSelectPart }: LaptopModelProps) {
  const lidGroupRef = useRef<THREE.Group>(null!);
  const lidAngleRef = useRef(LID_CLOSED);

  const screenTexture = useMemo(() => createScreenTexture(), []);
  const emblemTexture = useMemo(() => createEmblemTexture(), []);

  useFrame((_, delta) => {
    const target = isExploded ? LID_OPEN_EXPLODED : LID_OPEN;
    lidAngleRef.current = THREE.MathUtils.damp(lidAngleRef.current, target, 3.2, delta);
    if (lidGroupRef.current) lidGroupRef.current.rotation.x = -lidAngleRef.current;
  });

  const feetOffsets: [number, number][] = [
    [-1.5, -0.85],
    [1.5, -0.85],
    [-1.5, 0.85],
    [1.5, 0.85],
  ];

  return (
    <group position={[0, 0.14, 0]}>
      {/* Chasis / base */}
      <RoundedBox
        args={[3.4, 0.14, 2.3]}
        radius={0.055}
        smoothness={4}
        position={[0, -0.07, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={BODY_COLOR} metalness={0.7} roughness={0.32} />
      </RoundedBox>

      {/* Cubierta del teclado (deck). El radio de biselado de un RoundedBox
          no puede superar la mitad de su dimensión más chica (aquí, la
          altura 0.02 → mitad 0.01): con un radio mayor la geometría se
          infla muchísimo más alta de lo declarado y se traga cualquier
          cosa apoyada encima (así "desapareció" el teclado). */}
      <RoundedBox
        args={[3.05, 0.02, 1.95]}
        radius={0.008}
        position={[0, 0.005, -0.12]}
        receiveShadow
      >
        <meshStandardMaterial color={DECK_COLOR} metalness={0.4} roughness={0.55} />
      </RoundedBox>

      <Keyboard position={[0, 0.02, -0.42]} />

      {/* Trackpad — mismo cuidado con el radio relativo a su grosor (0.014). */}
      <RoundedBox args={[1.05, 0.014, 0.72]} radius={0.006} position={[0, 0.015, 0.68]} receiveShadow>
        <meshStandardMaterial color="#d3d7dc" metalness={0.25} roughness={0.15} />
      </RoundedBox>

      {/* Puertos laterales */}
      {[-0.55, -0.15].map((z, i) => (
        <mesh key={`portL-${i}`} position={[-1.705, -0.06, z]} castShadow>
          <boxGeometry args={[0.02, 0.045, 0.38]} />
          <meshStandardMaterial color={DARK_COLOR} roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[1.705, -0.06, -0.35]} castShadow>
        <boxGeometry args={[0.02, 0.045, 0.32]} />
        <meshStandardMaterial color={DARK_COLOR} roughness={0.6} />
      </mesh>

      {/* Rejilla de altavoces */}
      <SpeakerGrille position={[-1.05, 0.005, -1.0]} />
      <SpeakerGrille position={[1.05, 0.005, -1.0]} />

      {/* Patas de goma */}
      {feetOffsets.map(([x, z], i) => (
        <mesh key={i} position={[x, -0.141, z]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.02, 16]} />
          <meshStandardMaterial color="#0c0d0f" roughness={0.9} />
        </mesh>
      ))}

      {/* Bisagra */}
      <mesh position={[0, -0.02, HINGE_Z]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.032, 0.032, 3.15, 20]} />
        <meshStandardMaterial color="#8b909a" metalness={0.85} roughness={0.28} />
      </mesh>

      {/* Tapa / pantalla, pivota sobre la bisagra */}
      <group ref={lidGroupRef} position={[0, -0.02, HINGE_Z]}>
        <RoundedBox
          args={[3.4, 0.1, 2.3]}
          radius={0.045}
          smoothness={4}
          position={[0, 0.05, 1.15]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={BODY_COLOR} metalness={0.7} roughness={0.32} />
        </RoundedBox>

        {/* Bisel */}
        <mesh position={[0, -0.0004, 1.15]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.2, 2.08]} />
          <meshStandardMaterial color="#0a0a0c" roughness={0.6} />
        </mesh>

        {/* Panel de pantalla (encendido) */}
        <mesh position={[0, -0.0008, 1.15]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.98, 1.86]} />
          <meshStandardMaterial
            map={screenTexture}
            emissiveMap={screenTexture}
            emissive="#ffffff"
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>

        {/* Emblema trasero luminoso */}
        <mesh position={[0, 0.1005, 1.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.32, 48]} />
          <meshStandardMaterial
            map={emblemTexture}
            emissiveMap={emblemTexture}
            emissive="#22d3ee"
            emissiveIntensity={1.4}
            color="#c9cdd3"
            metalness={0.4}
            roughness={0.4}
            transparent
            toneMapped={false}
          />
        </mesh>

        {/* Hotspot: pantalla (posición local a la tapa, se mueve con ella) */}
        <PartHotspot
          position={[0.7, 0.35, 1.15]}
          part={LAPTOP_PARTS.pantalla}
          isActive={activePart === "pantalla"}
          onSelect={onSelectPart}
        />
      </group>

      {/* Hotspots de exterior anclados a la base (no rotan) */}
      <PartHotspot
        position={[0, 0.05, -0.42]}
        part={LAPTOP_PARTS.teclado}
        isActive={activePart === "teclado"}
        onSelect={onSelectPart}
      />
      <PartHotspot
        position={[0, 0.03, 0.68]}
        part={LAPTOP_PARTS.trackpad}
        isActive={activePart === "trackpad"}
        onSelect={onSelectPart}
      />
      <PartHotspot
        position={[1.4, -0.06, -0.35]}
        part={LAPTOP_PARTS.puertos}
        isActive={activePart === "puertos"}
        onSelect={onSelectPart}
      />
      <PartHotspot
        position={[0.85, -0.02, HINGE_Z]}
        part={LAPTOP_PARTS.bisagra}
        isActive={activePart === "bisagra"}
        onSelect={onSelectPart}
      />
      <PartHotspot
        position={[-1.2, -0.05, 0.75]}
        part={LAPTOP_PARTS.chasis}
        isActive={activePart === "chasis"}
        onSelect={onSelectPart}
      />

      <InternalComponents
        isExploded={isExploded}
        activePart={activePart}
        onSelectPart={onSelectPart}
      />
    </group>
  );
}

function SpeakerGrille({ position }: { position: [number, number, number] }) {
  const dots = useMemo(() => {
    const list: [number, number][] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 6; c++) {
        list.push([c * 0.028 - 0.07, r * 0.028 - 0.028]);
      }
    }
    return list;
  }, []);

  return (
    <group position={position}>
      {dots.map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.006, 8]} />
          <meshStandardMaterial color="#0a0b0d" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}
