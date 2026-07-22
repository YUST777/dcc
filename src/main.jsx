import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { AnimatePresence, motion } from 'motion/react'
import '@fontsource/bangers/400.css'
import '@fontsource/comic-neue/400.css'
import '@fontsource/comic-neue/700.css'
import '@fontsource/dm-mono/400.css'
import '@fontsource/dm-mono/500.css'
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
            <a href="/#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
            <Link to="/register" className="nav-cta" onClick={() => setMenuOpen(false)}>Offline sign-up <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-brand"><img className="footer-logo" src="/logo.svg" alt="DCC" /></div>
            <p>Competitive programming, made local.</p>
          </div>
          <div className="footer-meta">
            <span className="mono">DCC / 2026</span>
            <span>Damietta, Egypt</span>
          </div>
        </div>
      </footer>
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
          <img src="/hero.png" alt="" />
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
  const [openFaq, setOpenFaq] = useState(3)
  const faqs = [
    ['Who can participate?', 'University students in Egypt can form a team and take part. We will publish the exact eligibility rules with the registration form.'],
    ['What does a team look like?', 'The contest follows the team-based problem-solving format used by collegiate programming competitions. Team details and limits will be confirmed before registration closes.'],
    ['Is DCC part of ICPC or ECPC?', 'DCC is a local Damietta contest inspired by the same competitive programming format. It is not presented as an official ICPC or ECPC qualifier unless an official partnership is announced.'],
    ['When is the contest?', 'The current plan places the offline event around 30 July 2026, with online qualifiers around four to five days earlier. Dates are subject to final confirmation.'],
  ]

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
              <div className="about-card-image"><img src="/1_section2.png" alt="Comic-style championship trophy" /></div>
              <h3>Real<br />challenges</h3>
            </article>
            <article className="about-card about-card-two">
              <div className="about-card-image"><img src="/2_section2.png" alt="Comic-style team fist bump" /></div>
              <h3>Team<br />collaboration</h3>
            </article>
            <article className="about-card about-card-three">
              <div className="about-card-image"><img src="/3_section2.png" alt="Comic-style rocket launch" /></div>
              <h3>Level<br />up!</h3>
            </article>
          </div>
        </div>
      </section>

      <section className="format section" id="format" data-od-id="format">
        <div className="container">
          <div className="section-head row-between">
            <div><p className="eyebrow">02 / HOW IT RUNS</p><h2>Three beats.<br />One team.</h2></div>
            <p className="section-aside">Everything is designed to be clear before the timer starts.</p>
          </div>
          <div className="format-grid">
            <article className="format-card format-card-dark"><span className="card-index">01</span><div className="card-icon">⌁</div><h3>Register</h3><p>Put your team together, pick a name, and tell us how to reach you.</p><span className="card-label">FORM / OPEN SOON</span></article>
            <article className="format-card format-card-coral"><span className="card-index">02</span><div className="card-icon">◒</div><h3>Qualify online</h3><p>Solve from wherever you are. The scoreboard tells the story.</p><span className="card-label">ONLINE ROUND</span></article>
            <article className="format-card format-card-light"><span className="card-index">03</span><div className="card-icon">✦</div><h3>Meet offline</h3><p>The finalists come together in Damietta for the main event.</p><span className="card-label">DAMIETTA / 2026</span></article>
          </div>
        </div>
      </section>

      <section className="signal section" data-od-id="offline-signup">
        <div className="container signal-grid">
          <div className="signal-copy"><p className="eyebrow">03 / OFFLINE SIGN-UP</p><h2>Get ready for<br /><em>the offline room.</em></h2><p className="lead">The form is your first step. Submit the team details, then wait for the organizers to confirm the final schedule and your place.</p><Link to="/register" className="button signal-button">Open offline sign-up <span aria-hidden="true">↗</span></Link></div>
          <div className="scoreboard" aria-label="Offline sign-up steps">
            <div className="score-row"><span className="mono">A</span><strong>Build your team</strong><span className="score-line" /><span className="mono">01</span></div>
            <div className="score-row"><span className="mono">B</span><strong>Add your university</strong><span className="score-line" /><span className="mono">02</span></div>
            <div className="score-row"><span className="mono">C</span><strong>Share team contacts</strong><span className="score-line" /><span className="mono">03</span></div>
            <div className="score-row"><span className="mono">D</span><strong>Receive confirmation</strong><span className="score-line" /><span className="mono">04</span></div>
          </div>
        </div>
      </section>

      <section className="sponsors section" id="partners" data-od-id="partners">
        <div className="container">
          <div className="sponsor-heading"><p className="eyebrow">04 / OUR SPONSORS</p><h2>Our sponsors.</h2><p>Supporting DCC’s offline training experience in Ras El Bar and New Damietta.</p></div>
          <div className="sponsor-logo-row">
            <article className="sponsor-logo-item"><img src="/iti-logo.png" alt="Information Technology Institute" /><span>Information Technology Institute</span></article>
            <article className="sponsor-logo-item"><img src="/creativa-logo.png" alt="CREATIVA Innovation Hubs" /><span>CREATIVA Innovation Hubs</span></article>
          </div>
          <p className="sponsor-branch mono">Ras El Bar · New Damietta</p>
        </div>
      </section>

      <section className="campus section" id="campus" data-od-id="campus-network">
        <div className="container">
          <div className="campus-heading"><p className="eyebrow">05 / CAMPUS NETWORK</p><h2>One contest,<br /><em>three communities.</em></h2><p>DCC starts by connecting the universities shaping the next generation of technical talent across Damietta.</p></div>
          <div className="campus-grid">
            <article className="campus-card campus-pink"><span className="campus-number mono">01</span><strong className="campus-code">DU</strong><div><h3>Damietta University</h3><p>New Damietta · Egypt</p></div></article>
            <article className="campus-card campus-yellow"><span className="campus-number mono">02</span><strong className="campus-code">DNU</strong><div><h3>Damietta National University</h3><p>New Damietta · Egypt</p></div></article>
            <article className="campus-card campus-cyan"><span className="campus-number mono">03</span><strong className="campus-code">HUE</strong><div><h3>Horus University</h3><p>New Damietta · Egypt</p></div></article>
          </div>
        </div>
      </section>

      <section className="faq section" id="faq" data-od-id="faq">
        <div className="container faq-grid">
          <div><p className="eyebrow">06 / QUESTIONS</p><h2>Before you<br /><em>hit submit.</em></h2><p className="faq-note">Can’t find your answer? Bring it to the organizers and we’ll keep the page updated.</p></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <motion.div className={openFaq === index ? 'faq-item is-open' : 'faq-item'} key={question} layout transition={{ duration: 0.24, ease: 'easeOut' }}>
                <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><b aria-hidden="true">{openFaq === index ? '−' : '+'}</b></button>
                <AnimatePresence initial={false}>
                  {openFaq === index && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: 'easeOut' }}><p>{answer}</p></motion.div>}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta section" data-od-id="cta">
        <div className="container cta-inner"><div><p className="eyebrow">07 / YOUR MOVE</p><h2>Ready when<br /><em>you are.</em></h2></div><div className="cta-action"><p>Submit your team for the offline competition and receive confirmation from the DCC organizers.</p><Link to="/register" className="button button-primary">Sign up for offline <span aria-hidden="true">↗</span></Link></div></div>
      </section>
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
