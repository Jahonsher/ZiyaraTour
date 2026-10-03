import { useI18n } from '../i18n/I18nContext.jsx'
import { experience } from '../data/experience.js'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
export default function JourneySteps() {
  const { lang } = useI18n()
  const c = experience[lang]
  return <section className="steps-section"><div className="container-x">
    <Reveal className="section-heading centered"><span className="section-eyebrow">{c.stepsEyebrow}</span><h2 className="section-title">{c.stepsTitle}</h2></Reveal>
    <div className="steps-grid">{c.steps.map(([title, text], i) => <Reveal key={i} delay={i * 90}><article className="step-card"><div className="step-top"><span className="step-icon"><Icon name={['compass', 'plane', 'phone'][i]} size={27} /></span><span className="step-number">0{i + 1}</span></div><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
  </div></section>
}
