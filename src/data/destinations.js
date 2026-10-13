import existing from './destinations.json'
import tours from './tours.js'

const extra = {
  id: 'nha-trang',
  image: '/images/instagram/vietnam-nha-trang.jpg',
  name: { uz: 'Nha Trang, Vyetnam', uzc: 'Нячанг, Вьетнам', ru: 'Нячанг, Вьетнам', en: 'Nha Trang, Vietnam' },
}

export default [...existing, extra].map(destination => ({
  ...destination,
  tours: tours.filter(tour => tour.destinations.includes(destination.id)).length,
}))
