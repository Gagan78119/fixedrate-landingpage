import { ArrowUpRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'

const plans = [
  {
    name: '30 Seconds',
    price: '1,000',
    note: 'A sharp cinematic introduction',
    features: ['AI-crafted video concept', '30-second final film', 'One platform-ready export'],
    tone: 'gold',
  },
  {
    name: '45 Seconds',
    price: '1,500',
    note: 'More story, more product detail',
    features: ['Everything in 30 seconds', 'Expanded narrative pacing', 'Two platform-ready exports'],
    tone: 'copper',
    popular: true,
  },
  {
    name: '60 Seconds',
    price: '2,000',
    note: 'A complete premium campaign film',
    features: ['Full cinematic ad story', 'Stronger brand world-building', 'Three platform-ready exports'],
    tone: 'olive',
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-section__intro">
        <span>Clear pricing. Premium output.</span>
        <h2>Choose the story<br />your brand needs.</h2>
        <p>Fixed pricing for polished AI cinematic ads—built for brands that value the result, not the discount.</p>
      </div>
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.name}
            className={`pricing-card pricing-card--${plan.tone} ${plan.popular ? 'pricing-card--popular' : ''}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pricing-card__head">
              <div>
                <span className="pricing-card__index">0{index + 1}</span>
                <h3>{plan.name}</h3>
              </div>
              {plan.popular && <span className="pricing-card__popular">Most chosen</span>}
            </div>
            <p>{plan.note}</p>
            <div className="pricing-card__price"><span>₹</span>{plan.price}<small> / video</small></div>
            <ul>
              {plan.features.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}
            </ul>
            <a href="#contact" className="pricing-card__button">Start this project <ArrowUpRight size={17} /></a>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
