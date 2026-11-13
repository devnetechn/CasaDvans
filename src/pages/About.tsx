import { site } from '../content/site'
import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import PhotoFrame from '../components/PhotoFrame'
import ContactBand from '../components/ContactBand'

const values = [
  {
    title: 'Let the place lead',
    body: 'The hill, the air and the view are what make this resort. We build around them instead of covering them up.',
  },
  {
    title: 'Keep the basics right',
    body: 'Clean restrooms and showers, a lifeguard at the pools, good food and staff who pay attention. Simple things, done every day.',
  },
  {
    title: 'Give straight answers',
    body: 'Clear replies on rates, availability and what is open before you travel, so there are no surprises when you arrive.',
  },
  {
    title: 'Look after our neighbours',
    body: 'Maasim is home. We give back where we can, starting with the schools around us.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Casa D' Vans Mountain Resort opened in 2021 on the hills of Maasim, Sarangani. Learn how it started and what we care about."
      />
      <PageIntro title={`On the hill since ${site.established}`}>
        Casa D&rsquo; Vans is a mountain resort on the hills of Maasim, Sarangani, with pools, casitas and open-air spaces looking down on Sarangani Bay.
      </PageIntro>

      <section className="shell grid gap-12 py-16 md:grid-cols-12 md:py-28">
        <div className="space-y-6 text-lg md:col-span-6">
          <h2 className="text-headline font-extrabold">How it started</h2>
          <p className="text-ink-soft">
            Casa D&rsquo; Vans was established in {site.established} in Maasim, a town better known for its coastline, dive spots and canyons. The resort shows another side of it: the same bay, seen from the hills above.
          </p>
          <p className="text-ink-soft">
            Today there is an infinity pool facing the sea, separate kiddie and adult pools, garden pavilions, wooden casitas for overnight guests, food served on site, and space for weddings and other celebrations by the pool and in the function hall. The resort is still growing; our Facebook page has the latest news.
          </p>
        </div>
        <div className="aspect-[4/5] overflow-hidden md:col-span-5 md:col-start-8">
          <PhotoFrame id="pavilions" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
      </section>

      <section aria-labelledby="values-heading" className="bg-mist py-16 md:py-28">
        <div className="shell">
          <h2 id="values-heading" className="text-headline font-extrabold">What we hold to</h2>
          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-marigold pt-5">
                <h3 className="text-2xl font-bold [font-variation-settings:'wdth'_85]">{v.title}</h3>
                <p className="mt-2 max-w-md text-ink-soft">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="community-heading" className="shell grid gap-10 py-16 md:grid-cols-12 md:items-start md:py-28">
        <div className="md:col-span-5">
          <h2 id="community-heading" className="text-headline font-extrabold">Part of Maasim</h2>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-lg text-ink-soft">
            In June 2025 our team brought school supplies and food to the Grade 1 pupils of Kyumad Integrated School. It is a small thing, and the kind we want to keep doing for the community that surrounds us.
          </p>
        </div>
      </section>

      <ContactBand title="Come and see it for yourself." />
    </>
  )
}
