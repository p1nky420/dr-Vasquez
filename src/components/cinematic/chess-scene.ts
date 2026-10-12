import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const clamp = THREE.MathUtils.clamp;
const mix = THREE.MathUtils.lerp;
const smooth = (a: number, b: number, p: number) =>
  THREE.MathUtils.smoothstep(p, a, b);

/** A procedural sculpture: no remote model, texture, tracking or asset request. */
export function mountChessScene(host: HTMLElement) {
  const mobile = matchMedia("(max-width: 760px)").matches;
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: !mobile,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.6));
  renderer.setClearColor(0x0b0f14, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 80);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const gold = new THREE.MeshStandardMaterial({
    color: 0xc8a45d,
    metalness: 0.94,
    roughness: 0.25,
  });
  const dark = new THREE.MeshPhysicalMaterial({
    color: 0x080e16,
    metalness: 0.62,
    roughness: 0.27,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
  });
  const stone = new THREE.MeshStandardMaterial({
    color: 0x151b24,
    metalness: 0.55,
    roughness: 0.4,
  });
  const ivory = new THREE.MeshStandardMaterial({
    color: 0xb9b4a6,
    metalness: 0.45,
    roughness: 0.32,
  });
  const subtleGold = new THREE.MeshStandardMaterial({
    color: 0xa58b55,
    metalness: 0.85,
    roughness: 0.4,
    transparent: true,
    opacity: 0.5,
  });
  const sculpture = new THREE.Group();
  scene.add(sculpture);
  const base = new THREE.Group();
  const body = new THREE.Group();
  const crown = new THREE.Group();
  sculpture.add(base, body, crown);
  const segments = mobile ? 40 : 72;
  function lathe(
    points: number[][],
    material: THREE.Material,
    group: THREE.Group,
  ) {
    const curve = new THREE.SplineCurve(
      points.map(([r, y]) => new THREE.Vector2(r, y)),
    );
    const object = new THREE.Mesh(
      new THREE.LatheGeometry(curve.getPoints(65), segments),
      material,
    );
    group.add(object);
    return object;
  }
  function torus(
    radius: number,
    tube: number,
    y: number,
    group: THREE.Group,
    material = gold,
  ) {
    const object = new THREE.Mesh(
      new THREE.TorusGeometry(radius, tube, 10, segments),
      material,
    );
    object.rotation.x = Math.PI / 2;
    object.position.y = y;
    group.add(object);
    return object;
  }
  lathe(
    [
      [0, -1.85],
      [0.65, -1.85],
      [0.8, -1.79],
      [0.83, -1.67],
      [0.77, -1.54],
      [0.67, -1.48],
      [0.68, -1.39],
      [0.6, -1.3],
      [0, -1.3],
    ],
    dark,
    base,
  );
  torus(0.79, 0.025, -1.72, base);
  torus(0.69, 0.026, -1.43, base);
  lathe(
    [
      [0, -1.31],
      [0.6, -1.31],
      [0.57, -1.18],
      [0.43, -0.96],
      [0.3, -0.53],
      [0.25, 0.05],
      [0.3, 0.5],
      [0.44, 0.71],
      [0.46, 0.83],
      [0, 0.83],
    ],
    dark,
    body,
  );
  torus(0.46, 0.04, 0.78, body);
  torus(0.32, 0.022, 0.54, body);
  lathe(
    [
      [0, 0.85],
      [0.37, 0.85],
      [0.4, 0.95],
      [0.33, 1.07],
      [0.42, 1.34],
      [0.47, 1.48],
      [0.45, 1.55],
      [0, 1.55],
    ],
    gold,
    crown,
  );
  torus(0.44, 0.035, 1.51, crown);
  const crossStem = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.57, 0.16),
    gold,
  );
  crossStem.position.y = 1.79;
  crown.add(crossStem);
  const crossBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.47, 0.16, 0.16),
    gold,
  );
  crossBar.position.y = 1.86;
  crown.add(crossBar);

  const board = new THREE.Group();
  sculpture.add(board);
  const tileGeometry = new THREE.BoxGeometry(0.67, 0.1, 0.67);
  for (let x = 0; x < 7; x++)
    for (let z = 0; z < 7; z++) {
      const tile = new THREE.Mesh(
        tileGeometry,
        (x + z) % 2 === 0 ? stone : ivory,
      );
      tile.position.set((x - 3) * 0.68, -2.02, (z - 3) * 0.68);
      board.add(tile);
    }
  const platform = new THREE.Mesh(new THREE.BoxGeometry(4.83, 0.1, 4.83), gold);
  platform.position.y = -2.13;
  board.add(platform);
  const bottom = new THREE.Mesh(new THREE.BoxGeometry(4.92, 0.25, 4.92), dark);
  bottom.position.y = -2.3;
  board.add(bottom);

  const orbit = new THREE.Group();
  scene.add(orbit);
  for (let i = 0; i < 2; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.85 + i * 0.22, 0.008, 6, 120),
      subtleGold,
    );
    ring.rotation.set(0.35 + i * 0.7, 0.45 + i * 0.35, i * 0.8);
    orbit.add(ring);
  }
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.047, 12, 12), gold);
  marker.position.set(2.85, 0, 0);
  orbit.add(marker);
  const key = new THREE.DirectionalLight(0xffe1a5, 4.5);
  key.position.set(3, 5, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xa5c9ff, 5);
  rim.position.set(-4, 2, -3);
  scene.add(rim, new THREE.AmbientLight(0xffffff, 0.65));

  let progress = 0,
    target = 0,
    pointerX = 0,
    pointerY = 0;
  let frame = 0,
    alive = true,
    visible = true,
    first = true;
  let width = 1,
    height = 1;
  function draw() {
    frame = 0;
    if (!alive || !visible || document.hidden) return;
    progress = first ? target : mix(progress, target, 0.095);
    first = false;
    const narrow = width < 760;
    const split =
      smooth(0.18, 0.39, progress) * (1 - smooth(0.57, 0.79, progress));
    const side = smooth(0.4, 0.62, progress) * (1 - smooth(0.78, 1, progress));
    const aspect = width / height;
    camera.aspect = aspect;
    camera.position.set(0, narrow ? 1.1 : 1.35, narrow ? 13.8 : 11.8);
    camera.lookAt(0, -0.25, 0);
    camera.updateProjectionMatrix();
    const x = narrow
      ? 0
      : mix(Math.min(aspect * 1.45, 2.75), -Math.min(aspect * 1.35, 2.5), side);
    sculpture.position.set(x, narrow ? -2.2 : -0.12, 0);
    const scale = narrow ? 0.67 : 1;
    sculpture.scale.setScalar(scale);
    sculpture.rotation.set(
      0.04 + pointerY * 0.02,
      -0.48 + progress * 1.55 + pointerX * 0.08,
      Math.sin(progress * Math.PI * 2) * 0.035,
    );
    body.position.y = split * 0.35;
    crown.position.y = split * 1.1;
    crown.rotation.y = split * 0.65;
    base.position.y = -split * 0.15;
    board.rotation.y = progress * 0.12;
    board.position.y = -split * 0.24;
    orbit.position.copy(sculpture.position);
    orbit.scale.setScalar(scale * (1 + split * 0.11));
    orbit.rotation.set(progress * 0.8, 0.1 + progress * 1.7, progress * 0.45);
    renderer.render(scene, camera);
    if (Math.abs(progress - target) > 0.0002)
      frame = requestAnimationFrame(draw);
  }
  const requestDraw = () => {
    if (!frame && alive && visible && !document.hidden)
      frame = requestAnimationFrame(draw);
  };
  function resize() {
    width = host.clientWidth;
    height = host.clientHeight;
    renderer.setSize(width, height);
    requestDraw();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    requestDraw();
  });
  visibility.observe(host);
  const onVisibility = () => requestDraw();
  document.addEventListener("visibilitychange", onVisibility);
  const contextLost = (event: Event) => {
    event.preventDefault();
    host.dataset.ready = "false";
  };
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  resize();
  draw();
  host.dataset.ready = "true";
  return {
    update(value: number, x = 0, y = 0, immediate = false) {
      target = clamp(value, 0, 1);
      pointerX = x;
      pointerY = y;
      if (immediate) progress = target;
      requestDraw();
    },
    destroy() {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material])
            materials.add(material);
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete host.dataset.ready;
    },
  };
}
