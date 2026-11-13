import { amenities } from '../content/site'
import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import PhotoFrame from '../components/PhotoFrame'
import Action from '../components/Action'
import ContactBand from '../components/ContactBand'

const featured = amenities.filter((a) => a.photo)
const more = amenities.filter((a) => !a.photo)

const goodToKnow = [
  {
    title: 'Rates and hours',
    body: 'Entrance fees, casita rates and opening hours change with the season, so we confirm them directly rather than list numbers that may be out of date.',
  },
  {
    title: 'Planning an event',
    body: 'For weddings, debuts, birthdays and company gatherings, message us early with your date and guest count so we can check the pool deck and the hall.',
  },
  {
    title: 'Getting here',
    body: 'The resort is in the hills of Maasim, Sarangani, a drive west of General Santos City. Directions are on the contact page.',
  },
]

export default function Services() {
  return (
    <>
      <Seo
        title="Amenities"
        description="Infinity pool, kiddie and adult pools with a lifeguard, garden pavilions, wooden casitas, food on site and space for weddings and events at Casa D' Vans Mountain Resort in Maasim."
      />
      <PageIntro title="Pools, pavilions and a long view">
        Everything at Casa D&rsquo; Vans is built around the hill and what you can see from it. Here is what is waiting at the top.
      </PageIntro>

      <div className="shell py-16 md:py-28">
        {featured.map((a, i) => (
          <article
            key={a.id}
            id={a.id}
            className="grid scroll-mt-28 gap-8 border-b border-ink/15 py-12 first:pt-0 md:grid-cols-12 md:items-center md:gap-12 md:py-16"
          >
            <div className={`aspect-[4/3] overflow-hidden md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`}>
              <PhotoFrame id={a.photo!} sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
            <div className={`md:col-span-5 ${i % 2 ? 'md:order-1' : ''}`}>
              <h2 className="text-headline font-extrabold">{a.name}</h2>
              <p className="mt-5 text-ink-soft">{a.detail}</p>
              <Action to={`/contact?visit=${encodeURIComponent(a.inquiry)}`} variant="outline" className="mt-8">
                Ask about {a.name.toLowerCase()}
              </Action>
            </div>
          </article>
        ))}

        <div className="grid gap-12 pt-12 md:grid-cols-2 md:gap-16 md:pt-16">
          {more.map((a) => (
            <article key={a.id} id={a.id} className="scroll-mt-28">
              <h2 className="text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] font-extrabold leading-none">{a.name}</h2>
              <p className="mt-4 max-w-md text-ink-soft">{a.detail}</p>
              <Action to={`/contact?visit=${encodeURIComponent(a.inquiry)}`} variant="text" className="mt-5">
                Ask about {a.name.toLowerCase()}
              </Action>
            </article>
          ))}
        </div>
      </div>

      <section aria-labelledby="good-to-know" className="bg-mist py-16 md:py-24">
        <div className="shell">
          <h2 id="good-to-know" className="text-headline font-extrabold">Before you come up</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            {goodToKnow.map((g) => (
              <div key={g.title} className="border-t-2 border-marigold pt-5">
                <h3 className="text-xl font-bold [font-variation-settings:'wdth'_85]">{g.title}</h3>
                <p className="mt-2 text-ink-soft">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  )
}
