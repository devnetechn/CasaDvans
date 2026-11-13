import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { site } from '../content/site'
import { MessengerIcon } from './BrandIcons'

export const navItems = [
  { to: '/services', label: 'Amenities' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Wordmark({ light }: { light: boolean }) {
  return (
    <Link to="/" className={`group flex flex-col leading-none ${light ? 'text-paper' : 'text-ink'}`} aria-label={`${site.fullName}, home`}>
      <span className="font-display text-[1.45rem] font-extrabold tracking-[-0.03em] [font-variation-settings:'wdth'_78]">
        Casa D&rsquo; Vans
      </span>
      <span className="mt-1 font-serif text-[0.8rem] italic opacity-80">Mountain Resort, est. {site.established}</span>
    </Link>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overHero = pathname === '/' && !scrolled && !open

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        overHero ? 'bg-transparent' : 'border-b border-ink/10 bg-paper'
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Wordmark light={overHero} />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `ui relative py-1 text-[0.95rem] font-medium transition-colors ${overHero ? 'text-paper/85 hover:text-paper' : 'text-ink-soft hover:text-ink'} ${
                  isActive ? `${overHero ? 'text-paper' : 'text-ink'} after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-marigold` : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={site.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="ui inline-flex items-center gap-2 bg-marigold px-4 py-2.5 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-[#eab352]"
          >
            <MessengerIcon />
            Message us
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`-mr-2 grid size-11 place-items-center md:hidden ${overHero ? 'text-paper' : 'text-ink'}`}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] flex flex-col overflow-y-auto bg-paper md:hidden"
          >
            <nav aria-label="Mobile" className="shell flex flex-col pt-4">
              <NavLink to="/" end className={({ isActive }) => `mobile-link ${isActive ? 'text-ink' : 'text-ink-soft'}`}>
                {mobileLabel('Home')}
              </NavLink>
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => `mobile-link ${isActive ? 'text-ink' : 'text-ink-soft'}`}>
                  {mobileLabel(item.label)}
                </NavLink>
              ))}
            </nav>
            <div className="shell mt-auto grid gap-3 pb-8 pt-10">
              <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="ui flex items-center justify-center gap-2 bg-marigold py-4 font-semibold text-ink">
                <MessengerIcon /> Message us on Messenger
              </a>
              <a href={site.phoneHref} className="ui flex items-center justify-center gap-2 border border-ink/25 py-4 font-semibold text-ink">
                <Phone className="size-4" aria-hidden /> Call {site.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function mobileLabel(label: string) {
  return <span className="block border-b border-ink/10 py-4 font-display text-[2rem] font-bold leading-none [font-variation-settings:'wdth'_80]">{label}</span>
}
