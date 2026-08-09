import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface KeyboardProps {
  position?: [number, number, number];
}

const ROWS = 5;
const COLS = 14;
const KEY_W = 0.175;
const KEY_D = 0.155;
const GAP = 0.022;
const KEY_H = 0.02;

/**
 * Todas las teclas son UNA sola malla instanciada (InstancedMesh): sin
 * importar cuántas teclas se dibujen, el costo para la GPU es el de un
 * único draw call — clave para que la escena se mantenga liviana.
 */
export function Keyboard({ position = [0, 0.015, -0.15] }: KeyboardProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const count = ROWS * COLS;

  const geometry = useMemo(() => new THREE.BoxGeometry(KEY_W, KEY_H, KEY_D), []);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#141519", roughness: 0.6, metalness: 0.15 }),
    []
  );

  // Referencia estable: si `args` cambiara de identidad en cada render, R3F
  // reconstruiría el InstancedMesh entero (matrices en cero) sin volver a
  // correr el efecto que las posiciona, y las teclas desaparecerían.
  const args = useMemo<[THREE.BoxGeometry, THREE.MeshStandardMaterial, number]>(
    () => [geometry, material, count],
    [geometry, material, count]
  );

  const offsets = useMemo(() => {
    const totalW = COLS * (KEY_W + GAP) - GAP;
    const totalD = ROWS * (KEY_D + GAP) - GAP;
    const list: { x: number; z: number; scale: number }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = -totalW / 2 + c * (KEY_W + GAP) + KEY_W / 2;
        const z = -totalD / 2 + r * (KEY_D + GAP) + KEY_D / 2;
        list.push({ x, z, scale: 0.94 + ((c + r) % 3) * 0.02 });
      }
    }
    return list;
  }, []);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    offsets.forEach((k, i) => {
      dummy.position.set(k.x, 0, k.z);
      dummy.scale.set(k.scale, 1, k.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.computeBoundingSphere();
  }, [offsets]);

  return (
    <group position={position}>
      <instancedMesh ref={meshRef} args={args} castShadow receiveShadow />
    </group>
  );
}
