import { content } from '../content.js'
import { offers } from '../offers.js'

/** Readable fallback for browsers without JavaScript. Not shown when JS runs. */
export function NoscriptHome() {
  const copy = content.de
  const pack = offers.de.packages
  const form = offers.de.form
  return (
    <div className="noscript-site">
      <p className="section-kicker">{copy.hero.kicker}</p>
      <h1>{copy.hero.title.first} {copy.hero.title.emphasis}</h1>
      <p>{copy.hero.body}</p>
      <p>{copy.seo.noscript}</p>
      <h2>{copy.services.title.first} {copy.services.title.emphasis}</h2>
      <p>{copy.services.intro}</p>
      <ul>
        {copy.services.items.map((item) => (
          <li key={item.id}><strong>{item.title}.</strong> {item.text}</li>
        ))}
      </ul>
      <h2>{copy.core.title.first} {copy.core.title.emphasis}</h2>
      <p>{copy.core.body}</p>
      <p>{copy.core.principle}</p>
      <h2>{copy.studio.title.first} {copy.studio.title.emphasis}</h2>
      <p>{copy.studio.body}</p>
      <p>{copy.studio.principle}</p>
      <p><a href="https://soundcloud.com/biotec">{copy.studio.musicCta}</a></p>
      <h2>{copy.contact.title.first} {copy.contact.title.emphasis}</h2>
      <p>{copy.contact.body}</p>
      <p><a href="mailto:hello@ony-labs.com">{copy.contact.cta}</a></p>
      <h2>{pack.titleFirst} {pack.titleEmphasis}</h2>
      <p>{pack.intro}</p>
      <h3>{pack.check.title} — {pack.check.price}</h3>
      <ul>
        {pack.check.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
      {pack.groups.map((group) => (
        <section key={group.id}>
          <h3>{group.title} — {group.subtitle}</h3>
          <ul>
            {group.rows.map((row) => (
              <li key={row.name}><strong>{row.name}: {row.price}.</strong> {row.scope}</li>
            ))}
          </ul>
          {group.note && <p>{group.note}</p>}
          {group.highlight && <p>{group.highlight}</p>}
          {group.fine && <p>{group.fine}</p>}
        </section>
      ))}
      <h3>{pack.pilotTitle}</h3>
      <p>{pack.pilotBody}</p>
      <p>{pack.footnote}</p>
      <h2>{form.titleFirst} {form.titleEmphasis}</h2>
      <p>{form.intro}</p>
      <p>[PRÜFEN] {form.fallback} <a href="mailto:hello@ony-labs.com">hello@ony-labs.com</a></p>
      <p><a href="/impressum/">Impressum</a> · <a href="/datenschutz/">Datenschutz</a></p>
    </div>
  )
}
