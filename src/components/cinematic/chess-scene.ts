import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const clamp = THREE.MathUtils.clamp;
const mix = THREE.MathUtils.lerp;
const smooth = (a: number, b: number, p: number) =>
  THREE.MathUtils.smoothstep(p, a, b);
/** Rises over [a, b], holds, then falls over [c, d]. */
const window4 = (a: number, b: number, c: number, d: number, p: number) =>
  smooth(a, b, p) * (1 - smooth(c, d, p));

/** A rectangle in viewport fractions (0–1) where the subject is allowed to live. */
export type StageZone = { x: number; y: number; w: number; h: number };

export type SceneInput = {
  /** 0–1 across the ten acts. */
  progress: number;
  /** 0–1 through the endgame sequence. */
  finale: number;
  pointerX: number;
  pointerY: number;
  /** 1 while the final call to action is hovered. */
  hover: number;
  /** Free space left by the text; the subject is framed inside it. */
  zone: StageZone;
  immediate?: boolean;
};

export type SceneFrame = {
  /** The zone the subject is being framed into, in viewport fractions. */
  zone: StageZone;
  /** Subject bounds after framing, in viewport fractions. */
  subject: StageZone;
  /** Final destination square in viewport fractions, or null before the endgame. */
  destination: { x: number; y: number } | null;
  /** 0 when the subject is fully shown, 1 when there was no room and it receded. */
  dim: number;
  settled: boolean;
};

/**
 * A procedural chess sculpture: no remote model, texture, tracking or asset
 * request. The choreography is authored in world space; framing is solved
 * afterwards with a lens shift so the subject always lands in the free zone
 * the page reports, whatever the copy, viewport or language length.
 */
export function mountChessScene(
  host: HTMLElement,
  onFrame?: (frame: SceneFrame) => void,
) {
  const mobile = matchMedia("(max-width: 760px)").matches;
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: !mobile,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.6));
  renderer.setClearColor(0x0b0f14, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 80);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.34;
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
  const rival = new THREE.MeshStandardMaterial({
    color: 0x5b3a2c,
    metalness: 0.7,
    roughness: 0.35,
  });
  const subtleGold = new THREE.MeshStandardMaterial({
    color: 0xa58b55,
    metalness: 0.85,
    roughness: 0.4,
    transparent: true,
    opacity: 0,
  });

  const sculpture = new THREE.Group();
  scene.add(sculpture);
  const base = new THREE.Group();
  const body = new THREE.Group();
  const crown = new THREE.Group();
  sculpture.add(base, body, crown);
  const segments = mobile ? 40 : 72;
  function lathe(points: number[][], material: THREE.Material, group: THREE.Group) {
    const curve = new THREE.SplineCurve(points.map(([r, y]) => new THREE.Vector2(r, y)));
    const object = new THREE.Mesh(
      new THREE.LatheGeometry(curve.getPoints(65), segments),
      material,
    );
    group.add(object);
    return object;
  }
  function torus(radius: number, tube: number, y: number, group: THREE.Group) {
    const object = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 10, segments), gold);
    object.rotation.x = Math.PI / 2;
    object.position.y = y;
    group.add(object);
  }
  lathe(
    [[0, -1.85], [0.65, -1.85], [0.8, -1.79], [0.83, -1.67], [0.77, -1.54],
      [0.67, -1.48], [0.68, -1.39], [0.6, -1.3], [0, -1.3]],
    dark,
    base,
  );
  torus(0.79, 0.025, -1.72, base);
  torus(0.69, 0.026, -1.43, base);
  lathe(
    [[0, -1.31], [0.6, -1.31], [0.57, -1.18], [0.43, -0.96], [0.3, -0.53],
      [0.25, 0.05], [0.3, 0.5], [0.44, 0.71], [0.46, 0.83], [0, 0.83]],
    dark,
    body,
  );
  torus(0.46, 0.04, 0.78, body);
  torus(0.32, 0.022, 0.54, body);
  lathe(
    [[0, 0.85], [0.37, 0.85], [0.4, 0.95], [0.33, 1.07], [0.42, 1.34],
      [0.47, 1.48], [0.45, 1.55], [0, 1.55]],
    gold,
    crown,
  );
  torus(0.44, 0.035, 1.51, crown);
  const crossStem = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.57, 0.16), gold);
  crossStem.position.y = 1.79;
  crown.add(crossStem);
  const crossBar = new THREE.Mesh(new THREE.BoxGeometry(0.47, 0.16, 0.16), gold);
  crossBar.position.y = 1.86;
  crown.add(crossBar);

  const board = new THREE.Group();
  sculpture.add(board);
  const tileGeometry = new THREE.BoxGeometry(0.67, 0.1, 0.67);
  for (let x = 0; x < 7; x++)
    for (let z = 0; z < 7; z++) {
      const tile = new THREE.Mesh(tileGeometry, (x + z) % 2 === 0 ? stone : ivory);
      tile.position.set((x - 3) * 0.68, -2.02, (z - 3) * 0.68);
      board.add(tile);
    }
  const platform = new THREE.Mesh(new THREE.BoxGeometry(4.83, 0.1, 4.83), gold);
  platform.position.y = -2.13;
  board.add(platform);
  const bottom = new THREE.Mesh(new THREE.BoxGeometry(4.92, 0.25, 4.92), dark);
  bottom.position.y = -2.3;
  board.add(bottom);

  // A small cast shares geometry/materials; mobile keeps only two defenders.
  const pawnBody = new THREE.LatheGeometry(
    [[0, 0], [0.26, 0], [0.28, 0.1], [0.2, 0.18], [0.12, 0.42], [0.16, 0.55], [0, 0.57]]
      .map(([r, y]) => new THREE.Vector2(r, y)),
    mobile ? 20 : 32,
  );
  const pawnHead = new THREE.SphereGeometry(0.18, mobile ? 12 : 24, 12);
  function pawn(bodyMaterial: THREE.Material, headMaterial: THREE.Material) {
    const piece = new THREE.Group();
    piece.add(new THREE.Mesh(pawnBody, bodyMaterial));
    const head = new THREE.Mesh(pawnHead, headMaterial);
    head.position.y = 0.69;
    piece.add(head);
    board.add(piece);
    return piece;
  }
  const defenders: THREE.Group[] = [];
  for (let i = 0; i < (mobile ? 2 : 4); i++) defenders.push(pawn(i % 2 ? dark : ivory, gold));
  // The rival piece that threatens the king and is captured during the defence.
  const attacker = pawn(rival, rival);

  const routeMaterial = new THREE.MeshBasicMaterial({
    color: 0xe8c783, transparent: true, opacity: 0, depthWrite: false,
  });
  const route = new THREE.Group();
  board.add(route);
  // An L-shaped illuminated route across squares, revealed segment by segment.
  const routeSegments: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const segment = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.014, 0.035), routeMaterial);
    segment.position.set(-1.36 + i * 0.68, -1.953, 1.36);
    route.add(segment);
    routeSegments.push(segment);
  }
  const turn = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.014, 0.68), routeMaterial);
  turn.position.set(0, -1.953, 1.02);
  route.add(turn);
  routeSegments.push(turn);
  const destination = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.018, 8, 32), routeMaterial);
  destination.rotation.x = Math.PI / 2;
  route.add(destination);

  const rook = new THREE.Group();
  lathe([[0, 0], [0.3, 0], [0.32, 0.12], [0.22, 0.2], [0.2, 0.72], [0.31, 0.8], [0.31, 0.94], [0, 0.94]], dark, rook);
  for (let i = 0; i < 6; i++) {
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.17, 0.13), gold);
    tooth.position.set(Math.cos(i * Math.PI / 3) * 0.24, 1, Math.sin(i * Math.PI / 3) * 0.24);
    rook.add(tooth);
  }
  board.add(rook);
  const signature = new THREE.Group();
  board.add(signature);
  const signatureMaterial = new THREE.MeshBasicMaterial({
    color: 0xf2cd81, transparent: true, opacity: 0, depthWrite: false,
  });
  const strokes = [[-0.9, 0.8, -0.9, -0.5], [-0.9, -0.5, -0.2, -0.5], [-0.9, 0.1, -0.35, 0.1], [0, -0.5, 0.5, 0.8], [0.5, 0.8, 1, -0.5]];
  const signatureBars = strokes.map(([x1, z1, x2, z2]) => {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(Math.hypot(x2 - x1, z2 - z1), 0.025, 0.04),
      signatureMaterial,
    );
    bar.position.set((x1 + x2) / 2, -1.94, (z1 + z2) / 2 + 1.1);
    bar.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
    signature.add(bar);
    return bar;
  });

  const orbit = new THREE.Group();
  scene.add(orbit);
  for (let i = 0; i < 2; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.85 + i * 0.22, 0.008, 6, 120), subtleGold);
    ring.rotation.set(0.35 + i * 0.7, 0.45 + i * 0.35, i * 0.8);
    orbit.add(ring);
  }
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.047, 12, 12), gold);
  orbit.add(marker);
  const key = new THREE.DirectionalLight(0xffe1a5, 2.3);
  key.position.set(3, 5, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xa5c9ff, 5.2);
  rim.position.set(-4, 2, -3);
  scene.add(rim, new THREE.AmbientLight(0xffffff, 0.65));

  const dustGeometry = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(120 * 3);
  for (let i = 0; i < 120; i++) {
    dustPositions[i * 3] = Math.sin(i * 127.1) * 8;
    dustPositions[i * 3 + 1] = Math.cos(i * 311.7) * 6;
    dustPositions[i * 3 + 2] = Math.sin(i * 73.3) * 5 - 3;
  }
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(
    dustGeometry,
    new THREE.PointsMaterial({
      color: 0xc8a45d, size: 0.017, transparent: true, opacity: 0.35, depthWrite: false,
    }),
  );
  scene.add(dust);

  // x, y, camera distance, yaw, separation, orbital presence — one shot per act.
  const shots = [
    [1.55, -0.25, 4.1, -0.85, 0, 0],
    [1.2, -0.4, 8.1, 0.4, 1, 0],
    [-2.05, -0.35, 8.6, 1.4, 0, 1],
    [1.7, -0.1, 11.8, 2.2, 0, 0.25],
    [-1.8, -0.1, 12.2, 3.5, 0, 0.3],
    [1.8, -0.1, 11.8, 4.1, 0, 0.25],
    [0, -0.3, 13, 4.5, 0, 0],
    [-2.2, -0.4, 13, 5, 0, 0],
    [0, -0.5, 14, 5.4, 0, 0],
    [0, 0, 12.5, 6.05, 0, 0.2],
  ];

  let progress = 0, target = 0, finale = 0, finaleTarget = 0, hover = 0;
  let pointerX = 0, pointerY = 0;
  let frame = 0, alive = true, visible = true, first = true;
  let width = 1, height = 1;
  const zone: StageZone = { x: 0.5, y: 0.1, w: 0.46, h: 0.85 };
  const zoneTarget: StageZone = { ...zone };
  // Framing state, eased so the subject glides rather than snaps between gaps.
  const lens = { zoom: 1, x: 0, y: 0, dim: 0 };
  let boardWeight = 0;
  const v = new THREE.Vector3();
  const kingBox = new THREE.Box3();
  const tableBox = new THREE.Box3();
  const destinationWorld = new THREE.Vector3();
  const kingParts = [base, body, crown];

  /** Authored choreography; leaves the camera unshifted at zoom 1. */
  function pose() {
    const narrow = width < 760;
    const act = progress * 9;
    const index = Math.min(8, Math.floor(act));
    const t = THREE.MathUtils.smoothstep(act - index, 0, 1);
    const values = shots[index].map((value, i) => mix(value, shots[index + 1][i], t));
    const strategyPresence = smooth(2.2, 2.9, act) * (1 - smooth(5.2, 5.8, act));
    const finalePresence = smooth(8.3, 8.85, act);
    const stagePresence = Math.max(strategyPresence, finalePresence);
    // Prevention tips the whole table towards the viewer like a map; the
    // guarantees act rocks it back until it settles level.
    const tilt = window4(3.55, 4.05, 4.45, 4.95, act) * 0.36;
    const rock = window4(4.5, 4.8, 5.3, 5.7, act) * Math.sin((act - 4.5) * 9) * 0.09;
    // In the guarantees act the camera drops to pawn height and glides between pieces.
    const low = window4(4.55, 4.95, 5.3, 5.75, act);

    camera.position.set(
      Math.sin(act * 1.1) * (narrow ? 0.2 : 0.8),
      mix(mix(0.8 + Math.sin(act * 1.3) * 1.8, 4.5, stagePresence), -1.25, low),
      (narrow ? Math.max(values[2] * 1.2, 8) : values[2] + 1.2) * (1 - 0.38 * low),
    );
    camera.lookAt(0, mix(0.1, -1.05, low), 0);
    sculpture.position.set(values[0] * 0.35, values[1], 0);
    sculpture.scale.setScalar(narrow ? 0.83 : 1);
    sculpture.rotation.set(
      Math.sin(act * 1.7) * 0.2 * (1 - stagePresence) + tilt,
      mix(values[3] + act * 1.7, Math.PI * 4 - 0.35 + (act - 3) * 0.13, stagePresence),
      Math.sin(act * 1.1) * 0.22 * (1 - stagePresence) + rock,
    );
    body.position.y = values[4] * 0.25;
    crown.position.y = values[4] * 0.75;
    crown.rotation.y = values[4] * Math.PI * 1.5;
    base.position.y = -values[4] * 0.1;
    const boardReveal = Math.max(1 - smooth(0, 0.8, Math.abs(act - 1)), stagePresence);
    board.visible = boardReveal > 0.01;
    board.scale.setScalar(Math.max(0.001, boardReveal));
    board.position.y = -(1 - boardReveal) * 0.8;
    board.rotation.y = mix(-act * 0.35, 0, stagePresence);

    const formation = smooth(2.3, 3.2, act);
    const balance = smooth(4.5, 5.15, act);
    defenders.forEach((piece, i) => {
      const side = i % 2 ? 1 : -1;
      const row = Math.floor(i / 2);
      piece.position.set(
        mix(side * 2.5, side * (row ? 1.36 : 0.68), formation),
        -1.95 + Math.sin(formation * Math.PI) * 0.35,
        mix(1.36 + row * 0.1, row ? -0.68 : 0.68, balance),
      );
      piece.rotation.set(0, 0, 0);
      piece.scale.setScalar(Math.max(0.001, stagePresence));
    });

    // The capture: a rival slides in towards the king, a defender takes it
    // diagonally and the rival is knocked tumbling off the table.
    const enter = smooth(2.35, 2.85, act);
    const strike = smooth(2.95, 3.2, act);
    const flight = smooth(3.1, 3.65, act);
    const back = smooth(3.65, 4.2, act);
    attacker.visible = act > 2.3 && flight < 1;
    attacker.scale.setScalar(Math.max(0.001, stagePresence));
    attacker.position.set(
      mix(2.9, 1.36, enter) + flight * 2.6,
      -1.95 + Math.sin(enter * Math.PI * 2) * 0.12 * (1 - enter) +
        Math.sin(flight * Math.PI) * 1.3 - flight * flight * 2.6,
      0.68 + flight * 0.7,
    );
    attacker.rotation.set(flight * 2.2, 0, -flight * 5.5);
    const striker = defenders[1];
    if (striker && strike > 0) {
      const away = strike * (1 - back);
      striker.position.x = mix(striker.position.x, 1.36, away);
      striker.position.z = mix(striker.position.z, 0.68, away);
      striker.position.y += Math.sin(strike * Math.PI) * 0.55 * (1 - back);
    }

    const routePresence = 1 - smooth(0.35, 1, Math.abs(act - 4)) + finalePresence;
    routeMaterial.opacity = Math.min(0.9, routePresence);
    route.visible = routePresence > 0.01;
    const pathProgress = Math.max(smooth(3.5, 4.4, act) * (1 - smooth(4.6, 5.2, act)), finalePresence);
    routeSegments.forEach((segment, i) => {
      const reveal = Math.max(0.001, smooth(i / 4, (i + 1) / 4, pathProgress));
      segment.scale.set(i === 3 ? 1 : reveal, 1, i === 3 ? reveal : 1);
      segment.visible = reveal > 0.01;
    });
    destination.visible = pathProgress > 0.95;
    // The final pawn follows the same marked route and settles at its end.
    if (finalePresence > 0) {
      const moving = defenders[0];
      const advance = smooth(8.3, 8.95, act);
      moving.position.x = mix(-1.36, 0, Math.min(1, advance * 1.5));
      moving.position.z = mix(1.36, 0.68, smooth(0.65, 1, advance));
      moving.position.y = -1.95;
    }
    orbit.rotation.set(act * 0.45, act * 0.8, act * 0.3);
    marker.position.set(Math.cos(act * 2.2) * 2.85, Math.sin(act * 2.2) * 2.85, 0);
    orbit.visible = values[5] > 0.01;
    orbit.position.copy(sculpture.position);
    orbit.scale.setScalar(narrow ? 0.8 : 1);
    subtleGold.opacity = values[5] * 0.28;
    dust.rotation.y = progress * 0.65;
    key.position.set(3 + Math.sin(act) * 2, 5, 6);
    key.intensity = 2.3;
    boardWeight = smooth(0.25, 0.75, boardReveal);

    if (finale > 0.001) {
      const enterFinale = smooth(0, 0.18, finale);
      const lift = smooth(0.5, 0.88, finale);
      const settle = smooth(0.82, 1, finale);
      // Descend between the pieces, then crane up to reveal the signature.
      camera.position.lerp(
        new THREE.Vector3(
          mix(-1.5, 0, lift) + pointerX * 0.22,
          mix(-0.5, 5.8, lift) + pointerY * 0.12,
          mix(narrow ? 11 : 8, narrow ? 15 : 12.8, lift),
        ),
        enterFinale,
      );
      camera.lookAt(0, mix(-0.65, -0.35, lift), 0);
      sculpture.position.lerp(new THREE.Vector3(0, mix(-0.1, -0.6, settle), 0), enterFinale);
      sculpture.rotation.set(
        sculpture.rotation.x * (1 - enterFinale),
        mix(sculpture.rotation.y, Math.PI * 4 + mix(-0.3, 0.12, settle), enterFinale),
        sculpture.rotation.z * (1 - enterFinale),
      );
      board.visible = true;
      board.scale.setScalar(1);
      board.position.y = 0;
      board.rotation.y = 0;
      body.position.y = crown.position.y = base.position.y = 0;
      crown.rotation.y = 0;
      attacker.visible = false;
      defenders.forEach((piece, i) => {
        const move = smooth(0.12 + i * 0.065, 0.28 + i * 0.065, finale);
        piece.scale.setScalar(1);
        piece.position.set(
          (i % 2 ? 1 : -1) * (i < 2 ? 1.36 : 2.04),
          -1.95 + Math.sin(move * Math.PI) * 0.15,
          mix(1.36, -0.68, move),
        );
      });
      rook.visible = true;
      const rookMove = smooth(0.36, 0.56, finale);
      rook.position.set(mix(-2.04, 1.36, rookMove), -1.95, -1.36);
      rook.scale.setScalar(enterFinale);
      routeMaterial.opacity = (1 - lift) * 0.85;
      signature.visible = true;
      signatureMaterial.opacity = smooth(0.56, 0.8, finale) * (0.7 + hover * 0.3);
      signatureBars.forEach((bar, i) => {
        bar.scale.x = Math.max(0.001, smooth(0.53 + i * 0.035, 0.66 + i * 0.035, finale));
      });
      destination.visible = true;
      destination.material = signatureMaterial;
      destination.position.set(1.36, -1.94, -1.36);
      destination.scale.setScalar(1 + hover * 0.3);
      orbit.visible = false;
      key.position.set(mix(4, -3, lift), 6, 5);
      key.intensity = 2.8 + hover * 0.6;
      boardWeight = Math.max(boardWeight, enterFinale);
    } else {
      rook.visible = signature.visible = false;
      destination.material = routeMaterial;
      destination.position.set(0, -1.95, 0.68);
      destination.scale.setScalar(1);
    }
    camera.aspect = width / height;
    camera.zoom = 1;
    camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }

  /** Projects a world box to a pixel rectangle on the unshifted camera. */
  function projectBox(box: THREE.Box3) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let i = 0; i < 8; i++) {
      v.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z)
        .project(camera);
      const x = (v.x + 1) / 2 * width;
      const y = (1 - v.y) / 2 * height;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    return { minX, minY, maxX, maxY };
  }

  /** Lens shift and zoom so the subject sits inside the zone left by the text. */
  function frameSubject(ease: number) {
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld();
    kingBox.makeEmpty();
    kingParts.forEach((part) => kingBox.expandByObject(part));
    let r = projectBox(kingBox);
    if (boardWeight > 0.001) {
      tableBox.setFromObject(platform).union(kingBox);
      const t = projectBox(tableBox);
      r = {
        minX: mix(r.minX, t.minX, boardWeight), minY: mix(r.minY, t.minY, boardWeight),
        maxX: mix(r.maxX, t.maxX, boardWeight), maxY: mix(r.maxY, t.maxY, boardWeight),
      };
    }
    const rw = Math.max(1, r.maxX - r.minX), rh = Math.max(1, r.maxY - r.minY);
    const zw = zone.w * width, zh = zone.h * height;
    const fit = Math.min((zw * 0.94) / rw, zh / rh);
    const zoom = clamp(fit, 0.16, 1.15);
    const dim = 1 - smooth(0.1, 0.18, fit);
    const cx = width / 2 + ((r.minX + r.maxX) / 2 - width / 2) * zoom;
    const cy = height / 2 + ((r.minY + r.maxY) / 2 - height / 2) * zoom;
    const offsetX = cx - (zone.x + zone.w / 2) * width;
    const offsetY = cy - (zone.y + zone.h / 2) * height;
    lens.zoom = mix(lens.zoom, zoom, ease);
    lens.x = mix(lens.x, offsetX, ease);
    lens.y = mix(lens.y, offsetY, ease);
    lens.dim = mix(lens.dim, dim, ease);
    camera.zoom = lens.zoom;
    camera.setViewOffset(width, height, lens.x, lens.y, width, height);
    camera.updateProjectionMatrix();
    const scaledW = rw * lens.zoom, scaledH = rh * lens.zoom;
    const centerX = width / 2 + ((r.minX + r.maxX) / 2 - width / 2) * lens.zoom - lens.x;
    const centerY = height / 2 + ((r.minY + r.maxY) / 2 - height / 2) * lens.zoom - lens.y;
    host.style.setProperty("--scene-dim", lens.dim.toFixed(3));
    let destinationPoint: SceneFrame["destination"] = null;
    if (finale > 0.5 && destination.visible) {
      destination.getWorldPosition(destinationWorld).project(camera);
      destinationPoint = { x: (destinationWorld.x + 1) / 2, y: (1 - destinationWorld.y) / 2 };
    }
    return {
      subject: {
        x: (centerX - scaledW / 2) / width,
        y: (centerY - scaledH / 2) / height,
        w: scaledW / width,
        h: scaledH / height,
      },
      destination: destinationPoint,
      dim: lens.dim,
      gap: Math.abs(lens.zoom - zoom) + Math.abs(lens.x - offsetX) + Math.abs(lens.y - offsetY),
    };
  }

  function draw() {
    frame = 0;
    if (!alive || !visible || document.hidden) return;
    // Quick enough to feel tied to the finger on phones, still eased.
    const ease = first ? 1 : 0.14;
    progress = mix(progress, target, ease);
    finale = mix(finale, finaleTarget, ease);
    const zoneEase = first ? 1 : 0.22;
    zone.x = mix(zone.x, zoneTarget.x, zoneEase);
    zone.y = mix(zone.y, zoneTarget.y, zoneEase);
    zone.w = mix(zone.w, zoneTarget.w, zoneEase);
    zone.h = mix(zone.h, zoneTarget.h, zoneEase);
    first = false;
    pose();
    // Framing follows the copy closely; only the choreography itself lingers.
    const framed = frameSubject(ease === 1 ? 1 : 0.35);
    renderer.render(scene, camera);
    const settled =
      Math.abs(progress - target) < 0.0002 &&
      Math.abs(finale - finaleTarget) < 0.0002 &&
      Math.abs(zone.x - zoneTarget.x) + Math.abs(zone.y - zoneTarget.y) +
        Math.abs(zone.w - zoneTarget.w) + Math.abs(zone.h - zoneTarget.h) < 0.001 &&
      framed.gap < 0.5;
    onFrame?.({ zone: { ...zone }, subject: framed.subject, destination: framed.destination, dim: framed.dim, settled });
    if (!settled) frame = requestAnimationFrame(draw);
  }
  const requestDraw = () => {
    if (!frame && alive && visible && !document.hidden) frame = requestAnimationFrame(draw);
  };
  function resize() {
    width = Math.max(1, host.clientWidth);
    height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height);
    requestDraw();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  // Moving the canvas between bands queues "hidden" then "shown" in one batch:
  // the latest entry is the truth, the first one is stale.
  const visibility = new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
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
    update(input: SceneInput) {
      target = clamp(input.progress, 0, 1);
      finaleTarget = clamp(input.finale, 0, 1);
      hover = input.hover;
      pointerX = input.pointerX;
      pointerY = input.pointerY;
      Object.assign(zoneTarget, input.zone);
      if (input.immediate) {
        progress = target;
        finale = finaleTarget;
        Object.assign(zone, zoneTarget);
        first = true;
      }
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
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          geometries.add(object.geometry);
          for (const material of Array.isArray(object.material) ? object.material : [object.material])
            materials.add(material);
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      routeMaterial.dispose();
      signatureMaterial.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      host.style.removeProperty("--scene-dim");
      delete host.dataset.ready;
    },
  };
}
