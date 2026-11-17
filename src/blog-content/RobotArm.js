// Robot arm composer: a Franka Panda does a task (the PRIMARY) while a
// swappable feeling (the SECONDARY) is layered on top as small joint offsets.
// Ported from fog-motion-emotion/target_applications/robot-arm.html.
//
// The 3D demo only mounts on the post's own page. Anywhere else (the blog
// index's inline preview) it shows a still image instead, so visitors to the
// index don't download ~9 MB of meshes.
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createPanda, buildChain, clampPose } from './robot-arm/panda-rig.js';
import { PRIMARIES, FEELINGS, composePose } from './robot-arm/arm-motions.js';
import './RobotArm.css';

const SLUG = 'robot-arm';                 // must match this post's slug in data/blogData.js
const POSTER = (process.env.PUBLIC_URL || '') + '/blogpost_images/robot_arm/contact-sheet.png';
const CUBE = 0.04;
const smooth = (s) => { s = Math.min(1, Math.max(0, s)); return s * s * (3 - 2 * s); };
const byId = (list, id) => list.find((x) => x.id === id);

// The demo is only about swapping the feeling under a fixed task, so everything
// else is pinned: no sliders or toggles.
const TASKS = ['pick-place', 'wave', 'reach', 'stand'].map((id) => byId(PRIMARIES, id));
const FIXED = { intensity: 1, speed: 1, light: true, pathsOn: true, yieldAtContact: true, tempoOn: false };
const HINT = 'Drag to look around · click to pause';

// Path colours, matching the paper figure. Feelings without one use the text colour.
const FEELING_COLORS = { happy: 0xe3a008, sad: 0x2f6fde, fear: 0x7b4bc4, angry: 0xd0362b, tired: 0x7986cb };
const TRAIL_SECONDS = 1.2;                 // how much of the hand's recent path stays drawn

// A hand path as a 3D ribbon whose THICKNESS follows speed (thin = slow, thick =
// fast). pts and speed are parallel arrays; vmax is the speed drawn at full width.
function ribbon(pts, speed, vmax, rMin, rMax, material) {
  const kept = [pts[0]], keptSpeed = [speed[0]];
  for (let i = 1; i < pts.length; i++) {
    if (pts[i].distanceTo(kept[kept.length - 1]) > 4e-4) { kept.push(pts[i]); keptSpeed.push(speed[i]); }   // drop the pauses
  }
  if (kept.length < 4) return null;
  const cum = [0];
  for (let i = 1; i < kept.length; i++) cum.push(cum[i - 1] + kept[i].distanceTo(kept[i - 1]));
  const total = cum[cum.length - 1];
  const curve = new THREE.CatmullRomCurve3(kept, false, 'centripetal');
  const segs = Math.min(3000, kept.length * 2), radial = 6;
  curve.arcLengthDivisions = segs * 2;
  const geo = new THREE.TubeGeometry(curve, segs, 1, radial, false);     // unit radius, rescaled ring by ring
  const pos = geo.attributes.position, P = new THREE.Vector3(), v = new THREE.Vector3();
  let k = 0;
  for (let i = 0; i <= segs; i++) {
    const u = i / segs;
    curve.getPointAt(u, P);
    while (k < cum.length - 2 && cum[k + 1] < u * total) k++;
    const a = Math.min(1, Math.max(0, (u * total - cum[k]) / Math.max(1e-9, cum[k + 1] - cum[k])));
    const sp = keptSpeed[k] + (keptSpeed[k + 1] - keptSpeed[k]) * a;
    const r = rMin + (rMax - rMin) * Math.min(1, sp / vmax);
    for (let j = 0; j <= radial; j++) {
      const idx = i * (radial + 1) + j;
      v.fromBufferAttribute(pos, idx).sub(P).multiplyScalar(r).add(P);
      pos.setXYZ(idx, v.x, v.y, v.z);
    }
  }
  return new THREE.Mesh(geo, material);
}

function Choices({ items, current, onPick }) {
  return (
    <div className="ra-choices">
      {items.map((item) => (
        <button key={item.id} type="button" aria-pressed={item.id === current} onClick={() => onPick(item)}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

function RobotArmDemo() {
  const stageRef = useRef(null);

  const [primaryId, setPrimaryId] = useState('pick-place');
  const [feelingId, setFeelingId] = useState('happy');
  const [status, setStatus] = useState('Loading the arm…');

  // The animation loop reads from this plain object, so moving a slider never
  // restarts the 3D scene.
  const sim = useRef(null);
  if (!sim.current) {
    sim.current = {
      primary: byId(PRIMARIES, primaryId), feeling: byId(FEELINGS, feelingId),
      prevFeeling: FEELINGS[0], feelingMix: 1,        // cross-fade when the feeling is swapped
      blendFrom: null, primaryMix: 1,                 // ease from the old pose when the task is swapped
      tTask: 0, tFeel: 0, lastBase: null, playing: true, ...FIXED,
    };
  }
  
  const pickPrimary = (p) => {
    const s = sim.current;
    if (p === s.primary) return;
    s.blendFrom = s.lastBase; s.primaryMix = 0; s.primary = p; s.tTask = 0;
    setPrimaryId(p.id);
  };
  const pickFeeling = (f) => {
    const s = sim.current;
    if (f === s.feeling) return;
    s.prevFeeling = s.feeling; s.feeling = f; s.feelingMix = 0;
    setFeelingId(f.id);
  };

  useEffect(() => {
    const stage = stageRef.current;
    const s = sim.current;
    let cancelled = false, raf = 0, arm = null;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch (err) {
      setStatus('This browser could not start a 3D view.');
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    stage.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x131417);
    const camera = new THREE.PerspectiveCamera(40, 1, 0.05, 30);
    camera.position.set(1.6, 1.0, 1.45);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0.18, 0.4, 0);
    controls.enableDamping = true;
    controls.enableZoom = false;                      // leave the scroll wheel to the page
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;

    // A click (not a drag) on the 3D view pauses / resumes.
    let down = null;
    renderer.domElement.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; });
    renderer.domElement.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5 || performance.now() - down.t > 400) return;
      s.playing = !s.playing;
      setStatus(s.playing ? HINT : 'Paused · click to resume');
    });

    const hemi = new THREE.HemisphereLight(0xffffff, 0x30323a, 1.1);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(1.2, 2.6, 1.6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -1.4, right: 1.4, top: 1.4, bottom: -1.4, near: 0.1, far: 8 });
    sun.shadow.bias = -0.0005;
    scene.add(sun);

    const floor = new THREE.Mesh(new THREE.CircleGeometry(2.2, 64), new THREE.MeshStandardMaterial({ color: 0x1d1f24, roughness: 1 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
    scene.add(floor);
    const grid = new THREE.GridHelper(4, 40, 0x3a3d45, 0x26282e);
    grid.position.y = 0.001;
    scene.add(grid);
    // Light mode swaps the dark floor + grid for a pale disc that only shows shadows.
    const disc = new THREE.Mesh(new THREE.CircleGeometry(0.95, 96), new THREE.MeshBasicMaterial({ color: 0xf3f4f6 }));
    disc.rotation.x = -Math.PI / 2; disc.position.set(0.15, 0, 0);
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.ShadowMaterial({ opacity: 0.2 }));
    shadowPlane.rotation.x = -Math.PI / 2; shadowPlane.position.y = 0.0005; shadowPlane.receiveShadow = true;
    scene.add(disc, shadowPlane);

    const resize = () => {
      const w = stage.clientWidth, h = stage.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();

    // Props for pick-and-place: two stands and a cube.
    const props = new THREE.Group();
    scene.add(props);
    const cube = new THREE.Mesh(new THREE.BoxGeometry(CUBE, CUBE, CUBE), new THREE.MeshStandardMaterial({ color: 0xe8e8ea, roughness: 0.5 }));
    cube.castShadow = true;
    props.add(cube);
    const spots = {};
    const probe = buildChain();                       // meshless copy: "where does the hand end up?"
    const standMat = new THREE.MeshStandardMaterial({ color: 0x8d9099, roughness: 0.8 });
    const propsDef = (PRIMARIES.find((p) => p.props) || {}).props;
    if (propsDef) {
      [['A', propsDef.spotA], ['B', propsDef.spotB]].forEach(([name, pose]) => {
        const at = probe.graspAt(pose);
        const top = Math.max(0.002, at.y - CUBE / 2);
        const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, top, 32), standMat);
        stand.position.set(at.x, top / 2, at.z);
        stand.castShadow = true; stand.receiveShadow = true;
        props.add(stand);
        spots[name] = new THREE.Vector3(at.x, top + CUBE / 2, at.z);
      });
      cube.position.copy(spots.A);
    }

    // Primary pose + bounded feeling offset.
    const compose = (dt) => {
      s.feelingMix = Math.min(1, s.feelingMix + dt / 0.4);
      s.primaryMix = Math.min(1, s.primaryMix + dt / 0.6);
      const fm = smooth(s.feelingMix);
      if (s.playing) {
        const tempo = s.tempoOn ? s.prevFeeling.tempo + (s.feeling.tempo - s.prevFeeling.tempo) * fm : 1;
        s.tTask = (s.tTask + dt * s.speed * tempo) % s.primary.duration;
        s.tFeel += dt;
      }
      // 1. PRIMARY: the absolute pose.
      const base = s.primary.pose(s.tTask);
      if (s.blendFrom && s.primaryMix < 1) {
        const w = smooth(s.primaryMix);
        base.q = base.q.map((v, i) => s.blendFrom.q[i] + (v - s.blendFrom.q[i]) * w);
        base.grip = s.blendFrom.grip + (base.grip - s.blendFrom.grip) * w;
      }
      s.lastBase = base;
      // 2. FEELING: an offset only, cross-faded on swap.
      const a = s.prevFeeling.delta(s.tFeel), b = s.feeling.delta(s.tFeel);
      const delta = {
        dq: a.dq.map((v, i) => v + (b.dq[i] - v) * fm),
        dgrip: a.dgrip + (b.dgrip - a.dgrip) * fm,
      };
      // 3. Add them.
      const out = composePose(base, delta, { intensity: s.intensity, yieldAtContact: s.yieldAtContact });
      return { base, dq: out.dq, q: clampPose(out.q), grip: out.grip };
    };

    // ── paths: the task's own hand path (grey, fixed) + a trail of where the
    // hand actually went (in the feeling's colour). The gap between them is the feeling.
    const pathGroup = new THREE.Group();
    scene.add(pathGroup);
    const baseMat = new THREE.MeshBasicMaterial({ color: 0x6b7078 });
    const trailMat = new THREE.MeshBasicMaterial({ color: 0xe8e8ea });
    let basePath = null, basePathFor = null, trailMesh = null, vmax = 1;
    const trail = [];                                 // { p, v, t } samples of the real hand
    const replace = (old, next) => {
      if (old) { pathGroup.remove(old); old.geometry.dispose(); }
      if (next) pathGroup.add(next);
      return next;
    };
    const rebuildBasePath = () => {
      const DT = 1 / 60, n = Math.round(s.primary.duration / DT), pts = [];
      for (let i = 0; i <= n; i++) {
        const pose = s.primary.pose(Math.min(i * DT, s.primary.duration - 1e-6));
        pts.push(probe.graspAt(pose.q, pose.grip));
      }
      const speed = pts.map((_, i) => pts[Math.max(0, i - 1)].distanceTo(pts[Math.min(n, i + 1)]) / (2 * DT));
      vmax = Math.max(0.25, 1.6 * Math.max(...speed));
      basePath = replace(basePath, ribbon(pts, speed, vmax, 0.0012, 0.0042, baseMat));
      basePathFor = s.primary;
      trail.length = 0;
      trailMesh = replace(trailMesh, null);
    };

    // ── theme ──
    const hulls = [];                                 // light mode: a thin dark outline around every link
    const outlineMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: { thickness: { value: 0.0022 }, color: { value: new THREE.Color(0x5f646c) } },
      vertexShader: 'uniform float thickness; void main(){ vec3 p = position + normalize(normal) * thickness; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }',
      fragmentShader: 'uniform vec3 color; void main(){ gl_FragColor = vec4(color, 1.0); }',
    });
    let themeApplied = null;
    const applyTheme = (isLight) => {
      themeApplied = isLight;
      scene.background.set(isLight ? 0xffffff : 0x131417);
      hemi.groundColor.set(isLight ? 0xa4a8b0 : 0x30323a);
      hemi.intensity = isLight ? 1.3 : 1.1;
      sun.intensity = isLight ? 1.5 : 2.2;
      floor.visible = !isLight; grid.visible = !isLight;
      disc.visible = isLight; shadowPlane.visible = isLight;
      standMat.color.set(isLight ? 0xc3c7ce : 0x8d9099);
      cube.material.color.set(isLight ? 0x3a3d45 : 0xe8e8ea);
      baseMat.color.set(isLight ? 0x9aa0a8 : 0x6b7078);
      hulls.forEach((h) => { h.visible = isLight; });
    };
    applyTheme(s.light);

    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      controls.update();
      if (s.light !== themeApplied) applyTheme(s.light);
      if (arm) {
        const out = compose(dt);
        arm.setPose(out.q, out.grip);

        // Paths.
        pathGroup.visible = s.pathsOn;
        if (s.pathsOn) {
          if (basePathFor !== s.primary) rebuildBasePath();
          if (s.playing) {
            arm.root.updateMatrixWorld(true);
            const p = arm.grasp.getWorldPosition(new THREE.Vector3());
            const last = trail[trail.length - 1];
            const v = last ? last.v + (p.distanceTo(last.p) / Math.max(dt, 1e-4) - last.v) * 0.35 : 0;
            trail.push({ p, v, t: s.tFeel });
            while (trail.length && s.tFeel - trail[0].t > TRAIL_SECONDS) trail.shift();
            trailMat.color.set(FEELING_COLORS[s.feeling.id] || (s.light ? 0x3a3d45 : 0xe8e8ea));
            trailMesh = replace(trailMesh, trail.length > 6
              ? ribbon(trail.map((e) => e.p), trail.map((e) => e.v), vmax, 0.002, 0.0085, trailMat) : null);
          }
        }
        // Cube: rides in the hand while held, otherwise rests on a stand.
        props.visible = !!s.primary.props;
        if (props.visible) {
          const where = s.primary.props.cubeAt(s.tTask);
          const ease = 1 - Math.exp(-18 * dt);
          if (where === 'held') {
            arm.root.updateMatrixWorld(true);
            cube.position.lerp(arm.grasp.getWorldPosition(tmp), Math.max(ease, 0.6));
            arm.hand.getWorldQuaternion(cube.quaternion);
          } else {
            cube.position.lerp(spots[where], ease);
            cube.quaternion.identity();
          }
        }
      }
      renderer.render(scene, camera);
    };

    createPanda()
      .then((a) => {
        if (cancelled) return;
        arm = a;
        scene.add(arm.root);
        const meshes = [];
        arm.root.traverse((m) => { if (m.isMesh) meshes.push(m); });
        meshes.forEach((m) => { const hull = new THREE.Mesh(m.geometry, outlineMat); m.add(hull); hulls.push(hull); });
        applyTheme(s.light);
        setStatus(arm.usedFallback
          ? 'Some parts of the arm did not load, so they are drawn as plain shapes.'
          : HINT);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setStatus('Could not load the arm: ' + err.message);
      });
    frame();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      controls.dispose();
      replace(basePath, null); replace(trailMesh, null);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const primary = byId(PRIMARIES, primaryId), feeling = byId(FEELINGS, feelingId);

  return (
    <div>
    <p>
  A little exploration on my day off. At my PhD defense, I talked about how it would be interesting to extend fog, a paper I wrote on code generation for expressive motion, to 3D motion. 
  
  The idea of the paper was that we can implement functions and compose them as primary and secondary motion layers. This split can correspond to how we express motion in language and words. For example, we can generate functions for verbs (wave(), pickAndPlace()), which own the speed and trajectory of the motion. We can also generate adverbs and emotion functions, which modify the manner and feeling of the verb. Then we can compose these bespokely generated functions. (I called it fog because it was inspired by f of g of x -- the main function composition we learn in school.) While in my paper I focused on Heider Simmel animations, abstract shape animation scenes, I wanted to show generalizability. And the answer to that in my head was to show that it has transferability to other domains like robotics as well!
    </p>
    <p> There's a lot more I want to do and try here. I want to add sketch input (sketch a path in 3D space). I could also imagine an interaction between a hand and a robot arm -- and how people could choreograph a human-robot interaction. :) </p>

    <div className="ra-demo ra-light">
      <div className="ra-stage" ref={stageRef}>
        <div className="ra-formula"><b>{primary.label}</b> + <b>{feeling.label}</b></div>
        <div className="ra-status">{status}</div>
      </div>

      <div className="ra-panel">
        <section>
          <h4>Primary · the task</h4>
          <Choices items={TASKS} current={primaryId} onPick={pickPrimary} />
          <p className="ra-blurb">{primary.blurb}</p>
        </section>

        <section>
          <h4>Secondary · the feeling</h4>
          <Choices items={FEELINGS} current={feelingId} onPick={pickFeeling} />
          <p className="ra-blurb">{feeling.blurb}</p>
        </section>
      </div>
    </div>
    </div>
  );
}

// `live`: render the real demo even off the post page (the blog index's
// hover preview passes this, so the meshes load only when someone hovers).
function RobotArm({ live = false }) {
  const { pathname } = useLocation();
  const onPostPage = pathname.replace(/\/+$/, '').endsWith('/blog/' + SLUG);
  const poster = (
    <img className="ra-poster" src={POSTER} alt="A robot arm carrying a cube with default performance, then happy, sad and afraid feeling." />
  );
  if (!onPostPage && !live) return poster;
  // The post page gets the interactive demo plus the static contact sheet below
  // it; the blog index's hover preview (live) gets just the demo.
  if (live && !onPostPage) return <RobotArmDemo />;
  return (
    <>
      <RobotArmDemo />
      {/* {poster} */}
    </>
  );
}

export default RobotArm;
