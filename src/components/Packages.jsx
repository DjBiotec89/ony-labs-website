import { offers, PACKAGES } from '../offers.js'

const PACKAGE_KEY = 'ony-labs:package'

export function rememberPackage(name) {
  try {
    sessionStorage.setItem(PACKAGE_KEY, name)
  } catch {
    /* storage can be blocked */
  }
}

export function readPackage() {
  try {
    return sessionStorage.getItem(PACKAGE_KEY) || ''
  } catch {
    return ''
  }
}

export function Packages({ locale }) {
  const copy = offers[locale].packages
  return (
    <section className="capabilities-section" id="pakete" aria-labelledby="packages-title">
      <div className="section-intro">
        <p className="section-kicker">{copy.kicker}</p>
        <h2 id="packages-title">
          <span>{copy.titleFirst}</span>
          <em>{copy.titleEmphasis}</em>
        </h2>
        <p>{copy.intro}</p>
      </div>

      <div className="package-groups">
        <article className="package-group">
          <header className="package-group-head">
            <h3>{copy.check.title}</h3>
            <p className="package-price">{copy.check.price}</p>
          </header>
          <p className="package-lead">{copy.check.lead}</p>
          <ul className="package-bullets">
            {copy.check.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="story-link story-link--primary" href="#anfrage" data-package={PACKAGES[0]} onClick={() => rememberPackage(PACKAGES[0])}>
            {copy.check.cta}
          </a>
        </article>

        {copy.groups.map((group) => (
          <article className="package-group" key={group.id}>
            <header className="package-group-head">
              <h3>
                {group.title} <em>{group.subtitle}</em>
              </h3>
            </header>
            <ul className="package-list">
              {group.rows.map((row) => (
                <li key={row.name}>
                  <div>
                    <strong>{row.name}</strong>
                    {row.popular && (
                      <span className="suggestion-mark">
                        {copy.popularLabel} [VORSCHLAG]
                      </span>
                    )}
                  </div>
                  <p>{row.scope}</p>
                  <p className="package-price">{row.price}</p>
                </li>
              ))}
            </ul>
            {group.note && <p className="package-note">{group.note}</p>}
            {group.highlight && <p className="package-highlight">{group.highlight}</p>}
            {group.fine && <p className="package-fine">{group.fine}</p>}
          </article>
        ))}

        <article className="package-group package-pilot">
          <h3>{copy.pilotTitle}</h3>
          <p>{copy.pilotBody}</p>
          <ul className="suggestion-list">
            {copy.suggestions.map((item) => (
              <li key={item}>
                <span className="suggestion-mark">[VORSCHLAG]</span> {item}
              </li>
            ))}
          </ul>
        </article>

        <p className="package-footnote">{copy.footnote}</p>
      </div>
    </section>
  )
}
