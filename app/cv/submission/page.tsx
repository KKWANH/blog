import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HtmlCv } from '@/components/html-cv'

export const metadata: Metadata = { title: 'CV (submission) — Kwanho Kim', robots: { index: false, follow: false } }

/* Submission copy of the CV with grades. Grades live only in the git-ignored
   .private/cv-submission.json and this route exists only on the local dev server;
   `npm run cv:submission` prints it to a PDF outside the repository. */
export default function SubmissionCvPage() {
  if (process.env.NODE_ENV !== 'development') notFound()
  const file = path.join(process.cwd(), '.private/cv-submission.json')
  if (!fs.existsSync(file)) notFound()
  const { gpa } = JSON.parse(fs.readFileSync(file, 'utf8')) as { gpa: Record<string, string> }
  return (
    <main id="main-content" className="cv-route-page">
      <HtmlCv gpa={gpa} />
    </main>
  )
}
