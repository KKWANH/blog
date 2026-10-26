import data from './places.json'
import type { TravelCity } from '@/components/travel/travel-types'

// Resolved places are small and publishable; the large lookup dataset stays in the editor API.
export const visitedCities = data.places as TravelCity[]
