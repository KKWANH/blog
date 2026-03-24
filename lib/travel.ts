import countryNames from 'i18n-iso-countries/langs/en.json'
import countries from 'i18n-iso-countries'
import citiesDataset from 'cities.json'
import type { StayLevel, TravelCity } from '@/components/travel/travel-types'

countries.registerLocale(countryNames)

type DatasetCity = {
  name: string
  lat: string
  lng: string
  country: string
  admin1: string
  admin2: string
}

export type TravelCityInput = {
  city: string
  country?: string
  level: StayLevel
  id?: string
}

const worldCities = citiesDataset as DatasetCity[]

const cityAliases: Record<string, string> = {
  canter: 'Canterbury',
  frankfurt: 'Frankfurt am Main',
  'ha noi': 'Hanoi',
  milyang: 'Miryang',
  yeongduck: 'Yeongdeok',
  donghae: 'Donghae City',
  bucheon: 'Bucheon-si',
  hwaseong: 'Hwaseong-si',
  goisan: 'Goesan',
}

const cityOverrides: Record<
  string,
  {
    city: string
    countryCode: string
    lat: number
    lng: number
  }
> = {
  'anyang|KR': {
    city: 'Anyang',
    countryCode: 'KR',
    lat: 37.3925,
    lng: 126.9269,
  },
  'jeungpyeong|KR': {
    city: 'Jeungpyeong',
    countryCode: 'KR',
    lat: 36.7853,
    lng: 127.5815,
  },
  'hallstatt|AT': {
    city: 'Hallstatt',
    countryCode: 'AT',
    lat: 47.5622,
    lng: 13.6493,
  },
  'geoje|KR': {
    city: 'Geoje',
    countryCode: 'KR',
    lat: 34.880643,
    lng: 128.621082,
  },
  'namhae|KR': {
    city: 'Namhae',
    countryCode: 'KR',
    lat: 34.80433,
    lng: 127.92708,
  },
  'namwon|KR': {
    city: 'Namwon',
    countryCode: 'KR',
    lat: 35.41,
    lng: 127.385833,
  },
  'sacheon|KR': {
    city: 'Sacheon',
    countryCode: 'KR',
    lat: 35.00385,
    lng: 128.06857,
  },
  'cheongdo|KR': {
    city: 'Cheongdo',
    countryCode: 'KR',
    lat: 35.647271,
    lng: 128.733911,
  },
  'cheongsong|KR': {
    city: 'Cheongsong',
    countryCode: 'KR',
    lat: 36.436279,
    lng: 129.057126,
  },
  'gachang|KR': {
    city: 'Gachang',
    countryCode: 'KR',
    lat: 35.7778,
    lng: 128.6477,
  },
  'gapyeong|KR': {
    city: 'Gapyeong',
    countryCode: 'KR',
    lat: 37.831508,
    lng: 127.509541,
  },
  'taeback|KR': {
    city: 'Taeback',
    countryCode: 'KR',
    lat: 37.1652,
    lng: 128.9857,
  },
  'haenam|KR': {
    city: 'Haenam',
    countryCode: 'KR',
    lat: 34.573573,
    lng: 126.598927,
  },
  'siheung|KR': {
    city: 'Siheung',
    countryCode: 'KR',
    lat: 37.39067,
    lng: 126.7888,
  },
  'yongin|KR': {
    city: 'Yongin',
    countryCode: 'KR',
    lat: 37.23825,
    lng: 127.17795,
  },
  'jecheon|KR': {
    city: 'Jecheon',
    countryCode: 'KR',
    lat: 37.133333,
    lng: 128.216667,
  },
  'cheorwon|KR': {
    city: 'Cheorwon',
    countryCode: 'KR',
    lat: 38.146609,
    lng: 127.313279,
  },
  'goesan|KR': {
    city: 'Goesan',
    countryCode: 'KR',
    lat: 36.815669,
    lng: 127.786579,
  },
  'yeongyang|KR': {
    city: 'Yeongyang',
    countryCode: 'KR',
    lat: 36.666717,
    lng: 129.112333,
  },
  'merzouga|MA': {
    city: 'Merzouga',
    countryCode: 'MA',
    lat: 31.099167,
    lng: -4.011667,
  },
}

function normalizeValue(value: string) {
  return value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function titleKey(value: string) {
  return normalizeValue(value)
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function resolveCountryCode(country?: string) {
  if (!country) {
    return null
  }

  const trimmed = country.trim()
  if (!trimmed) {
    return null
  }

  if (/^[A-Za-z]{2}$/.test(trimmed)) {
    return trimmed.toUpperCase()
  }

  const countryCode = countries.getAlpha2Code(trimmed, 'en')
  return countryCode ?? null
}

function formatAmbiguousMatches(matches: DatasetCity[]) {
  return matches
    .slice(0, 5)
    .map((match) => `${match.name}, ${match.country}, admin1=${match.admin1 || 'n/a'}`)
    .join(' | ')
}

function resolvePreferredMatch(matches: DatasetCity[]) {
  if (matches.length <= 1) {
    return matches[0] ?? null
  }

  // In this dataset, the broader city-level record often has an empty admin2.
  const topLevelMatches = matches.filter((match) => !match.admin2)
  if (topLevelMatches.length === 1) {
    return topLevelMatches[0]
  }

  return null
}

function resolveTravelCity(entry: TravelCityInput): TravelCity {
  const cityName = entry.city.trim()
  const normalizedCityName = titleKey(cityName)
  const resolvedCityName = cityAliases[normalizedCityName] ?? cityName
  const countryCode = resolveCountryCode(entry.country)
  const overrideKey = countryCode ? `${normalizedCityName}|${countryCode}` : null

  if (overrideKey && cityOverrides[overrideKey]) {
    const override = cityOverrides[overrideKey]

    return {
      id: entry.id ?? slugify(`${override.city}-${entry.country ?? override.countryCode}`),
      city: override.city,
      country: entry.country ?? countries.getName(override.countryCode, 'en') ?? override.countryCode,
      countryCode: override.countryCode,
      level: entry.level,
      lat: override.lat,
      lng: override.lng,
    }
  }

  const cityMatches = worldCities.filter((city) => normalizeValue(city.name) === normalizeValue(resolvedCityName))

  if (!cityMatches.length) {
    throw new Error(`Travel city lookup failed: "${entry.city}" was not found in the local cities dataset.`)
  }

  const matches = countryCode
    ? cityMatches.filter((city) => city.country === countryCode)
    : cityMatches

  if (!matches.length) {
    throw new Error(
      `Travel city lookup failed: "${entry.city}" did not match country "${entry.country}".`,
    )
  }

  const preferredMatch = resolvePreferredMatch(matches)
  if (preferredMatch) {
    return {
      id: entry.id ?? slugify(`${resolvedCityName}-${entry.country ?? preferredMatch.country}`),
      city: preferredMatch.name,
      country: entry.country ?? countries.getName(preferredMatch.country, 'en') ?? preferredMatch.country,
      countryCode: preferredMatch.country,
      level: entry.level,
      lat: Number(preferredMatch.lat),
      lng: Number(preferredMatch.lng),
    }
  }

  if (matches.length > 1) {
    throw new Error(
      `Travel city lookup is ambiguous for "${entry.city}". Add a more specific country or extend the resolver. Matches: ${formatAmbiguousMatches(matches)}`,
    )
  }

  const match = matches[0]

  return {
    id: entry.id ?? slugify(`${resolvedCityName}-${entry.country ?? match.country}`),
    city: match.name,
    country: entry.country ?? countries.getName(match.country, 'en') ?? match.country,
    countryCode: match.country,
    level: entry.level,
    lat: Number(match.lat),
    lng: Number(match.lng),
  }
}

export function defineTravelCities(entries: TravelCityInput[]) {
  const slugCounts = new Map<string, number>()

  return entries.map((entry) => {
    const resolved = resolveTravelCity(entry)
    const count = slugCounts.get(resolved.id) ?? 0
    slugCounts.set(resolved.id, count + 1)

    if (count === 0) {
      return resolved
    }

    return {
      ...resolved,
      id: `${resolved.id}-${count + 1}`,
    }
  })
}
