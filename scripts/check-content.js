import { offers, PACKAGES } from '../src/offers.js'
import { content } from '../src/content.js'

const required = [
  'CHF 290',
  "CHF 1'490",
  "CHF 2'900",
  'CHF 390',
  'CHF 129',
  'CHF 79',
  'CHF 149',
  'CHF 249',
  'CHF 990',
  'CHF 790',
  'CHF 99',
]

const blob = JSON.stringify(offers.de.packages) + PACKAGES.join('\n')
for (const price of required) {
  if (!blob.includes(price)) {
    console.error('Missing price:', price)
    process.exit(1)
  }
}

const hero = content.de.hero.title.first + ' ' + content.de.hero.title.emphasis
if (hero !== 'Technik darf nach dir klingen.') {
  console.error('Hero copy changed:', hero)
  process.exit(1)
}

if (!content.de.header.navigation.some((item) => item.id === 'leistungen' && item.label === 'Das Lab')) {
  console.error('Existing navigation was rewritten')
  process.exit(1)
}

if (!offers.de.packages.groups[1].rows[1].popular) {
  console.error('Care Plus popular flag missing')
  process.exit(1)
}

console.log('Content checks passed.')
