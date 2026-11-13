import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { photos } from '../content/photos'
import PhotoFrame from './PhotoFrame'

type Props = { ids: string[]; index: number | null; onChange: (index: number | null) => void }

export default function Lightbox({ ids, index, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const open = index !== null
  const count = ids.length

  const step = useCallback(
    (delta: number) => index !== null && onChange((index + delta + count) % count),
    [index, count, onChange],
  )

  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement as HTMLElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      returnFocus.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, step, onChange])

  const photo = index !== null ? photos[ids[index]] : null

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${photo.caption}, photo ${index + 1} of ${count}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-ink/97 text-paper"
          onClick={(e) => e.target === e.currentTarget && onChange(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <p className="ui text-sm text-paper/75">{index + 1} / {count}</p>
            <button ref={closeRef} type="button" onClick={() => onChange(null)} aria-label="Close gallery" className="grid size-11 place-items-center hover:text-marigold">
              <X className="size-6" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-20" onClick={(e) => e.target === e.currentTarget && onChange(null)}>
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex max-h-full w-full max-w-6xl flex-col"
            >
              <div className={`mx-auto ${photo.orientation === 'portrait' ? 'aspect-[4/5] h-[72svh] max-w-full' : 'aspect-[3/2] max-h-[72svh] w-full'}`}>
                {photo.src ? (
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-contain" />
                ) : (
                  <PhotoFrame id={photo.id} />
                )}
              </div>
              <figcaption className="mt-4 text-center text-paper/85">{photo.caption}</figcaption>
            </motion.figure>

            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-1 top-1/2 grid size-12 -translate-y-1/2 place-items-center hover:text-marigold md:left-4">
              <ChevronLeft className="size-8" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-1 top-1/2 grid size-12 -translate-y-1/2 place-items-center hover:text-marigold md:right-4">
              <ChevronRight className="size-8" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
