import tours from './tours.json'

export default tours

export const categories = ['all', ...new Set(tours.map(tour => tour.category))]
