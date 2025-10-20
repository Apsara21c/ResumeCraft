import AuthNavbar from "@/components/AuthNavbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <AuthNavbar />
      <Hero />
      <Features />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
