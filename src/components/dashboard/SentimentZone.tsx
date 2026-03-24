import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

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

const stateData = [
  { name: "Maharashtra", sentiment: 0.72, volume: "340K", trend: "↑", color: "#10b981" },
  { name: "Delhi", sentiment: 0.45, volume: "280K", trend: "↓", color: "#f59e0b" },
  { name: "Karnataka", sentiment: 0.81, volume: "190K", trend: "↑", color: "#10b981" },
  { name: "Tamil Nadu", sentiment: 0.68, volume: "220K", trend: "→", color: "#3b82f6" },
  { name: "UP", sentiment: 0.38, volume: "410K", trend: "↓", color: "#ef4444" },
  { name: "Gujarat", sentiment: 0.74, volume: "160K", trend: "↑", color: "#10b981" },
  { name: "West Bengal", sentiment: 0.52, volume: "180K", trend: "→", color: "#f59e0b" },
  { name: "Rajasthan", sentiment: 0.61, volume: "140K", trend: "↑", color: "#3b82f6" },
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

    {/* State Heat Intelligence */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass-panel-glow-violet p-6"
    >
      <h3 className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
        State Heat Intelligence
      </h3>
      <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-2">
        {stateData.map((state, i) => (
          <motion.div
            key={state.name}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors group cursor-default"
          >
            <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: state.color }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-heading font-semibold text-foreground">{state.name}</span>
                <span className="text-xs text-muted-foreground">{state.volume} voices</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: state.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${state.sentiment * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                  />
                </div>
                <span className="text-xs font-display" style={{ color: state.color }}>
                  {state.sentiment.toFixed(2)} {state.trend}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default SentimentZone;
