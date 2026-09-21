import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TrustSection from "@/components/TrustSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <WhyChooseUs />
      <HowItWorksSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
