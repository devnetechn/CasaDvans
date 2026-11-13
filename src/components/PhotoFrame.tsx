import { photos } from '../content/photos'

type Props = { id: string; className?: string; sizes?: string; priority?: boolean }

export default function PhotoFrame({ id, className = '', sizes = '100vw', priority = false }: Props) {
  const photo = photos[id]
  if (!photo) return null

  return (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={photo.position ? { objectPosition: photo.position } : undefined}
      className={`h-full w-full bg-mist object-cover ${className}`}
    />
  )
}
