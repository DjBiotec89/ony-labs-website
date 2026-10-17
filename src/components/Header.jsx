import { useEffect, useRef, useState } from 'react'
import { content } from '../content.js'
import { Brand } from './Brand.jsx'
import { LanguageSwitch } from './LanguageSwitch.jsx'
import { ArrowUpRight, CloseIcon, MenuIcon } from './Icons.jsx'

function sectionHref(id, onHome) {
  return onHome ? `#${id}` : `/#${id}`
}

export function Header({ locale, onLocaleChange, onHome }) {
  const copy = content[locale]
  const mail = `mailto:hello@ony-labs.com?subject=${encodeURIComponent(copy.contact.mailSubject)}`
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) window.requestAnimationFrame(() => navRef.current?.querySelector('a')?.focus())
  }, [open])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        window.requestAnimationFrame(() => toggleRef.current?.focus())
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)')
    const onChange = (event) => {
      if (!event.matches) setOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  function onNavClick(event) {
    const id = event.currentTarget.hash.replace(/^#/, '')
    const wasOpen = open
    setOpen(false)
    if (wasOpen) {
      window.setTimeout(() => {
        document.querySelector(`[data-chapter="${id}"] h2, #${CSS.escape(id)} h2`)?.focus({ preventScroll: true })
      }, 520)
    }
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} id={onHome ? undefined : 'top'}>
      <a className="header-brand" href={onHome ? '#top' : '/'} aria-label={copy.header.brandAriaLabel}>
        <Brand compact />
      </a>
      <nav
        ref={navRef}
        id="main-navigation"
        className={`site-nav ${open ? 'is-open' : ''}`}
        aria-label={copy.header.navigationAriaLabel}
      >
        {copy.header.navigation.map((item) => (
          <a key={item.id} href={sectionHref(item.id, onHome)} onClick={onNavClick}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-tools">
        <LanguageSwitch locale={locale} onLocaleChange={onLocaleChange} />
        <a className="header-cta" href={mail} aria-label={copy.header.contactCta}>
          <span>{copy.header.contactCta}</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? copy.header.menuClose : copy.header.menuOpen}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}
