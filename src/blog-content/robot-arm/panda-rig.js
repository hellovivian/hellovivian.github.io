// ── Panda rig ──
// Copied from fog-motion-emotion/target_applications/robot-arm/panda-rig.js.
// Only the imports and the mesh location differ (meshes live in public/robot-arm/).
// A Franka Emika Panda as a three.js kinematic chain. The chain numbers come
// straight from the Panda URDF in bullet3's pybullet_data (Apache-2.0 — see
// public/robot-arm/panda/LICENSE.txt); the meshes are that URDF's visual OBJs.
//
// The rig is only a SKIN. Everything that animates it goes through
//   rig.setPose(q, grip)     q = 7 joint angles (rad), grip = 0 (closed) … 1 (open)
// so the motion code (arm-motions.js) never touches meshes, and the model can be
// swapped for another arm without changing a motion.
//
// If a mesh fails to load, that link falls back to plain cylinders/boxes so the
// page still shows motion (rig.usedFallback tells the page to say so).

import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const H = Math.PI / 2;

// One entry per revolute joint: where the joint sits in its parent link's frame
// (xyz + roll/pitch/yaw), and its limits. Every joint turns about its own Z.
export const JOINTS = [
  { xyz: [0, 0, 0.333],        rpy: [0, 0, 0],  lo: -2.9671, hi: 2.9671 },
  { xyz: [0, 0, 0],            rpy: [-H, 0, 0], lo: -1.8326, hi: 1.8326 },
  { xyz: [0, -0.316, 0],       rpy: [H, 0, 0],  lo: -2.9671, hi: 2.9671 },
  { xyz: [0.0825, 0, 0],       rpy: [H, 0, 0],  lo: -3.1416, hi: 0.0 },
  { xyz: [-0.0825, 0.384, 0],  rpy: [-H, 0, 0], lo: -2.9671, hi: 2.9671 },
  { xyz: [0, 0, 0],            rpy: [H, 0, 0],  lo: -0.0873, hi: 3.8223 },
  { xyz: [0.088, 0, 0],        rpy: [H, 0, 0],  lo: -2.9671, hi: 2.9671 },
];
const FLANGE_Z = 0.107;        // link7 → flange
const FINGER_Z = 0.0584;       // hand → finger base
const GRASP_Z = 0.105;         // hand → point between the fingertips
const FINGER_TRAVEL = 0.04;    // each finger slides 0 … 4 cm

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function clampPose(q) {
  return q.map((v, i) => clamp(v, JOINTS[i].lo, JOINTS[i].hi));
}

function frame(parent, xyz, rpy) {
  const g = new THREE.Group();
  g.position.set(xyz[0], xyz[1], xyz[2]);
  g.rotation.set(rpy[0], rpy[1], rpy[2], 'ZYX');   // URDF rpy = fixed-axis XYZ
  parent.add(g);
  return g;
}

// The bare skeleton: no meshes, just nested frames. Also used on its own as a
// "probe" for forward kinematics (where does the gripper end up for pose q?).
export function buildChain() {
  const root = new THREE.Group();
  root.rotation.x = -H;                            // URDF is Z-up, three.js is Y-up
  const link0 = new THREE.Group();
  root.add(link0);

  const links = [link0];                           // link0 … link7
  const joints = [];                               // the 7 groups we rotate
  let parent = link0;
  for (const j of JOINTS) {
    const link = new THREE.Group();
    frame(parent, j.xyz, j.rpy).add(link);
    joints.push(link);
    links.push(link);
    parent = link;
  }
  const flange = frame(parent, [0, 0, FLANGE_Z], [0, 0, 0]);
  const hand = frame(flange, [0, 0, 0], [0, 0, -Math.PI / 4]);
  const fingerL = frame(hand, [0, 0, FINGER_Z], [0, 0, 0]);
  const fingerR = frame(hand, [0, 0, FINGER_Z], [0, 0, 0]);
  const grasp = frame(hand, [0, 0, GRASP_Z], [0, 0, 0]);

  function setPose(q, grip = 0.5) {
    for (let i = 0; i < 7; i++) joints[i].rotation.z = clamp(q[i], JOINTS[i].lo, JOINTS[i].hi);
    const g = clamp(grip, 0, 1) * FINGER_TRAVEL;
    fingerL.position.y = g;
    fingerR.position.y = -g;
  }

  // World position of the grasp point for a pose (leaves the chain in that pose).
  function graspAt(q, grip = 0.5) {
    setPose(q, grip);
    root.updateMatrixWorld(true);
    return grasp.getWorldPosition(new THREE.Vector3());
  }

  return { root, links, joints, hand, fingerL, fingerR, grasp, setPose, graspAt };
}

// ── meshes ──
const MESH_BASE = (process.env.PUBLIC_URL || '') + '/robot-arm/panda/meshes/';
const meshCache = new Map();                       // url → Promise<Object3D>
function loadObj(rel) {
  const url = MESH_BASE + rel;
  if (!meshCache.has(url)) {
    meshCache.set(url, fetch(url)
      .then((res) => { if (!res.ok) throw new Error(res.status + ' ' + url); return res.text(); })
      // Drop stray "l" (line) records before parsing. link5.obj has two, and one
      // is enough for OBJLoader to turn the WHOLE forearm into unlit white line
      // segments instead of a surface.
      .then((text) => new OBJLoader().parse(text.replace(/^l .*$/gm, ''))));
  }
  return meshCache.get(url);
}
let paletteTexture = null;
function palette() {
  if (!paletteTexture) {
    paletteTexture = new THREE.TextureLoader().load(MESH_BASE + 'visual/colors.png');
    paletteTexture.colorSpace = THREE.SRGBColorSpace;
  }
  return paletteTexture;
}

// [mesh file, has texture coordinates] per link. link0 and link7 only ship as
// untextured collision meshes in this URDF, so they get a plain white material.
const LINK_MESHES = [
  ['collision/link0.obj', false],
  ['visual/link1.obj', true], ['visual/link2.obj', true], ['visual/link3.obj', true],
  ['visual/link4.obj', true], ['visual/link5.obj', true], ['visual/link6.obj', true],
  ['collision/link7.obj', false],
];

function makeMaterials(ghost, ghostColor, ghostOpacity) {
  if (ghost) {
    const m = new THREE.MeshBasicMaterial({ color: ghostColor, transparent: true, opacity: ghostOpacity, depthWrite: false });
    return { textured: m, plain: m };
  }
  return {
    textured: new THREE.MeshStandardMaterial({ map: palette(), roughness: 0.55, metalness: 0.05 }),
    plain: new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.55, metalness: 0.05 }),
  };
}

function dress(obj, material, ghost) {
  obj.traverse((o) => {
    if (!o.isMesh) return;
    if (!o.geometry.attributes.normal) o.geometry.computeVertexNormals();
    o.material = material;
    o.castShadow = !ghost;
    o.receiveShadow = false;
  });
  return obj;
}

// Plain-shape stand-ins, used per part only when its mesh can't be loaded.
function fallbackLink(nextXyz, material) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.SphereGeometry(0.06, 20, 14), material));
  const end = new THREE.Vector3(nextXyz[0], nextXyz[1], nextXyz[2]);
  const len = end.length();
  if (len > 1e-4) {
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, len, 20), material);
    cyl.position.copy(end).multiplyScalar(0.5);
    cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().normalize());
    g.add(cyl);
  }
  return g;
}
function fallbackBox(size, center, material) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), material);
  m.position.set(center[0], center[1], center[2]);
  return m;
}

// Build a full, dressed arm. ghost:true gives a faint see-through copy (used to
// show the primary-only motion underneath the composed one).
// ghostColor/ghostOpacity let a light-background render use a dark ghost.
export async function createPanda({ ghost = false, ghostColor = 0xffffff, ghostOpacity = 0.13 } = {}) {
  const chain = buildChain();
  const mats = makeMaterials(ghost, ghostColor, ghostOpacity);
  let usedFallback = false;

  const attach = async (parent, rel, textured, makeFallback, rotZ = 0) => {
    let obj;
    try {
      obj = dress((await loadObj(rel)).clone(), textured ? mats.textured : mats.plain, ghost);
    } catch (err) {
      console.warn(`[panda-rig] could not load ${rel}; using a plain shape instead`, err);
      usedFallback = true;
      obj = dress(makeFallback(), mats.plain, ghost);
    }
    obj.rotation.z = rotZ;
    parent.add(obj);
  };

  const jobs = LINK_MESHES.map(([rel, textured], i) => {
    const next = i < 7 ? JOINTS[i].xyz : [0, 0, FLANGE_Z];
    return attach(chain.links[i], rel, textured, () => fallbackLink(next, mats.plain));
  });
  jobs.push(attach(chain.hand, 'visual/hand.obj', true,
    () => fallbackBox([0.04, 0.2, 0.066], [0, 0, 0.033], mats.plain)));
  const finger = () => fallbackBox([0.02, 0.012, 0.05], [0, 0.008, 0.025], mats.plain);
  jobs.push(attach(chain.fingerL, 'visual/finger.obj', true, finger));
  jobs.push(attach(chain.fingerR, 'visual/finger.obj', true, finger, Math.PI));
  await Promise.all(jobs);

  return { ...chain, ghost, get usedFallback() { return usedFallback; } };
}
