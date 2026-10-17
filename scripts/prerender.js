import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const css = template.match(/href="([^"]+\.css)"/)?.[1]
const js = template.match(/src="([^"]+\.js)"/)?.[1]
if (!css || !js) throw new Error('Built CSS or JS asset not found in dist/index.html')

const serverEntry = path.join(dist, 'server', 'entry-server.js')
const { render, renderNoscript } = await import(serverEntry)

const noscript = renderNoscript()
if (!template.includes('<!--NOSCRIPT-->')) throw new Error('Missing <!--NOSCRIPT--> marker')
fs.writeFileSync(path.join(dist, 'index.html'), template.replace('<!--NOSCRIPT-->', noscript))

const pages = {
  impressum: {
    title: 'Impressum – Ony-Labs',
    description: 'Anbieter Ony-Labs, Onur Tas, Bergstrasse 22, 5444 Künten. Einzelunternehmen, nicht im Handelsregister, keine UID.',
  },
  datenschutz: {
    title: 'Datenschutzerklärung – Ony-Labs',
    description: 'Wie Ony-Labs Personendaten auf ony-labs.com bearbeitet: Hosting, Kontakt, Rechte nach dem DSG.',
  },
}

for (const [name, meta] of Object.entries(pages)) {
  const body = render(`/${name}`)
  const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <link rel="canonical" href="https://www.ony-labs.com/${name}/" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.ony-labs.com/${name}/" />
    <meta property="og:locale" content="de_CH" />
    <meta property="og:site_name" content="Ony-Labs" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <link rel="icon" href="/brand/ony-labs-symbol-vector.svg" type="image/svg+xml" />
    <link rel="stylesheet" crossorigin href="${css}" />
  </head>
  <body>
    <div id="root">${body}</div>
    <script type="module" crossorigin src="${js}"></script>
  </body>
</html>
`
  const dir = path.join(dist, name)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

fs.rmSync(path.join(dist, 'server'), { recursive: true, force: true })
console.log('Prerendered impressum, datenschutz, and the homepage noscript.')
