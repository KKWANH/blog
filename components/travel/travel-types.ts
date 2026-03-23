export enum StayLevel {
  ShortVisit = 'short-visit',
  TwoPlusDays = '2-plus-days',
  FivePlusDays = '5-plus-days',
  LivedThere = 'lived-there',
}

export type MapUnit = 'country' | 'city'

export type TravelCity = {
  id: string
  city: string
  country: string
  countryCode: string
  level: StayLevel
  lat: number
  lng: number
}

export const levelConfig: Record<
  StayLevel,
  {
    label: string
    color: string
    radius: number
    priority: number
  }
> = {
  [StayLevel.ShortVisit]: {
    label: 'Short visit',
    color: '#f59e0b',
    radius: 6,
    priority: 1,
  },
  [StayLevel.TwoPlusDays]: {
    label: '2+ days',
    color: '#10b981',
    radius: 8,
    priority: 2,
  },
  [StayLevel.FivePlusDays]: {
    label: '5+ days',
    color: '#2563eb',
    radius: 10,
    priority: 3,
  },
  [StayLevel.LivedThere]: {
    label: 'Lived there',
    color: '#7c3aed',
    radius: 12,
    priority: 4,
  },
}
