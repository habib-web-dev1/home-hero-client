import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedServices from "../components/home/FeaturedServices";
import ServiceCategories from "../components/home/ServiceCategories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import HowItWorks from "../components/home/HowItWorks";
import Statistics from "../components/home/Statistics";
import Testimonials from "../components/home/Testimonials";
import PopularServices from "../components/home/PopularServices";
import ServiceProviders from "../components/home/ServiceProviders";
import FAQ from "../components/home/FAQ";
import Newsletter from "../components/home/Newsletter";
import TrustBadges from "../components/home/TrustBadges";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Service Categories */}
      <ServiceCategories />

      {/* Featured Services */}
      <FeaturedServices />

      {/* How It Works */}
      <HowItWorks />

      {/* Statistics */}
      <Statistics />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Popular Services */}
      <PopularServices />

      {/* Service Providers */}
      <ServiceProviders />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
