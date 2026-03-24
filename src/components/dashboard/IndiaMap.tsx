import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StateData {
  id: string;
  name: string;
  path: string;
  sentiment: number;
  volume: string;
  trend: string;
  topIssue: string;
}

const statesData: StateData[] = [
  { id: "jk", name: "Jammu & Kashmir", path: "M168,28 L192,18 L218,22 L238,38 L228,62 L218,78 L198,82 L178,72 L162,58 L158,42 Z", sentiment: 0.55, volume: "85K", trend: "→", topIssue: "Security" },
  { id: "hp", name: "Himachal Pradesh", path: "M218,78 L238,72 L252,82 L248,98 L232,102 L218,98 L210,88 Z", sentiment: 0.62, volume: "45K", trend: "↑", topIssue: "Tourism" },
  { id: "pb", name: "Punjab", path: "M178,82 L198,82 L210,88 L218,98 L212,112 L192,118 L172,112 L168,96 Z", sentiment: 0.58, volume: "120K", trend: "↑", topIssue: "Agriculture" },
  { id: "hr", name: "Haryana", path: "M192,118 L212,112 L228,118 L232,138 L222,148 L202,148 L188,140 L186,128 Z", sentiment: 0.51, volume: "98K", trend: "→", topIssue: "Infrastructure" },
  { id: "dl", name: "Delhi", path: "M212,142 L218,138 L222,142 L222,148 L218,152 L212,148 Z", sentiment: 0.45, volume: "280K", trend: "↓", topIssue: "Pollution" },
  { id: "rj", name: "Rajasthan", path: "M88,128 L168,112 L186,128 L188,140 L202,148 L198,178 L192,218 L168,248 L118,258 L78,238 L62,198 L68,158 Z", sentiment: 0.61, volume: "140K", trend: "↑", topIssue: "Water" },
  { id: "up", name: "Uttar Pradesh", path: "M228,118 L262,108 L298,118 L328,128 L342,152 L332,178 L308,192 L278,198 L248,198 L222,188 L198,178 L202,148 L222,148 Z", sentiment: 0.38, volume: "410K", trend: "↓", topIssue: "Employment" },
  { id: "bh", name: "Bihar", path: "M328,168 L358,158 L378,168 L378,192 L362,202 L338,202 L322,192 L322,178 Z", sentiment: 0.42, volume: "155K", trend: "↓", topIssue: "Education" },
  { id: "wb", name: "West Bengal", path: "M362,202 L378,192 L392,198 L398,228 L392,262 L378,288 L362,298 L352,278 L348,248 L342,222 L348,208 Z", sentiment: 0.52, volume: "180K", trend: "→", topIssue: "Economy" },
  { id: "gj", name: "Gujarat", path: "M42,238 L78,238 L88,258 L98,288 L88,318 L68,338 L42,342 L28,322 L22,298 L28,268 L38,248 Z", sentiment: 0.74, volume: "160K", trend: "↑", topIssue: "Industry" },
  { id: "mp", name: "Madhya Pradesh", path: "M118,258 L168,248 L222,248 L278,248 L298,268 L298,298 L278,318 L238,328 L188,328 L148,318 L118,298 L108,278 Z", sentiment: 0.56, volume: "130K", trend: "→", topIssue: "Agriculture" },
  { id: "mh", name: "Maharashtra", path: "M88,318 L118,298 L148,318 L188,328 L238,328 L258,342 L262,372 L248,398 L218,408 L178,402 L138,388 L108,368 L82,348 Z", sentiment: 0.72, volume: "340K", trend: "↑", topIssue: "Economy" },
  { id: "cg", name: "Chhattisgarh", path: "M278,288 L308,278 L328,292 L338,318 L328,342 L308,348 L288,338 L278,318 L278,298 Z", sentiment: 0.48, volume: "72K", trend: "→", topIssue: "Mining" },
  { id: "od", name: "Odisha", path: "M308,298 L342,288 L362,298 L372,322 L358,352 L332,368 L308,358 L298,338 L308,318 Z", sentiment: 0.54, volume: "95K", trend: "↑", topIssue: "Disaster Mgmt" },
  { id: "ka", name: "Karnataka", path: "M138,388 L178,402 L218,408 L232,428 L228,458 L208,478 L178,478 L152,462 L132,438 L128,412 Z", sentiment: 0.81, volume: "190K", trend: "↑", topIssue: "Technology" },
  { id: "ap", name: "Andhra Pradesh", path: "M218,372 L262,372 L298,378 L318,368 L332,382 L328,408 L302,432 L272,448 L248,442 L232,428 L218,408 Z", sentiment: 0.59, volume: "145K", trend: "↑", topIssue: "Development" },
  { id: "tl", name: "Telangana", path: "M218,342 L258,342 L278,358 L298,378 L262,372 L218,372 L208,358 Z", sentiment: 0.63, volume: "110K", trend: "↑", topIssue: "IT Sector" },
  { id: "tn", name: "Tamil Nadu", path: "M208,478 L228,458 L248,442 L272,448 L282,468 L278,498 L258,518 L232,528 L212,518 L198,498 Z", sentiment: 0.68, volume: "220K", trend: "→", topIssue: "Manufacturing" },
  { id: "kl", name: "Kerala", path: "M178,478 L198,478 L198,498 L212,518 L208,538 L192,548 L178,538 L168,512 L162,492 Z", sentiment: 0.76, volume: "105K", trend: "↑", topIssue: "Healthcare" },
  { id: "jh", name: "Jharkhand", path: "M322,192 L338,202 L348,208 L342,222 L338,242 L318,248 L298,238 L298,218 L308,202 Z", sentiment: 0.44, volume: "88K", trend: "↓", topIssue: "Mining" },
  { id: "uk", name: "Uttarakhand", path: "M232,82 L252,82 L268,92 L272,108 L262,108 L242,112 L228,118 L218,98 L232,102 Z", sentiment: 0.65, volume: "52K", trend: "↑", topIssue: "Environment" },
  { id: "ne", name: "Northeast", path: "M392,148 L428,128 L452,138 L462,162 L452,188 L432,198 L412,192 L398,178 L392,158 Z", sentiment: 0.57, volume: "78K", trend: "→", topIssue: "Connectivity" },
];

function getSentimentColor(sentiment: number): string {
  if (sentiment >= 0.7) return "#10b981";
  if (sentiment >= 0.55) return "#3b82f6";
  if (sentiment >= 0.45) return "#f59e0b";
  return "#ef4444";
}

const IndiaMap = () => {
  const [hovered, setHovered] = useState<StateData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div className="relative">
      <svg
        viewBox="0 0 490 570"
        className="w-full h-auto max-h-[420px]"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* States */}
        {statesData.map((state) => {
          const color = getSentimentColor(state.sentiment);
          const isHovered = hovered?.id === state.id;
          return (
            <g key={state.id}>
              <path
                d={state.path}
                fill={isHovered ? color + "55" : color + "22"}
                stroke={isHovered ? color : color + "66"}
                strokeWidth={isHovered ? 2 : 0.8}
                filter={isHovered ? "url(#strongGlow)" : undefined}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHovered(state)}
                onMouseLeave={() => setHovered(null)}
              />
            </g>
          );
        })}

        {/* State labels for large states */}
        {statesData.filter(s => ["rj","up","mh","mp","ka","tn","gj","wb"].includes(s.id)).map((state) => {
          // Calculate center of path bounding box approximately
          const nums = state.path.match(/[\d.]+/g)?.map(Number) || [];
          const xs = nums.filter((_, i) => i % 2 === 0);
          const ys = nums.filter((_, i) => i % 2 === 1);
          const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
          const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
          return (
            <text
              key={`label-${state.id}`}
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none select-none"
              fill="hsl(210, 40%, 75%)"
              fontSize="9"
              fontFamily="'Rajdhani', sans-serif"
              fontWeight="600"
              opacity={0.7}
            >
              {state.id.toUpperCase()}
            </text>
          );
        })}

        {/* Delhi marker */}
        <circle cx="217" cy="145" r="4" fill="#f59e0b" opacity={0.8} filter="url(#glow)" />
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute pointer-events-none glass-panel p-3 min-w-[180px] z-50"
            style={{
              left: Math.min(mousePos.x + 12, 220),
              top: mousePos.y - 10,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getSentimentColor(hovered.sentiment) }} />
              <span className="font-heading font-bold text-sm text-foreground">{hovered.name}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Sentiment</span>
                <span className="font-display" style={{ color: getSentimentColor(hovered.sentiment) }}>
                  {hovered.sentiment.toFixed(2)} {hovered.trend}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Volume</span>
                <span className="text-foreground">{hovered.volume} voices</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Top Issue</span>
                <span className="text-foreground">{hovered.topIssue}</span>
              </div>
              {/* Mini bar */}
              <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${hovered.sentiment * 100}%`,
                    backgroundColor: getSentimentColor(hovered.sentiment),
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndiaMap;
