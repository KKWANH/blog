import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/profile'

/* Classical optical centring (studio proposal 1) with the Ginza calling-card
   base (proposal 3): no rule, contact block bottom-left, QR seal bottom-right. */
export function BusinessCardFace({ id = 'business-card-face', headingId = 'profile-name' }: { id?: string; headingId?: string }) {
  return (
    <div className="paper-business-card card-centered" id={id}>
      <span className="paper-light" aria-hidden="true" />
      <p className="paper-card-role debossed">{profile.role}</p>
      <div className="paper-card-center-stack">
        <h1 id={headingId} className="debossed">{profile.name}</h1>
        <p className="paper-card-focus debossed">{profile.focus}</p>
      </div>
      <div className="paper-card-base">
        <div className="paper-card-contact">
          <p className="paper-card-location debossed">{profile.location}</p>
          <div className="paper-card-links-row">
            <a className="paper-contact-link debossed" href="mailto:contact@kwanho.dev" aria-label="Email contact@kwanho.dev"><span>contact@<wbr />kwanho.dev</span></a>
            <a className="paper-contact-link paper-site-link debossed" href="/" aria-label="Kwanho website home">kwanho.dev<ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <a className="paper-card-qr-link" href="https://kwanho.dev" target="_blank" rel="noopener" aria-label="QR Code to kwanho.dev"><img src="/kwanho-qr.svg" alt="" className="paper-card-qr" /></a>
      </div>
    </div>
  )
}
