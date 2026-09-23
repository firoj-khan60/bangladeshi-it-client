"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { decodeWorldMask, WORLD_MASK_HEIGHT, WORLD_MASK_WIDTH } from "./worldMask";

type Palette = {
  primary: string;
  blue: string;
  fg: string;
  city: string;
  land: string;
  ocean: string;
  arc: string;
};

const FALLBACK: Palette = {
  primary: "#22a577",
  blue: "#4f7cff",
  fg: "#ffffff",
  city: "#ffc46b",
  land: "#2f8f7a",
  ocean: "#0c1830",
  arc: "#ffffff",
};

const RADIUS = 1.62;

/**
 * Resolves a CSS custom property (which may be oklch) to a hex string THREE
 * understands, by painting it onto a 1px canvas and reading the pixel back.
 * Keeps globals.css as the single source of color for the 3D scene too.
 */
function readToken(name: string, fallback: string): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw) return fallback;
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return fallback;
  ctx.fillStyle = raw;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function usePalette(): Palette {
  const [palette, setPalette] = useState<Palette>(FALLBACK);

  useEffect(() => {
    const read = () =>
      setPalette({
        primary: readToken("--primary", FALLBACK.primary),
        blue: readToken("--brand-blue", FALLBACK.blue),
        fg: readToken("--foreground", FALLBACK.fg),
        city: readToken("--city-light", FALLBACK.city),
        land: readToken("--globe-land", FALLBACK.land),
        ocean: readToken("--globe-ocean", FALLBACK.ocean),
        arc: readToken("--globe-arc", FALLBACK.arc),
      });
    read();
    // next-themes toggles the `dark` class on <html>; re-read tokens when it does.
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return palette;
}

/** Small seeded PRNG so the "cities" are the same on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Lat/lon (degrees) → point on the sphere, matching SphereGeometry's UV layout. */
function latLonToVector(lat: number, lon: number, radius: number) {
  const phi = ((lon + 180) / 360) * Math.PI * 2;
  const theta = ((90 - lat) / 180) * Math.PI;
  return new THREE.Vector3(
    -radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function makeIsLand(mask: Uint8Array) {
  return (lat: number, lon: number) => {
    const x = Math.min(WORLD_MASK_WIDTH - 1, Math.max(0, Math.floor(((lon + 180) / 360) * WORLD_MASK_WIDTH)));
    const y = Math.min(WORLD_MASK_HEIGHT - 1, Math.max(0, Math.floor(((lat + 90) / 180) * WORLD_MASK_HEIGHT)));
    return mask[y * WORLD_MASK_WIDTH + x] > 0;
  };
}

const DHAKA = { lat: 23.8, lon: 90.4 };

/**
 * "City lights" placed only on land: Dhaka plus a set of random hubs, each
 * with a cluster of smaller lights, and a light sprinkle across the
 * continents. Returns every light (points cloud) and the hubs (arc endpoints).
 */
function cityLights(isLand: (lat: number, lon: number) => boolean, hubCount: number, radius: number) {
  const rand = mulberry32(7);
  const hubCoords = [DHAKA];
  for (let tries = 0; hubCoords.length < hubCount && tries < 5000; tries++) {
    const lat = -45 + rand() * 110;
    const lon = rand() * 360 - 180;
    if (isLand(lat, lon)) hubCoords.push({ lat, lon });
  }

  const all: number[] = [];
  const push = (lat: number, lon: number) => {
    const p = latLonToVector(lat, lon, radius);
    all.push(p.x, p.y, p.z);
  };
  for (const { lat, lon } of hubCoords) {
    push(lat, lon);
    for (let i = 0; i < 18; i++) {
      const la = lat + (rand() + rand() - 1) * 5;
      const lo = lon + (rand() + rand() - 1) * 7;
      if (isLand(la, lo)) push(la, lo);
    }
  }
  for (let i = 0, placed = 0; placed < 260 && i < 5000; i++) {
    const lat = -50 + rand() * 120;
    const lon = rand() * 360 - 180;
    if (isLand(lat, lon)) {
      push(lat, lon);
      placed++;
    }
  }

  return {
    hubs: hubCoords.map(({ lat, lon }) => latLonToVector(lat, lon, radius)),
    positions: new Float32Array(all),
  };
}

/** Soft round glow sprite for the city-light points. */
function glowSprite() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  return new THREE.CanvasTexture(canvas);
}

const EARTH_VERTEX = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

// Land/ocean from the mask, a fine grain for texture, soft directional
// shading, and a fresnel rim so the edge glows like an atmosphere.
const EARTH_FRAGMENT = /* glsl */ `
  uniform sampler2D uMask;
  uniform vec3 uLand;
  uniform vec3 uOcean;
  uniform vec3 uRim;
  uniform vec3 uLightDir;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    float land = smoothstep(0.3, 0.7, texture2D(uMask, vUv).r);
    float grain = hash(floor(vUv * vec2(2048.0, 1024.0)));
    vec3 landCol = uLand * (0.7 + 0.5 * grain);
    vec3 oceanCol = uOcean * (0.85 + 0.3 * grain);
    vec3 col = mix(oceanCol, landCol, land);

    float light = dot(vNormalW, normalize(uLightDir)) * 0.55 + 0.6;
    col *= clamp(light, 0.3, 1.15);

    float fresnel = pow(1.0 - max(dot(vNormalW, vViewDir), 0.0), 2.5);
    col += uRim * fresnel * 0.85;

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

const ATMOSPHERE_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMOSPHERE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(max(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0);
    gl_FragColor = vec4(uColor, 1.0) * intensity;
    #include <colorspace_fragment>
  }
`;

function Orbit({
  radius,
  tilt,
  speed,
  color,
  satColor,
  animate,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  satColor: string;
  animate: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (animate && ref.current) ref.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.006, 8, 160]} />
          <meshBasicMaterial color={color} transparent opacity={0.45} />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.08, 20, 20]} />
          <meshBasicMaterial color={satColor} />
        </mesh>
        <mesh position={[-radius, 0, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color={satColor} transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
}

const ARC_SEGMENTS = 80;
const ARC_TAIL = 26;

type ArcState = { t: number; speed: number; wait: number; points: THREE.Vector3[] };

/**
 * Light streaks that hop between cities: each arc lifts off one hub, curves
 * over the surface and lands on another, drawn as a moving comet (bright head
 * plus a fading tail). When one lands, it re-launches between a new pair —
 * so the globe keeps zig-zagging with traffic.
 */
function Arcs({
  hubs,
  color,
  headColor,
  animate,
  count = 6,
}: {
  hubs: THREE.Vector3[];
  color: string;
  headColor: string;
  animate: boolean;
  count?: number;
}) {
  const rand = useMemo(() => mulberry32(42), []);

  const arcs = useMemo(
    () =>
      Array.from({ length: count }, () => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(new Float32Array((ARC_SEGMENTS + 1) * 3), 3),
        );
        const line = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ transparent: true, opacity: 0.95, depthWrite: false }),
        );
        const head = new THREE.Mesh(
          new THREE.SphereGeometry(0.03, 12, 12),
          new THREE.MeshBasicMaterial({ transparent: true }),
        );
        return { line, head };
      }),
    [count],
  );

  const state = useRef<ArcState[]>(
    Array.from({ length: count }, (_, i) => ({ t: 0, speed: 0.5, wait: i * 0.7, points: [] })),
  );

  // (Re)build one arc's curve between two random, not-too-close hubs.
  const launch = (i: number) => {
    // Hub 0 is Dhaka — a good share of the traffic starts from home.
    const pickA = () => (rand() < 0.35 ? hubs[0] : hubs[Math.floor(rand() * hubs.length)]);
    let a = pickA();
    let b = hubs[Math.floor(rand() * hubs.length)];
    for (let tries = 0; tries < 10 && a.angleTo(b) < 0.5; tries++) {
      a = pickA();
      b = hubs[Math.floor(rand() * hubs.length)];
    }
    const lift = RADIUS + 0.25 + a.angleTo(b) * 0.45;
    const mid = a.clone().add(b).setLength(lift);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const pts = curve.getPoints(ARC_SEGMENTS);
    const attr = arcs[i].line.geometry.getAttribute("position") as THREE.BufferAttribute;
    pts.forEach((p, k) => attr.setXYZ(k, p.x, p.y, p.z));
    attr.needsUpdate = true;
    state.current[i] = { t: 0, speed: 0.45 + rand() * 0.35, wait: rand() * 0.8, points: pts };
  };

  // Initial curves, and cleanup of the imperatively created GPU resources.
  useEffect(() => {
    arcs.forEach((_, i) => {
      launch(i);
      state.current[i].wait = i * 0.6;
    });
    return () => {
      arcs.forEach(({ line, head }) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
        head.geometry.dispose();
        (head.material as THREE.Material).dispose();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arcs]);

  useEffect(() => {
    arcs.forEach(({ line, head }) => {
      (line.material as THREE.LineBasicMaterial).color.set(color);
      (head.material as THREE.MeshBasicMaterial).color.set(headColor);
    });
  }, [arcs, color, headColor]);

  useFrame((_, delta) => {
    arcs.forEach(({ line, head }, i) => {
      const s = state.current[i];
      const { points } = s;
      if (!points.length) return;

      if (!animate) {
        // Static frame: show each arc fully drawn.
        line.geometry.setDrawRange(0, ARC_SEGMENTS + 1);
        head.visible = false;
        return;
      }

      if (s.wait > 0) {
        s.wait -= delta;
        line.geometry.setDrawRange(0, 0);
        head.visible = false;
        return;
      }

      s.t += delta * s.speed;
      const headIdx = Math.floor(s.t * (ARC_SEGMENTS + ARC_TAIL));
      const end = Math.min(headIdx, ARC_SEGMENTS);
      const start = Math.max(0, headIdx - ARC_TAIL);
      line.geometry.setDrawRange(start, Math.max(0, end - start + 1));

      head.visible = headIdx <= ARC_SEGMENTS;
      if (head.visible) head.position.copy(points[end]);

      if (start >= ARC_SEGMENTS) launch(i);
    });
  });

  return (
    <>
      {arcs.map(({ line, head }, i) => (
        <group key={i}>
          <primitive object={line} />
          <primitive object={head} />
        </group>
      ))}
    </>
  );
}

function Globe({ palette, animate }: { palette: Palette; animate: boolean }) {
  const root = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const cityMat = useRef<THREE.PointsMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const mask = useMemo(() => decodeWorldMask(), []);
  const cities = useMemo(() => cityLights(makeIsLand(mask), 32, RADIUS + 0.006), [mask]);
  const sprite = useMemo(() => glowSprite(), []);

  const maskTexture = useMemo(() => {
    const tex = new THREE.DataTexture(
      mask,
      WORLD_MASK_WIDTH,
      WORLD_MASK_HEIGHT,
      THREE.RedFormat,
      THREE.UnsignedByteType,
    );
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, [mask]);

  const earthMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: EARTH_VERTEX,
        fragmentShader: EARTH_FRAGMENT,
        uniforms: {
          uMask: { value: maskTexture },
          uLand: { value: new THREE.Color(FALLBACK.land) },
          uOcean: { value: new THREE.Color(FALLBACK.ocean) },
          uRim: { value: new THREE.Color(FALLBACK.blue) },
          uLightDir: { value: new THREE.Vector3(-0.6, 0.55, 0.9) },
        },
      }),
    [maskTexture],
  );

  const atmosphereMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: ATMOSPHERE_VERTEX,
        fragmentShader: ATMOSPHERE_FRAGMENT,
        uniforms: { uColor: { value: new THREE.Color(FALLBACK.primary) } },
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );

  // Push theme colors into the shaders whenever the palette changes.
  useEffect(() => {
    earthMaterial.uniforms.uLand.value.set(palette.land);
    earthMaterial.uniforms.uOcean.value.set(palette.ocean);
    earthMaterial.uniforms.uRim.value.set(palette.blue);
    atmosphereMaterial.uniforms.uColor.value.set(palette.primary);
  }, [earthMaterial, atmosphereMaterial, palette]);

  useEffect(
    () => () => {
      maskTexture.dispose();
      earthMaterial.dispose();
      atmosphereMaterial.dispose();
      sprite.dispose();
    },
    [maskTexture, earthMaterial, atmosphereMaterial, sprite],
  );

  // Track the pointer across the whole window, not just the canvas, so the
  // globe leans toward the cursor while the user reads the hero copy.
  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  useFrame((state, delta) => {
    const g = root.current;
    const s = spin.current;
    if (!g || !s || !animate) return;
    s.rotation.y += delta * 0.05;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * 0.25, 0.04);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.current.x * 0.4, 0.04);
    // Entrance: grow in from nothing.
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, 1, 0.045));
    // City lights shimmer gently.
    if (cityMat.current) {
      cityMat.current.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 2.2) * 0.2;
    }
  });

  return (
    <group ref={root} scale={animate ? 0.2 : 1}>
      {/* Starts with Bangladesh facing the viewer (y = π), tilted like Earth's axis. */}
      <group ref={spin} rotation={[0.42, Math.PI, 0.08]}>
        <mesh material={earthMaterial}>
          <sphereGeometry args={[RADIUS, 96, 96]} />
        </mesh>
        {/* City lights */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[cities.positions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            ref={cityMat}
            map={sprite}
            color={palette.city}
            size={0.07}
            sizeAttenuation
            transparent
            opacity={0.9}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        {/* Traffic arcs between cities */}
        <Arcs hubs={cities.hubs} color={palette.arc} headColor={palette.city} animate={animate} />
      </group>

      {/* Atmosphere glow */}
      <mesh material={atmosphereMaterial} scale={1.16}>
        <sphereGeometry args={[RADIUS, 64, 64]} />
      </mesh>

      <Orbit radius={2.3} tilt={[1.2, 0.35, 0]} speed={0.35} color={palette.arc} satColor={palette.blue} animate={animate} />
      <Orbit radius={2.7} tilt={[1.85, -0.55, 0.4]} speed={-0.22} color={palette.primary} satColor={palette.primary} animate={animate} />
      <Orbit radius={3.05} tilt={[1.45, 0.9, -0.3]} speed={0.14} color={palette.blue} satColor={palette.city} animate={animate} />
    </group>
  );
}

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const palette = usePalette();
  const [inView, setInView] = useState(true);
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Stop rendering frames once the hero is scrolled away.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const animate = !reducedMotion;

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={animate && inView ? "always" : "demand"}
      >
        <Globe palette={palette} animate={animate} />
      </Canvas>
    </div>
  );
}
