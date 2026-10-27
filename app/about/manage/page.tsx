import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SkillEditor } from '@/components/skill-editor'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Edit skill familiarity', robots: { index: false, follow: false } }

export default function ManageSkillsPage() {
  return <><SiteHeader /><main id="main-content" className="site-width skill-management-page"><header className="management-heading"><Link className="text-link" href="/about#skills">← Public profile</Link><h1>Your skills, as you use them.</h1><p>Set familiarity, revisit older tools or hide a skill from the profile.</p></header><SkillEditor /></main><SiteFooter /></>
}
