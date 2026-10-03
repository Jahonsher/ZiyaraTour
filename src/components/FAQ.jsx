import { useI18n } from '../i18n/I18nContext.jsx'
import { experience } from '../data/experience.js'
import Reveal from './Reveal.jsx'
export default function FAQ() {
  const { lang } = useI18n()
  const c = experience[lang]
  return <section className="faq-section container-x"><Reveal><h2 className="section-title">{c.faqTitle}</h2><div className="faq-list">{c.faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></Reveal></section>
}
