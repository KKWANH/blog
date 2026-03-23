import { defineTravelCities } from '@/lib/travel'
import { StayLevel } from '@/components/travel/travel-types'

export const visitedCities = defineTravelCities([
  {
    city: 'Seoul',
    country: 'South Korea',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Anyang',
    country: 'South Korea',
    level: StayLevel.LivedThere,
  },
  {
    city: 'Suwon',
    country: 'South Korea',
    level: StayLevel.LivedThere,
  },
  {
    city: 'Jeungpyeong',
    country: 'South Korea',
    level: StayLevel.LivedThere,
  },
  {
    city: 'Leuven',
    country: 'Belgium',
    level: StayLevel.LivedThere,
  },
  {
    city: 'Brugge',
    country: 'Belgium',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Gent',
    country: 'Belgium',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Brussels',
    country: 'Belgium',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Antwerpen',
    country: 'Belgium',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Paris',
    country: 'France',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Colmar',
    country: 'France',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Strasbourg',
    country: 'France',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Luxembourg',
    country: 'Luxembourg',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Edinburgh',
    country: 'United Kingdom',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'London',
    country: 'United Kingdom',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Brighton',
    country: 'United Kingdom',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Canterbury',
    country: 'United Kingdom',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Sandwich',
    country: 'United Kingdom',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Rotterdam',
    country: 'Netherlands',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Berlin',
    country: 'Germany',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Wolfsburg',
    country: 'Germany',
    level: StayLevel.LivedThere,
  },
  {
    city: 'Cuxhaven',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Hannover',
    country: 'Germany',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Hildesheim',
    country: 'Germany',
    level: StayLevel.LivedThere,
  },
  {
    city: 'Gifhorn',
    country: 'Germany',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Rust',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Braunschweig',
    country: 'Germany',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Goslar',
    country: 'Germany',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Wernigerode',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Quedlinburg',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Lüneburg',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Hamburg',
    country: 'Germany',
    level: StayLevel.TwoPlusDays,
  },

  {
    city: 'Potsdam',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Dortmund',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Köln',
    country: 'Germany',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Frankfurt',
    country: 'Germany',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Würzburg',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Stuttgart',
    country: 'Germany',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Baden-Baden',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Freiburg',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Hinterzarten',
    country: 'Germany',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Füssen',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Munich',
    country: 'Germany',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Prague',
    country: 'Czech Republic',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Kutná Hora',
    country: 'Czech Republic',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Velké Popovice',
    country: 'Czech Republic',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Cesky Krumlov',
    country: 'Czech Republic',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Vienna',
    country: 'Austria',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Salzburg',
    country: 'Austria',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Hallstatt',
    country: 'Austria',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Venice',
    country: 'Italy',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Rome',
    country: 'Italy',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Pisa',
    country: 'Italy',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Florence',
    country: 'Italy',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Pompei',
    country: 'Italy',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Budapest',
    country: 'Hungary',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Barcelona',
    country: 'Spain',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Bilbao',
    country: 'Spain',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Marrakesh',
    country: 'Morocco',
    level: StayLevel.TwoPlusDays,
  },
  // {
  //   city: 'Merzouga',
  //   country: 'Morocco',
  //   level: StayLevel.ShortVisit,
  // },
  {
    city: 'Tokyo',
    country: 'Japan',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Fujinomiya',
    country: 'Japan',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Osaka',
    country: 'Japan',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Jinan',
    country: 'China',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Chengdu',
    country: 'China',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Hanoi',
    country: 'Vietnam',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Ha Long',
    country: 'Vietnam',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Phnom Penh',
    country: 'Cambodia',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Siem Reap',
    country: 'Cambodia',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Chiang Mai',
    country: 'Thailand',
    level: StayLevel.FivePlusDays,
  },
  {
    city: 'Chiang Rai',
    country: 'Thailand',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Fang',
    country: 'Thailand',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Chiang Dao',
    country: 'Thailand',
    level: StayLevel.ShortVisit,
  },
  {
    city: 'Pai',
    country: 'Thailand',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Pagudpud',
    country: 'Philippines',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Pagudpud',
    country: 'Philippines',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Baguio',
    country: 'Philippines',
    level: StayLevel.LivedThere,
  },
  {
    city: 'Angeles City',
    country: 'Philippines',
    level: StayLevel.LivedThere,
  },
  {
    city: 'Manila',
    country: 'Philippines',
    level: StayLevel.TwoPlusDays,
  },
  {
    city: 'Cebu City',
    country: 'Philippines',
    level: StayLevel.LivedThere,
  },
])
