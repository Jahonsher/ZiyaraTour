import existing from './destinations.json'
import tours from './tours.js'

export default existing.map(destination => ({
  ...destination,
  tours: tours.filter(tour => tour.destinations.includes(destination.id)).length,
})).filter(destination => destination.tours > 0)
