import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedBusinesses from "./components/FeaturedBusinesses";
import MembershipTiers from "./components/MembershipTiers";
import HowItWorks from "./components/HowItWorks";
import Newsletter from "./components/Newsletter";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedBusinesses />
      <MembershipTiers />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
