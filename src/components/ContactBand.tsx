import { Phone } from 'lucide-react'
import { site } from '../content/site'
import Action from './Action'
import { MessengerIcon } from './BrandIcons'
import Landscape from './Landscape'

type Props = { title?: string; body?: string }

export default function ContactBand({
  title = 'Check today’s pools, casitas and rates.',
  body = 'Rates, opening hours and casita availability change with the season. Send us a message with your date and the size of your group, and we will tell you what is open.',
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <Landscape className="absolute inset-x-0 bottom-0 -z-10 h-[55%] w-full opacity-30 md:h-full md:opacity-25" />
      <div className="shell grid gap-10 py-20 md:grid-cols-[1.2fr_1fr] md:items-end md:py-28">
        <h2 className="max-w-[16ch] text-headline font-extrabold">{title}</h2>
        <div>
          <p className="max-w-md text-paper/80">{body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Action to={site.messenger}>
              <MessengerIcon /> Message us
            </Action>
            <Action to={site.phoneHref} variant="outline-light">
              <Phone className="size-4" aria-hidden /> Call {site.phone}
            </Action>
          </div>
        </div>
      </div>
    </section>
  )
}
