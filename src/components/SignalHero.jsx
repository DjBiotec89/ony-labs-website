import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { content, VIDEOS } from '../content.js'
import { ArrowDown, ArrowUpRight } from './Icons.jsx'

function pickVideo() {
  if (typeof window === 'undefined') return VIDEOS.desktop
  if (window.matchMedia('(max-width: 680px) and (orientation: portrait)').matches) return VIDEOS.portrait
  if (window.matchMedia('(max-width: 900px)').matches) return VIDEOS.compact
  return VIDEOS.desktop
}

function chapterAt(progress) {
  if (progress < 0.19) return 'hero'
  if (progress < 0.4) return 'leistungen'
  if (progress < 0.61) return 'arbeitsweise'
  if (progress < 0.79) return 'studio'
  return 'kontakt'
}

function StoryBeat({
  blur = false,
  children,
  className = '',
  direction = -1,
  endVisible = false,
  index,
  progress,
  range,
  startVisible = false,
  total,
}) {
  const later = Math.max(0, total - 1 - index)
  const lead = index * 0.006
  const trail = later * 0.004
  const enter = range[0] + lead
  const hold = range[1] + lead
  const leave = Math.min(range[3] - 0.008, range[2] + trail)
  const input = startVisible ? [0, leave, range[3], 1] : endVisible ? [0, enter, hold, 1] : [0, enter, hold, leave, range[3], 1]
  const opacity = startVisible ? [1, 1, 0.75, 0.75] : endVisible ? [0.72, 0.72, 1, 1] : [0.72, 0.72, 1, 1, 0.75, 0.75]
  const x = startVisible
    ? [0, 0, direction * -4, direction * -4]
    : endVisible
      ? [direction * 8, direction * 8, 0, 0]
      : [direction * 8, direction * 8, 0, 0, direction * -4, direction * -4]
  const y = startVisible ? [0, 0, -6, -6] : endVisible ? [10, 10, 0, 0] : [10, 10, 0, 0, -6, -6]
  const filters = startVisible
    ? ['blur(0px)', 'blur(0px)', 'blur(1px)', 'blur(1px)']
    : endVisible
      ? ['blur(1.5px)', 'blur(1.5px)', 'blur(0px)', 'blur(0px)']
      : ['blur(1.5px)', 'blur(1.5px)', 'blur(0px)', 'blur(0px)', 'blur(1px)', 'blur(1px)']
  const opacityV = useTransform(progress, input, opacity)
  const xV = useTransform(progress, input, x)
  const yV = useTransform(progress, input, y)
  const filterV = useTransform(progress, input, filters)

  return (
    <motion.div
      className={`story-beat ${blur ? 'story-beat--headline' : ''} ${className}`.trim()}
      style={{ opacity: opacityV, x: xV, y: yV, filter: blur ? filterV : undefined }}
    >
      {children}
    </motion.div>
  )
}

function StoryChapter({
  active,
  children,
  className = '',
  endVisible = false,
  id,
  progress,
  range,
  startVisible = false,
  staticId,
}) {
  const ref = useRef(null)
  const side = className.includes('story-chapter--right') ? 1 : -1
  const input = startVisible ? [range[0], range[1], range[2], range[3], 1] : endVisible ? [0, range[0], range[1], range[2], range[3]] : [0, range[0], range[1], range[2], range[3], 1]
  const opacity = startVisible ? [1, 1, 1, 0, 0] : endVisible ? [0, 0, 1, 1, 1] : [0, 0, 1, 1, 0, 0]
  const y = startVisible ? [0, 0, 0, -8, -8] : endVisible ? [12, 12, 0, 0, 0] : [12, 12, 0, 0, -8, -8]
  const x = startVisible ? [0, 0, 0, side * 8, side * 8] : endVisible ? [side * 14, side * 14, 0, 0, 0] : [side * 14, side * 14, 0, 0, side * 8, side * 8]
  const opacityV = useTransform(progress, input, opacity)
  const xV = useTransform(progress, input, x)
  const yV = useTransform(progress, input, y)

  useEffect(() => {
    const node = ref.current
    if (!active && node?.contains(document.activeElement)) {
      document.getElementById('main')?.focus({ preventScroll: true })
    }
  }, [active])

  return (
    <motion.section
      ref={ref}
      id={staticId}
      className={`story-chapter story-chapter--${id} ${className}`.trim()}
      data-chapter={id}
      data-active={active ? 'true' : 'false'}
      style={{ opacity: opacityV, x: xV, y: yV, pointerEvents: active ? 'auto' : 'none' }}
    >
      {children}
    </motion.section>
  )
}

export function SignalHero({ locale }) {
  const copy = content[locale]
  const mail = `mailto:hello@ony-labs.com?subject=${encodeURIComponent(copy.contact.mailSubject)}`
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  const durationRef = useRef(10.04)
  const progressRef = useRef(0)
  const frameRef = useRef(null)
  const seekingRef = useRef(false)
  const primedRef = useRef(false)
  const playRef = useRef(null)
  const reduced = useReducedMotion() === true
  const [chapter, setChapter] = useState('hero')
  const [videoSrc, setVideoSrc] = useState(pickVideo)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ['start start', 'end end'] })
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 1, 0])
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  const scrub = useCallback(() => {
    if (reduced || frameRef.current !== null) return
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null
      const video = videoRef.current
      if (!video || video.readyState < HTMLMediaElement.HAVE_METADATA || !Number.isFinite(durationRef.current)) return
      const frame = 1 / 24
      const length = Math.max(0, durationRef.current - frame)
      const target = Math.min(1, Math.max(0, progressRef.current)) * length
      const snapped = Math.round(target / frame) * frame
      if (video.seeking) {
        seekingRef.current = true
        return
      }
      seekingRef.current = false
      if (Math.abs(video.currentTime - snapped) >= frame / 2) {
        const next = Math.min(length, snapped)
        try {
          if (typeof video.fastSeek === 'function') video.fastSeek(next)
          else video.currentTime = next
        } catch {
          seekingRef.current = true
        }
      }
    })
  }, [reduced])

  const prime = useCallback(() => {
    if (reduced || primedRef.current || playRef.current) return
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) video.load()
    const pending = video.play()
    playRef.current = pending
    pending.then(
      () => {
        if (videoRef.current !== video) return
        video.pause()
        primedRef.current = true
        playRef.current = null
        progressRef.current = scrollYProgress.get()
        scrub()
      },
      () => {
        if (videoRef.current === video) playRef.current = null
      },
    )
  }, [reduced, scrub, scrollYProgress])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    progressRef.current = value
    setChapter(chapterAt(value))
    scrub()
  })

  useEffect(() => {
    const value = scrollYProgress.get()
    progressRef.current = value
    setChapter(chapterAt(value))
  }, [scrollYProgress, reduced])

  useEffect(() => {
    if (reduced) return undefined
    const portrait = window.matchMedia('(max-width: 680px) and (orientation: portrait)')
    const compact = window.matchMedia('(max-width: 900px)')
    const update = () => setVideoSrc(pickVideo())
    portrait.addEventListener('change', update)
    compact.addEventListener('change', update)
    return () => {
      portrait.removeEventListener('change', update)
      compact.removeEventListener('change', update)
    }
  }, [reduced])

  useEffect(() => {
    setReady(false)
    setFailed(false)
    durationRef.current = 10.04
    seekingRef.current = false
    primedRef.current = false
    playRef.current = null
  }, [videoSrc])

  useEffect(() => {
    if (reduced) return undefined
    const onShow = () => scrub()
    const onVisible = () => {
      if (!document.hidden) scrub()
    }
    window.addEventListener('pageshow', onShow)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.removeEventListener('pageshow', onShow)
      document.removeEventListener('visibilitychange', onVisible)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [scrub, reduced])

  useEffect(() => {
    if (reduced) return undefined
    const coarse = 'ontouchstart' in window || window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (!coarse) return undefined
    window.addEventListener('touchstart', prime, { capture: true, passive: true })
    window.addEventListener('pointerdown', prime, { capture: true, passive: true })
    return () => {
      window.removeEventListener('touchstart', prime, true)
      window.removeEventListener('pointerdown', prime, true)
    }
  }, [reduced, prime])

  const interactive = (id) => (reduced || chapter === id ? 0 : -1)
  const hidden = (id) => (!reduced && chapter !== id)

  return (
    <section ref={rootRef} className="signal-hero" id="top" aria-labelledby="hero-title">
      {!reduced && (
        <div className="story-anchor-track" aria-hidden="true">
          <span className="story-anchor" id="leistungen" style={{ top: '25%' }} />
          <span className="story-anchor" id="arbeitsweise" style={{ top: '47%' }} />
          <span className="story-anchor" id="studio" style={{ top: '70%' }} />
          <span className="story-anchor" id="kontakt" style={{ top: '87%' }} />
        </div>
      )}
      <div className="signal-sticky">
        <div className={`signal-media ${ready ? 'is-ready' : ''} ${failed ? 'has-error' : ''}`} aria-hidden="true">
          <picture className="signal-poster">
            <source media="(max-width: 680px) and (orientation: portrait)" srcSet="/media/ony-labs-living-system-scroll-portrait-poster.jpg" />
            <img src="/media/ony-labs-living-system-scroll-poster.jpg" alt="" width="1264" height="720" />
          </picture>
          {!reduced && !failed && (
            <video
              key={videoSrc}
              ref={videoRef}
              className="signal-video"
              src={videoSrc}
              muted
              playsInline
              preload="auto"
              tabIndex={-1}
              disablePictureInPicture
              onLoadedMetadata={() => {
                const video = videoRef.current
                if (!video) return
                video.pause()
                progressRef.current = scrollYProgress.get()
                if (Number.isFinite(video.duration) && video.duration > 0) durationRef.current = video.duration
                scrub()
              }}
              onLoadedData={() => {
                progressRef.current = scrollYProgress.get()
                const epsilon = 1 / (24 * durationRef.current)
                if (progressRef.current <= epsilon) setReady(true)
                scrub()
              }}
              onCanPlay={() => scrub()}
              onSeeked={() => {
                if (seekingRef.current) {
                  seekingRef.current = false
                  scrub()
                  return
                }
                window.requestAnimationFrame(() => setReady(true))
              }}
              onError={() => setFailed(true)}
            />
          )}
        </div>
        <div className="story-stage">
          <StoryChapter id="hero" className="story-chapter--clear" progress={scrollYProgress} range={[0, 0.03, 0.14, 0.19]} active={reduced || chapter === 'hero'} startVisible>
            <div className="story-panel story-panel--clear">
              <StoryBeat progress={scrollYProgress} range={[0, 0.03, 0.14, 0.19]} index={1} total={4} startVisible>
                <p className="story-kicker"><span aria-hidden="true" />{copy.hero.kicker}</p>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0, 0.03, 0.14, 0.19]} index={0} total={4} startVisible blur>
                <h1 id="hero-title" className="story-title story-title--hero">
                  <span>{copy.hero.title.first}</span>
                  <em>{copy.hero.title.emphasis}</em>
                </h1>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0, 0.03, 0.14, 0.19]} index={2} total={4} startVisible>
                <p className="story-copy story-copy--hero">{copy.hero.body}</p>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0, 0.03, 0.14, 0.19]} index={3} total={4} startVisible>
                <div className="story-actions">
                  <a className="story-link story-link--primary" href="#leistungen" tabIndex={interactive('hero')} aria-hidden={hidden('hero')}>
                    {copy.hero.primaryCta}
                    <ArrowDown aria-hidden="true" />
                  </a>
                  <a className="story-link" href={mail} tabIndex={interactive('hero')} aria-hidden={hidden('hero')}>
                    {copy.hero.secondaryCta}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </StoryBeat>
            </div>
          </StoryChapter>

          <StoryChapter id="leistungen" progress={scrollYProgress} range={[0.14, 0.18, 0.34, 0.4]} active={reduced || chapter === 'leistungen'} staticId={reduced ? 'leistungen' : undefined}>
            <div className="story-panel story-panel--paper">
              <StoryBeat progress={scrollYProgress} range={[0.14, 0.18, 0.34, 0.4]} index={0} total={7}>
                <p className="story-kicker">{copy.services.kicker}</p>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.14, 0.18, 0.34, 0.4]} index={1} total={7} blur>
                <h2 id="capabilities-title" className="story-title" tabIndex={-1}>
                  <span>{copy.services.title.first}</span>
                  <em>{copy.services.title.emphasis}</em>
                </h2>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.14, 0.18, 0.34, 0.4]} index={2} total={7}>
                <p className="story-copy story-copy--compact">{copy.services.intro}</p>
              </StoryBeat>
              <div className="story-capabilities">
                {copy.services.items.map((item, index) => (
                  <StoryBeat key={item.id} progress={scrollYProgress} range={[0.14, 0.18, 0.34, 0.4]} index={index + 3} total={7} className="story-beat--capability">
                    <article className="story-capability">
                      <span className="story-item-number">{item.number}</span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  </StoryBeat>
                ))}
              </div>
            </div>
          </StoryChapter>

          <StoryChapter id="arbeitsweise" className="story-chapter--right" progress={scrollYProgress} range={[0.35, 0.4, 0.54, 0.61]} active={reduced || chapter === 'arbeitsweise'} staticId={reduced ? 'arbeitsweise' : undefined}>
            <div className="story-panel story-panel--night">
              <StoryBeat progress={scrollYProgress} range={[0.35, 0.4, 0.54, 0.61]} index={0} total={5} direction={1}>
                <p className="story-kicker">{copy.core.kicker}</p>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.35, 0.4, 0.54, 0.61]} index={1} total={5} direction={1} blur>
                <h2 id="process-title" className="story-title" tabIndex={-1}>
                  <span>{copy.core.title.first}</span>
                  <em>{copy.core.title.emphasis}</em>
                </h2>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.35, 0.4, 0.54, 0.61]} index={2} total={5} direction={1}>
                <p className="story-copy">{copy.core.body}</p>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.35, 0.4, 0.54, 0.61]} index={3} total={5} direction={1}>
                <ul className="story-core-flow" aria-label={copy.core.flowAriaLabel}>
                  {copy.core.signals.map((item) => (
                    <li key={item.id}>
                      <span>{item.number}</span>
                      <strong>{item.title}</strong>
                    </li>
                  ))}
                </ul>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.35, 0.4, 0.54, 0.61]} index={4} total={5} direction={1}>
                <p className="story-principle">{copy.core.principle}</p>
              </StoryBeat>
            </div>
          </StoryChapter>

          <StoryChapter id="studio" progress={scrollYProgress} range={[0.56, 0.61, 0.72, 0.79]} active={reduced || chapter === 'studio'} staticId={reduced ? 'studio' : undefined}>
            <div className="story-panel story-panel--paper">
              <StoryBeat progress={scrollYProgress} range={[0.56, 0.61, 0.72, 0.79]} index={0} total={5}>
                <p className="story-kicker">{copy.studio.kicker}</p>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.56, 0.61, 0.72, 0.79]} index={1} total={5} blur>
                <h2 id="studio-title" className="story-title" tabIndex={-1}>
                  <span>{copy.studio.title.first}</span>
                  <em>{copy.studio.title.emphasis}</em>
                </h2>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.56, 0.61, 0.72, 0.79]} index={2} total={5}>
                <p className="story-copy">{copy.studio.body}</p>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.56, 0.61, 0.72, 0.79]} index={3} total={5}>
                <p className="story-principle story-principle--paper">{copy.studio.principle}</p>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.56, 0.61, 0.72, 0.79]} index={4} total={5}>
                <a className="story-link" href="https://soundcloud.com/biotec" target="_blank" rel="noopener noreferrer" tabIndex={interactive('studio')} aria-hidden={hidden('studio')}>
                  {copy.studio.musicCta}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </StoryBeat>
            </div>
          </StoryChapter>

          <StoryChapter id="kontakt" className="story-chapter--right story-chapter--contact" progress={scrollYProgress} range={[0.75, 0.8, 0.96, 1]} active={reduced || chapter === 'kontakt'} staticId={reduced ? 'kontakt' : undefined} endVisible>
            <div className="story-panel story-panel--night">
              <StoryBeat progress={scrollYProgress} range={[0.75, 0.8, 0.96, 1]} index={0} total={4} direction={1} endVisible>
                <p className="story-kicker">{copy.contact.kicker}</p>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.75, 0.8, 0.96, 1]} index={1} total={4} direction={1} endVisible blur>
                <h2 id="contact-title" className="story-title" tabIndex={-1}>
                  <span>{copy.contact.title.first}</span>
                  <em>{copy.contact.title.emphasis}</em>
                </h2>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.75, 0.8, 0.96, 1]} index={2} total={4} direction={1} endVisible>
                <p className="story-copy">{copy.contact.body}</p>
              </StoryBeat>
              <StoryBeat progress={scrollYProgress} range={[0.75, 0.8, 0.96, 1]} index={3} total={4} direction={1} endVisible>
                <a className="story-link story-link--primary" href={mail} tabIndex={interactive('kontakt')} aria-hidden={hidden('kontakt')}>
                  {copy.contact.cta}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </StoryBeat>
            </div>
          </StoryChapter>
        </div>
        {!reduced && (
          <>
            <motion.div className="scroll-cue" data-active={chapter === 'hero' ? 'true' : 'false'} style={{ opacity: cueOpacity }} aria-hidden="true">
              <span>{copy.hero.scrollCue}</span>
              <ArrowDown />
            </motion.div>
            <div className="scrub-progress" aria-hidden="true">
              <span>00</span>
              <i><motion.span style={{ scaleY: barScale }} /></i>
              <span>10</span>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
