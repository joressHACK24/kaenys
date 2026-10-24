// Symbole Kaenys en 3D : trois pièces extrudées (tête, barre, chevron) qui suivent le curseur,
// pivotent et grandissent au défilement.
// Chargé au premier geste du visiteur, si une carte graphique est disponible (voir Hero.astro).
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  Shape,
  ExtrudeGeometry,
  Mesh,
  MeshPhysicalMaterial,
  DirectionalLight,
  AmbientLight,
  PMREMGenerator,
  SRGBColorSpace,
  NeutralToneMapping,
  Vector2,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

type Pt = [number, number];

// Coordonnées issues du tracé du logo (repère SVG 240 × 249, y vers le bas).
const BAR: Pt[] = [[149, 3], [223, 0.8], [1.1, 221.5], [3.2, 150.7]];
const CHEVRON: Pt[] = [[121.7, 131], [239, 247.5], [172.4, 247.8], [121.9, 196.1], [71.5, 247.8], [6.5, 247.5]];
const HEAD = { x: 40.9, y: 38.2, r: 36.5 };
const CENTER: Pt = [120, 124];

const toShape = (pts: Pt[]) => {
  const s = new Shape();
  pts.forEach(([x, y], i) => (i ? s.lineTo(x - CENTER[0], CENTER[1] - y) : s.moveTo(x - CENTER[0], CENTER[1] - y)));
  s.closePath();
  return s;
};

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export interface Hero3DOptions {
  canvas: HTMLCanvasElement;
  /** Élément dont le défilement pilote la rotation. */
  scrollTarget: HTMLElement;
  /** Zone où le symbole se place au repos, sous le texte. */
  stage: HTMLElement;
  onReady?: () => void;
}

export function initHero3D({ canvas, scrollTarget, stage, onReady }: Hero3DOptions) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 0.95;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  const camera = new PerspectiveCamera(30, 1, 10, 4000);
  camera.position.set(0, 0, 720);

  scene.add(new AmbientLight(0xffffff, 0.35));
  const key = new DirectionalLight(0xffffff, 2.2);
  key.position.set(-300, 400, 500);
  scene.add(key);
  const rim = new DirectionalLight(0xaddff1, 1.4);
  rim.position.set(400, -200, -300);
  scene.add(rim);

  const material = new MeshPhysicalMaterial({
    color: 0xaddff1,
    roughness: 0.32,
    metalness: 0.05,
    clearcoat: 0.8,
    clearcoatRoughness: 0.18,
    envMapIntensity: 0.65,
  });

  const extrude = { depth: 38, bevelEnabled: true, bevelThickness: 6, bevelSize: 4, bevelSegments: 6, curveSegments: 48 };

  const headShape = new Shape();
  headShape.absarc(HEAD.x - CENTER[0], CENTER[1] - HEAD.y, HEAD.r - 4, 0, Math.PI * 2, false);

  const pieces = [headShape, toShape(BAR), toShape(CHEVRON)].map((shape) => {
    const geo = new ExtrudeGeometry(shape, extrude);
    geo.translate(0, 0, -extrude.depth / 2);
    return new Mesh(geo, material);
  });

  // Légère dispersion des pièces au défilement.
  const spread = [
    { x: -18, y: 22, z: 50 },
    { x: 0, y: 0, z: -16 },
    { x: 14, y: -22, z: 34 },
  ];

  const group = new Group();
  pieces.forEach((m) => group.add(m));
  scene.add(group);

  const pointer = new Vector2();
  const pointerEased = new Vector2();
  const onPointer = (e: PointerEvent) => {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  let scroll = 0;
  const readScroll = () => {
    const r = scrollTarget.getBoundingClientRect();
    scroll = clamp01(-r.top / Math.max(1, r.height - window.innerHeight));
  };
  window.addEventListener('scroll', readScroll, { passive: true });
  readScroll();

  // Au repos, le symbole tient dans la zone « stage » sous le texte ; en fin de défilement,
  // il remonte au centre de l'écran et grandit pendant que le texte s'efface.
  const SYMBOL_H = 260;
  const layout = { restY: 0, restScale: 1, endScale: 1.4 };
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const worldH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const worldW = worldH * camera.aspect;
    const pxToWorld = worldH / h;
    const c = canvas.getBoundingClientRect();
    const st = stage.getBoundingClientRect();
    const stageMid = st.top - c.top + st.height / 2;
    layout.restY = (h / 2 - stageMid) * pxToWorld;
    const fit = Math.min((st.height * 0.92 * pxToWorld) / SYMBOL_H, (worldW * 0.8) / SYMBOL_H);
    layout.restScale = Math.max(0.35, fit);
    layout.endScale = Math.min((worldH * 0.48) / SYMBOL_H, (worldW * 0.7) / SYMBOL_H);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  ro.observe(stage);
  resize();

  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); });
  io.observe(canvas);

  const start = performance.now();
  let raf = 0;
  let readyFired = false;

  function frame(now: number) {
    const t = (now - start) / 1000;
    pointerEased.lerp(pointer, 0.06);

    const k = scroll * scroll;
    pieces.forEach((m, i) => m.position.set(spread[i].x * k, spread[i].y * k, spread[i].z * k));

    // Démarre à plat, comme le SVG qu'il remplace, puis prend vie.
    const w = easeOutExpo(clamp01(t / 2.4));
    const idle = Math.sin(t * 0.5) * 0.18;
    group.rotation.y = (idle + pointerEased.x * 0.35 - 0.25) * w + scroll * 0.8;
    group.rotation.x = (pointerEased.y * 0.18 + Math.sin(t * 0.35) * 0.05) * w + scroll * 0.25;
    const e = scroll * scroll * (3 - 2 * scroll);
    group.position.y = lerp(layout.restY, 0, e) + Math.sin(t * 0.8) * 4;
    group.scale.setScalar(lerp(layout.restScale, layout.endScale, e));

    renderer.render(scene, camera);
    if (!readyFired) { readyFired = true; onReady?.(); }
  }

  function loop() {
    cancelAnimationFrame(raf);
    const tick = (now: number) => {
      if (!visible || document.hidden) return;
      frame(now);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible) loop(); });
  loop();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', readScroll);
    pieces.forEach((m) => m.geometry.dispose());
    material.dispose();
    renderer.dispose();
  };
}
