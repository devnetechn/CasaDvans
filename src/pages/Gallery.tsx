import { useState } from 'react'
import { galleryOrder, photos } from '../content/photos'
import { site } from '../content/site'
import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import PhotoFrame from '../components/PhotoFrame'
import Lightbox from '../components/Lightbox'
import Action from '../components/Action'
import { FacebookIcon } from '../components/BrandIcons'

const spans = [
  'col-span-2 aspect-[4/3] md:col-span-8',
  'aspect-[4/5] md:col-span-4 md:aspect-auto',
  'aspect-[4/5] md:col-span-5 md:aspect-[4/3]',
  'col-span-2 aspect-[16/9] md:col-span-7 md:aspect-auto',
  'col-span-2 aspect-[16/9] md:col-span-12 md:aspect-[21/8]',
  'aspect-[4/5] md:col-span-6 md:aspect-[4/3]',
  'aspect-[4/5] md:col-span-6 md:aspect-[4/3]',
  'col-span-2 aspect-[16/9] md:col-span-12 md:aspect-[21/8]',
]

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <Seo
        title="Gallery"
        description="Photos of Casa D' Vans Mountain Resort: the infinity pool at sunset, family pools, garden pavilions, the pools at night and weddings by the sea in Maasim, Sarangani."
      />
      <PageIntro title="From the hill">
        The pools, the gardens and the celebrations, from sunrise to after dark. Tap any photo to see it larger.
      </PageIntro>

      <section className="shell py-12 md:py-20">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
          {galleryOrder.map((id, i) => (
            <li key={id} className={spans[i % spans.length]}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block h-full w-full overflow-hidden"
                aria-label={`Open photo: ${photos[id].caption}`}
              >
                <span className="block h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
                  <PhotoFrame id={id} sizes="(min-width: 768px) 50vw, 50vw" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-start gap-5 border-t border-ink/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-ink-soft">New photos and announcements go up on our Facebook page.</p>
          <Action to={site.facebook} variant="outline">
            <FacebookIcon /> Follow on Facebook
          </Action>
        </div>
      </section>

      <Lightbox ids={galleryOrder} index={active} onChange={setActive} />
    </>
  )
}
