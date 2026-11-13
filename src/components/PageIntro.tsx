import type { ReactNode } from 'react'

type Props = { title: string; children?: ReactNode }

export default function PageIntro({ title, children }: Props) {
  return (
    <section className="bg-mist pb-14 pt-32 md:pb-20 md:pt-44">
      <div className="shell">
        <h1 className="max-w-[14ch] text-display font-extrabold">{title}</h1>
        {children && <div className="mt-6 max-w-[38rem] text-lg text-ink-soft md:text-xl">{children}</div>}
      </div>
    </section>
  )
}
