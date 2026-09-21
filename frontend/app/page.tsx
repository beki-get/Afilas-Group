import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustSection from "@/components/TrustSection";
import WhyChooseUsSection from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <>
     <Navbar />
     <HeroSection/>
     <TrustSection/>
     <ServicesSection/>  
     <WhyChooseUsSection/>
     <HowItWorksSection/>
     <TestimonialsSection/>
     <Footer/>
     
    </>
    

  );
}
