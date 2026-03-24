import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useRef, useMemo } from "react";
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

function GlobeWireframe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });

  const gridLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    // latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lon = 0; lon <= 360; lon += 5) {
        pts.push(latLonToVec3(lat, lon, 2.01));
      }
      lines.push(pts);
    }
    // longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        pts.push(latLonToVec3(lat, lon, 2.01));
      }
      lines.push(pts);
    }
    return lines;
  }, []);

  return (
    <group ref={ref}>
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial color="#0a1628" transparent opacity={0.85} />
      </Sphere>
      <Sphere args={[2.005, 64, 64]}>
        <meshBasicMaterial color="#1e40af" wireframe transparent opacity={0.12} />
      </Sphere>

      {gridLines.map((pts, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={pts.length}
              array={new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3b82f6" transparent opacity={0.08} />
        </line>
      ))}

      {hotspots.map((h, i) => {
        const pos = latLonToVec3(h.lat, h.lon, 2.02);
        return (
          <group key={i}>
            <mesh position={pos}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color={h.color} />
            </mesh>
            <mesh position={pos}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={h.color} transparent opacity={0.2} />
            </mesh>
          </group>
        );
      })}

      {/* arcs */}
      {[
        [hotspots[0], hotspots[3]],
        [hotspots[1], hotspots[4]],
        [hotspots[5], hotspots[2]],
      ].map(([a, b], i) => {
        const start = latLonToVec3(a.lat, a.lon, 2.02);
        const end = latLonToVec3(b.lat, b.lon, 2.02);
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(3.2);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const pts = curve.getPoints(50);
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
            <lineBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
          </line>
        );
      })}
    </group>
  );
}

const HeroGlobe = () => (
  <div className="w-full h-[420px] lg:h-[500px] relative">
    <div className="absolute inset-0 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
        <GlobeWireframe />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background" />
  </div>
);

export default HeroGlobe;
