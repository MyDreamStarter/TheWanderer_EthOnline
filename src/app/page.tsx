'use client'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import Hero from "@/components/hero-home";
import FeaturesPlanet from "@/components/features-planet";
import BusinessCategories from "@/components/business-categories";
import Cta from "@/components/cta";
import LargeTestimonial from "@/components/large-testimonial";

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturesPlanet />
        <LargeTestimonial />
        <BusinessCategories />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}