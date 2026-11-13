/*
 * Every fact here was taken from the resort's public Facebook listing or public guest reviews
 * (see README "Content sources"). Do not add rates, hours or claims that the owners have not confirmed.
 */

export const site = {
  name: "Casa D' Vans",
  fullName: "Casa D' Vans Mountain Resort",
  established: 2021,
  locality: 'Maasim, Sarangani',
  country: 'Philippines',
  plusCode: 'VX8C+HX Maasim',
  phone: '+63 970 460 1288',
  phoneHref: 'tel:+639704601288',
  email: 'casa.d.vanmountainresort@gmail.com',
  facebook: 'https://www.facebook.com/CasaDVansEst.2021',
  messenger: 'https://m.me/CasaDVansEst.2021',
  siteUrl: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, ''),
} as const

export const mapsQuery = encodeURIComponent(`${site.plusCode}, Sarangani, Philippines`)
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&z=14&output=embed`
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`

export type Amenity = {
  id: string
  name: string
  summary: string
  detail: string
  photo?: string
  inquiry: string
}

export const amenities: Amenity[] = [
  {
    id: 'infinity-pool',
    name: 'Infinity pool',
    summary: 'A long pool at the edge of the hill, with Sarangani Bay and the Celebes Sea filling the horizon.',
    detail:
      'The pool most guests come for. Its edge lines up with the sea below, so on a still evening the palms, the sky and the water all meet in one reflection. It is the best seat on the property for sunset.',
    photo: 'infinity-pool',
    inquiry: 'Day swim',
  },
  {
    id: 'family-pools',
    name: 'Kiddie and adult pools',
    summary: 'Separate pools for children and grown-ups, watched over by a lifeguard on duty.',
    detail:
      'Families can split up without losing sight of each other. The shallower pools sit right beside the infinity pool, and a lifeguard is on duty while the pools are open. After dark the pools are lit for night swimming.',
    photo: 'family-pools',
    inquiry: 'Day swim',
  },
  {
    id: 'pavilions',
    name: 'Garden pavilions',
    summary: 'Shaded pavilions along the garden paths, with tables for a long lunch out of the sun.',
    detail:
      'Woven-roof pavilions are spread through the garden, each with its own tables and chairs. They give families and groups a shaded base for the day between swims.',
    photo: 'pavilions',
    inquiry: 'Day swim',
  },
  {
    id: 'events',
    name: 'Celebrations and events',
    summary: 'Weddings, debuts and receptions by the infinity pool or in the function hall.',
    detail:
      'The resort hosts celebrations both outdoors, on the deck beside the infinity pool with the sea as the backdrop, and indoors in the function hall. Tell us your date, guest count and the kind of event you are planning, and we will tell you what is possible.',
    photo: 'poolside-event',
    inquiry: 'Event or celebration',
  },
  {
    id: 'casitas',
    name: 'Wooden casitas',
    summary: 'Small wooden casitas for guests who want to stay the night and wake up to a cool mountain morning.',
    detail:
      'For overnight stays there are small wooden casitas close to the open air. Message us to check which casitas are free on your dates.',
    inquiry: 'Overnight in a casita',
  },
  {
    id: 'food',
    name: 'Food on site',
    summary: 'Meals served at the resort, so you can spend the whole day up the hill without driving back to town.',
    detail:
      'Food is served on site, and guests mention it alongside the view. Ask us what is on the menu when you plan your visit.',
    inquiry: 'Food and dining',
  },
]

export const reasons = [
  {
    title: 'An open view of the bay',
    body: 'The resort sits high enough above Maasim to see across Sarangani Bay to the Celebes Sea, with nothing in the way.',
  },
  {
    title: 'Cooler air, quieter days',
    body: 'Mornings on the hill are noticeably cooler than down on the coast, and evenings end with the sun dropping into the sea.',
  },
  {
    title: 'Safe for families',
    body: 'A separate kiddie pool and a lifeguard on duty mean parents can actually sit down for a while.',
  },
  {
    title: 'Clean and looked after',
    body: 'Guests point out clean restrooms and showers, attentive staff and good food: the basics, done properly.',
  },
]

export type Review = { quote: string; author: string; source: string }

export const reviews: Review[] = [
  {
    quote: 'Best place to chill while enjoying the uninterrupted vista of the Sarangani Bay and the Celebes Sea.',
    author: 'Alvin Rex Lucero',
    source: 'Google review',
  },
  {
    quote: "First time to travel here in Sarangani, and it's the best place I've been, so far.",
    author: 'Bordskiii',
    source: 'Google review',
  },
  {
    quote: 'Nice ambiance overlooking the beach! Rest rooms and shower rooms are clean!',
    author: 'Russell John Somo',
    source: 'Google review',
  },
]

export const visitTypes = ['Day swim', 'Overnight in a casita', 'Event or celebration', 'Food and dining', 'Something else'] as const
