import { useEffect, useRef, useState } from 'react'
import { FaCalendarDays, FaCircleCheck, FaClock, FaFacebookF, FaLocationDot, FaUserGroup } from 'react-icons/fa6'
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
            <div className="prize-row"><strong>1st place</strong><span /><b className="prize-amount-blurred">15,000 EGP</b><i className="star-pink" aria-hidden="true">★</i></div>
            <div className="prize-row"><strong>2nd place</strong><span /><b className="prize-amount-blurred">10,000 EGP</b><i className="star-cyan" aria-hidden="true">★</i></div>
            <div className="prize-row"><strong>3rd place</strong><span /><b className="prize-amount-blurred">7,000 EGP</b><i className="star-yellow" aria-hidden="true">★</i></div>
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
            <div className="footer-socials" aria-label="Social media links"><a href="https://www.facebook.com/profile.php?id=61588726680610" target="_blank" rel="noreferrer" aria-label="DCC on Facebook"><FaFacebookF /></a></div>
          </div>
        </div>
      </footer>
    </>
  )
}

const communities = ['ACPC DU', 'ACPC NDETI', 'ICPC Delta', 'ICPC HUE', 'ICPC NMU']
const memberTitles = ['Member 1 information', 'Member 2 information', 'Member 3 information']

const createInitialForm = () => ({
  team: '',
  members: Array.from({ length: 3 }, () => ({
    arabicName: '',
    englishName: '',
    nationalId: '',
    email: '',
    whatsapp: '',
    community: '',
  })),
  terms: false,
})

function MemberFields({ index, member, onChange }) {
  const updateMember = (field) => (event) => onChange(index, field, event.target.value)

  return (
    <fieldset className="registration-group registration-member-group">
      <legend><FaUserGroup /> <span>{memberTitles[index]}</span></legend>
      <label className="registration-field">Four-part Arabic name<input dir="rtl" value={member.arabicName} onChange={updateMember('arabicName')} placeholder="Enter the four-part Arabic name" minLength="7" maxLength="160" required /></label>
      <label className="registration-field">Four-part English name<input value={member.englishName} onChange={updateMember('englishName')} placeholder="Enter the four-part English name" minLength="7" maxLength="160" required /></label>
      <label className="registration-field">National ID<input inputMode="numeric" value={member.nationalId} onChange={updateMember('nationalId')} placeholder="14-digit national ID" pattern="[0-9]{14}" maxLength="14" required /></label>
      <label className="registration-field">Gmail<input type="email" value={member.email} onChange={updateMember('email')} placeholder="name@gmail.com" maxLength="254" required /></label>
      <label className="registration-field">WhatsApp number<input type="tel" value={member.whatsapp} onChange={updateMember('whatsapp')} placeholder="+20 10 1234 5678" minLength="8" maxLength="30" required /></label>
      <label className="registration-field">Community represented<select value={member.community} onChange={updateMember('community')} required><option value="">Select community</option>{communities.map((community) => <option key={community}>{community}</option>)}</select></label>
    </fieldset>
  )
}

function RegisterPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [form, setForm] = useState(createInitialForm)
  const updateTeam = (event) => setForm((current) => ({ ...current, team: event.target.value }))
  const updateMember = (index, field, value) => setForm((current) => ({
    ...current,
    members: current.members.map((member, memberIndex) => memberIndex === index ? { ...member, [field]: value } : member),
  }))
  const toggle = (event) => setForm((current) => ({ ...current, terms: event.target.checked }))
  const submit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    try {
      const teamName = form.team.trim()
      const normalizedMembers = form.members.map((member) => ({
        arabic_name: member.arabicName.trim(),
        english_name: member.englishName.trim(),
        national_id: member.nationalId.trim(),
        email: member.email.trim().toLowerCase(),
        whatsapp: member.whatsapp.trim(),
        community: member.community,
      }))

      if (teamName.length < 2) throw new Error('Team name must contain at least 2 characters.')
      normalizedMembers.forEach((member, index) => {
        const memberNumber = index + 1
        if (member.arabic_name.split(/\s+/).length < 4) throw new Error(`Member ${memberNumber}'s Arabic name must contain four parts.`)
        if (member.english_name.split(/\s+/).length < 4) throw new Error(`Member ${memberNumber}'s English name must contain four parts.`)
        if (!/^\d{14}$/.test(member.national_id)) throw new Error(`Member ${memberNumber}'s national ID must contain exactly 14 digits.`)
        if (member.whatsapp.length < 8) throw new Error(`Member ${memberNumber}'s WhatsApp number is invalid.`)
        if (!communities.includes(member.community)) throw new Error(`Select a community for member ${memberNumber}.`)
      })

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
          team_name: teamName,
          university: normalizedMembers[0].community,
          faculty: 'Not collected',
          team_size: 3,
          leader_full_name: normalizedMembers[0].english_name,
          email: normalizedMembers[0].email,
          phone: normalizedMembers[0].whatsapp,
          university_id: normalizedMembers[0].national_id,
          members: normalizedMembers,
          consent: form.terms,
        }),
      })

      if (!response.ok) {
        const apiError = await response.json().catch(() => null)
        const constraintErrors = {
          registrations_team_name_check: 'Team name must contain between 2 and 100 characters.',
          registrations_leader_full_name_check: 'Team leader name must contain between 2 and 120 characters.',
          registrations_email_check: 'Enter a valid email address.',
          registrations_phone_check: 'Phone number must contain between 8 and 30 characters.',
          registrations_university_id_check: 'University ID must contain between 2 and 80 characters.',
          registrations_members_check: 'Member information could not be saved. Review all three members and try again.',
        }
        const constraint = Object.keys(constraintErrors).find((name) => apiError?.message?.includes(name))
        throw new Error(constraint ? constraintErrors[constraint] : 'Registration could not be submitted. Please try again.')
      }

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
              <p className="registration-free"><FaCircleCheck /> Free registration — no payment required</p>
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
                <h2>Your team is registered.</h2>
                <p>The DCC organizers will contact the team after reviewing and confirming the submitted information.</p>
                <button className="registration-submit" type="button" onClick={() => { setSubmitted(false); setForm(createInitialForm()) }}>Register another team <span aria-hidden="true">↗</span></button>
              </div>
            ) : (
              <>
                <form className="registration-form" onSubmit={submit}>
                  <fieldset className="registration-group">
                    <legend><FaUserGroup /> <span>Team information</span></legend>
                    <label className="registration-field registration-field-wide">Team name<input name="team" value={form.team} onChange={updateTeam} placeholder="Enter your team name" minLength="2" maxLength="100" required /></label>
                  </fieldset>

                  {form.members.map((member, index) => <MemberFields key={index} index={index} member={member} onChange={updateMember} />)}

                  <label className="registration-consent"><input type="checkbox" name="terms" checked={form.terms} onChange={toggle} required /><span>I confirm that all information is accurate and agree to the competition rules.</span></label>

                  <div className="registration-actions">
                    <button className="registration-submit" type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit registration'} <span aria-hidden="true">↗</span></button>
                    <p><span aria-hidden="true">✦</span> Review all three members before submitting.</p>
                  </div>
                  {submitError && <p className="registration-error" role="alert">{submitError}</p>}
                </form>

                <aside className="registration-info" aria-label="Important competition information">
                  <h2><em>Important</em><br />information</h2>
                  <div className="registration-info-item"><FaCalendarDays /><div><small>Date</small><strong>30 July 2026</strong></div></div>
                  <div className="registration-info-item"><FaLocationDot /><div><small>Location</small><strong>Damietta, Egypt</strong></div></div>
                  <div className="registration-info-item"><FaUserGroup /><div><small>Team size</small><strong>3 members</strong></div></div>
                  <div className="registration-info-item"><FaClock /><div><small>Deadline</small><strong>28 July 2026</strong></div></div>
                  <div className="registration-info-item"><FaCircleCheck /><div><small>Registration fee</small><strong>Free — no payment required</strong></div></div>
                  <div className="registration-ready"><span aria-hidden="true">★</span><h3>Get ready!</h3><p>Prepare for challenges, collaboration, and a memorable team experience.</p></div>
                </aside>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="registration-footer">
        <div className="container"><img src="/logo.svg" alt="DCC" width="150" height="77" /><span>© 2026 DCC · Damietta Competitive Contest</span><div><a href="https://www.facebook.com/profile.php?id=61588726680610" target="_blank" rel="noreferrer" aria-label="DCC on Facebook"><FaFacebookF /></a></div></div>
      </footer>
    </div>
  )
}

export default function App() {
  return <RouterProvider router={router} />
}
