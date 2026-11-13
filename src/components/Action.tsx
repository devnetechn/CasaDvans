import type { ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'outline' | 'outline-light' | 'text'

const styles: Record<Variant, string> = {
  primary: 'bg-marigold text-ink hover:bg-[#eab352] px-5 py-3',
  outline: 'border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper px-5 py-3',
  'outline-light': 'border border-paper/50 text-paper hover:border-paper hover:bg-paper hover:text-ink px-5 py-3',
  text: 'text-ink underline decoration-marigold decoration-2 underline-offset-[6px] hover:decoration-ink',
}

type Props = { to: string; variant?: Variant; children: ReactNode; className?: string }

export default function Action({ to, variant = 'primary', children, className = '' }: Props) {
  const cls = `ui inline-flex items-center justify-center gap-2 text-[0.95rem] font-semibold transition-colors duration-200 ${styles[variant]} ${className}`
  const external = /^(https?:|mailto:|tel:)/.test(to)

  if (external) {
    const newTab = to.startsWith('http')
    return (
      <a href={to} className={cls} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  )
}
