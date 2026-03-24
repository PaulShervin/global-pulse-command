import { motion } from "framer-motion";
import { Users, Activity, AlertTriangle, Radio } from "lucide-react";

const kpis = [
  { label: "Total Voices", value: "2.4M", change: "+12.3%", icon: Users, color: "neon-text-blue" },
  { label: "Avg Sentiment", value: "0.67", change: "+0.04", icon: Activity, color: "neon-text-emerald" },
  { label: "Active Issues", value: "1,847", change: "+89", icon: AlertTriangle, color: "neon-text-amber" },
  { label: "Data Streams", value: "342", change: "Live", icon: Radio, color: "neon-text-violet" },
];

const KPICards = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {kpis.map((kpi, i) => (
      <motion.div
        key={kpi.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
        className="glass-panel-glow-blue p-4 group hover:scale-105 transition-transform duration-300 cursor-default"
      >
        <div className="flex items-center justify-between mb-2">
          <kpi.icon className="w-5 h-5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
          <span className="text-xs font-body text-muted-foreground">{kpi.change}</span>
        </div>
        <p className={`text-2xl font-display font-bold ${kpi.color}`}>{kpi.value}</p>
        <p className="text-xs text-muted-foreground font-heading mt-1 uppercase tracking-wider">{kpi.label}</p>
      </motion.div>
    ))}
  </div>
);

export default KPICards;
