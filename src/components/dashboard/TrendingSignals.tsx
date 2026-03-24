import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingUp, BarChart3, Hash } from "lucide-react";

const keywords = [
  { text: "AI Regulation", size: 1.4, sentiment: "positive", color: "#10b981" },
  { text: "Water Crisis", size: 1.8, sentiment: "negative", color: "#ef4444" },
  { text: "Digital India", size: 1.2, sentiment: "positive", color: "#3b82f6" },
  { text: "Farm Laws", size: 1.6, sentiment: "negative", color: "#f59e0b" },
  { text: "5G Rollout", size: 1.0, sentiment: "neutral", color: "#8b5cf6" },
  { text: "UPI Global", size: 1.3, sentiment: "positive", color: "#10b981" },
  { text: "Air Quality", size: 1.5, sentiment: "negative", color: "#ef4444" },
  { text: "Space Program", size: 1.1, sentiment: "positive", color: "#22d3ee" },
  { text: "Education Reform", size: 1.2, sentiment: "neutral", color: "#3b82f6" },
  { text: "Cyber Security", size: 1.0, sentiment: "negative", color: "#f59e0b" },
  { text: "Green Energy", size: 1.3, sentiment: "positive", color: "#10b981" },
  { text: "Healthcare Access", size: 1.7, sentiment: "negative", color: "#ef4444" },
];

const TrendingSignals = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <h2 className="font-display text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">
        Trending Signals Engine
      </h2>
      <div className="glass-panel p-6 relative min-h-[250px]">
        <div className="flex flex-wrap justify-center gap-3 items-center">
          {keywords.map((kw, i) => (
            <motion.button
              key={kw.text}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -3, 0],
              }}
              transition={{
                delay: i * 0.06,
                y: { repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut" },
              }}
              whileHover={{ scale: 1.15 }}
              onClick={() => setSelected(selected === kw.text ? null : kw.text)}
              className="px-4 py-2 rounded-full border backdrop-blur-sm transition-all cursor-pointer"
              style={{
                fontSize: `${kw.size * 0.75}rem`,
                borderColor: kw.color + "44",
                backgroundColor: selected === kw.text ? kw.color + "22" : kw.color + "0a",
                color: kw.color,
                boxShadow: selected === kw.text ? `0 0 20px ${kw.color}33` : "none",
              }}
            >
              {kw.text}
            </motion.button>
          ))}
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 glass-panel p-4 flex items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary" />
              <span className="font-heading font-bold text-foreground">{selected}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-neon-emerald" />
              <span className="text-sm text-muted-foreground">+23% this week</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-neon-amber" />
              <span className="text-sm text-muted-foreground">42K mentions</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrendingSignals;
