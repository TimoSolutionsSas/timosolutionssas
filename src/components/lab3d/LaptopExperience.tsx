import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  ContactShadows,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { LaptopModel } from "./LaptopModel";
import type { PartId } from "./laptopParts";

interface LaptopExperienceProps {
  isExploded: boolean;
  activePart: PartId | null;
  onSelectPart: (id: PartId | null) => void;
  autoRotate: boolean;
}

export function LaptopExperience({
  isExploded,
  activePart,
  onSelectPart,
  autoRotate,
}: LaptopExperienceProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      onPointerMissed={() => onSelectPart(null)}
    >
      <color attach="background" args={["#050914"]} />
      <fog attach="fog" args={["#050914", 8, 15]} />

      <PerspectiveCamera makeDefault position={[3.1, 2.2, 4.1]} fov={34} />
      <OrbitControls
        target={[0, 0.5, 0]}
        enablePan={false}
        minDistance={3.1}
        maxDistance={6.5}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.52}
        autoRotate={autoRotate}
        autoRotateSpeed={1.1}
        enableDamping
        dampingFactor={0.08}
      />

      <ambientLight intensity={0.4} />
      {/* Luz principal: crea el brillo especular sobre el aluminio */}
      <directionalLight
        position={[3.2, 5, 2.2]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-bias={-0.0005}
      />
      {/* Luz de relleno fría, tenue */}
      <directionalLight position={[-4, 1.5, -2]} intensity={0.25} color="#4c86f0" />
      {/* Contraluz cian sutil: separa el borde del portátil del fondo sin
          quemar la imagen — el mismo recurso que usa Apple, con moderación. */}
      <directionalLight position={[-1.5, 2.5, -4.5]} intensity={0.7} color="#22d3ee" />
      <pointLight position={[0, 1.2, 1.8]} intensity={0.15} color="#8fb4f7" distance={5} />

      {/* Entorno de reflejos generado 100% en código con paneles de luz
          (Lightformers) — sin descargar ningún archivo HDRI externo.
          frames={1}: los paneles son estáticos, así que el cubemap se
          calcula una sola vez en vez de recalcularse en cada frame. */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={1.4} color="#ffffff" position={[0, 4, -6]} scale={[10, 8, 1]} />
        <Lightformer intensity={0.7} color="#dbe7ff" position={[-6, 2, 1]} rotation={[0, Math.PI / 2, 0]} scale={[10, 3, 1]} />
        <Lightformer intensity={0.7} color="#dbe7ff" position={[6, 2, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[10, 3, 1]} />
        <Lightformer intensity={1} color="#22d3ee" position={[0, 3, 4]} rotation={[Math.PI, 0, 0]} scale={[6, 3, 1]} />
        <Lightformer intensity={0.6} color="#ffffff" position={[3, 0.5, 3]} scale={[2, 4, 1]} />
      </Environment>

      <Suspense fallback={null}>
        <LaptopModel
          isExploded={isExploded}
          activePart={activePart}
          onSelectPart={onSelectPart}
        />
      </Suspense>

      {/* Piso reflectante desenfocado: el mismo recurso de "product shot"
          que da esa sensación de estudio fotográfico premium. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.012, 0]}>
        <planeGeometry args={[24, 24]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={35}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0d12"
          metalness={0.4}
          mirror={0.4}
        />
      </mesh>

      <ContactShadows
        position={[0, -0.001, 0]}
        opacity={0.7}
        scale={8}
        blur={2.2}
        far={2}
        resolution={512}
        color="#02040a"
      />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.55}
          luminanceSmoothing={0.35}
          intensity={0.65}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.15} darkness={0.55} />
      </EffectComposer>
    </Canvas>
  );
}
