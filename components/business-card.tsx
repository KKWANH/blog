import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/profile'

/**
 * The printed face of the calling card. The About introduction and the
 * standalone /card page both render this one component, so the two can never
 * drift apart. Styling lives in styles/stationery.css.
 */
export function BusinessCardFace({ id = 'business-card-face', headingId = 'profile-name' }: { id?: string; headingId?: string }) {
  return (
    <div className="paper-business-card card-centered" id={id}>
      <span className="paper-light" aria-hidden="true" />
      <p className="paper-card-role debossed">{profile.role}</p>
      <div className="paper-card-center-stack">
        <h1 id={headingId} className="debossed">{profile.name}</h1>
        <p className="paper-card-focus debossed">{profile.focus}</p>
        <p className="paper-card-location">{profile.location}</p>
      </div>
      <div className="paper-card-footer">
        <a className="paper-contact-link" href="mailto:contact@kwanho.dev" aria-label="Email contact@kwanho.dev">
          <span>contact@<wbr />kwanho.dev</span>
        </a>
        <div className="paper-footer-right">
          <a className="paper-contact-link paper-site-link" href="/" aria-label="Kwanho website home">
            kwanho.dev<ArrowUpRight aria-hidden="true" />
          </a>
          <a className="paper-card-qr-link" href="https://kwanho.dev" target="_blank" rel="noopener" aria-label="QR Code to kwanho.dev">
            <img src="/kwanho-qr.svg" alt="" className="paper-card-qr" />
          </a>
        </div>
      </div>
    </div>
  )
}
