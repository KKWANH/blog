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

function normalizeValue(value: string) {
  return value.trim().toLowerCase()
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

function resolveTravelCity(entry: TravelCityInput): TravelCity {
  const cityName = entry.city.trim()
  const cityMatches = worldCities.filter((city) => normalizeValue(city.name) === normalizeValue(cityName))

  if (!cityMatches.length) {
    throw new Error(`Travel city lookup failed: "${entry.city}" was not found in the local cities dataset.`)
  }

  const countryCode = resolveCountryCode(entry.country)
  const matches = countryCode
    ? cityMatches.filter((city) => city.country === countryCode)
    : cityMatches

  if (!matches.length) {
    throw new Error(
      `Travel city lookup failed: "${entry.city}" did not match country "${entry.country}".`,
    )
  }

  if (matches.length > 1) {
    throw new Error(
      `Travel city lookup is ambiguous for "${entry.city}". Add a more specific country or extend the resolver. Matches: ${formatAmbiguousMatches(matches)}`,
    )
  }

  const match = matches[0]

  return {
    id: entry.id ?? slugify(`${entry.city}-${entry.country ?? match.country}`),
    city: match.name,
    country: entry.country ?? countries.getName(match.country, 'en') ?? match.country,
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
