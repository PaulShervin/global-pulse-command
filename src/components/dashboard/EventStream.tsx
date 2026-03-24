import { motion } from "framer-motion";
import { AlertCircle, TrendingUp, MapPin, Clock } from "lucide-react";

const events = [
  { type: "spike", title: "Sentiment spike detected in Maharashtra", region: "Maharashtra", confidence: 94, time: "2m ago", trend: [30, 45, 38, 52, 68, 85, 92] },
  { type: "issue", title: "Water scarcity protests trending", region: "Rajasthan", confidence: 87, time: "8m ago", trend: [20, 25, 30, 45, 60, 72, 78] },
  { type: "alert", title: "Negative shift: Healthcare policy", region: "National", confidence: 91, time: "12m ago", trend: [60, 55, 48, 40, 35, 30, 28] },
  { type: "spike", title: "AI regulation discussion surge", region: "Delhi", confidence: 82, time: "18m ago", trend: [10, 15, 22, 35, 50, 62, 70] },
  { type: "issue", title: "Employment data controversy", region: "UP", confidence: 78, time: "25m ago", trend: [40, 42, 38, 45, 52, 58, 55] },
  { type: "alert", title: "Climate policy positive reception", region: "Karnataka", confidence: 89, time: "31m ago", trend: [30, 40, 50, 58, 65, 72, 80] },
];

const typeConfig = {
  spike: { icon: TrendingUp, color: "#f59e0b" },
  issue: { icon: AlertCircle, color: "#ef4444" },
  alert: { icon: AlertCircle, color: "#8b5cf6" },
};

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 80;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`).join(" ");
  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

const EventStream = () => (
  <div>
    <h2 className="font-display text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
      Real-Time Event Stream
    </h2>
    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
      {events.map((evt, i) => {
        const config = typeConfig[evt.type as keyof typeof typeConfig];
        const Icon = config.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-panel p-3.5 hover:bg-muted/20 transition-all cursor-default group"
          >
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg mt-0.5" style={{ backgroundColor: config.color + "18" }}>
                <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-heading font-semibold text-foreground leading-snug">{evt.title}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" /> {evt.region}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" /> {evt.time}
                  </span>
                  <span className="text-xs font-display" style={{ color: config.color }}>
                    {evt.confidence}%
                  </span>
                </div>
              </div>
              <Sparkline data={evt.trend} color={config.color} />
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default EventStream;
