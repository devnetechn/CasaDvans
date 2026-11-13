import { useId } from 'react'

type Props = { className?: string }

export default function Landscape({ className }: Props) {
  const clipId = useId()

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <rect width="1600" height="470" fill="#1c3c44" />
      <rect y="300" width="1600" height="170" fill="#2b5059" />
      <clipPath id={clipId}>
        <rect width="1600" height="470" />
      </clipPath>
      <circle cx="1130" cy="455" r="64" fill="#e0a33b" opacity="0.9" clipPath={`url(#${clipId})`} />

      <rect y="470" width="1600" height="430" fill="#143640" />
      <g stroke="#5f8c90" strokeWidth="2" opacity="0.5">
        <path d="M900 500h420M1000 528h260M820 560h340" />
      </g>
      <path d="M250 470c40-14 90-22 140-18s70 10 110 18Z" fill="#36585a" />
      <path d="M1250 470c90-52 220-92 350-100v100Z" fill="#3d5a3a" />

      <path d="M0 330c160-30 300 30 460 90s260 80 420 110c120 20 220 40 320 70L0 900Z" fill="#4a6650" />
      <path d="M0 470c200-40 380 30 560 90s340 80 540 90c200 5 350-30 500-60v310H0Z" fill="#34503a" />
      <rect x="985" y="636" width="240" height="7" rx="1" fill="#dce4de" opacity="0.85" />
      <path d="M0 640c250-30 520 40 800 80s500 40 800-20v200H0Z" fill="#1f3020" />

      <line x1="0" y1="470" x2="1600" y2="470" stroke="#e0a33b" strokeWidth="2.5" />
    </svg>
  )
}
