import { useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import BookingForm from "@/components/BookingForm";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  const scrollToBooking = useCallback(() => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onBookNowClick={scrollToBooking} />
      <main>
        <HeroSection onBookNowClick={scrollToBooking} />
        <ProcessSection />
        <BookingForm />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
