import Hero from '../components/Hero.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FeaturedTours from '../components/FeaturedTours.jsx'
import Destinations from '../components/Destinations.jsx'
import DealBanner from '../components/DealBanner.jsx'
import Services from '../components/Services.jsx'
import WhyUs from '../components/WhyUs.jsx'
import StatsCounter from '../components/StatsCounter.jsx'
import Testimonials from '../components/Testimonials.jsx'
import BlogSection from '../components/BlogSection.jsx'
import Newsletter from '../components/Newsletter.jsx'
import CTA from '../components/CTA.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <SearchBar overlap />
      <FeaturedTours />
      <Destinations />
      <DealBanner />
      <Services />
      <StatsCounter />
      <WhyUs />
      <Testimonials />
      <BlogSection />
      <Newsletter />
      <CTA />
    </>
  )
}
