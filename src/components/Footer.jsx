import { content, SOCIALS } from '../content.js'
import { Brand } from './Brand.jsx'
import { ArrowUpRight } from './Icons.jsx'

export function Footer({ locale, onHome }) {
  const copy = content[locale].footer
  return (
    <footer className="site-footer">
      <a className="footer-brand" href={onHome ? '#top' : '/'} aria-label={copy.brandAriaLabel}>
        <Brand />
      </a>
      <p>{copy.description}</p>
      <nav aria-label={copy.navigationAriaLabel}>
        {copy.socials.map((item) => (
          <a key={item.id} href={SOCIALS[item.id]} target="_blank" rel="noopener noreferrer" aria-label={item.ariaLabel}>
            {item.label} <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
        <a href="mailto:hello@ony-labs.com">
          {copy.emailLabel} <ArrowUpRight aria-hidden="true" />
        </a>
        <a href="/impressum/">{copy.impressum}</a>
        <a href="/datenschutz/">{copy.privacy}</a>
      </nav>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ony-Labs</span>
        <span>{copy.location}</span>
        <a href={onHome ? '#top' : '/#top'}>{copy.backToTop}</a>
      </div>
    </footer>
  )
}
