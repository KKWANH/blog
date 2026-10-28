import { CopyEmail } from '@/components/copy-email'
import { profile } from '@/lib/profile'
import { externalLinks } from '@/lib/projects'
import { MotionControl } from '@/components/motion-provider'
import { StatisticsPreference } from '@/components/visit-statistics'
import buildMeta from '@/contents/build-meta.json'

export function SiteFooter() {
  return (
    <footer className="notebook-footer">
      <div className="site-width">
        <div className="footer-main">
          <div>
            <p className="footer-label">Get in touch</p>
            <a className="footer-email" href={`mailto:${profile.contact}`}>{profile.contact}</a>
            <CopyEmail email={profile.contact} />
          </div>
          <nav className="footer-links" aria-label="Elsewhere">
            <a href={profile.github}>GitHub</a>
            <a href={profile.linkedin}>LinkedIn</a>
            <a href={externalLinks.instagram}>Instagram</a>
            <a href={externalLinks.cv}>{externalLinks.cvLabel}</a>
            <a href="/admin">Owner tools</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <div className="footer-info">
            <p>© {new Date().getFullYear()} {profile.name}</p>
            <span className="footer-dot" aria-hidden="true">·</span>
            <p className="footer-last-updated">Last updated: <time dateTime={buildMeta.timestamp}>{buildMeta.lastUpdatedTime}</time></p>
          </div>
          <div className="footer-actions">
            <StatisticsPreference />
            <MotionControl />
          </div>
        </div>
      </div>
    </footer>
  )
}
