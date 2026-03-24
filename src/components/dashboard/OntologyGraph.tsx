import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
  children?: { label: string; color: string }[];
}

interface Edge {
  source: string;
  target: string;
  label: string;
}

const initialNodes: Node[] = [
  { id: "gov", label: "Government", x: 400, y: 250, vx: 0, vy: 0, color: "#3b82f6", radius: 35, children: [{ label: "Policy", color: "#60a5fa" }, { label: "Elections", color: "#93c5fd" }, { label: "Legislation", color: "#2563eb" }] },
  { id: "eco", label: "Economy", x: 250, y: 150, vx: 0, vy: 0, color: "#10b981", radius: 30, children: [{ label: "GDP", color: "#34d399" }, { label: "Trade", color: "#6ee7b7" }] },
  { id: "cli", label: "Climate", x: 550, y: 150, vx: 0, vy: 0, color: "#f59e0b", radius: 28, children: [{ label: "Carbon", color: "#fbbf24" }, { label: "Weather", color: "#fcd34d" }] },
  { id: "def", label: "Defense", x: 250, y: 380, vx: 0, vy: 0, color: "#ef4444", radius: 30, children: [{ label: "Military", color: "#f87171" }, { label: "Cyber", color: "#fca5a5" }] },
  { id: "soc", label: "Society", x: 550, y: 380, vx: 0, vy: 0, color: "#8b5cf6", radius: 28, children: [{ label: "Health", color: "#a78bfa" }, { label: "Education", color: "#c4b5fd" }] },
  { id: "tech", label: "Technology", x: 400, y: 450, vx: 0, vy: 0, color: "#06b6d4", radius: 28, children: [{ label: "AI", color: "#22d3ee" }, { label: "Data", color: "#67e8f9" }] },
];

const edges: Edge[] = [
  { source: "gov", target: "eco", label: "regulates" },
  { source: "gov", target: "def", label: "directs" },
  { source: "eco", target: "cli", label: "impacts" },
  { source: "cli", target: "soc", label: "affects" },
  { source: "soc", target: "gov", label: "influences" },
  { source: "tech", target: "eco", label: "disrupts" },
  { source: "tech", target: "def", label: "enables" },
  { source: "def", target: "soc", label: "protects" },
  { source: "gov", target: "tech", label: "funds" },
];

const OntologyGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>(initialNodes.map((n) => ({ ...n })));
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const animRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        // reposition nodes proportionally
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const scale = Math.min(rect.width, rect.height) / 550;
        nodesRef.current.forEach((n, i) => {
          const orig = initialNodes[i];
          n.x = cx + (orig.x - 400) * scale;
          n.y = cy + (orig.y - 280) * scale;
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;

      // Draw edges
      edges.forEach((e) => {
        const src = nodes.find((n) => n.id === e.source)!;
        const tgt = nodes.find((n) => n.id === e.target)!;
        const isHighlighted = hoveredNode === e.source || hoveredNode === e.target;

        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.strokeStyle = isHighlighted
          ? `hsla(210, 100%, 56%, 0.6)`
          : `hsla(210, 100%, 56%, 0.12)`;
        ctx.lineWidth = isHighlighted ? 2 : 1;
        ctx.stroke();

        // Animated particle on edge
        const t = (time * 0.5 + edges.indexOf(e) * 0.17) % 1;
        const px = src.x + (tgt.x - src.x) * t;
        const py = src.y + (tgt.y - src.y) * t;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? `hsla(210, 100%, 70%, 0.8)` : `hsla(210, 100%, 56%, 0.3)`;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((n) => {
        const isHovered = hoveredNode === n.id;
        const pulse = Math.sin(time * 2 + nodes.indexOf(n)) * 3;

        // Glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius + 20 + pulse);
        grad.addColorStop(0, n.color + "40");
        grad.addColorStop(1, n.color + "00");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 20 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + (isHovered ? 4 : 0), 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? n.color + "cc" : n.color + "88";
        ctx.fill();
        ctx.strokeStyle = n.color;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        // Label
        ctx.fillStyle = "#e2e8f0";
        ctx.font = `${isHovered ? "bold " : ""}12px 'Rajdhani', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [hoveredNode]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clicked = nodesRef.current.find(
      (n) => Math.hypot(n.x - x, n.y - y) < n.radius + 5
    );
    setSelectedNode(clicked || null);
  };

  const handleCanvasMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hovered = nodesRef.current.find(
      (n) => Math.hypot(n.x - x, n.y - y) < n.radius + 5
    );
    setHoveredNode(hovered?.id || null);
  };

  return (
    <div className="relative" ref={containerRef}>
      <h2 className="font-display text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">
        Ontology Intelligence Graph
      </h2>
      <div className="glass-panel-glow-violet p-2 relative" style={{ height: "420px" }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-pointer"
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMove}
          onMouseLeave={() => setHoveredNode(null)}
        />
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-4 right-4 glass-panel p-4 min-w-[180px]"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-lg font-bold" style={{ color: selectedNode.color }}>
                  {selectedNode.label}
                </h3>
                <button onClick={() => setSelectedNode(null)} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
              </div>
              <div className="space-y-2">
                {selectedNode.children?.map((c) => (
                  <div key={c.label} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-sm text-foreground">{c.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OntologyGraph;
