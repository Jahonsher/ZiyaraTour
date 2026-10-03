import { useSearchParams } from 'react-router-dom'
import LeadSection from '../components/LeadSection.jsx'
import FAQ from '../components/FAQ.jsx'
export default function Book() {
  const [params] = useSearchParams()
  return <><LeadSection standalone preselect={params.get('tour') || ''} /><FAQ /></>
}
