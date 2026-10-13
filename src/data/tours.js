import existing from './tours.json'
import instagram from './instagram-tours.json'

const journey = {
  code: 'DMiJo-SM-vv',
  url: 'https://www.instagram.com/ziyarattour/reel/DMiJo-SM-vv/',
  poster: '/images/instagram/uzbekistan-journey.jpg',
  title: { uz: 'O‘zbekiston bo‘ylab sayohat', uzc: 'Ўзбекистон бўйлаб саёҳат', ru: 'Путешествие по Узбекистану', en: 'A journey through Uzbekistan' },
}
const guest = {
  code: 'DMu0K1KsjLE',
  url: 'https://www.instagram.com/ziyarattour/reel/DMu0K1KsjLE/',
  poster: '/images/instagram/uk-guest.jpg',
  title: { uz: 'Buyuk Britaniyalik mehmon taassurotlari', uzc: 'Буюк Британиялик меҳмон таассуротлари', ru: 'Впечатления гостя из Великобритании', en: 'Reflections from a UK guest' },
}

export default [
  ...existing.map(tour => {
    const updated = { ...tour, oldPrice: null, instagram: [journey, guest] }
    if (tour.id === 'middle-ages-6-days') {
      updated.priceFrom = null
      updated.badge = null
      updated.sourceUrl = 'https://ziyaratour.uz/journey-to-the-middle-ages-6-days/'
    }
    if (tour.id === 'middle-ages-8-days') {
      updated.priceFrom = 740
      updated.groupSize = { min: 24, max: 45 }
      updated.packageOptions = [{ name: 'standard', price: 740 }, { name: 'comfort', price: 1090 }]
      updated.sourceUrl = 'https://ziyaratour.uz/journey-to-the-middle-ages/'
      const accommodation = { uz: '7 kecha mehmonxonalarda (Standart yoki Comfort +)', uzc: '7 кеча меҳмонхоналарда (Стандарт ёки Comfort +)', ru: '7 ночей в отелях (Стандарт или Комфорт +)', en: '7 nights in hotels (Standard or Comfort +)' }
      updated.included = Object.fromEntries(Object.entries(tour.included).map(([lang, items]) => [lang, [accommodation[lang], ...items.slice(1)]]))
    }
    return updated
  }),
  ...instagram,
]

export const categories = ['all', 'cultural', 'pilgrimage', 'city', 'adventure', 'beach']
