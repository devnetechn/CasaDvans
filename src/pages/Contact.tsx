import { useSearchParams } from 'react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import { mapsDirectionsUrl, mapsEmbedUrl, site } from '../content/site'
import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import InquiryForm from '../components/InquiryForm'
import Action from '../components/Action'
import { FacebookIcon, MessengerIcon } from '../components/BrandIcons'

const methods = [
  { icon: Phone, label: 'Call or text', value: site.phone, href: site.phoneHref },
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: FacebookIcon, label: 'Facebook', value: 'CasaDVansEst.2021', href: site.facebook },
]

export default function Contact() {
  const [params] = useSearchParams()

  return (
    <>
      <Seo
        title="Contact"
        description="Message Casa D' Vans Mountain Resort on Messenger, call +63 970 460 1288 or send an inquiry. Find directions to the resort in Maasim, Sarangani."
      />
      <PageIntro title="Plan your visit">
        Messenger is the fastest way to reach us. Ask about today&rsquo;s hours, rates, casita availability or a visit with a group.
      </PageIntro>

      <section className="shell grid gap-16 py-16 md:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <a
            href={site.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 bg-ink p-6 text-paper transition-colors hover:bg-ridge md:p-8"
          >
            <span>
              <span className="ui block text-sm text-paper/70">Fastest reply</span>
              <span className="mt-1 block font-display text-3xl font-extrabold [font-variation-settings:'wdth'_80]">Message us on Messenger</span>
            </span>
            <MessengerIcon className="size-9 shrink-0 text-marigold" />
          </a>

          <ul className="mt-8 border-t border-ink/15">
            {methods.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="border-b border-ink/15">
                <a
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 py-5 transition-colors hover:text-ridge"
                >
                  <Icon className="size-5 shrink-0 text-ink-soft" aria-hidden />
                  <span className="min-w-0">
                    <span className="ui block text-sm text-ink-soft">{label}</span>
                    <span className="block break-words font-semibold">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="text-headline font-extrabold">Send an inquiry</h2>
          <p className="mb-8 mt-3 text-ink-soft">Tell us when you would like to come and how many of you there are, and we will reply with what is available.</p>
          <InquiryForm initialVisit={params.get('visit') ?? undefined} />
        </div>
      </section>

      <section aria-labelledby="find-us" className="bg-mist">
        <div className="shell grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-4">
            <h2 id="find-us" className="text-headline font-extrabold">Finding us</h2>
            <p className="mt-5 text-ink-soft">
              The resort is in the hills of Maasim, Sarangani, west of General Santos City. Its Google Maps plus code is <strong className="font-semibold text-ink">{site.plusCode}</strong>.
            </p>
            <p className="mt-3 text-ink-soft">Not sure of the way? Message us before you set out.</p>
            <Action to={mapsDirectionsUrl} variant="outline" className="mt-8">
              <MapPin className="size-4" aria-hidden /> Get directions
            </Action>
          </div>
          <div className="aspect-[4/3] bg-paper md:col-span-8 md:aspect-[16/9]">
            <iframe
              title={`Map showing ${site.fullName}, ${site.plusCode}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  )
}
