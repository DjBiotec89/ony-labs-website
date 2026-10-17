import { renderToString } from 'react-dom/server'
import { App } from './App.jsx'
import { NoscriptHome } from './components/NoscriptHome.jsx'

export function render(url) {
  return renderToString(<App url={url} />)
}

export function renderNoscript() {
  return renderToString(<NoscriptHome />)
}
