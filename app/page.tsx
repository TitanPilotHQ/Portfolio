import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { DecisionTimeline } from "@/components/DecisionTimeline";
import { AIPhilosophy } from "@/components/AIPhilosophy";
import { SafetyGrid } from "@/components/SafetyGrid";
import { Milestones } from "@/components/Milestones";
import { TechStack } from "@/components/TechStack";
import { ProductModeLadder } from "@/components/ProductModeLadder";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { FAQ } from "@/components/FAQ";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { Footer } from "@/components/Footer";
import { ScrollExtras } from "@/components/ScrollExtras";

export default function Home() {
  return (
    <>
      <ScrollExtras />
      <Header />
      <main>
        <Hero />
        <WhySection />
        <ArchitectureSection />
        <DecisionTimeline />
        <AIPhilosophy />
        <SafetyGrid />
        <Milestones />
        <TechStack />
        <ProductModeLadder />
        <RoadmapTimeline />
        <FAQ />
        <EarlyAccessForm />
      </main>
      <Footer />
    </>
  );
}
