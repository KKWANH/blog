import { createHash } from 'node:crypto'
import data from '@/contents/about/repositories.generated.json'
import type { RepositoryCatalogue } from '@/lib/repository-types'

const catalogue = data as RepositoryCatalogue
export const repositoryRevision = createHash('sha256').update(JSON.stringify(catalogue)).digest('hex')
const records = new Map(catalogue.repositories.map((record) => [record.name, record]))
export const repositoryRecord = (name: string) => records.get(name)
