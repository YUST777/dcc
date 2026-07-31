import { useEffect, useRef, useState } from 'react'
import { FaCalendarDays, FaFacebookF, FaGithub, FaGlobe, FaLinkedin, FaLocationDot } from 'react-icons/fa6'
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegistrationClosedPage,
})

const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/form',
  component: RegistrationClosedPage,
})

const routeTree = rootRoute.addChildren([homeRoute, registerRoute, formRoute])
const router = createRouter({ routeTree })

function DeferredImage({ src, ...props }) {
  const imageRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window))

  useEffect(() => {
    const image = imageRef.current
    if (!image || shouldLoad) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setShouldLoad(true)
      observer.disconnect()
    }, { rootMargin: '350px 0px' })

    observer.observe(image)
    return () => observer.disconnect()
  }, [shouldLoad])

  return <img ref={imageRef} src={shouldLoad ? src : undefined} loading="lazy" decoding="async" {...props} />
}

function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-inner">
          <Link to="/" className="brand" aria-label="DCC home" onClick={() => setMenuOpen(false)}>
            <img className="nav-logo" src="/logo.svg" alt="DCC" width="150" height="77" decoding="async" />
          </Link>
          <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
          </button>
          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
            <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="/#format" onClick={() => setMenuOpen(false)}>Format</a>
            <a href="/#rewards" onClick={() => setMenuOpen(false)}>Rewards</a>
            <Link to="/form" className="nav-cta" onClick={() => setMenuOpen(false)}>Offline sign-up <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
    </div>
  )
}

function YousefPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const timerRef = useRef(null)

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 250)
  }

  return (
    <span
      className="yousef-popover-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      built with <span className="yousef-heart" aria-label="love">❤️</span> by{' '}
      <button
        type="button"
        className="yousef-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Yousef's profiles"
      >
        Yousef
      </button>
      {isOpen && (
        <div className="yousef-card" role="tooltip">
          <div className="yousef-card-links">
            <a href="https://github.com/YUST777" target="_blank" rel="noreferrer" className="yousef-link">
              <span className="yousef-link-main"><FaGithub /> GitHub</span>
              <span className="yousef-link-arrow" aria-hidden="true">↗</span>
            </a>
            <a href="https://www.linkedin.com/in/yousefmsm1/" target="_blank" rel="noreferrer" className="yousef-link">
              <span className="yousef-link-main"><FaLinkedin /> LinkedIn</span>
              <span className="yousef-link-arrow" aria-hidden="true">↗</span>
            </a>
            <a href="https://www.yust.dev/" target="_blank" rel="noreferrer" className="yousef-link">
              <span className="yousef-link-main"><FaGlobe /> Portfolio</span>
              <span className="yousef-link-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      )}
    </span>
  )
}

function HeroCode() {
  return (
    <div className="hero-code" role="presentation">
      <div className="hero-code-lines">
        <div><i>01</i><code><b>#include</b> &lt;bits/stdc++.h&gt;</code></div>
        <div><i>02</i><code><span>using namespace</span> std;</code></div>
        <div className="hero-code-gap"><i>03</i><code><strong>int</strong> main() {'{'}</code></div>
        <div><i>04</i><code>  vector&lt;int&gt; answers;</code></div>
        <div><i>05</i><code>  <mark>solve</mark>(answers);</code></div>
        <div><i>06</i><code>  cout &lt;&lt; <em>"ready"</em>;</code></div>
        <div><i>07</i><code>  <strong>return</strong> <small>0</small>;</code></div>
        <div><i>08</i><code>{'}'}</code></div>
      </div>
      <div className="hero-code-status"><span /> ready to compete <time>00:00:00</time></div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero section" data-od-id="hero">
      <div className="hero-halftone" aria-hidden="true" />
      <div className="hero-speed-lines" aria-hidden="true" />
      <div className="hero-art" aria-hidden="true">
        <div className="hero-image-wrap">
          <img src="/hero.webp" alt="" width="1400" height="1052" loading="eager" decoding="sync" fetchPriority="high" />
          <HeroCode />
          <div className="hero-code-bubble">{'{ }'}</div>
          <div className="hero-code-burst">CODE<br /><strong>ON!</strong></div>
          <div className="hero-team-burst">TEAM<br />MODE</div>
        </div>
      </div>
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="hero-date"><span aria-hidden="true">★</span> Damietta · Egypt · 2026</div>
          <h1><span className="hero-title-white">Think fast.</span><span className="hero-title-pink">Build together.</span></h1>
          <div className="hero-speech">
            <p>A competitive programming contest for university students who like hard problems, sharp ideas, and a little pressure.</p>
          </div>
          <div className="hero-actions">
            <Link to="/form" className="hero-button hero-button-primary">Sign up for offline <span aria-hidden="true">↗</span></Link>
            <a href="#about" className="hero-button hero-button-secondary">See how it works <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}


function HomePage() {
  useEffect(() => {
    document.title = 'DCC 2026 — Damietta Competitive Contest | Official Site'
  }, [])

  return (
    <>
      <Hero />
      <section className="about-section section" id="about" data-od-id="about">
        <div className="container about-grid">
          <div className="about-copy">
            <p className="eyebrow"><strong>01 /</strong> About</p>
            <h2>Built for<br />innovators.</h2>
            <p>DCC is a local practice contest where logic meets creativity. Solve challenging problems, collaborate with your team, and prepare for ECPC alongside students from universities across Damietta.</p>
            <a href="#format" className="about-action">Our mission <span aria-hidden="true">↗</span></a>
          </div>
          <div className="about-cards" aria-label="What DCC is built around">
            <article className="about-card about-card-one">
              <div className="about-card-image"><DeferredImage src="/1_section2.webp" alt="Comic-style championship trophy" width="900" height="900" /></div>
              <h3>Real<br />challenges</h3>
            </article>
            <article className="about-card about-card-two">
              <div className="about-card-image"><DeferredImage src="/2_section2.webp" alt="Comic-style team fist bump" width="900" height="900" /></div>
              <h3>Team<br />collaboration</h3>
            </article>
            <article className="about-card about-card-three">
              <div className="about-card-image"><DeferredImage src="/3_section2.webp" alt="Comic-style rocket launch" width="900" height="900" /></div>
              <h3>Level<br />up!</h3>
            </article>
          </div>
        </div>
      </section>

      <section className="format section" id="format" data-od-id="format">
        <div className="container">
          <div className="format-intro">
            <p className="eyebrow format-eyebrow"><strong>02 /</strong> How it runs</p>
            <div className="format-heading">
              <h2>Three phases.<br /><em>One team.</em></h2>
              <div className="format-speech"><p>Everything is designed to be clear before the timer starts.</p></div>
            </div>
          </div>
          <div className="format-grid">
            <article className="phase-card phase-card-cyan">
              <span className="phase-index">01</span>
              <DeferredImage src="/steps_1.webp" alt="DCC 2026 registration form — form opening soon" width="900" height="900" />
            </article>
            <article className="phase-card phase-card-pink">
              <span className="phase-index">02</span>
              <DeferredImage src="/steps_2.webp" alt="Online qualification laptops and scoreboard — online round" width="1000" height="1000" />
            </article>
            <article className="phase-card phase-card-yellow">
              <span className="phase-index">03</span>
              <DeferredImage src="/steps_3.webp" alt="Damietta competition venue — Damietta 2026" width="1000" height="1000" />
            </article>
            <div className="format-team-art" aria-hidden="true">
              <DeferredImage src="/steps_4.webp" alt="" width="1000" height="1000" />
            </div>
          </div>
        </div>
      </section>

      <section className="rewards-section section" id="rewards" data-od-id="rewards">
        <div className="rewards-dots" aria-hidden="true" />
        <div className="container rewards-grid">
          <div className="rewards-copy">
            <p className="eyebrow"><strong>03 /</strong> Prizes &amp; rewards</p>
            <h2>Code today for<br /><em>the glory of<br />tomorrow.</em></h2>
            <a className="rewards-button" href="#ready">Prize details <span aria-hidden="true">↗</span></a>
          </div>
          <div className="prize-list" aria-label="Competition prizes">
            <div className="prize-row"><strong>1st place</strong><span /><b className="prize-amount-blurred">15,000 EGP</b><i className="star-pink" aria-hidden="true">★</i></div>
            <div className="prize-row"><strong>2nd place</strong><span /><b className="prize-amount-blurred">10,000 EGP</b><i className="star-cyan" aria-hidden="true">★</i></div>
            <div className="prize-row"><strong>3rd place</strong><span /><b className="prize-amount-blurred">7,000 EGP</b><i className="star-yellow" aria-hidden="true">★</i></div>
            <div className="prize-row prize-row-special"><strong>Special awards</strong><span /><b>&amp; more</b><i aria-hidden="true">★</i></div>
          </div>
        </div>
      </section>

      <section className="sponsors section" id="sponsors" data-od-id="sponsors">
        <div className="container">
          <div className="sponsor-heading">
            <p className="eyebrow"><strong>04 /</strong> Our sponsor</p>
            <h2>Built with<br /><em>support.</em></h2>
            <p>Thanks to CSkilled for supporting DCC and the next generation of problem solvers.</p>
          </div>
          <div className="sponsor-logo-row">
            <a className="sponsor-logo-item" href="https://www.facebook.com/cskilled" target="_blank" rel="noreferrer" aria-label="CSkilled on Facebook">
              <img src="/cskilled.webp" alt="CSkilled" width="1200" height="345" />
              <span>CSkilled</span>
            </a>
          </div>
        </div>
      </section>

      <section className="community-partners section" id="communities" data-od-id="communities">
        <div className="community-dots" aria-hidden="true" />
        <div className="container">
          <div className="community-heading">
            <div>
              <p className="eyebrow"><strong>05 /</strong> Community partners</p>
              <h2>Stronger<br /><em>together.</em></h2>
            </div>
            <p>Meet the competitive programming communities that helped bring DCC 2026 to life.</p>
          </div>
          <div className="community-grid" aria-label="DCC community partners">
            <a className="community-card" href="https://www.facebook.com/AcpcDamietta" target="_blank" rel="noreferrer" aria-label="ACPC DU on Facebook"><DeferredImage src="/communities/acpc-du.webp" alt="ACPC Club Damietta University" width="600" height="360" /><span>ACPC DU</span></a>
            <a className="community-card" href="https://www.facebook.com/profile.php?id=61575481044958" target="_blank" rel="noreferrer" aria-label="ACPC NDETI on Facebook"><DeferredImage src="/communities/acpc-ndeti.webp" alt="ACPC NDETI Community" width="600" height="360" /><span>ACPC NDETI</span></a>
            <a className="community-card" href="https://www.facebook.com/profile.php?id=61557951950151" target="_blank" rel="noreferrer" aria-label="ICPC Delta on Facebook"><DeferredImage src="/communities/icpc-delta.webp" alt="ICPC Delta Community" width="600" height="360" /><span>ICPC Delta</span></a>
            <a className="community-card" href="https://www.facebook.com/icpchue" target="_blank" rel="noreferrer" aria-label="ICPC HUE on Facebook"><DeferredImage src="/communities/icpc-hue.webp" alt="ICPC HUE" width="600" height="360" /><span>ICPC HUE</span></a>
            <a className="community-card" href="https://www.facebook.com/profile.php?id=61582476249151" target="_blank" rel="noreferrer" aria-label="ICPC NMU on Facebook"><DeferredImage src="/communities/icpc-nmu.webp" alt="ICPC NMU" width="600" height="360" /><span>ICPC NMU</span></a>
          </div>
        </div>
      </section>

      <section className="ready-section" id="ready" data-od-id="ready">
        <div className="container ready-composition">
          <div className="ready-copy-panel">
            <p className="eyebrow ready-kicker"><strong>06 /</strong> Ready?</p>
            <h2>Become part<br /><em>of DCC 2026!</em></h2>
            <p>Gather your team, sharpen your skills, and get ready for an unforgettable experience.</p>
            <Link to="/form" className="ready-button">Register offline <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="ready-visual">
            <DeferredImage className="ready-art" src="/timeline.webp" alt="Calendar showing 30 July 2026 beside a DCC cup" width="900" height="900" />
            <div className="ready-details">
              <div className="ready-detail">
                <span className="ready-icon" aria-hidden="true"><FaCalendarDays /></span>
                <div><small>Date</small><strong>30 July 2026</strong></div>
              </div>
              <div className="ready-detail">
                <span className="ready-icon" aria-hidden="true"><FaLocationDot /></span>
                <div><small>Location</small><strong>Damietta, Egypt</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer" data-od-id="footer">
        <div className="victory-banner">
          <div className="container victory-grid">
            <h2>Code now<br /><em>win big.</em></h2>
            <div className="victory-copy"><p>The countdown has begun.<br />Don&apos;t just code — dominate.</p><Link to="/form" className="victory-button">Let&apos;s go! <span aria-hidden="true">↗</span></Link></div>
          </div>
          <DeferredImage className="victory-art" src="/footer-trophy.webp" alt="DCC champion trophy" width="900" height="900" />
        </div>
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <div className="footer-identity"><DeferredImage src="/logo.svg" alt="DCC" width="150" height="77" /><span>© 2026 DCC. All rights reserved. • <YousefPopover /></span></div>
            <div className="footer-socials" aria-label="Social media links"><a href="https://www.facebook.com/profile.php?id=61588726680610" target="_blank" rel="noreferrer" aria-label="DCC on Facebook"><FaFacebookF /></a></div>
          </div>
        </div>
      </footer>
    </>
  )
}

const ONLINE_ROUND_START = Date.parse('2026-07-31T17:00:00+03:00')
const ONLINE_ROUND_END = Date.parse('2026-07-31T20:00:00+03:00')

const formatCountdownPart = (value) => String(value).padStart(2, '0')

function OnlineRoundTimer() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const isBeforeRound = now < ONLINE_ROUND_START
  const isRoundLive = now >= ONLINE_ROUND_START && now < ONLINE_ROUND_END
  const remaining = Math.max(0, (isBeforeRound ? ONLINE_ROUND_START : ONLINE_ROUND_END) - now)
  const totalSeconds = Math.floor(remaining / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const status = isBeforeRound ? 'Starts in' : isRoundLive ? 'Live now · ends in' : 'Online round complete'

  return (
    <div className={`round-timer ${isRoundLive ? 'round-timer-live' : ''}`} aria-live="polite">
      <div className="round-timer-heading">
        <span className="round-timer-dot" aria-hidden="true" />
        <span>{status}</span>
      </div>
      <div className="round-timer-digits" aria-label={`${hours} hours, ${minutes} minutes, ${seconds} seconds`}>
        <div><strong>{formatCountdownPart(hours)}</strong><span>hours</span></div>
        <b aria-hidden="true">:</b>
        <div><strong>{formatCountdownPart(minutes)}</strong><span>minutes</span></div>
        <b aria-hidden="true">:</b>
        <div><strong>{formatCountdownPart(seconds)}</strong><span>seconds</span></div>
      </div>
    </div>
  )
}

function RegistrationClosedPage() {
  useEffect(() => {
    document.title = 'Registration complete — DCC 2026 Damietta Competitive Contest'
  }, [])

  return (
    <div className="registration-closed-page" data-od-id="registration-closed-page">
      <main className="container registration-closed-layout">
        <section className="closed-intro" aria-labelledby="closed-title">
          <p className="eyebrow"><strong>01 /</strong> Registration complete</p>
          <h1 id="closed-title">Thank you<br /><em>for registering.</em></h1>
          <p className="closed-lead">Your team is on the list. The next step is the online round.</p>
          <div className="closed-complete-widget">
            <span className="closed-check" aria-hidden="true">✓</span>
            <div><small>PHASE 01 / DONE</small><strong>Offline registration complete</strong><span>Team details received</span></div>
          </div>
        </section>

        <section className="closed-next-step" aria-labelledby="online-round-title">
          <p className="eyebrow"><strong>02 /</strong> Next step</p>
          <h2 id="online-round-title">Join the<br /><em>online round.</em></h2>
          <p>Open your Codeforces account and accept the competition invitation from your alerts or notifications.</p>
          <a className="closed-codeforces-button" href="https://codeforces.com/" target="_blank" rel="noreferrer">Open Codeforces <span aria-hidden="true">↗</span></a>
          <div className="closed-time-details">
            <div><span>Start time</span><strong>17:00 (05:00 PM)</strong><small>Cairo time</small></div>
            <div><span>Duration</span><strong>3 hours</strong><small>Ends at 20:00 (08:00 PM)</small></div>
          </div>
          <div className="closed-arabic-details" dir="rtl">
            <p>وقت البداية: الساعة 17:00 (05:00 مساءً) بتوقيت القاهرة.</p>
            <p>مدة المسابقة: 3 ساعات (تنتهي المعركة في تمام الـ 08:00 مساءً).</p>
          </div>
          <OnlineRoundTimer />
        </section>
      </main>

      <footer className="registration-closed-footer">
        <div className="container"><Link to="/">Back to DCC home <span aria-hidden="true">↗</span></Link><span>DCC 2026 · Damietta, Egypt</span></div>
      </footer>
    </div>
  )
}

export default function App() {
  return <RouterProvider router={router} />
}
