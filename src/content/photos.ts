/*
 * Photo registry. Photos come from the resort's Facebook page.
 * To add one: export WebP files at 800px and 1600px wide into /public/photos as `<name>-800.webp`
 * and `<name>-1600.webp`, then add an entry below with `files('<name>')`.
 */

export type Photo = {
  id: string
  src: string
  srcSet: string
  alt: string
  caption: string
  orientation: 'landscape' | 'portrait'
  position?: string
}

const files = (name: string, widths = [800, 1600]) => ({
  src: `/photos/${name}-1600.webp`,
  srcSet: widths.map((w) => `/photos/${name}-${w}.webp ${w}w`).join(', '),
})

export const photos: Record<string, Photo> = {
  hero: {
    id: 'hero',
    ...files('sunset-pools', [800, 1600, 2000]),
    alt: 'Orange sunset sky reflected in the resort pools, with coconut trees and the sea beyond',
    caption: 'Sunset over the pools',
    orientation: 'landscape',
    position: '50% 60%',
  },
  'infinity-pool': {
    id: 'infinity-pool',
    ...files('infinity-pool'),
    alt: 'Coconut palms reflected in the still infinity pool at sunset, the sea on the horizon',
    caption: 'The infinity pool at sunset',
    orientation: 'portrait',
    position: '50% 62%',
  },
  'family-pools': {
    id: 'family-pools',
    ...files('family-pools'),
    alt: 'A round tiled pool beside the infinity pool, overlooking the sea and palm trees',
    caption: 'Round pool beside the infinity pool',
    orientation: 'landscape',
  },
  pavilions: {
    id: 'pavilions',
    ...files('pavilions'),
    alt: 'Garden path lined with plants and woven-roof pavilions with tables and chairs',
    caption: 'Garden pavilions',
    orientation: 'landscape',
  },
  'poolside-event': {
    id: 'poolside-event',
    ...files('poolside-event'),
    alt: 'Wedding reception set up beside the infinity pool with a floral arch and the sea behind',
    caption: 'A celebration by the infinity pool',
    orientation: 'landscape',
  },
  'function-hall': {
    id: 'function-hall',
    ...files('function-hall'),
    alt: 'Function hall decorated for a wedding with chandeliers, flowers and a centre aisle',
    caption: 'The function hall, dressed for a wedding',
    orientation: 'landscape',
  },
  'hall-reception': {
    id: 'hall-reception',
    ...files('hall-reception'),
    alt: 'Reception tables with gold chairs and blue linens under draped fabric and pendant lights',
    caption: 'Reception set-up in the hall',
    orientation: 'landscape',
  },
  'night-pool': {
    id: 'night-pool',
    ...files('night-pool'),
    alt: 'Pools lit green and red at dusk, with a string-lit deck and palms against the evening sky',
    caption: 'The pools after dark',
    orientation: 'landscape',
  },
}

export const galleryOrder = ['hero', 'infinity-pool', 'night-pool', 'poolside-event', 'family-pools', 'function-hall', 'hall-reception', 'pavilions']
