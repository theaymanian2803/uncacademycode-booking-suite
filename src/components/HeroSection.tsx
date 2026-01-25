import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onBookNowClick: () => void;
}

const HeroSection = ({ onBookNowClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 sm:mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Premium SaaS Templates</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Build Your Dream Project with{" "}
            <span className="gradient-text">UncAcademyCode</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto animate-fade-in px-4" style={{ animationDelay: "0.2s" }}>
            Book a 1-on-1 Zoom consultation session to discuss your SaaS template needs and transform your vision into reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button
              size="lg"
              onClick={onBookNowClick}
              className="gradient-bg text-primary-foreground hover:opacity-90 transition-all font-semibold text-lg px-8 py-6 glow-effect w-full sm:w-auto"
            >
              Book Your Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}
              className="border-border hover:bg-secondary transition-colors font-semibold text-lg px-8 py-6 w-full sm:w-auto"
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm">Expert Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm">Custom Solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm">Full Source Code</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
