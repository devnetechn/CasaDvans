import { site } from '../content/site'

export type Inquiry = {
  name: string
  contact: string
  date: string
  guests: string
  visit: string
  message: string
}

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[\d\s()-]{7,20}$/

export const inquiryEndpoint: string = import.meta.env.VITE_INQUIRY_ENDPOINT ?? ''
export const deliveryMode: 'endpoint' | 'email' = inquiryEndpoint ? 'endpoint' : 'email'

export function validate(data: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {}
  if (data.name.trim().length < 2) errors.name = 'Enter your name so we know who to reply to.'
  const contact = data.contact.trim()
  if (!contact) errors.contact = 'Enter a mobile number or email address.'
  else if (!EMAIL.test(contact) && !PHONE.test(contact)) errors.contact = 'Enter a valid mobile number (e.g. 0917 123 4567) or email address.'
  if (data.date) {
    const today = new Date().toISOString().slice(0, 10)
    if (data.date < today) errors.date = 'Choose today or a future date.'
  }
  if (data.guests) {
    const n = Number(data.guests)
    if (!Number.isInteger(n) || n < 1 || n > 500) errors.guests = 'Enter a number of guests between 1 and 500.'
  }
  if (data.message.trim().length < 10) errors.message = 'Tell us a little more (at least 10 characters).'
  return errors
}

export function formatInquiry(data: Inquiry): string {
  const details = [
    `Name: ${data.name.trim()}`,
    `Contact: ${data.contact.trim()}`,
    `Visit: ${data.visit}`,
    data.date ? `Preferred date: ${data.date}` : null,
    data.guests ? `Guests: ${data.guests}` : null,
  ].filter(Boolean)
  return `${details.join('\n')}\n\n${data.message.trim()}`
}

export function mailtoHref(data: Inquiry): string {
  const subject = `Inquiry: ${data.visit}${data.date ? ` on ${data.date}` : ''}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formatInquiry(data))}`
}

export async function sendToEndpoint(data: Inquiry): Promise<void> {
  const res = await fetch(inquiryEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...data, _subject: `Website inquiry: ${data.visit}` }),
  })
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
}
