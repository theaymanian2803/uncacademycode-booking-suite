import { Calendar, Link, Video } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: Calendar,
      step: "01",
      title: "Select Time",
      description: "Choose a convenient date and time that works best for your schedule.",
    },
    {
      icon: Link,
      step: "02",
      title: "Receive Zoom Link",
      description: "Get a personalized Zoom meeting link sent directly to your email.",
    },
    {
      icon: Video,
      step: "03",
      title: "Consultation Session",
      description: "Join the call and discuss your project requirements with our expert team.",
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Simple <span className="gradient-text">3-Step</span> Process
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting started with your SaaS project has never been easier.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/20 to-accent/20 -translate-x-1/2" />
              )}

              <div className="glass-card p-6 sm:p-8 h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                {/* Step Number */}
                <span className="text-5xl sm:text-6xl font-bold text-muted/30 absolute top-4 right-6">
                  {item.step}
                </span>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl gradient-bg mb-6 glow-effect">
                  <item.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
