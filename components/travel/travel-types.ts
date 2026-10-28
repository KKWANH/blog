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

export type TravelSnapshot = {
  places: TravelCity[]
  revision: string
  updatedAt: string | null
}

export type TravelEditorAccess = {
  token: string
  countries: Array<{ code: string; name: string }>
  mode: 'local' | 'github'
}

export type LocationSuggestion = Pick<TravelCity, 'city' | 'country' | 'countryCode' | 'lat' | 'lng'>

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

/** Glow colours for the public globe, tuned for the night (dark) and linen (light) stock. */
export const globePalette: Record<'dark' | 'light', Record<StayLevel, string>> = {
  dark: {
    [StayLevel.ShortVisit]: '#e9d8a6',
    [StayLevel.TwoPlusDays]: '#9fdcae',
    [StayLevel.FivePlusDays]: '#74c7d0',
    [StayLevel.LivedThere]: '#f4a861',
  },
  light: {
    [StayLevel.ShortVisit]: '#8a6a12',
    [StayLevel.TwoPlusDays]: '#2c7a47',
    [StayLevel.FivePlusDays]: '#1d6b82',
    [StayLevel.LivedThere]: '#b4501c',
  },
}
