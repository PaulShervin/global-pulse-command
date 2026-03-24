import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, TrendingDown } from "lucide-react";

const insights = [
  {
    type: "risk",
    icon: AlertTriangle,
    title: "Emerging Risk: Water Policy Backlash",
    body: "Sentiment in 4 states declining rapidly around water allocation policies. Projected to become top issue within 48 hours.",
    color: "#ef4444",
    priority: "CRITICAL",
  },
  {
    type: "opportunity",
    icon: Lightbulb,
    title: "Policy Opportunity: Digital Infrastructure",
    body: "Positive sentiment surge (↑34%) around 5G and digital governance. Strong public support window for policy announcements.",
    color: "#10b981",
    priority: "HIGH",
  },
  {
    type: "shift",
    icon: TrendingDown,
    title: "Public Concern Shift: Healthcare → Education",
    body: "National attention pivoting from healthcare to education quality. Volume shift detected across 12 states in last 72 hours.",
    color: "#f59e0b",
    priority: "MEDIUM",
  },
];

const DecisionPanel = () => (
  <div>
    <h2 className="font-display text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">
      Decision Intelligence Panel
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights.map((ins, i) => {
        const Icon = ins.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-panel-glow-blue p-5 cursor-default relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-3xl opacity-10" style={{ backgroundColor: ins.color }} />
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: ins.color + "18" }}>
                <Icon className="w-4 h-4" style={{ color: ins.color }} />
              </div>
              <span
                className="text-[10px] font-display tracking-widest px-2 py-0.5 rounded-full"
                style={{ backgroundColor: ins.color + "18", color: ins.color }}
              >
                {ins.priority}
              </span>
            </div>
            <h3 className="font-heading font-bold text-sm text-foreground mb-2">{ins.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{ins.body}</p>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default DecisionPanel;
