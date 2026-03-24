import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const hotspots = [
  { lat: 28.6, lon: 77.2, color: "#22d3ee", label: "Delhi" },
  { lat: 19.07, lon: 72.87, color: "#10b981", label: "Mumbai" },
  { lat: 13.08, lon: 80.27, color: "#f59e0b", label: "Chennai" },
  { lat: 40.71, lon: -74.0, color: "#ef4444", label: "New York" },
  { lat: 51.5, lon: -0.12, color: "#8b5cf6", label: "London" },
  { lat: 35.68, lon: 139.69, color: "#22d3ee", label: "Tokyo" },
  { lat: -33.86, lon: 151.2, color: "#10b981", label: "Sydney" },
  { lat: 55.75, lon: 37.61, color: "#ef4444", label: "Moscow" },
  { lat: -23.55, lon: -46.63, color: "#f59e0b", label: "São Paulo" },
  { lat: 1.35, lon: 103.82, color: "#8b5cf6", label: "Singapore" },
  { lat: 25.2, lon: 55.27, color: "#22d3ee", label: "Dubai" },
  { lat: 37.77, lon: -122.42, color: "#10b981", label: "San Francisco" },
];

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function EarthGlobe() {
  const ref = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, "https://unpkg.com/three-globe@2.31.0/example/img/earth-night.jpg");
  const bumpMap = useLoader(THREE.TextureLoader, "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png");

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={ref}>
      {/* Earth with real texture */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial
          map={texture}
          bumpMap={bumpMap}
          bumpScale={0.03}
          metalness={0.1}
          roughness={0.7}
        />
      </Sphere>

      {/* Atmosphere glow shell */}
      <Sphere args={[2.06, 64, 64]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.04} side={THREE.BackSide} />
      </Sphere>
      <Sphere args={[2.12, 64, 64]}>
        <meshBasicMaterial color="#1e40af" transparent opacity={0.02} side={THREE.BackSide} />
      </Sphere>

      {/* Hotspots */}
      {hotspots.map((h, i) => {
        const pos = latLonToVec3(h.lat, h.lon, 2.02);
        return (
          <group key={i}>
            <mesh position={pos}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshBasicMaterial color={h.color} />
            </mesh>
            <mesh position={pos}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color={h.color} transparent opacity={0.2} />
            </mesh>
            {/* Pulse ring */}
            <mesh position={pos} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.06, 0.09, 32]} />
              <meshBasicMaterial color={h.color} transparent opacity={0.15} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}

      {/* Data flow arcs */}
      {[
        [hotspots[0], hotspots[3]],
        [hotspots[1], hotspots[4]],
        [hotspots[5], hotspots[2]],
        [hotspots[0], hotspots[10]],
        [hotspots[3], hotspots[8]],
        [hotspots[9], hotspots[5]],
        [hotspots[11], hotspots[4]],
      ].map(([a, b], i) => {
        const start = latLonToVec3(a.lat, a.lon, 2.02);
        const end = latLonToVec3(b.lat, b.lon, 2.02);
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(3.0);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const pts = curve.getPoints(60);
        return (
          <line key={`arc-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={pts.length}
                array={new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={i % 2 === 0 ? "#8b5cf6" : "#22d3ee"} transparent opacity={0.35} />
          </line>
        );
      })}
    </group>
  );
}

function GlobeFallback() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });
  return (
    <group ref={ref}>
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial color="#0a1628" transparent opacity={0.85} />
      </Sphere>
      <Sphere args={[2.005, 64, 64]}>
        <meshBasicMaterial color="#1e40af" wireframe transparent opacity={0.15} />
      </Sphere>
    </group>
  );
}

const HeroGlobe = () => (
  <div className="w-full h-[420px] lg:h-[500px] relative">
    <div className="absolute inset-0 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 3, 5]} intensity={0.8} color="#e2e8f0" />
        <pointLight position={[-10, -5, -10]} intensity={0.3} color="#3b82f6" />
        <pointLight position={[10, 5, 10]} intensity={0.2} color="#8b5cf6" />
        <Suspense fallback={<GlobeFallback />}>
          <EarthGlobe />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background" />
  </div>
);

export default HeroGlobe;
