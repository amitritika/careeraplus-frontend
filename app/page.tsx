// components/organisms/Navbar.tsx
'use client';
import Hero from "@/components/organisms/Hero";
import Features from "@/components/organisms/Features";
import Pricing from "@/components/organisms/Pricing";
import CTA from "@/components/organisms/CTA";
import Footer from "@/components/organisms/Footer";
import NavAuthLinks from "@/components/organisms/NavAuthLinks";
// templates/HomePage.tsx
const HomePage: React.FC = () => (
  <main className="min-h-screen">
    <Hero />
    <Features />
    <Pricing />
    <Footer />
  </main>
);

export default HomePage;