import { defineTravelCities } from '@/lib/travel'
import { StayLevel } from '@/components/travel/travel-types'

export const visitedCities = defineTravelCities([
  {
    city: 'Seoul',
    country: 'South Korea',
    level: StayLevel.LivedThere,
  },
  {
    city: 'Wolfsburg',
    country: 'Germany',
    level: StayLevel.LivedThere,
  },
  {
    city: 'Brussels',
    country: 'Belgium',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Paris',
    country: 'France',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Berlin',
    country: 'Germany',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Prague',
    country: 'Czech Republic',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Vienna',
    country: 'Austria',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Barcelona',
    country: 'Spain',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Kyoto',
    country: 'Japan',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    level: StayLevel.TwoPlusDays,
  },
])
