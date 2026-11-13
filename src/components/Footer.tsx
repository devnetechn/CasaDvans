import { Link } from 'react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import { mapsDirectionsUrl, site } from '../content/site'
import { FacebookIcon, MessengerIcon } from './BrandIcons'
import { navItems } from './Header'

export default function Footer() {
  return (
    <footer className="bg-ridge-deep text-paper">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.2fr_0.7fr_1.4fr] md:py-20">
        <div>
          <p className="font-display text-[2.25rem] font-extrabold leading-none tracking-[-0.03em] [font-variation-settings:'wdth'_78]">
            Casa D&rsquo; Vans
          </p>
          <p className="mt-2 font-serif italic text-paper/70">Mountain Resort, est. {site.established}</p>
          <p className="mt-6 max-w-sm text-paper/75">
            On the hills of {site.locality}, looking out over Sarangani Bay and the Celebes Sea.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="ui text-sm font-semibold text-paper/60">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/" className="footer-link">Home</Link></li>
            {navItems.map((i) => (
              <li key={i.to}><Link to={i.to} className="footer-link">{i.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="ui text-sm font-semibold text-paper/60">Get in touch</h2>
          <ul className="mt-4 space-y-3">
            <li><a href={site.phoneHref} className="footer-link inline-flex items-center gap-2.5"><Phone className="size-4 shrink-0" aria-hidden />{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="footer-link inline-flex items-center gap-2.5 [overflow-wrap:anywhere]"><Mail className="size-4 shrink-0" aria-hidden />{site.email}</a></li>
            <li><a href={site.messenger} target="_blank" rel="noopener noreferrer" className="footer-link inline-flex items-center gap-2.5"><MessengerIcon className="size-4 shrink-0" />Messenger</a></li>
            <li><a href={site.facebook} target="_blank" rel="noopener noreferrer" className="footer-link inline-flex items-center gap-2.5"><FacebookIcon className="size-4 shrink-0" />Facebook page</a></li>
            <li><a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="footer-link inline-flex items-center gap-2.5"><MapPin className="size-4 shrink-0" aria-hidden />Directions to {site.plusCode}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-paper/55 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
          <p>{site.locality}, {site.country}</p>
        </div>
      </div>
    </footer>
  )
}
