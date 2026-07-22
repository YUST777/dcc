import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { FaCalendarDays, FaClock, FaFacebookF, FaInstagram, FaLocationDot, FaUserGroup, FaXTwitter, FaYoutube } from 'react-icons/fa6'
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

const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/form',
  component: RegisterPage,
})

const routeTree = rootRoute.addChildren([homeRoute, registerRoute, formRoute])
const router = createRouter({ routeTree })

function DeferredImage({ src, ...props }) {
  const imageRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const image = imageRef.current
    if (!image || shouldLoad) return undefined

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return undefined
    }

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
            <div className="footer-identity"><DeferredImage src="/logo.svg" alt="DCC" width="150" height="77" /><span>© 2026 DCC. All rights reserved.</span></div>
            <div className="footer-socials" aria-label="Social media links"><a href="#" aria-label="Facebook"><FaFacebookF /></a><a href="#" aria-label="X"><FaXTwitter /></a><a href="#" aria-label="Instagram"><FaInstagram /></a><a href="#" aria-label="YouTube"><FaYoutube /></a></div>
          </div>
        </div>
      </footer>
    </>
  )
}

function RegisterPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [form, setForm] = useState({
    team: '',
    university: '',
    faculty: '',
    leader: '',
    email: '',
    phone: '',
    universityId: '',
    terms: false,
  })
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const toggle = (event) => setForm({ ...form, [event.target.name]: event.target.checked })
  const submit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) throw new Error('Registration is not configured yet. Please try again shortly.')

      const response = await fetch(`${supabaseUrl}/rest/v1/registrations`, {
        method: 'POST',
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          team_name: form.team.trim(),
          university: form.university,
          faculty: form.faculty,
          team_size: 3,
          leader_full_name: form.leader.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          university_id: form.universityId.trim(),
          consent: form.terms,
        }),
      })

      if (!response.ok) throw new Error('Registration could not be submitted. Check the details and try again.')

      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Registration could not be submitted. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="registration-page" data-od-id="registration-page">
      <section className="registration-hero" data-od-id="registration-hero">
        <div className="container registration-hero-grid">
          <div className="registration-copy">
            <p className="registration-tag"><span aria-hidden="true">★</span> DCC 2026</p>
            <h1>Register<br /><em>for DCC!</em></h1>
            <div className="registration-speech">
              <p>Gather your team, sharpen your skills, and get ready for an unforgettable experience.</p>
              <a href="#registration-form" className="registration-jump">Start registration <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="registration-visual" aria-hidden="true">
            <div className="registration-artboard">
              <img src="/hero.webp" alt="" width="1400" height="1052" loading="eager" decoding="sync" fetchPriority="high" />
              <div className="registration-screen">
                <span><FaUserGroup /></span>
                <strong>DCC 2026</strong>
                <em>Registration</em>
                <i>● ● ●</i>
              </div>
              <div className="registration-burst">Be part<br />of something<br /><strong>epic!</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section id="registration-form" className="registration-form-section" data-od-id="registration-form">
        <div className="container">
          <div className="registration-panel">
            {submitted ? (
              <div className="registration-success">
                <div className="success-mark">✓</div>
                <p className="eyebrow">REGISTRATION RECEIVED</p>
                <h2>Your team is in review.</h2>
                <p>The DCC organizers will contact your team leader with confirmation and the final offline instructions.</p>
                <button className="registration-submit" type="button" onClick={() => setSubmitted(false)}>Register another team <span aria-hidden="true">↗</span></button>
              </div>
            ) : (
              <>
                <form className="registration-form" onSubmit={submit}>
                  <fieldset className="registration-group">
                    <legend><FaUserGroup /> <span>Team information</span></legend>
                    <label className="registration-field registration-field-wide">Team name<input name="team" value={form.team} onChange={update} placeholder="Enter your team name" required /></label>
                    <label className="registration-field">University<select name="university" value={form.university} onChange={update} required><option value="">Select your university</option><option>Damietta University</option><option>Mansoura University</option><option>Other university</option></select></label>
                    <label className="registration-field">Faculty<select name="faculty" value={form.faculty} onChange={update} required><option value="">Select your faculty</option><option>Computers and Artificial Intelligence</option><option>Engineering</option><option>Science</option><option>Other faculty</option></select></label>
                  </fieldset>

                  <fieldset className="registration-group">
                    <legend><FaUserGroup /> <span>Team leader information</span></legend>
                    <label className="registration-field">Full name<input name="leader" value={form.leader} onChange={update} placeholder="Enter full name" required /></label>
                    <label className="registration-field">Email<input type="email" name="email" value={form.email} onChange={update} placeholder="Enter email address" required /></label>
                    <label className="registration-field">Phone number<input type="tel" name="phone" value={form.phone} onChange={update} placeholder="+20 10 1234 5678" required /></label>
                    <label className="registration-field">University ID<input name="universityId" value={form.universityId} onChange={update} placeholder="Enter your university ID" required /></label>
                  </fieldset>

                  <label className="registration-consent"><input type="checkbox" name="terms" checked={form.terms} onChange={toggle} required /><span>I confirm the submitted information is accurate and agree to the competition rules.</span></label>

                  <div className="registration-actions">
                    <button className="registration-submit" type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit registration'} <span aria-hidden="true">↗</span></button>
                    <p><span aria-hidden="true">✦</span> Double-check the team details before submitting.</p>
                  </div>
                  {submitError && <p className="registration-error" role="alert">{submitError}</p>}
                </form>

                <aside className="registration-info" aria-label="Important competition information">
                  <h2><em>Important</em><br />information</h2>
                  <div className="registration-info-item"><FaCalendarDays /><div><small>Date</small><strong>30 July 2026</strong></div></div>
                  <div className="registration-info-item"><FaLocationDot /><div><small>Location</small><strong>Damietta, Egypt</strong></div></div>
                  <div className="registration-info-item"><FaUserGroup /><div><small>Team size</small><strong>3 members</strong></div></div>
                  <div className="registration-info-item"><FaClock /><div><small>Deadline</small><strong>28 July 2026</strong></div></div>
                  <div className="registration-ready"><span aria-hidden="true">★</span><h3>Get ready!</h3><p>Prepare for challenges, collaboration, and a memorable team experience.</p></div>
                </aside>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="registration-footer">
        <div className="container"><img src="/logo.svg" alt="DCC" width="150" height="77" /><span>© 2026 DCC · Damietta Coding Contest</span><div><FaFacebookF /><FaInstagram /><FaYoutube /></div></div>
      </footer>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)
