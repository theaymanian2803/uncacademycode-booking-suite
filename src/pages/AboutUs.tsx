import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Zap, Shield, Code2, Rocket } from "lucide-react";

const AboutUs = () => {
  const scrollToBooking = () => {
    window.location.href = "/#booking";
  };

  const values = [
    {
      icon: Zap,
      title: "Innovation First",
      description: "We leverage cutting-edge technologies to deliver solutions that set new industry standards."
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "Our integrations are battle-tested and built to scale with your business needs."
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "Every project is measured by the success it brings to our clients' businesses."
    },
    {
      icon: Users,
      title: "Client Partnership",
      description: "We work alongside you as partners, not just service providers."
    }
  ];

  const offerings = [
    "Premium SaaS Templates",
    "Custom Web Applications",
    "E-commerce Solutions",
    "Portfolio & Business Sites",
    "Landing Page Design",
    "Appointment Systems"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onBookNowClick={scrollToBooking} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">About Our Team</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">Experienced Veterans</span>
                <br />
                Changing the Web
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                We are a passionate team of developers and designers dedicated to revolutionizing 
                how businesses establish their digital presence. With years of industry experience, 
                we deliver solutions that truly make a difference.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Our <span className="gradient-text">Mission</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  At UncAcademyCode, we're on a mission to democratize premium web development. 
                  We believe every business deserves access to world-class digital solutions, 
                  regardless of their size or budget.
                </p>
                <p className="text-muted-foreground text-lg">
                  Our team combines deep technical expertise with creative innovation to deliver 
                  templates, SaaS solutions, and custom applications that help businesses thrive 
                  in the digital age. We're not just building websites—we're building the future of the web.
                </p>
              </div>
              <div className="relative">
                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl gradient-bg">
                      <Code2 className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">10+</h3>
                      <p className="text-muted-foreground">Years Combined Experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl gradient-bg">
                      <Rocket className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">100+</h3>
                      <p className="text-muted-foreground">Projects Delivered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl gradient-bg">
                      <Users className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">50+</h3>
                      <p className="text-muted-foreground">Happy Clients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Our Core <span className="gradient-text">Values</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                These principles guide everything we do and how we serve our clients.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="glass-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-3 rounded-xl gradient-bg mb-4">
                      <value.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 sm:py-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  What We <span className="gradient-text">Offer</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Comprehensive web solutions tailored to your needs.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {offerings.map((offering, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="h-2 w-2 rounded-full gradient-bg" />
                    <span className="font-medium">{offering}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection />

        {/* CTA Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Work <span className="gradient-text">Together?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's discuss how we can help bring your vision to life. Book a free consultation today.
              </p>
              <button
                onClick={scrollToBooking}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <Rocket className="h-5 w-5" />
                Book a Consultation
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
