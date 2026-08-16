import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FaCalendarDays,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaLocationDot,
  FaXmark,
} from 'react-icons/fa6'
import { AnimatePresence, motion } from 'motion/react'
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

const winnerCards = [
  {
    rank: '01',
    place: '1st place',
    team: 'Hash("FFT thi........n peace")={31.246390, 32.314090}',
    photo: '/drive/winners/1_framed.webp',
    tone: 'yellow',
  },
  {
    rank: '02',
    place: '2nd place',
    team: 'Birthday Paradox',
    photo: '/drive/winners/2_framed.webp',
    tone: 'pink',
  },
  {
    rank: '03',
    place: '3rd place',
    team: '7ad ba2a yemashinee mn hena',
    photo: '/drive/winners/tom08625_framed.webp',
    tone: 'yellow',
  },
  {
    rank: '04',
    place: '4th place',
    team: 'Old Frizzle Pro',
    photo: '/drive/winners/tom08623_framed.webp',
    tone: 'cyan',
  },
  {
    rank: '05',
    place: '5th place',
    team: 'One More Trie',
    photo: '/drive/winners/tom08621_framed.webp',
    tone: 'pink',
  },
]

const memoryPhotos = [
  { src: '/memories/tom08475.webp', alt: 'Students solving problems in the DCC arena', caption: 'The room gets quiet. The ideas get loud.' },
  { src: '/memories/tom08479.webp', alt: 'Mentors presenting at DCC', caption: 'Guidance and momentum.' },
  { src: '/memories/tom08485.webp', alt: 'DCC contest room and teams', caption: 'Pressure feels better together.' },
  { src: '/memories/tom08490.webp', alt: 'DCC team collaborating at their computer', caption: 'Three minds, one scoreboard.' },
  { src: '/memories/tom08498.webp', alt: 'Participants deep in discussion', caption: 'One keyboard. Three minds.' },
  { src: '/memories/tom08500.webp', alt: 'DCC participants working through challenges', caption: 'Every solution has a story.' },
  { src: '/memories/tom08502.webp', alt: 'Focused student coding under pressure', caption: 'Relentless focus.' },
  { src: '/memories/tom08504.webp', alt: 'Contest hall overview during competition', caption: 'Damietta showed up.' },
  { src: '/memories/tom08508.webp', alt: 'DCC team smiling at the camera', caption: 'A team behind every answer.' },
  { src: '/memories/tom08534.webp', alt: 'Mentor helping a team in the room', caption: 'Support when it counts.' },
  { src: '/memories/tom08535.webp', alt: 'Students celebrating a submission', caption: 'The moments between submissions.' },
  { src: '/memories/tom08545.webp', alt: 'Closing remarks and ceremony presentation', caption: 'Brains, heart, and a little chaos.' },
  { src: '/memories/tom08550.webp', alt: 'DCC participants and organizers on stage', caption: 'A community behind the contest.' },
  { src: '/memories/tom08552.webp', alt: 'Winners holding their prize cheques', caption: 'Celebrate the hard work.' },
  { src: '/memories/tom08568.webp', alt: 'Champion team celebration and trophies', caption: 'Moments worth keeping.' },
  { src: '/memories/tom08613.webp', alt: 'Final group photo of DCC 2026', caption: 'A shared finish line.' },
]

const allGalleryPhotos = [
  '/memories/tom08475.webp',
  '/memories/tom08479.webp',
  '/memories/tom08485.webp',
  '/memories/tom08490.webp',
  '/memories/tom08491.webp',
  '/memories/tom08492.webp',
  '/memories/tom08498.webp',
  '/memories/tom08500.webp',
  '/memories/tom08502.webp',
  '/memories/tom08504.webp',
  '/memories/tom08507.webp',
  '/memories/tom08508.webp',
  '/memories/tom08509.webp',
  '/memories/tom08522.webp',
  '/memories/tom08534.webp',
  '/memories/tom08535.webp',
  '/memories/tom08539.webp',
  '/memories/tom08544.webp',
  '/memories/tom08545.webp',
  '/memories/tom08547.webp',
  '/memories/tom08550.webp',
  '/memories/tom08551.webp',
  '/memories/tom08552.webp',
  '/memories/tom08553.webp',
  '/memories/tom08554.webp',
  '/memories/tom08568.webp',
  '/memories/tom08570.webp',
  '/memories/tom08573.webp',
  '/memories/tom08608.webp',
  '/memories/tom08609.webp',
  '/memories/tom08613.webp',
  '/memories/tom08615.webp',
  '/memories/tom08616.webp',
  '/memories/img_20260806_095718.webp',
  '/memories/img_20260806_100426.webp',
  '/memories/img_20260806_100504_633.webp',
  '/memories/img_20260806_125819.webp',
  '/memories/img_20260806_132006.webp',
  '/memories/img_20260806_154115.webp',
  '/memories/img_20260806_154204.webp',
  '/memories/whatsapp_image_2026_08_08_at_10_01_21_pm_1.webp',
  '/memories/whatsapp_image_2026_08_08_at_10_01_22_pm.webp',
  '/memories/whatsapp_image_2026_08_08_at_10_02_10_pm.webp',
]

const allTeamPhotos = [
  '/teams/2ed8d164-3347-4924-8d40-48020bc8897d.webp',
  '/teams/c1081t01.webp',
  '/teams/tom08516.webp',
  '/teams/tom08522.webp',
  '/teams/tom08523.webp',
  '/teams/tom08534.webp',
  '/teams/tom08535.webp',
  '/teams/tom08571.webp',
  '/teams/tom08572.webp',
  '/teams/tom08591.webp',
  '/teams/tom08592.webp',
  '/teams/tom08593.webp',
  '/teams/tom08594.webp',
  '/teams/tom08596.webp',
  '/teams/tom08600.webp',
  '/teams/tom08602.webp',
  '/teams/tom08604.webp',
  '/teams/tom08606.webp',
  '/teams/tom08610.webp',
  '/teams/tom08611.webp',
]

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
            <a href="/#results" onClick={() => setMenuOpen(false)}>2026 results</a>
            <a href="/#memories" onClick={() => setMenuOpen(false)}>Memories</a>
            <a href="/#partner" onClick={() => setMenuOpen(false)}>Partner</a>
            <a href="/#partner" className="nav-cta" onClick={() => setMenuOpen(false)}>Back DCC 2027 <span aria-hidden="true">↗</span></a>
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
        <div><i>06</i><code>  cout &lt;&lt; <em>"complete"</em>;</code></div>
        <div><i>07</i><code>  <strong>return</strong> <small>0</small>;</code></div>
        <div><i>08</i><code>{'}'}</code></div>
      </div>
      <div className="hero-code-status"><span /> chapter complete <time>DCC 2026</time></div>
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
          <div className="hero-date"><span aria-hidden="true">★</span> Damietta · Egypt · 2026 recap</div>
          <h1><span className="hero-title-white">Think fast.</span><span className="hero-title-pink">Build together.</span></h1>
          <div className="hero-speech">
            <p>DCC 2026 brought Damietta&apos;s university programmers into one room to solve under pressure, celebrate progress, and leave stronger together.</p>
          </div>
          <div className="hero-actions">
            <a href="#results" className="hero-button hero-button-primary">Meet the champions <span aria-hidden="true">↘</span></a>
            <a href="#partner" className="hero-button hero-button-secondary">Partner with DCC <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}


function MemoryLightbox({ photos, initialIndex = 0, title = '★ DCC 2026', onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(0)
  const thumbnailRefs = useRef([])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }, [currentIndex])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))
  }, [photos.length])

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))
  }, [photos.length])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext, onClose])

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 260 : -260,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 260 : -260,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Photo gallery lightbox"
      >
        <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
          <div className="lightbox-topbar">
            <div className="lightbox-meta">
              <span className="lightbox-badge">{title}</span>
              <span className="lightbox-counter">
                {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
              </span>
            </div>
            <button
              type="button"
              className="lightbox-close"
              onClick={onClose}
              aria-label="Close photo gallery"
            >
              <FaXmark />
            </button>
          </div>

          <div className="lightbox-stage">
            <button
              type="button"
              className="lightbox-nav-btn lightbox-nav-prev"
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              <FaChevronLeft />
            </button>

            <div className="lightbox-photo-wrapper">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_e, { offset, velocity }) => {
                    const swipe = offset.x
                    if (swipe < -40 || velocity.x < -300) {
                      handleNext()
                    } else if (swipe > 40 || velocity.x > 300) {
                      handlePrev()
                    }
                  }}
                  className="lightbox-card"
                >
                  <img
                    src={photos[currentIndex]}
                    alt={`${title} photo ${currentIndex + 1}`}
                    className="lightbox-img"
                    draggable="false"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="lightbox-nav-btn lightbox-nav-next"
              onClick={handleNext}
              aria-label="Next photo"
            >
              <FaChevronRight />
            </button>
          </div>

          <div className="lightbox-filmstrip-wrap">
            <div className="lightbox-filmstrip" role="tablist" aria-label="Photo thumbnails">
              {photos.map((src, idx) => {
                const thumbSrc = src.replace(/\/(memories|teams)\//, '/$1/thumbs/')
                return (
                  <button
                    key={src}
                    type="button"
                    ref={(el) => { thumbnailRefs.current[idx] = el }}
                    className={`lightbox-thumb ${idx === currentIndex ? 'is-active' : ''}`}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1)
                      setCurrentIndex(idx)
                    }}
                    aria-label={`Jump to photo ${idx + 1}`}
                  >
                    <img src={thumbSrc} alt="" width="120" height="80" loading="lazy" decoding="async" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function HomePage() {
  const [galleryModal, setGalleryModal] = useState({
    isOpen: false,
    photos: allGalleryPhotos,
    initialIndex: 0,
    title: '★ DCC 2026',
  })

  useEffect(() => {
    document.title = 'DCC 2026 — Results, memories, and the next chapter'
  }, [])

  const openGallery = (photos, initialIndex = 0, title = '★ DCC 2026') => {
    setGalleryModal({
      isOpen: true,
      photos,
      initialIndex,
      title,
    })
  }

  const closeGallery = () => {
    setGalleryModal((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <>
      <Hero />
      <section className="about-section section" id="about" data-od-id="about">
        <div className="container about-grid">
          <div className="about-copy">
            <p className="eyebrow"><strong>01 /</strong> About</p>
            <h2>Built for<br />problem solvers.</h2>
            <p>DCC is Damietta&apos;s competitive programming arena: a place for students, communities, and mentors to turn hard problems into shared momentum.</p>
            <a href="#results" className="about-action">See the impact <span aria-hidden="true">↗</span></a>
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
            <p className="eyebrow format-eyebrow"><strong>02 /</strong> The DCC journey</p>
            <div className="format-heading">
              <h2>Three phases.<br /><em>One shared arena.</em></h2>
              <div className="format-speech"><p>From sign-up to final scoreboard, every phase is built around learning, pressure, and people.</p></div>
            </div>
          </div>
          <div className="format-grid">
            <article className="phase-card phase-card-cyan">
              <span className="phase-index">01</span>
              <DeferredImage src="/steps_1.webp" alt="DCC registration and team preparation" width="900" height="900" />
            </article>
            <article className="phase-card phase-card-pink">
              <span className="phase-index">02</span>
              <DeferredImage src="/steps_2.webp" alt="DCC teams solving on the online round" width="1000" height="1000" />
            </article>
            <article className="phase-card phase-card-yellow">
              <span className="phase-index">03</span>
              <DeferredImage src="/steps_3.webp" alt="DCC finalists competing in Damietta" width="1000" height="1000" />
            </article>
            <div className="format-team-art" aria-hidden="true">
              <DeferredImage src="/steps_4.webp" alt="" width="1000" height="1000" />
            </div>
          </div>
        </div>
      </section>

      <section className="memories-section section" id="memories" data-od-id="memories">
        <div className="memories-dots" aria-hidden="true" />
        <div className="container memories-frame">
          <div className="memories-copy">
            <p className="eyebrow"><strong>07 /</strong> Memories</p>
            <h2>Memories<br /><em>that inspire.</em></h2>
            <div className="memories-speech">
              <p>Relive the moments, the energy, and the ideas that made DCC 2026 unforgettable — where 100+ contestants across 36+ teams came together to compete.</p>
            </div>
          </div>
          <div className="memory-frame-gallery">
            <div className="memory-collage" aria-label="DCC 2026 memory gallery">
              {memoryPhotos.slice(0, 16).map((photo, idx) => (
                <button
                  type="button"
                  className="memory-tile"
                  key={photo.src}
                  onClick={() => openGallery(allGalleryPhotos, idx, '★ DCC 2026 MEMORIES')}
                  aria-label={`View photo ${idx + 1} in gallery`}
                >
                  <DeferredImage src={photo.src.replace('/memories/', '/memories/thumbs/')} alt={photo.alt} width="400" height="260" />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="memory-collage-cta"
              onClick={() => openGallery(allGalleryPhotos, 0, '★ DCC 2026 MEMORIES')}
              aria-label="View all photos in memory gallery"
            >
              <span>View all photos</span>
              <b aria-hidden="true">↗</b>
            </button>
          </div>
        </div>
      </section>

      {galleryModal.isOpen && (
        <MemoryLightbox
          photos={galleryModal.photos}
          initialIndex={galleryModal.initialIndex}
          title={galleryModal.title}
          onClose={closeGallery}
        />
      )}

      <section className="results-section section" id="results" data-od-id="results">
        <div className="container winners-frame">
          <div className="winners-intro">
            <div className="winners-copy">
              <p className="eyebrow"><strong>08 /</strong> Top winners</p>
              <div className="champions-lockup">
                <h2 className="winners-title">
                  <span className="winners-title-white">Meet the</span>
                  <span className="winners-title-pink">champions!</span>
                </h2>
              </div>
            </div>
            <div className="winners-speech">
              <p>The top 5 teams who coded, collaborated, and conquered.</p>
            </div>
          </div>
          <div className="winners-board">
            <div className="winner-grid" aria-label="Top five DCC 2026 teams">
              {winnerCards.map((winner) => (
                <article className={`winner-card winner-card-${winner.tone}`} key={winner.rank}>
                  <div className="winner-rank">{winner.rank}</div>
                  <img src={winner.photo} alt={`${winner.place} team ${winner.team}`} width="1600" height="900" loading="eager" decoding="sync" />
                  <div className="winner-card-copy">
                    <span>Team</span>
                    <h3 title={winner.team}>{winner.team}</h3>
                    <b>{winner.place}</b>
                  </div>
                </article>
              ))}
            </div>
            <button
              type="button"
              className="winner-archive-link"
              onClick={() => openGallery(allTeamPhotos, 0, '★ DCC 2026 TEAMS')}
              aria-label="View all participating teams gallery"
            >
              View all participating teams <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </section>

      <section className="community-partners section" id="communities" data-od-id="communities">
        <div className="community-dots" aria-hidden="true" />
        <div className="container">
          <div className="community-heading">
            <div>
              <p className="eyebrow"><strong>09 /</strong> Community partners</p>
              <h2>Stronger<br /><em>together.</em></h2>
            </div>
            <p>Universities, ICPC communities, mentors, and volunteers turned one contest into a real local platform.</p>
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

      <section className="ready-section partner-section" id="partner" data-od-id="partner">
        <div className="container ready-composition">
          <div className="ready-copy-panel">
            <p className="eyebrow ready-kicker"><strong>11 /</strong> Partner with DCC</p>
            <h2>Back the next<br /><em>chapter.</em></h2>
            <p>Help us expand the room, reward more teams, and make DCC 2027 a bigger opportunity for Damietta&apos;s programmers.</p>
            <a href="mailto:damiettacc@gmail.com?subject=DCC%202027%20Sponsorship%20Inquiry" className="ready-button">Discuss sponsorship <span aria-hidden="true">↗</span></a>
          </div>
          <div className="ready-visual">
            <DeferredImage className="ready-art" src="/drive/partner-community.webp" alt="DCC participants, organizers, and winning teams gathered together after the 2026 competition" width="2200" height="1233" />
            <div className="ready-details">
              <div className="ready-detail">
                <span className="ready-icon" aria-hidden="true"><FaCalendarDays /></span>
                <div><small>Next edition</small><strong>DCC 2027 planning</strong></div>
              </div>
              <div className="ready-detail">
                <span className="ready-icon" aria-hidden="true"><FaLocationDot /></span>
                <div><small>Local impact</small><strong>Damietta, Egypt</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer" data-od-id="footer">
        <div className="victory-banner">
          <div className="container victory-grid">
            <h2>Back the<br /><em>next chapter.</em></h2>
            <div className="victory-copy"><p>DCC 2026 proved the room is ready.<br />Help us make the next one bigger.</p><a href="mailto:damiettacc@gmail.com?subject=DCC%202027%20Sponsorship%20Inquiry" className="victory-button">Talk sponsorship <span aria-hidden="true">↗</span></a></div>
          </div>
          <DeferredImage className="victory-art" src="/footer-trophy.webp" alt="DCC champion trophy" width="900" height="900" />
        </div>
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <div className="footer-identity"><DeferredImage src="/logo.svg" alt="DCC" width="150" height="77" /><span>DCC 2026 archive · Damietta, Egypt • <YousefPopover /></span></div>
            <div className="footer-socials" aria-label="Social media links">
              <a href="mailto:damiettacc@gmail.com" aria-label="Email DCC Sponsorship team"><FaEnvelope /></a>
              <a href="https://www.facebook.com/profile.php?id=61588726680610" target="_blank" rel="noreferrer" aria-label="DCC on Facebook"><FaFacebookF /></a>
            </div>
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
          <div className="closed-time-details">
            <div><span>Start time</span><strong>17:00 (05:00 PM)</strong><small>Cairo time</small></div>
            <div><span>Duration</span><strong>3 hours</strong><small>Ends at 20:00 (08:00 PM)</small></div>
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
