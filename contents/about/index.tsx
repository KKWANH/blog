import { ProfileOverview } from '@/components/profile-overview'

export const title = 'About Kwanho Kim'
export const description = 'Software Engineer at KLA in Leuven. Device software, machine interfaces, career timeline and public project work.'
export const excerpt = 'Experience, education and the work behind the skill names.'
export const lang = 'en'
export const showToc = false
export const bodyClassName = 'profile-page'

export default function AboutPage() {
  return <ProfileOverview />
}
