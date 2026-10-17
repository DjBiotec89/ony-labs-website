import { useEffect, useRef, useState } from 'react'
import { contactEndpoint } from '../content.js'
import { offers, PACKAGES } from '../offers.js'
import { readPackage } from './Packages.jsx'

export function ContactForm({ locale }) {
  const copy = offers[locale].form
  const endpoint = contactEndpoint()
  const [status, setStatus] = useState('idle')
  const [selected, setSelected] = useState('')
  const startedAt = useRef(Date.now())

  useEffect(() => {
    const stored = readPackage()
    if (stored && PACKAGES.includes(stored)) setSelected(stored)
  }, [])

  async function onSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    if (String(data.get('website') || '').trim()) {
      setStatus('ok')
      return
    }
    data.set('t', String(Date.now() - startedAt.current))

    if (!endpoint) {
      const subject = `${locale === 'de' ? 'Anfrage' : 'Request'}: ${data.get('package') || 'Ony-Labs'}`
      const body = [
        `Name: ${data.get('name') || ''}`,
        `E-Mail: ${data.get('email') || ''}`,
        `Firma: ${data.get('company') || ''}`,
        `Paket: ${data.get('package') || ''}`,
        '',
        String(data.get('message') || ''),
      ].join('\n')
      window.location.href = `mailto:hello@ony-labs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('request failed')
      setStatus('ok')
      form.reset()
      setSelected('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') return <p className="form-status" role="status">{copy.ok}</p>

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <p className="check-flag">[PRÜFEN] {copy.fallback}</p>
      <label>
        {copy.name}
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        {copy.email}
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        {copy.company}
        <input name="company" autoComplete="organization" />
      </label>
      <label>
        {copy.interest}
        <select name="package" value={selected} onChange={(event) => setSelected(event.target.value)}>
          <option value="" disabled>{copy.placeholder}</option>
          {PACKAGES.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>
      <label>
        {copy.message}
        <textarea name="message" rows={5} required maxLength={4000} />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="form-note">
        {copy.privacy} <a href="/datenschutz/">{copy.privacyLink}</a>.
      </p>
      <button className="button button--gold" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? copy.sending : copy.submit}
      </button>
      {status === 'error' && <p className="form-status" role="alert">{copy.error}</p>}
      {status === 'mailto' && <p className="form-status" role="status">{copy.mailto}</p>}
    </form>
  )
}

export function ContactSection({ locale }) {
  const copy = offers[locale].form
  return (
    <section className="contact-section" id="anfrage" aria-labelledby="anfrage-title">
      <div className="contact-mark" aria-hidden="true">
        <img src="/brand/ony-labs-symbol-vector.svg" alt="" />
      </div>
      <div className="contact-copy">
        <p className="section-kicker">{copy.kicker}</p>
        <h2 id="anfrage-title">
          <span>{copy.titleFirst}</span>
          <em>{copy.titleEmphasis}</em>
        </h2>
        <p>
          {copy.intro} <span className="suggestion-mark">[VORSCHLAG]</span>
        </p>
        <ContactForm locale={locale} />
      </div>
    </section>
  )
}
