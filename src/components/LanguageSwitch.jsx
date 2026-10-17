import { content } from '../content.js'

export function LanguageSwitch({ locale, onLocaleChange }) {
  const labels = content[locale].accessibility
  return (
    <div className="language-switch" role="group" aria-label={labels.languageSwitch}>
      <button type="button" lang="de" aria-label={labels.german} aria-pressed={locale === 'de'} onClick={() => onLocaleChange('de')}>
        DE
      </button>
      <span aria-hidden="true">/</span>
      <button type="button" lang="en" aria-label={labels.english} aria-pressed={locale === 'en'} onClick={() => onLocaleChange('en')}>
        EN
      </button>
    </div>
  )
}
