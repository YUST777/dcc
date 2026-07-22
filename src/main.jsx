import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/bangers/400.css'
import '@fontsource/comic-neue/400.css'
import '@fontsource/comic-neue/700.css'
import '@fontsource/dm-mono/400.css'
import '@fontsource/dm-mono/500.css'
import { FaCalendarDays, FaFacebookF, FaInstagram, FaLocationDot, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import './styles.css'

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
  component: RegisterPage,
})

const routeTree = rootRoute.addChildren([homeRoute, registerRoute])
const router = createRouter({ routeTree })

function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-inner">
          <Link to="/" className="brand" aria-label="DCC home" onClick={() => setMenuOpen(false)}>
            <img className="nav-logo" src="/logo.svg" alt="DCC" />
          </Link>
          <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
          </button>
          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
            <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="/#format" onClick={() => setMenuOpen(false)}>Format</a>
            <a href="/#rewards" onClick={() => setMenuOpen(false)}>Rewards</a>
            <Link to="/register" className="nav-cta" onClick={() => setMenuOpen(false)}>Offline sign-up <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
    </div>
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
          <img src="/hero.webp" alt="" />
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
            <Link to="/register" className="hero-button hero-button-primary">Sign up for offline <span aria-hidden="true">↗</span></Link>
            <a href="#about" className="hero-button hero-button-secondary">See how it works <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
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
              <div className="about-card-image"><img src="/1_section2.webp" alt="Comic-style championship trophy" /></div>
              <h3>Real<br />challenges</h3>
            </article>
            <article className="about-card about-card-two">
              <div className="about-card-image"><img src="/2_section2.webp" alt="Comic-style team fist bump" /></div>
              <h3>Team<br />collaboration</h3>
            </article>
            <article className="about-card about-card-three">
              <div className="about-card-image"><img src="/3_section2.webp" alt="Comic-style rocket launch" /></div>
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
              <img src="/steps_1.webp" alt="DCC 2026 registration form — form opening soon" />
            </article>
            <article className="phase-card phase-card-pink">
              <span className="phase-index">02</span>
              <img src="/steps_2.webp" alt="Online qualification laptops and scoreboard — online round" />
            </article>
            <article className="phase-card phase-card-yellow">
              <span className="phase-index">03</span>
              <img src="/steps_3.webp" alt="Damietta competition venue — Damietta 2026" />
            </article>
            <div className="format-team-art" aria-hidden="true">
              <img src="/steps_4.webp" alt="" />
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
            <div className="prize-row"><strong>1st place</strong><span /><b>15,000 EGP</b><i className="star-pink" aria-hidden="true">★</i></div>
            <div className="prize-row"><strong>2nd place</strong><span /><b>10,000 EGP</b><i className="star-cyan" aria-hidden="true">★</i></div>
            <div className="prize-row"><strong>3rd place</strong><span /><b>7,000 EGP</b><i className="star-yellow" aria-hidden="true">★</i></div>
            <div className="prize-row prize-row-special"><strong>Special awards</strong><span /><b>&amp; more</b><i aria-hidden="true">★</i></div>
          </div>
        </div>
      </section>

      <section className="ready-section" id="ready" data-od-id="ready">
        <div className="container ready-composition">
          <div className="ready-copy-panel">
            <p className="eyebrow ready-kicker"><strong>04 /</strong> Ready?</p>
            <h2>Become part<br /><em>of DCC 2026!</em></h2>
            <p>Gather your team, sharpen your skills, and get ready for an unforgettable experience.</p>
            <Link to="/register" className="ready-button">Register offline <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="ready-visual">
            <img className="ready-art" src="/timeline.webp" alt="Calendar showing 30 July 2026 beside a DCC cup" />
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
            <div className="victory-copy"><p>The countdown has begun.<br />Don&apos;t just code — dominate.</p><Link to="/register" className="victory-button">Let&apos;s go! <span aria-hidden="true">↗</span></Link></div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <div className="footer-identity"><img src="/logo.svg" alt="DCC" /><span>© 2026 DCC. All rights reserved.</span></div>
            <div className="footer-socials" aria-label="Social media links"><a href="#" aria-label="Facebook"><FaFacebookF /></a><a href="#" aria-label="X"><FaXTwitter /></a><a href="#" aria-label="Instagram"><FaInstagram /></a><a href="#" aria-label="YouTube"><FaYoutube /></a></div>
          </div>
        </div>
        <img className="victory-art" src="/footer-trophy.webp" alt="DCC champion trophy" />
      </footer>
    </>
  )
}

function RegisterPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ team: '', captain: '', email: '', university: '', members: '', notes: '' })
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = (event) => { event.preventDefault(); setSubmitted(true) }

  return (
    <section className="register-page section" data-od-id="register">
      <div className="container register-layout">
        <div className="register-copy"><Link to="/" className="back-link">← Back to DCC</Link><p className="eyebrow">OFFLINE SIGN-UP / 2026</p><h1>Reserve your team’s<br /><span>place in the room.</span></h1><p className="lead">Submit your details for the DCC offline practice competition. The organizers will review your team and send the confirmed schedule and next steps.</p><div className="register-aside"><span className="note-star" aria-hidden="true">✦</span><p>One form per team. Final participation is confirmed by the organizers.</p></div></div>
        <div className="form-card">
          {submitted ? <div className="success-state"><div className="success-mark">✓</div><p className="eyebrow">SIGN-UP RECEIVED</p><h2>Your team is in review.</h2><p>The DCC organizers will follow up with the confirmed offline schedule and participation details.</p><button className="button button-secondary" onClick={() => setSubmitted(false)}>Add another team</button></div> : <form onSubmit={submit}><div className="form-heading"><span className="mono">OFFLINE FORM / 01</span><h2>Team details.</h2><p>Complete the required information so the organizers can contact your team.</p></div><div className="form-two"><label>Team name<input name="team" value={form.team} onChange={update} placeholder="e.g. Runtime Terrors" required /></label><label>Captain name<input name="captain" value={form.captain} onChange={update} placeholder="Your full name" required /></label></div><div className="form-two"><label>Email<input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" required /></label><label>University<input name="university" value={form.university} onChange={update} placeholder="University / institute" required /></label></div><label>Team members<textarea name="members" value={form.members} onChange={update} placeholder="List your teammates, one per line" rows="3" /></label><label>Anything we should know? <span className="optional">optional</span><textarea name="notes" value={form.notes} onChange={update} placeholder="Questions, accessibility needs, or a note for the organizers" rows="3" /></label><button className="button button-primary form-submit" type="submit">Submit offline sign-up <span aria-hidden="true">↗</span></button><p className="form-footnote">Submitting this form does not guarantee a place until the organizers confirm it.</p></form>}
        </div>
      </div>
    </section>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)
