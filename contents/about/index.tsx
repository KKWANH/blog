import { ContactCard } from '@/components/contact-card'

export const title = 'Kwanho Kim — Contact card'
export const description = 'C++ Software Engineer at KLA in Leuven. Career facts, CV and contact details.'
export const excerpt = 'A contact card, a recruiter brief and selected work.'
export const lang = 'en'
export const showToc = false
export const bodyClassName = 'contact-page'

export default function AboutPage() {
  return <ContactCard />
}
