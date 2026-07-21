import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MentalModel } from "@/components/MentalModel";
import { WhySection } from "@/components/WhySection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { DecisionTimeline } from "@/components/DecisionTimeline";
import { AIPhilosophy } from "@/components/AIPhilosophy";
import { SafetyGrid } from "@/components/SafetyGrid";
import { EvidenceSection } from "@/components/EvidenceSection";
import { Milestones } from "@/components/Milestones";
import { BuildStatus } from "@/components/BuildStatus";
import { TechStack } from "@/components/TechStack";
import { ProductModeLadder } from "@/components/ProductModeLadder";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { FAQ } from "@/components/FAQ";
import { ContactTeaser } from "@/components/ContactTeaser";
import { Footer } from "@/components/Footer";
import { ScrollExtras } from "@/components/ScrollExtras";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <ScrollExtras />
      <Header />
      <main>
        <Hero />
        <MentalModel />
        <WhySection />
        <ArchitectureSection />
        <DecisionTimeline />
        <AIPhilosophy />
        <SafetyGrid />
        <EvidenceSection />
        <Milestones />
        <BuildStatus />
        <TechStack />
        <ProductModeLadder />
        <RoadmapTimeline />
        <FAQ />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}
