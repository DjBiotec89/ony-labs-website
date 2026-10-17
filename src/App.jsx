import { useEffect, useState } from 'react'
import { ContactSection } from './components/ContactForm.jsx'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { LegalPage } from './components/LegalPage.jsx'
import { Packages } from './components/Packages.jsx'
import { SignalHero } from './components/SignalHero.jsx'
import { content, LOCALE_KEY, readLocale } from './content.js'
import { offers } from './offers.js'

export function normalizePath(path) {
  if (!path) return '/'
  const clean = path.split('?')[0].split('#')[0].replace(/\/index\.html$/, '').replace(/\/+$/, '')
  return clean || '/'
}

export function pageFromPath(path) {
  if (path === '/impressum') return 'impressum'
  if (path === '/datenschutz') return 'datenschutz'
  return 'home'
}

function setMeta(selector, value) {
  document.head.querySelector(selector)?.setAttribute('content', value)
}

export function App({ url } = {}) {
  const path = normalizePath(url ?? (typeof window === 'undefined' ? '/' : window.location.pathname))
  const page = pageFromPath(path)
  const onHome = page === 'home'
  const [locale, setLocale] = useState(readLocale)

  useEffect(() => {
    const seo = content[locale].seo
    const legal = offers[locale].legal
    const title = page === 'impressum'
      ? `${legal.impressumTitle} – Ony-Labs`
      : page === 'datenschutz'
        ? `${legal.privacyTitle} – Ony-Labs`
        : seo.title
    const description = page === 'impressum'
      ? legal.impressumDescription
      : page === 'datenschutz'
        ? legal.privacyDescription
        : seo.description
    document.documentElement.lang = seo.htmlLang
    document.documentElement.dataset.locale = locale
    document.title = title
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', page === 'home' ? seo.ogDescription : description)
    setMeta('meta[property="og:locale"]', seo.ogLocale)
    setMeta('meta[property="og:locale:alternate"]', locale === 'de' ? 'en_GB' : 'de_CH')
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', page === 'home' ? seo.ogDescription : description)
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', page === 'home' ? 'https://www.ony-labs.com/' : `https://www.ony-labs.com${path}/`)
    const schema = document.getElementById('organization-schema')
    if (schema) {
      try {
        const data = JSON.parse(schema.textContent || '{}')
        data.description = seo.schemaDescription
        data.inLanguage = locale
        data.areaServed = [seo.schemaLocality, locale === 'de' ? 'Schweiz' : 'Switzerland']
        schema.textContent = JSON.stringify(data)
      } catch {
        /* keep the document schema */
      }
    }
    try {
      window.localStorage.setItem(LOCALE_KEY, locale)
    } catch {
      /* ignore private mode */
    }
  }, [locale, page, path])

  return (
    <>
      <a className="skip-link" href="#main">{content[locale].accessibility.skipToContent}</a>
      <Header locale={locale} onLocaleChange={setLocale} onHome={onHome} />
      <main id="main" tabIndex={-1}>
        {onHome ? (
          <>
            <SignalHero locale={locale} />
            <Packages locale={locale} />
            <ContactSection locale={locale} />
          </>
        ) : (
          <LegalPage page={page} locale={locale} />
        )}
      </main>
      <Footer locale={locale} onHome={onHome} />
    </>
  )
}
