import { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowUpRight,
  MoveRight,
} from 'lucide-react'
import image1 from './assets/image1.jpg'
import image2 from './assets/image2.jpg'
import image3 from './assets/image3.jpg'
import demoImage1 from './assets/demo img1.jpg'
import demoImage2 from './assets/demo img2.png'
import demoImage3 from './assets/demo img3.jpg'
import PricingSection from './components/PricingSection'
import aiads from './assets/aiadsimg.png'
import digitalMarketing from './assets/digitalmarketing.jpg'
import socialMedia from './assets/Socialmedia.jpg'
import logo from './assets/FIXED RATE LOGO.png'
import './App.css'

type Service = {
  title: string
  description: string
  label: string
  accent: string
  image: string
  deliverables: string[]
}

const navigation = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const featuredWorks = [
  { title: 'Sparkling launch film', type: 'Product campaign', tag: 'Cinematic', image: demoImage1 },
  { title: 'Creator-first social series', type: 'Social content', tag: 'Organic', image: demoImage2 },
  { title: 'Street-level product story', type: 'Brand introduction', tag: 'Performance', image: demoImage3 },
]

const services: Service[] = [
  {
    title: 'AI Cinematic Advertising',
    description: 'Premium AI-generated advertisements that turn your product, service, or story into a cinematic experience.',
    label: '01',
    accent: 'Gold',
    image: aiads,
    deliverables: ['Concept & script direction', 'Cinematic ad production', 'Launch-ready cutdowns'],
  },
  {
    title: 'Digital Marketing',
    description: 'Growth-focused campaigns designed to connect creative decisions with commercial momentum.',
    label: '02',
    accent: 'Copper',
    image: digitalMarketing,
    deliverables: ['Paid campaign strategy', 'Conversion-led creative', 'Reporting & iteration'],
  },
  {
    title: 'Social Media Management',
    description: 'Professional social content that gives your brand a consistent, confident presence everywhere it matters.',
    label: '03',
    accent: 'Olive',
    image: socialMedia,
    deliverables: ['Content direction', 'Reels & short-form edits', 'Platform-ready publishing'],
  },
]

export default function App() {
  const { scrollYProgress } = useScroll()

  const heroShift = useTransform(scrollYProgress, [0, 0.35], [0, -80])
  const heroFade = useTransform(scrollYProgress, [0, 0.28], [1, 0.35])
  const heroScale = useTransform(scrollYProgress, [0, 0.28], [1, 0.97])
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <div className="site-shell">
      <motion.div
        className="page-load-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      <header className="site-header">
        <a href="#top" className="brand-mark" aria-label="FIXEDRATE home">
          <img src={logo} alt="FIXEDRATE" className="brand-mark__logo" />
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="#contact" className="magnetic-button magnetic-button--solid header-cta">
            <span>Book a Call</span>
            <ArrowUpRight className="icon-arrow" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-backdrop">
            <div className="hero-backdrop__light hero-backdrop__light--gold" />
            <div className="hero-backdrop__light hero-backdrop__light--olive" />
            <div className="hero-backdrop__grid" />
          </div>

          <motion.div className="hero-inner hero-inner--centred" style={{ y: heroShift, opacity: heroFade, scale: heroScale }}>
            <div className="hero-copy hero-copy--centred">
              <motion.div className="eyebrow-pill" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Premium Online Creative Agency</motion.div>
              <motion.h1 className="hero-title" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
                AI Cinematic <span className="headline-media"><img src={image1} alt="Cinematic product advertisement" /></span> Ads
                <span>for Ambitious Businesses</span>
              </motion.h1>
              <motion.p className="hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}>We create premium AI cinematic advertisements, digital marketing campaigns, and social media content that help ambitious businesses build trust, stand out, and grow.</motion.p>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}>
                <a href="#contact" className="magnetic-button magnetic-button--solid"><span>Book a Call</span><MoveRight className="icon-arrow" /></a>
                <a href="#work" className="magnetic-button magnetic-button--outline"><span>View Our Work</span><ArrowUpRight className="icon-arrow" /></a>
              </motion.div>
            </div>
            <motion.div className="hero-gallery" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} aria-hidden="true">
              <div className="hero-gallery__tile hero-gallery__tile--one"><img src={image2} alt="" /></div>
              <div className="hero-gallery__tile hero-gallery__tile--two"><img src={image1} alt="" /></div>
              <div className="hero-gallery__tile hero-gallery__tile--three"><img src={image3} alt="" /></div>
            </motion.div>
          </motion.div>
        </section>

        <section id="work" className="works-section">
          <div className="works-section__inner">
            <div className="works-heading">
              <span>Selected work</span>
              <h2>Creative made to move<br /><em>business forward.</em></h2>
              <p>Three ways FIXEDRATE turns an idea into audience attention, brand trust, and measurable momentum.</p>
            </div>
            <div className="works-stage">
              {featuredWorks.map((work, index) => (
                <motion.article key={work.title} className={`work-panel work-panel--${index + 1}`} initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -18, scale: 1.025 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}>
                  <img src={work.image} alt={work.title} />
                  <div className="work-panel__shade" />
                  <div className="work-panel__top"><span>FIXEDRATE</span><span>{work.type}</span></div>
                  <div className="work-panel__copy"><span>{work.tag}</span><h3>{work.title}</h3><ArrowUpRight size={19} /></div>
                  <span className="work-panel__tag">{work.tag}</span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="services-section__intro">
            <span className="section-label">What we do</span>
            <h2>Creative systems built<br />for attention and action.</h2>
            <p>Every FIXEDRATE service is designed to make the brand clearer, the content stronger, and the next move easier to see.</p>
          </div>
          <div className="services-stories">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className={`service-story service-story--${service.accent.toLowerCase()} ${index % 2 ? 'service-story--reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
              >
                <div className="service-story__visual">
                  <img src={service.image} alt="" />
                  <span className="service-story__number">{service.label}</span>
                  <span className="service-story__visual-label">FIXEDRATE / {service.accent}</span>
                </div>
                <div className="service-story__content">
                  <span className="service-story__eyebrow">{service.accent} service</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.deliverables.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <a href="#contact" className="service-story__link">Explore this service <ArrowUpRight size={17} /></a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <PricingSection />
      </main>

      <footer id="contact" className="premium-footer">
        <div className="premium-footer__container">
          {/* Gradient glows */}
          <div className="premium-footer__glow premium-footer__glow--gold" />
          <div className="premium-footer__glow premium-footer__glow--copper" />
          <div className="premium-footer__glow premium-footer__glow--olive" />
      
          {/* Top CTA Section */}
          <div className="premium-footer__top">
            <div className="premium-footer__cta">
              <h2 className="premium-footer__heading">Let's Build<br />Your Brand</h2>
              <p className="premium-footer__subtext">Premium cinematic advertising and creative systems designed to make ambitious brands impossible to ignore.</p>
              <a href="mailto:hello@fixedrate.studio" className="premium-footer__button">
                <span>Start Your Project</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
      
            {/* Navigation Columns */}
            <div className="premium-footer__nav">
              <div className="premium-footer__nav-col">
                <span className="premium-footer__nav-title">Services</span>
                <a href="#services">AI Cinematic Ads</a>
                <a href="#services">Digital Marketing</a>
                <a href="#services">Social Media</a>
              </div>
              <div className="premium-footer__nav-col">
                <span className="premium-footer__nav-title">Company</span>
                <a href="#work">Portfolio</a>
                <a href="#pricing">Pricing</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="premium-footer__nav-col">
                <span className="premium-footer__nav-title">Connect</span>
                <a href="mailto:hello@fixedrate.studio">hello@fixedrate.studio</a>
                <a href="#top">Instagram</a>
                <a href="#top">LinkedIn</a>
              </div>
            </div>
          </div>
      
          {/* Bottom bar */}
          <div className="premium-footer__bottom">
            <span className="premium-footer__copy">© {year} FIXEDRATE. All rights reserved.</span>
            <div className="premium-footer__socials">
              <a href="#top" aria-label="Instagram" className="premium-footer__social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2"/></svg>
              </a>
              <a href="#top" aria-label="LinkedIn" className="premium-footer__social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="mailto:hello@fixedrate.studio" aria-label="Email" className="premium-footer__social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
            <span className="premium-footer__tagline">Designed for ambitious brands</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
