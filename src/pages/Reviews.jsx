import Testimonials from '../components/Testimonials.jsx'
import CTA from '../components/CTA.jsx'

export default function Reviews() {
  return (
    <div className="pt-20 sm:pt-24">
      <Testimonials showAll headingLevel="h1" />
      <CTA />
    </div>
  )
}
