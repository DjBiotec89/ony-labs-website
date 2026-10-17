export const LOCALE_KEY = 'ony-labs:locale'

export const SOCIALS = {
  x: 'https://x.com/OnyLabsXZ',
  instagram: 'https://instagram.com/ony.labs',
  github: 'https://github.com/Ony-Labs',
  soundcloud: 'https://soundcloud.com/biotec',
  facebook: 'https://www.facebook.com/OnyLabsZX',
}

export const VIDEOS = {
  desktop: '/media/ony-labs-living-system-scroll.mp4',
  compact: '/media/ony-labs-living-system-scroll-mobile.mp4',
  portrait: '/media/ony-labs-living-system-scroll-portrait.mp4',
}

export function readLocale() {
  if (typeof window === 'undefined') return 'de'
  try {
    const stored = window.localStorage.getItem(LOCALE_KEY)
    return stored === 'de' || stored === 'en' ? stored : 'de'
  } catch {
    return 'de'
  }
}

export function contactEndpoint() {
  const env = import.meta.env
  const fromEnv = (env && env.VITE_CONTACT_ENDPOINT ? env.VITE_CONTACT_ENDPOINT : '').trim()
  const fromWindow = typeof window !== 'undefined' ? String(window.ONY_LABS_CONTACT_ENDPOINT || '').trim() : ''
  return fromEnv || fromWindow
}

/** Live site copy, unchanged. New UI strings live in offers.js. */
export const content = {
  de: {
    seo: {
      htmlLang: 'de',
      title: 'Ony-Labs — Technik darf nach dir klingen.',
      description: 'Bei Ony-Labs verbinde ich Musikgefühl, Gestaltung und Code: für Websites, AI, Werkzeuge, Games, Sound und Experimente.',
      ogTitle: 'Ony-Labs — Technik darf nach dir klingen.',
      ogDescription: 'Ony-Labs ist mein unabhängiges Creative Tech Lab in Zürich – für Websites, AI, Werkzeuge, Games, Sound und Experimente.',
      ogLocale: 'de_CH',
      schemaDescription: 'Ony-Labs ist mein unabhängiges Creative Tech Lab für Websites, AI, Werkzeuge, Games, Sound und Experimente.',
      schemaLocality: 'Zürich',
      noscript: 'Bei Ony-Labs verbinde ich Musikgefühl, Gestaltung und Code für Websites, AI, Werkzeuge, Games, Sound und Experimente. Kontakt: hello@ony-labs.com',
    },
    accessibility: { skipToContent: 'Zum Inhalt springen', languageSwitch: 'Sprache wählen', german: 'Deutsch', english: 'English' },
    header: {
      brandAriaLabel: 'Ony-Labs – Start',
      navigationAriaLabel: 'Hauptnavigation',
      navigation: [
        { id: 'leistungen', label: 'Das Lab' },
        { id: 'arbeitsweise', label: 'Das System' },
        { id: 'studio', label: 'Über mich' },
        { id: 'kontakt', label: 'Kontakt' },
        { id: 'pakete', label: 'Pakete' },
      ],
      contactCta: 'Schreib mir',
      menuOpen: 'Navigation öffnen',
      menuClose: 'Navigation schließen',
    },
    hero: {
      kicker: 'Ony-Labs · Creative Tech Lab · Zürich',
      title: { first: 'Technik darf', emphasis: 'nach dir klingen.' },
      body: 'Ich verbinde Musikgefühl, Gestaltung und Code – für Websites, Werkzeuge, Spiele und einen verständlichen Einstieg in AI.',
      primaryCta: 'Im Lab umsehen',
      secondaryCta: 'Schreib mir',
      scrollCue: 'Scrollen bringt das System in Bewegung',
    },
    services: {
      kicker: '01 · Was ich im Lab mache',
      title: { first: 'Bauen. Spielen.', emphasis: 'Weiterdenken.' },
      intro: 'Ich arbeite nicht nach Katalog – aber mit klaren Schwerpunkten.',
      items: [
        { id: 'web', number: '01', title: 'Websites & Interfaces', text: 'Ich gestalte Websites mit eigener Handschrift – nicht nach Schablone.' },
        { id: 'ai', number: '02', title: 'AI & Agenten', text: 'Ich erkläre AI verständlich und mache sie im Alltag nützlich.' },
        { id: 'tools', number: '03', title: 'Tools & Automationen', text: 'Ich baue kleine Werkzeuge, die dir Arbeit abnehmen.' },
        { id: 'experiments', number: '04', title: 'Games, Sound & Experimente', text: 'Ich nutze Technik als Spielfeld.' },
      ],
    },
    core: {
      kicker: '02 · Ein System in Bewegung',
      title: { first: 'Es lernt. Es verändert sich.', emphasis: 'Mit jeder neuen Idee.' },
      body: 'Ich habe Ony-Labs als offenes, wandelbares System entworfen. Es verbindet Ideen, entdeckt neue Wege und entwickelt sich mit jeder Aufgabe weiter – ohne sich auf eine feste Methode zu begrenzen.',
      flowAriaLabel: 'Wie aus einer Idee etwas Neues entsteht',
      signals: [
        { id: 'x', number: 'IDEE', title: 'verzweigt sich' },
        { id: 'z', number: 'SYSTEM', title: 'lernt' },
        { id: 'ony', number: 'ONY', title: 'gibt Form' },
      ],
      principle: 'Die einzige Grenze: deine Vorstellungskraft.',
    },
    studio: {
      kicker: '03 · Ony / Das Lab',
      title: { first: 'Musik war der Anfang.', emphasis: 'Neugier blieb.' },
      body: 'Ich bin Ony – Musiker, Kreativer und Gründer. In meinem Lab in Zürich baue ich digitale Dinge und mache AI für Menschen greifbar, die bisher wenig damit zu tun hatten.',
      principle: 'Kein Vorwissen. Neugier reicht.',
      musicCta: 'Meine Musik hören',
    },
    contact: {
      kicker: '04 · Offenes Lab',
      title: { first: 'Bring mit, was', emphasis: 'noch unfertig ist.' },
      body: 'Eine Frage, ein Problem oder eine schräge Idee reicht. Ich brauche keinen perfekten Plan – nur einen guten ersten Versuch.',
      cta: 'Schreib mir',
      mailSubject: 'Eine Idee für Ony-Labs',
    },
    footer: {
      brandAriaLabel: 'Ony-Labs – nach oben',
      description: 'Mein unabhängiges Creative Tech Lab für Websites, AI, Werkzeuge, Games, Sound und Experimente.',
      navigationAriaLabel: 'Ony-Labs online und Kontakt',
      socials: [
        { id: 'x', label: 'X · @OnyLabsXZ', ariaLabel: 'Ony-Labs auf X, @OnyLabsXZ – öffnet in neuem Tab' },
        { id: 'instagram', label: 'Instagram · @ony.labs', ariaLabel: 'Ony-Labs auf Instagram, @ony.labs – öffnet in neuem Tab' },
        { id: 'github', label: 'GitHub · Ony-Labs', ariaLabel: 'Ony-Labs auf GitHub – öffnet in neuem Tab' },
        { id: 'soundcloud', label: 'SoundCloud', ariaLabel: 'Onys Musik auf SoundCloud – öffnet in neuem Tab' },
        { id: 'facebook', label: 'Facebook', ariaLabel: 'Ony-Labs auf Facebook – öffnet in neuem Tab' },
      ],
      emailLabel: 'E-Mail',
      location: 'Zürich · offen für überall',
      backToTop: 'Nach oben ↑',
      impressum: 'Impressum',
      privacy: 'Datenschutz',
    },
  },
  en: {
    seo: {
      htmlLang: 'en',
      title: 'Ony-Labs — Technology can sound like you.',
      description: 'At Ony-Labs, I bring together musical instinct, design and code for websites, AI, tools, games, sound and experiments.',
      ogTitle: 'Ony-Labs — Technology can sound like you.',
      ogDescription: 'Ony-Labs is my independent Creative Tech Lab in Zurich — for websites, AI, tools, games, sound and experiments.',
      ogLocale: 'en_GB',
      schemaDescription: 'Ony-Labs is my independent Creative Tech Lab for websites, AI, tools, games, sound and experiments.',
      schemaLocality: 'Zurich',
      noscript: 'At Ony-Labs, I bring together musical instinct, design and code for websites, AI, tools, games, sound and experiments. Contact: hello@ony-labs.com',
    },
    accessibility: { skipToContent: 'Skip to content', languageSwitch: 'Choose language', german: 'Deutsch', english: 'English' },
    header: {
      brandAriaLabel: 'Ony-Labs — home',
      navigationAriaLabel: 'Main navigation',
      navigation: [
        { id: 'leistungen', label: 'The Lab' },
        { id: 'arbeitsweise', label: 'The System' },
        { id: 'studio', label: 'About me' },
        { id: 'kontakt', label: 'Contact' },
        { id: 'pakete', label: 'Packages' },
      ],
      contactCta: 'Write to me',
      menuOpen: 'Open navigation',
      menuClose: 'Close navigation',
    },
    hero: {
      kicker: 'Ony-Labs · Creative Tech Lab · Zurich',
      title: { first: 'Technology can', emphasis: 'sound like you.' },
      body: 'I bring together musical instinct, design and code — for websites, tools, games and an approachable way into AI.',
      primaryCta: 'Explore the Lab',
      secondaryCta: 'Write to me',
      scrollCue: 'Scroll to set the system in motion',
    },
    services: {
      kicker: '01 · What I make in the Lab',
      title: { first: 'Build. Play.', emphasis: 'Take it further.' },
      intro: 'I don’t work from a fixed catalogue — I focus on a few clear areas.',
      items: [
        { id: 'web', number: '01', title: 'Websites & Interfaces', text: 'I create websites with a character of their own — not another template.' },
        { id: 'ai', number: '02', title: 'AI & Agents', text: 'I explain AI clearly and make it useful in everyday life.' },
        { id: 'tools', number: '03', title: 'Tools & Automation', text: 'I build small tools that make everyday work lighter.' },
        { id: 'experiments', number: '04', title: 'Games, Sound & Experiments', text: 'I use technology as a playground.' },
      ],
    },
    core: {
      kicker: '02 · A system in motion',
      title: { first: 'It learns. It changes.', emphasis: 'With every new idea.' },
      body: 'I designed Ony-Labs as an open, evolving system. It connects ideas, discovers new paths and grows with every challenge — without being tied to one fixed method.',
      flowAriaLabel: 'How an idea grows into something new',
      signals: [
        { id: 'x', number: 'IDEA', title: 'branches out' },
        { id: 'z', number: 'SYSTEM', title: 'learns' },
        { id: 'ony', number: 'ONY', title: 'gives it form' },
      ],
      principle: 'The only limit: your imagination.',
    },
    studio: {
      kicker: '03 · Ony / The Lab',
      title: { first: 'Music came first.', emphasis: 'Curiosity stayed.' },
      body: 'I’m Ony — a musician, a creative and the founder of Ony-Labs. In my lab in Zurich, I build digital things and make AI approachable for people who haven’t had much to do with it before.',
      principle: 'No prior knowledge needed. Curiosity is enough.',
      musicCta: 'Listen to my music',
    },
    contact: {
      kicker: '04 · Open Lab',
      title: { first: 'Bring what’s', emphasis: 'still unfinished.' },
      body: 'A question, a problem or an offbeat idea is enough. I don’t need a perfect plan — just a good first attempt.',
      cta: 'Write to me',
      mailSubject: 'An idea for Ony-Labs',
    },
    footer: {
      brandAriaLabel: 'Ony-Labs — back to top',
      description: 'My independent Creative Tech Lab for websites, AI, tools, games, sound and experiments.',
      navigationAriaLabel: 'Ony-Labs online and contact',
      socials: [
        { id: 'x', label: 'X · @OnyLabsXZ', ariaLabel: 'Ony-Labs on X, @OnyLabsXZ — opens in a new tab' },
        { id: 'instagram', label: 'Instagram · @ony.labs', ariaLabel: 'Ony-Labs on Instagram, @ony.labs — opens in a new tab' },
        { id: 'github', label: 'GitHub · Ony-Labs', ariaLabel: 'Ony-Labs on GitHub — opens in a new tab' },
        { id: 'soundcloud', label: 'SoundCloud', ariaLabel: 'Ony’s music on SoundCloud — opens in a new tab' },
        { id: 'facebook', label: 'Facebook', ariaLabel: 'Ony-Labs on Facebook — opens in a new tab' },
      ],
      emailLabel: 'Email',
      location: 'Zurich · open to the world',
      backToTop: 'Back to top ↑',
      impressum: 'Legal notice',
      privacy: 'Privacy',
    },
  },
}
