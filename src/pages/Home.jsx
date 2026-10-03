import Hero from '../components/Hero.jsx'
import FeaturedTours from '../components/FeaturedTours.jsx'
import Destinations from '../components/Destinations.jsx'
import JourneySteps from '../components/JourneySteps.jsx'
import LeadSection from '../components/LeadSection.jsx'
import FAQ from '../components/FAQ.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedTours />
      <JourneySteps />
      <Destinations />
      <LeadSection />
      <FAQ />
    </>
  )
}
