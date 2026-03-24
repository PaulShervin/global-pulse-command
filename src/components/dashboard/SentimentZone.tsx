import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import IndiaMap from "./IndiaMap";

const nationalData = [
  { name: "Positive", value: 42, color: "#10b981" },
  { name: "Neutral", value: 31, color: "#3b82f6" },
  { name: "Negative", value: 27, color: "#ef4444" },
];

const sectorData = [
  { name: "Healthcare", value: 18, color: "#22d3ee" },
  { name: "Education", value: 15, color: "#8b5cf6" },
  { name: "Economy", value: 22, color: "#f59e0b" },
  { name: "Environment", value: 12, color: "#10b981" },
  { name: "Security", value: 20, color: "#ef4444" },
  { name: "Technology", value: 13, color: "#3b82f6" },
];

const SentimentZone = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Radial Sentiment */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass-panel-glow-blue p-6"
    >
      <h3 className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
        Radial Sentiment System
      </h3>
      <div className="h-[280px] relative">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={nationalData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="value" strokeWidth={0}>
              {nationalData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Pie data={sectorData} cx="50%" cy="50%" innerRadius={85} outerRadius={110} paddingAngle={2} dataKey="value" strokeWidth={0}>
              {sectorData.map((d, i) => <Cell key={i} fill={d.color} opacity={0.7} />)}
            </Pie>
            <Tooltip
              contentStyle={{ background: "hsl(225 30% 10%)", border: "1px solid hsl(225 20% 18%)", borderRadius: "8px", color: "#e2e8f0", fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-display font-bold neon-text-emerald">0.67</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">National</span>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-2">
        {nationalData.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-xs text-muted-foreground">{d.name}</span>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Interactive India Map */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass-panel-glow-violet p-6"
    >
      <h3 className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
        State Heat Intelligence Map
      </h3>
      <IndiaMap />
      <div className="flex justify-center gap-4 mt-3">
        {[
          { label: "High", color: "#10b981" },
          { label: "Medium", color: "#3b82f6" },
          { label: "Caution", color: "#f59e0b" },
          { label: "Critical", color: "#ef4444" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-[10px] text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default SentimentZone;
