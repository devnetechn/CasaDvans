import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { AlertCircle, Check, Copy, LoaderCircle } from 'lucide-react'
import { site, visitTypes } from '../content/site'
import { deliveryMode, formatInquiry, mailtoHref, sendToEndpoint, validate, type Inquiry, type InquiryErrors } from '../lib/inquiry'
import { MessengerIcon } from './BrandIcons'

type Status = 'idle' | 'submitting' | 'sent' | 'emailed' | 'error'

const empty: Inquiry = { name: '', contact: '', date: '', guests: '', visit: visitTypes[0], message: '' }

const inputCls =
  'mt-2 block w-full border border-ink/25 bg-paper px-4 py-3 text-ink placeholder:text-ink/40 transition-colors focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 aria-[invalid=true]:border-[#b3261e]'

export default function InquiryForm({ initialVisit }: { initialVisit?: string }) {
  const uid = useId()
  const [data, setData] = useState<Inquiry>(() => ({
    ...empty,
    visit: visitTypes.find((v) => v === initialVisit) ?? empty.visit,
  }))
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  const [trap, setTrap] = useState('')

  const update = (key: keyof Inquiry) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData((d) => ({ ...d, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (trap) return
    const found = validate(data)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as (keyof Inquiry)[])[0]
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus()
      return
    }

    if (deliveryMode === 'email') {
      window.location.href = mailtoHref(data)
      setStatus('emailed')
      return
    }

    setStatus('submitting')
    try {
      await sendToEndpoint(data)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(formatInquiry(data))
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="border-t-2 border-ridge bg-mist p-8">
        <Check className="size-8 text-ridge" aria-hidden />
        <h3 className="mt-4 text-3xl font-extrabold">Inquiry sent</h3>
        <p className="mt-3 text-ink-soft">Thanks, {data.name.trim().split(' ')[0]}. We will reply to {data.contact.trim()} as soon as we can.</p>
        <button type="button" onClick={() => { setData(empty); setStatus('idle') }} className="ui mt-6 font-semibold underline decoration-marigold decoration-2 underline-offset-4">
          Send another inquiry
        </button>
      </div>
    )
  }

  if (status === 'emailed') {
    return (
      <div role="status" className="border-t-2 border-ridge bg-mist p-8">
        <h3 className="text-3xl font-extrabold">Finish sending in your email app</h3>
        <p className="mt-3 text-ink-soft">
          Your inquiry is ready in a new email to {site.email}. Press send there and we will reply as soon as we can.
        </p>
        <p className="mt-3 text-ink-soft">No email app opened? Copy your message and send it to us on Messenger instead.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={copyMessage} className="ui inline-flex items-center justify-center gap-2 border border-ink/30 px-5 py-3 font-semibold hover:border-ink">
            {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? 'Copied' : 'Copy message'}
          </button>
          <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="ui inline-flex items-center justify-center gap-2 bg-marigold px-5 py-3 font-semibold text-ink hover:bg-[#eab352]">
            <MessengerIcon /> Open Messenger
          </a>
        </div>
        <button type="button" onClick={() => setStatus('idle')} className="ui mt-6 text-sm font-semibold underline underline-offset-4">
          Edit inquiry
        </button>
      </div>
    )
  }

  const field = (key: keyof Inquiry) => ({
    id: `${uid}-${key}`,
    name: key,
    value: data[key],
    onChange: update(key),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${uid}-${key}-error` : undefined,
    className: inputCls,
  })

  const error = (key: keyof Inquiry) =>
    errors[key] && (
      <p id={`${uid}-${key}-error`} className="ui mt-1.5 flex items-start gap-1.5 text-sm text-[#b3261e]">
        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
        {errors[key]}
      </p>
    )

  const label = (key: keyof Inquiry, text: string, optional = false) => (
    <label htmlFor={`${uid}-${key}`} className="ui text-[0.95rem] font-semibold">
      {text} {optional && <span className="font-normal text-ink-soft">(optional)</span>}
    </label>
  )

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">{label('name', 'Your name')}<input {...field('name')} autoComplete="name" />{error('name')}</div>
      <div className="sm:col-span-2">
        {label('contact', 'Mobile number or email')}
        <input {...field('contact')} autoComplete="email" inputMode="email" placeholder="0917 123 4567 or you@example.com" />
        {error('contact')}
      </div>
      <div>
        {label('visit', 'What are you planning?')}
        <select {...field('visit')}>
          {visitTypes.map((v) => <option key={v}>{v}</option>)}
        </select>
      </div>
      <div>{label('date', 'Preferred date', true)}<input {...field('date')} type="date" min={new Date().toISOString().slice(0, 10)} />{error('date')}</div>
      <div className="sm:col-span-2 sm:max-w-[50%] sm:pr-2.5">
        {label('guests', 'Number of guests', true)}
        <input {...field('guests')} type="number" inputMode="numeric" min={1} max={500} />
        {error('guests')}
      </div>
      <div className="sm:col-span-2">
        {label('message', 'Message')}
        <textarea {...field('message')} rows={5} placeholder="Tell us about your group and any questions about pools, casitas or food." />
        {error('message')}
      </div>

      <div aria-hidden className="absolute left-[-9999px]">
        <label>Leave this empty<input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
      </div>

      {status === 'error' && (
        <div role="alert" className="ui flex items-start gap-2 border-l-2 border-[#b3261e] bg-[#b3261e]/5 p-4 text-sm sm:col-span-2">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-[#b3261e]" aria-hidden />
          <span>
            Your inquiry could not be sent. Check your connection and try again, or reach us directly on{' '}
            <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="underline">Messenger</a> or at{' '}
            <a href={site.phoneHref} className="underline">{site.phone}</a>.
          </span>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="ui inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 font-semibold text-paper transition-colors hover:bg-ridge disabled:opacity-70"
        >
          {status === 'submitting' && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
          {status === 'submitting' ? 'Sending inquiry' : deliveryMode === 'email' ? 'Send inquiry by email' : 'Send inquiry'}
        </button>
        {deliveryMode === 'email' && (
          <p className="text-sm text-ink-soft">Opens your email app with the message ready to send.</p>
        )}
      </div>
    </form>
  )
}
