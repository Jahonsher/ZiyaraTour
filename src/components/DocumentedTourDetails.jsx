import { useI18n } from '../i18n/I18nContext.jsx'
import Reveal from './Reveal.jsx'

const labels = {
  pricing: { uz: 'Xona va guruh bo‘yicha narxlar', uzc: 'Хона ва гуруҳ бўйича нархлар', ru: 'Стоимость по номеру и группе', en: 'Prices by room and group' },
  room: { uz: 'Xona turi', uzc: 'Хона тури', ru: 'Тип номера', en: 'Room type' },
  single: { uz: 'Bir kishilik xona', uzc: 'Бир кишилик хона', ru: 'Одноместный номер', en: 'Single room' },
  doubleTwin: { uz: 'Ikki kishilik xona (double / twin)', uzc: 'Икки кишилик хона (double / twin)', ru: 'Двухместный номер (double / twin)', en: 'Double or twin room' },
  hotels: { uz: 'Mehmonxonalar va tunash', uzc: 'Меҳмонхоналар ва тунаш', ru: 'Отели и ночёвки', en: 'Hotels and overnight stays' },
  sources: { uz: 'Sayohat dasturini yuklab olish', uzc: 'Саёҳат дастурини юклаб олиш', ru: 'Скачать программу поездки', en: 'Download the travel programme' },
}

export default function DocumentedTourDetails({ tour }) {
  const { t, localize } = useI18n()
  return <>
    {tour.roomPricing?.length > 0 && <Reveal as="section">
      <h2 className="font-display font-bold text-2xl text-ink-900">{localize(labels.pricing)}</h2>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{localize(tour.availabilityNote)}</p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-100 shadow-card">
        <table className="w-full text-sm">
          <caption className="sr-only">{localize(labels.pricing)} — USD, {t('tour.pricePerPerson')}</caption>
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th scope="col" className="text-left px-4 py-3 font-semibold">{localize(labels.room)}</th>
              {tour.roomPricing[0].prices.map(p => <th scope="col" key={p.min} className="text-right px-4 py-3 font-semibold whitespace-nowrap">{p.min}–{p.max} {t('tour.people')}</th>)}
            </tr>
          </thead>
          <tbody>{tour.roomPricing.map(row => <tr key={row.room} className="border-t border-slate-100">
            <th scope="row" className="text-left px-4 py-3 font-medium">{localize(labels[row.room])}</th>
            {row.prices.map(p => <td key={p.min} className="px-4 py-3 text-right font-display font-bold text-accent-600">${p.price}</td>)}
          </tr>)}</tbody>
        </table>
      </div>
    </Reveal>}
    {tour.accommodation?.length > 0 && <Reveal as="section">
      <h2 className="font-display font-bold text-2xl text-ink-900">{localize(labels.hotels)}</h2>
      <ul className="mt-4 space-y-3">
        {tour.accommodation.map(stay => <li key={stay.hotel} className="rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-ink-900">{localize(stay.city)} · {stay.nights} {t('tour.nights')}</h3>
          <p className="mt-2 text-sm font-medium text-brand-700">{stay.hotel}</p>
          <p className="mt-1 text-sm text-slate-600">{localize(stay.note)}</p>
        </li>)}
      </ul>
    </Reveal>}
    {tour.sources?.length > 0 && <Reveal as="section">
      <h2 className="font-display font-bold text-xl text-ink-900">{localize(labels.sources)}</h2>
      <ul className="mt-3 space-y-2">{tour.sources.map(source => <li key={source.url}>
        <a href={source.url} download className="text-sm text-brand-700 underline underline-offset-4 break-words hover:text-brand-900">{source.name}</a>
      </li>)}</ul>
    </Reveal>}
  </>
}
