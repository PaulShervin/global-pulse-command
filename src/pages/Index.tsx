import BackgroundGrid from "@/components/dashboard/BackgroundGrid";
import ControlLayer from "@/components/dashboard/ControlLayer";
import KPICards from "@/components/dashboard/KPICards";
import HeroGlobe from "@/components/dashboard/HeroGlobe";
import OntologyGraph from "@/components/dashboard/OntologyGraph";
import SentimentZone from "@/components/dashboard/SentimentZone";
import TrendingSignals from "@/components/dashboard/TrendingSignals";
import EventStream from "@/components/dashboard/EventStream";
import DecisionPanel from "@/components/dashboard/DecisionPanel";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <BackgroundGrid />

      {/* Header */}
      <header className="relative z-10 pt-6 pb-2 px-4 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-wider neon-text-blue">
                JanaNaadi
              </h1>
              <p className="font-heading text-sm text-muted-foreground tracking-[0.2em] uppercase mt-0.5">
                Pulse of the People
              </p>
            </motion.div>
            <ControlLayer />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 lg:px-8 pb-12">
        <div className="max-w-[1600px] mx-auto space-y-10 mt-6">
          {/* Hero: Globe + KPIs */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
              <div className="space-y-6">
                <HeroGlobe />
                <KPICards />
              </div>
              <div className="lg:mt-0">
                <EventStream />
              </div>
            </div>
          </section>

          {/* Ontology Graph */}
          <section>
            <OntologyGraph />
          </section>

          {/* Sentiment Zone */}
          <section>
            <h2 className="font-display text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">
              Sentiment Intelligence Zone
            </h2>
            <SentimentZone />
          </section>

          {/* Trending Signals */}
          <section>
            <TrendingSignals />
          </section>

          {/* Decision Intelligence */}
          <section>
            <DecisionPanel />
          </section>

          {/* Footer */}
          <footer className="text-center py-8 border-t border-border">
            <p className="font-display text-xs text-muted-foreground tracking-[0.3em] uppercase">
              JanaNaadi Intelligence System • Classified
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
