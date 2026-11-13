import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import { amenities, reasons, reviews, site } from '../content/site'
import Seo from '../components/Seo'
import PhotoFrame from '../components/PhotoFrame'
import Action from '../components/Action'
import ContactBand from '../components/ContactBand'
import { MessengerIcon } from '../components/BrandIcons'

function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const } }

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ridge-deep text-paper">
      <div className="absolute inset-0 -z-20"><PhotoFrame id="hero" priority /></div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(20_50_58/0.55)_0%,transparent_22%,transparent_38%,rgb(31_48_32/0.7)_68%,rgb(31_48_32/0.95)_100%)]" />

      <div className="shell pb-12 pt-32 md:pb-20">
        <motion.p {...rise(0.5)} className="ui mb-5 text-[0.95rem] font-medium text-paper/80">
          {site.locality}, since {site.established}
        </motion.p>
        <motion.h1 {...rise(0.65)} className="max-w-[11ch] text-display font-extrabold">
          Sunsets above Sarangani Bay.
        </motion.h1>
        <motion.div {...rise(0.85)} className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[34rem] text-lg text-paper/85 md:text-xl">
            A hillside resort in Maasim with an infinity pool facing the Celebes Sea, family pools, garden pavilions and room for your celebrations.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Action to={site.messenger}>
              <MessengerIcon /> Plan a visit
            </Action>
            <Action to="/services" variant="outline-light">
              See what&rsquo;s here
            </Action>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="shell grid gap-10 py-20 md:grid-cols-12 md:gap-12 md:py-32">
      <h2 className="text-headline font-extrabold md:col-span-6">
        A hilltop built around the view.
      </h2>
      <div className="space-y-5 text-ink-soft md:col-span-5 md:col-start-8 md:pt-3">
        <p>
          Casa D&rsquo; Vans opened in {site.established} on the hills of Maasim, west of General Santos City. Everything here faces the water: the infinity pool, the pool deck and the garden pavilions, with the bay spread out underneath.
        </p>
        <p>
          Guests come up for a day swim, a celebration by the pool or a night in one of the wooden casitas, and most of them stay until the sun goes down.
        </p>
        <Action to="/about" variant="text" className="pt-2">Read our story</Action>
      </div>
    </section>
  )
}

function Amenities() {
  return (
    <section aria-labelledby="amenities-heading" className="bg-mist py-20 md:py-28">
      <div className="shell grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[34rem]">
          <PhotoFrame id="infinity-pool" sizes="(min-width: 768px) 58vw, 100vw" />
        </div>
        <div className="md:col-span-5">
          <h2 id="amenities-heading" className="text-headline font-extrabold">What&rsquo;s on the hill</h2>
          <dl className="mt-8 border-t border-ink/15">
            {amenities.map((a) => (
              <div key={a.id} className="border-b border-ink/15 py-5">
                <dt className="font-display text-xl font-bold [font-variation-settings:'wdth'_85]">{a.name}</dt>
                <dd className="mt-1.5 text-ink-soft">{a.summary}</dd>
              </div>
            ))}
          </dl>
          <Action to="/services" variant="outline" className="mt-8">All amenities</Action>
        </div>
      </div>
    </section>
  )
}

function Reasons() {
  return (
    <section aria-labelledby="reasons-heading" className="shell py-20 md:py-32">
      <h2 id="reasons-heading" className="max-w-[18ch] text-headline font-extrabold">Why guests make the drive up</h2>
      <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
        {reasons.map((r) => (
          <div key={r.title} className="border-t-2 border-marigold pt-5">
            <h3 className="text-xl font-bold [font-variation-settings:'wdth'_85]">{r.title}</h3>
            <p className="mt-2 text-ink-soft">{r.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function GalleryPreview() {
  return (
    <section aria-labelledby="gallery-heading" className="pb-20 md:pb-32">
      <div className="shell flex items-end justify-between gap-6">
        <h2 id="gallery-heading" className="text-headline font-extrabold">From the hill</h2>
        <Action to="/gallery" variant="text" className="shrink-0">View gallery</Action>
      </div>
      <div className="shell mt-10 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
        <Link to="/gallery" className="col-span-2 aspect-[16/10] md:col-span-7 md:row-span-2 md:aspect-auto" aria-label="Open the gallery">
          <PhotoFrame id="poolside-event" sizes="(min-width: 768px) 58vw, 100vw" />
        </Link>
        <Link to="/gallery" className="aspect-[4/5] md:col-span-5 md:aspect-[16/10]" aria-label="Open the gallery">
          <PhotoFrame id="night-pool" sizes="(min-width: 768px) 40vw, 50vw" />
        </Link>
        <Link to="/gallery" className="aspect-[4/5] md:col-span-5 md:aspect-[16/10]" aria-label="Open the gallery">
          <PhotoFrame id="family-pools" sizes="(min-width: 768px) 40vw, 50vw" />
        </Link>
      </div>
    </section>
  )
}

function Reviews() {
  const [lead, ...rest] = reviews
  return (
    <section aria-labelledby="reviews-heading" className="bg-ridge py-20 text-paper md:py-28">
      <div className="shell">
        <h2 id="reviews-heading" className="ui text-[0.95rem] font-medium text-paper/70">What guests have written</h2>
        <figure className="mt-8 max-w-4xl">
          <blockquote className="font-serif text-[clamp(1.6rem,1.1rem+2vw,2.75rem)] leading-[1.25]">
            &ldquo;{lead.quote}&rdquo;
          </blockquote>
          <figcaption className="ui mt-6 text-paper/75">{lead.author}, {lead.source}</figcaption>
        </figure>
        <div className="mt-14 grid gap-10 border-t border-paper/20 pt-10 md:grid-cols-2 md:gap-16">
          {rest.map((r) => (
            <figure key={r.author}>
              <blockquote className="text-lg">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="ui mt-4 text-sm text-paper/70">{r.author}, {r.source}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="A hillside resort in Maasim, Sarangani with an infinity pool facing the Celebes Sea, family pools, garden pavilions, wooden casitas and space for weddings and events. Est. 2021."
      />
      <Hero />
      <Intro />
      <Amenities />
      <Reasons />
      <GalleryPreview />
      <Reviews />
      <ContactBand />
    </>
  )
}
