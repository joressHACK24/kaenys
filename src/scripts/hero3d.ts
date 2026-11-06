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

import { SYMBOL_HEAD, SYMBOL_BAR, SYMBOL_CHEVRON, SYMBOL_SIZE } from '../data/logo';

// Vecteurs officiels du symbole (repère SVG, y vers le bas), centrés sur l'origine.
const CENTER = [SYMBOL_SIZE.width / 2, SYMBOL_SIZE.height / 2];
const X = (x: number) => x - CENTER[0];
const Y = (y: number) => CENTER[1] - y;

/** Convertit un tracé SVG absolu (commandes M, L, C, Z) en forme three.js. */
function pathToShape(d: string) {
  const shape = new Shape();
  const tokens = d.match(/[MLCZ]|-?\d*\.?\d+/g) ?? [];
  let cmd = '';
  const n = () => Number(tokens.shift());
  while (tokens.length) {
    if (/[MLCZ]/.test(tokens[0]!)) cmd = tokens.shift()!;
    if (cmd === 'M') shape.moveTo(X(n()), Y(n()));
    else if (cmd === 'L') shape.lineTo(X(n()), Y(n()));
    else if (cmd === 'C') shape.bezierCurveTo(X(n()), Y(n()), X(n()), Y(n()), X(n()), Y(n()));
    else if (cmd === 'Z') shape.closePath();
  }
  return shape;
}

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

  // Biseau léger : il élargit un peu chaque pièce, sans refermer les espaces entre elles.
  const extrude = { depth: 38, bevelEnabled: true, bevelThickness: 4, bevelSize: 2, bevelSegments: 6, curveSegments: 48 };

  const headShape = new Shape();
  const { cx, cy, rx, ry } = SYMBOL_HEAD;
  headShape.absellipse(X(cx), Y(cy), rx - extrude.bevelSize, ry - extrude.bevelSize, 0, Math.PI * 2, false, 0);

  const pieces = [headShape, pathToShape(SYMBOL_BAR), pathToShape(SYMBOL_CHEVRON)].map((shape) => {
    const geo = new ExtrudeGeometry(shape, extrude);
    geo.translate(0, 0, -extrude.depth / 2);
    return new Mesh(geo, material);
  });

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

  // Au repos, le symbole remplit la zone « stage », en arrière-plan du texte ; au défilement,
  // il rejoint le centre de l'écran pendant que le texte s'efface.
  const SYMBOL_H = SYMBOL_SIZE.height + 10;
  const layout = { restX: 0, restY: 0, restScale: 1, endScale: 1.4 };
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const worldH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const pxToWorld = worldH / h;
    const c = canvas.getBoundingClientRect();
    const st = stage.getBoundingClientRect();
    const stageMidY = st.top - c.top + st.height / 2;
    const stageMidX = st.left - c.left + st.width / 2;
    layout.restY = (h / 2 - stageMidY) * pxToWorld;
    layout.restX = (stageMidX - w / 2) * pxToWorld;
    const fit = Math.min((st.height * 0.92 * pxToWorld) / SYMBOL_H, (st.width * 0.8 * pxToWorld) / SYMBOL_H);
    layout.restScale = Math.max(0.35, fit);
    layout.endScale = layout.restScale * 1.08;
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

    // Démarre à plat, comme le SVG qu'il remplace, puis prend vie.
    const w = easeOutExpo(clamp01(t / 2.4));
    const idle = Math.sin(t * 0.5) * 0.14;
    // Mouvements doux et limités : la charte interdit d'incliner le logo ou d'en déplacer les éléments.
    group.rotation.y = (idle + pointerEased.x * 0.3 - 0.2) * w + scroll * 0.3;
    group.rotation.x = (pointerEased.y * 0.12 + Math.sin(t * 0.35) * 0.04) * w;
    const e = scroll * scroll * (3 - 2 * scroll);
    group.position.x = lerp(layout.restX, 0, e);
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
