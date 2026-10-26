import { CopyEmail } from '@/components/copy-email'
import { profile } from '@/lib/profile'
import { externalLinks } from '@/lib/projects'
import { MotionControl } from '@/components/motion-provider'

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
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <MotionControl />
        </div>
      </div>
    </footer>
  )
}
