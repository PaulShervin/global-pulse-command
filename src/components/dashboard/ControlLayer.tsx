import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Globe2, Tag, Cpu, ChevronDown } from "lucide-react";

const ControlLayer = () => {
  const [timeFilter, setTimeFilter] = useState("24h");
  const [aiMode, setAiMode] = useState<"realtime" | "predictive">("realtime");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel px-4 py-2.5 flex flex-wrap items-center gap-3"
    >
      {/* Time filter */}
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
        {["24h", "7d", "30d"].map((t) => (
          <button
            key={t}
            onClick={() => setTimeFilter(t)}
            className={`px-2.5 py-1 rounded-md text-xs font-display transition-all ${
              timeFilter === t
                ? "bg-primary/20 neon-text-blue"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="w-px h-5 bg-border" />

      {/* Region */}
      <div className="flex items-center gap-1.5">
        <Globe2 className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-heading">All Regions</span>
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </div>

      <div className="w-px h-5 bg-border" />

      {/* Topic */}
      <div className="flex items-center gap-1.5">
        <Tag className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-heading">All Topics</span>
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </div>

      <div className="w-px h-5 bg-border" />

      {/* AI Mode */}
      <div className="flex items-center gap-1.5">
        <Cpu className="w-3.5 h-3.5 text-muted-foreground" />
        <button
          onClick={() => setAiMode(aiMode === "realtime" ? "predictive" : "realtime")}
          className="flex items-center gap-1.5"
        >
          <div className="relative w-8 h-4 rounded-full bg-muted transition-colors">
            <motion.div
              className="absolute top-0.5 w-3 h-3 rounded-full"
              style={{ backgroundColor: aiMode === "predictive" ? "hsl(270, 80%, 60%)" : "hsl(210, 100%, 56%)" }}
              animate={{ left: aiMode === "predictive" ? "18px" : "2px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
          <span className={`text-xs font-display ${aiMode === "predictive" ? "neon-text-violet" : "neon-text-blue"}`}>
            {aiMode === "predictive" ? "Predictive" : "Real-time"}
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default ControlLayer;
