import * as THREE from "three";

/**
 * Todas las texturas de esta escena se dibujan en un <canvas> en tiempo de
 * ejecución (CanvasTexture) — cero imágenes descargadas. Así la experiencia
 * 3D se mantiene liviana sin sacrificar detalle visual.
 */

function makeCanvas(size: number): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  return { canvas, ctx };
}

/**
 * Pantalla encendida. En la escena, este plano se ve pequeño y a distancia
 * (como una foto de producto, no un recorte de pantalla) — el diseño usa
 * formas grandes, saturadas y de alto contraste a propósito: el detalle fino
 * (texto pequeño, barras delgadas) se pierde por completo al minificarse y
 * termina leyéndose como un borrón gris. Menos elementos, más grandes, es lo
 * que realmente se percibe como "una pantalla encendida" desde lejos.
 */
export function createScreenTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(1024);
  const w = canvas.width;
  const h = canvas.height * 0.625; // proporción 16:10 aprox

  // Fondo: gradiente radial saturado, más "vivo" que un degradado plano
  const bg = ctx.createRadialGradient(w * 0.5, h * 0.42, 40, w * 0.5, h * 0.5, w * 0.62);
  bg.addColorStop(0, "#123a6b");
  bg.addColorStop(0.55, "#0a1c3d");
  bg.addColorStop(1, "#040a1a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Marca central grande y brillante — el único elemento que debe leerse
  // con claridad incluso muy minificado
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 108px Arial";
  ctx.fillStyle = "#eaf6ff";
  ctx.fillText("TI.MO", w * 0.5, h * 0.42);
  ctx.font = "700 46px Arial";
  ctx.fillStyle = "#22d3ee";
  ctx.letterSpacing = "14px";
  ctx.fillText("S O L U T I O N S", w * 0.5, h * 0.42 + 78);
  ctx.letterSpacing = "0px";

  // Línea de acento ancha bajo la marca
  ctx.fillStyle = "#22d3ee";
  ctx.fillRect(w * 0.5 - 130, h * 0.42 + 118, 260, 6);

  // Tres bloques grandes de color a modo de indicadores, bien separados y
  // grandes (nada de barras finas que se conviertan en ruido)
  const chips = [
    { x: 0.5 - 0.33, color: "#22d3ee" },
    { x: 0.5, color: "#4c86f0" },
    { x: 0.5 + 0.33, color: "#4ade80" },
  ];
  const chipY = h * 0.78;
  const chipR = 22;
  chips.forEach((chip) => {
    ctx.beginPath();
    ctx.arc(w * chip.x, chipY, chipR, 0, Math.PI * 2);
    ctx.fillStyle = chip.color;
    ctx.fill();
  });

  // Viñeta suave para dar profundidad al panel
  const vignette = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.25, w * 0.5, h * 0.5, w * 0.65);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.45)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);

  // Relleno inferior (zona de reflejo del bisel)
  ctx.fillStyle = "#040a1a";
  ctx.fillRect(0, h, w, canvas.height - h);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Patrón de placa de circuito (PCB) para motherboard, RAM y SSD. */
export function createPCBTexture(baseColor = "#0b3d24"): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(256);
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = "rgba(255, 200, 90, 0.55)";
  ctx.lineWidth = 2;
  const rng = mulberry32(7);
  for (let i = 0; i < 18; i++) {
    let x = rng() * 256;
    let y = rng() * 256;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const segments = 2 + Math.floor(rng() * 3);
    for (let s = 0; s < segments; s++) {
      if (rng() > 0.5) x += (rng() - 0.5) * 60;
      else y += (rng() - 0.5) * 60;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255, 200, 90, 0.5)";
  for (let i = 0; i < 30; i++) {
    const x = rng() * 256;
    const y = rng() * 256;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** Emblema circular con motivo de circuito, inspirado en el logo real de la
 * marca — dibujado con trazos, sin cargar el PNG (que pesa ~900KB). */
export function createEmblemTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(512);
  ctx.clearRect(0, 0, 512, 512);

  ctx.strokeStyle = "#22d3ee";
  ctx.fillStyle = "#22d3ee";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Letra "T" estilizada
  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.lineTo(280, 150);
  ctx.moveTo(215, 150);
  ctx.lineTo(215, 340);
  ctx.stroke();

  // Letra "M" estilizada
  ctx.beginPath();
  ctx.moveTo(300, 340);
  ctx.lineTo(300, 150);
  ctx.lineTo(365, 260);
  ctx.lineTo(430, 150);
  ctx.lineTo(430, 340);
  ctx.stroke();

  // Trazos de circuito decorativos
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(34, 211, 238, 0.55)";
  const traces: [number, number][][] = [
    [
      [90, 220],
      [150, 220],
      [150, 260],
      [190, 260],
    ],
    [
      [90, 300],
      [140, 300],
      [140, 320],
    ],
    [
      [470, 220],
      [420, 220],
      [420, 200],
    ],
    [
      [470, 300],
      [440, 300],
      [440, 280],
      [420, 280],
    ],
  ];
  for (const trace of traces) {
    ctx.beginPath();
    trace.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.stroke();
    const [lastX, lastY] = trace[trace.length - 1];
    ctx.beginPath();
    ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Textura radial para las aspas del ventilador de refrigeración. */
export function createFanTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(256);
  ctx.fillStyle = "#1a1c20";
  ctx.fillRect(0, 0, 256, 256);

  const cx = 128;
  const cy = 128;
  const blades = 9;
  ctx.fillStyle = "#2c3038";
  for (let i = 0; i < blades; i++) {
    const a0 = (i / blades) * Math.PI * 2;
    const a1 = a0 + Math.PI / blades;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, 118, a0, a1);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = "#0d0e10";
  ctx.beginPath();
  ctx.arc(cx, cy, 30, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
