function Flag({ children = '[PRÜFEN]' }) {
  return <span className="check-flag">{children}</span>
}

export function LegalPage({ page, locale }) {
  if (page === 'impressum') return <Impressum locale={locale} />
  return <Privacy locale={locale} />
}

function Impressum({ locale }) {
  if (locale === 'en') {
    return (
      <article className="legal-page" lang="en">
        <p className="section-kicker">Ony-Labs</p>
        <h1>Legal notice</h1>
        <p>Short English version. The German version prevails.</p>
        <p>
          Ony-Labs – Creative Tech Lab Zurich<br />
          Owner: Onur Tas<br />
          Bergstrasse 22, 5444 Künten, Switzerland<br />
          Email: <a href="mailto:hello@ony-labs.com">hello@ony-labs.com</a> · Phone: <a href="tel:+41786836496">+41 78 683 64 96</a>
        </p>
        <p>
          Legal form: sole proprietorship. Commercial register: not registered. UID: none (annual revenue under CHF 100,000).
          Not subject to Swiss VAT; all prices exclude VAT.
        </p>
        <p>Disclaimer and copyright: see the German version.</p>
        <p>Privacy: <a href="/datenschutz/">Privacy policy</a>.</p>
      </article>
    )
  }

  return (
    <article className="legal-page" lang="de">
      <p className="section-kicker">Ony-Labs</p>
      <h1>Impressum</h1>
      <h2>Verantwortlich für diese Website / Anbieter</h2>
      <p>
        Ony-Labs – Creative Tech Lab Zürich<br />
        Inhaber: Onur Tas<br />
        Bergstrasse 22<br />
        5444 Künten, Schweiz
      </p>
      <p>
        E-Mail: <a href="mailto:hello@ony-labs.com">hello@ony-labs.com</a><br />
        Telefon: <a href="tel:+41786836496">+41 78 683 64 96</a>
      </p>
      <p><strong>Rechtsform:</strong> Einzelunternehmen</p>
      <p>
        <strong>Handelsregister:</strong> nicht eingetragen. Die Eintragspflicht für Einzelunternehmen beginnt erst ab CHF 100'000 Jahresumsatz; ein freiwilliger Eintrag besteht nicht.
      </p>
      <p><strong>UID:</strong> keine. Der Umsatz liegt unter CHF 100'000, eine Unternehmens-Identifikationsnummer ist nicht vorhanden.</p>
      <p><strong>MWST:</strong> Nicht mehrwertsteuerpflichtig (Umsatz unter CHF 100'000). Alle Preise verstehen sich ohne MWST.</p>
      <h2>Haftungsausschluss</h2>
      <p>Die Inhalte dieser Website werden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität wird keine Gewähr übernommen. Für Inhalte verlinkter externer Seiten sind ausschliesslich deren Betreiber verantwortlich.</p>
      <h2>Urheberrechte</h2>
      <p>Texte, Bilder, Musik und Code auf dieser Website gehören Ony-Labs bzw. den genannten Rechteinhabern. Verwendung nur mit schriftlicher Zustimmung.</p>
      <p>Datenschutz: <a href="/datenschutz/">Datenschutzerklärung</a>.</p>
      <p className="legal-note">Angaben ohne Rechtsberatung. Stand: 17. Oktober 2026.</p>
    </article>
  )
}

function Privacy({ locale }) {
  if (locale === 'en') {
    return (
      <article className="legal-page" lang="en">
        <p className="section-kicker">Ony-Labs</p>
        <h1>Privacy policy</h1>
        <p>Short English version, 17 October 2026. The German version is binding and prevails. This is not legal advice.</p>
        <p>
          Controller: Onur Tas, Ony-Labs – Creative Tech Lab Zürich, Bergstrasse 22, 5444 Künten, Switzerland, <a href="mailto:hello@ony-labs.com">hello@ony-labs.com</a>.
        </p>
        <p>
          Personal data is processed only to run this website, answer enquiries and perform contracts. Data is not sold.
          This site does not use tracking, analytics or advertising cookies. The language choice is stored in localStorage on your device (key <code>ony-labs:locale</code>).
        </p>
        <p>
          Hosting is currently GitHub Pages (GitHub, Inc., San Francisco, USA). Technical logs, including the IP address, can be processed in the USA.
          {' '}<Flag /> Confirm whether GitHub/Microsoft is certified under the Swiss-U.S. Data Privacy Framework before publication.
        </p>
        <p>
          The contact form has no server endpoint yet. Sending it opens your email app to hello@ony-labs.com. Mail for that address is handled by Infomaniak <Flag />.
          No third-party form service (Netlify, Web3Forms, Formspree) is connected.
        </p>
        <p>Social profiles are ordinary links, not embedded plugins: X, Instagram, Facebook, GitHub and SoundCloud.</p>
        <p>
          Under the Swiss FADP you can request access, correction, deletion, objection and data portability.
          Write to hello@ony-labs.com. You can also contact the FDPIC at <a href="https://www.edoeb.admin.ch">www.edoeb.admin.ch</a>.
        </p>
      </article>
    )
  }

  return (
    <article className="legal-page" lang="de">
      <p className="section-kicker">Ony-Labs</p>
      <h1>Datenschutzerklärung</h1>
      <p>Stand: 17. Oktober 2026. Dies ist keine Rechtsberatung.</p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Bearbeitung von Personendaten auf dieser Website ist:<br />
        Onur Tas, Ony-Labs – Creative Tech Lab Zürich<br />
        Bergstrasse 22, 5444 Künten, Schweiz<br />
        E-Mail: <a href="mailto:hello@ony-labs.com">hello@ony-labs.com</a>
      </p>
      <p>
        Ony-Labs ist nicht verpflichtet, eine Datenschutzberaterin oder einen Vertreter in der EU zu benennen.
        {' '}<Flag /> Prüfen, falls gezielt EU-Kundschaft angesprochen wird – dann gegebenenfalls DSGVO-Ergänzungen.
      </p>

      <h2>2. Grundsatz</h2>
      <p>
        Wir bearbeiten Personendaten nur, soweit es für den Betrieb dieser Website, die Beantwortung Ihrer Anfragen und die Erbringung unserer Leistungen nötig ist.
        Wir verkaufen keine Daten. Im aktuellen Code dieser Website sind keine Tracking- oder Analyse-Tools, keine Werbe-Cookies, keine Google-Fonts von Google-Servern und keine eingebetteten Videos oder Social-Plugins enthalten.
        Schriften kommen vom System des Geräts. SoundCloud ist nur verlinkt, nicht eingebettet.
        {' '}<Flag /> Vor Veröffentlichung bestätigen, dass dabei bleibt.
      </p>

      <h2>3. Welche Daten wir bearbeiten</h2>
      <ul>
        <li>Server-Logdaten beim Aufruf der Website (IP-Adresse, Datum/Uhrzeit, aufgerufene Seite, Referrer, Browser/Betriebssystem). Zweck: Auslieferung, Sicherheit, Missbrauchsabwehr.</li>
        <li>Kontaktanfragen per E-Mail oder Kontaktformular: Name, E-Mail, gewähltes Paket, Nachricht und was Sie uns sonst mitteilen. Zweck: Beantwortung und gegebenenfalls Offerte oder Vertrag.</li>
        <li>Kundendaten bei Auftragserteilung: Kontakt- und Rechnungsdaten, Projektinhalte. Zweck: Vertragserfüllung, Buchhaltung (gesetzliche Aufbewahrung 10 Jahre für Geschäftsbücher und Belege).</li>
        <li>Spracheinstellung lokal auf Ihrem Gerät (localStorage, Schlüssel <code>ony-labs:locale</code>). Es wird nichts an uns gesendet.</li>
      </ul>

      <h2>4. Hosting: GitHub Pages (USA)</h2>
      <p>
        Diese Website wird derzeit über GitHub Pages der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (Tochter der Microsoft Corp.) ausgeliefert.
        Dabei verarbeitet GitHub technisch notwendige Daten, insbesondere Ihre IP-Adresse, in Logdateien – auch in den USA.
        GitHub verarbeitet diese Daten teils in eigener Verantwortung (siehe <a href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement">GitHub Privacy Statement</a>).
      </p>
      <p>
        <strong>Bekanntgabe ins Ausland:</strong> Die USA gelten gemäss Anhang 1 der Datenschutzverordnung (DSV) seit 15. September 2024 nur für Unternehmen als angemessen, die nach dem Swiss-U.S. Data Privacy Framework zertifiziert sind.
        {' '}<Flag /> Zertifizierung von GitHub/Microsoft auf dataprivacyframework.gov nachsehen und hier bestätigen; sonst auf Standardvertragsklauseln der EU-Kommission abstellen, die der EDÖB anerkennt.
      </p>
      <p>
        Ein Wechsel des Hostings zu Infomaniak (Schweiz) ist vorgesehen, aber noch nicht erfolgt. Solange die Site auf GitHub Pages liegt, gilt dieser Abschnitt.
        {' '}<Flag /> Nach dem Wechsel durch den Hoster Infomaniak Network SA, Genf, ersetzen.
      </p>

      <h2>5. Kontaktformular und E-Mail</h2>
      <p>
        Das Kontaktformular ist vorbereitet, aber noch an keinen Server angebunden <Flag />.
        Solange kein Endpunkt konfiguriert ist, öffnet «Anfrage senden» nur Ihr E-Mail-Programm und richtet die Nachricht an hello@ony-labs.com.
        Es ist kein Formular-Dienst eines Dritten eingebunden (kein Netlify, Web3Forms oder Formspree). Ein Honeypot-Feld bleibt im Browser und wird nicht als Kontakt verwendet.
      </p>
      <p>
        Für später liegt ein PHP-Skript <code>kontakt.php</code> im Projekt, gedacht fürs Hosting bei Infomaniak: Versand per E-Mail, ohne Speicherung auf dem Server.
        Es ist nicht aktiv, solange der Endpunkt leer ist. <Flag /> Vor dem Einschalten Absenderadresse, SPF und DKIM prüfen.
      </p>
      <p>
        E-Mail: Nachrichten an hello@ony-labs.com werden über Infomaniak (Infomaniak Network SA, Schweiz) verarbeitet. <Flag /> Mail-Hosting bei Infomaniak vor Veröffentlichung bestätigen.
      </p>

      <h2>6. Links zu sozialen Netzwerken</h2>
      <p>
        Auf der Website finden Sie einfache Links (keine eingebetteten Plugins) zu X (@OnyLabsXZ), Instagram (@ony.labs), Facebook (OnyLabsZX), GitHub (Ony-Labs) und SoundCloud (biotec).
        Erst wenn Sie einen Link anklicken, gelangen Sie auf die Plattform des jeweiligen Anbieters (unter anderem X Corp., Meta Platforms, GitHub/Microsoft, SoundCloud), der dann eigenverantwortlich Daten bearbeitet, teils in den USA.
        Es gelten deren Datenschutzerklärungen.
      </p>

      <h2>7. Cookies und lokaler Speicher</h2>
      <p>
        Diese Website setzt keine Cookies. Die gewählte Sprache liegt in localStorage auf Ihrem Gerät und lässt sich dort löschen.
        {' '}<Flag /> Nach einem Hosting- oder Formularwechsel erneut prüfen.
      </p>

      <h2>8. Aufbewahrung</h2>
      <p>
        Anfragen löschen wir, wenn sie erledigt sind und kein Vertrag folgt, spätestens nach 12 Monaten <Flag /> (Frist ist ein Vorschlag).
        Vertrags- und Buchhaltungsdaten bewahren wir so lange auf, wie es das Gesetz verlangt (in der Regel 10 Jahre).
      </p>

      <h2>9. Datensicherheit</h2>
      <p>Wir treffen angemessene technische und organisatorische Massnahmen (unter anderem HTTPS-Verschlüsselung, Zugriffsschutz, Zwei-Faktor-Anmeldung bei Diensten).</p>

      <h2>10. Ihre Rechte</h2>
      <p>
        Sie haben im Rahmen des DSG insbesondere das Recht auf Auskunft (Art. 25 DSG), Berichtigung, Löschung, Widerspruch gegen Bearbeitungen sowie auf Herausgabe bzw. Übertragung Ihrer Daten (Art. 28 DSG).
        Schreiben Sie uns an hello@ony-labs.com; wir können einen Identitätsnachweis verlangen.
        Sie können sich zudem an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB), <a href="https://www.edoeb.admin.ch">www.edoeb.admin.ch</a>, wenden.
      </p>

      <h2>11. Änderungen</h2>
      <p>Wir können diese Datenschutzerklärung anpassen. Es gilt die jeweils auf dieser Website veröffentlichte Fassung.</p>
    </article>
  )
}
