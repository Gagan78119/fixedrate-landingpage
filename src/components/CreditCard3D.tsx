import { useState, useRef, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { soundFx } from '../lib/AudioHaptics'
import { ShieldCheck, Wifi, Sparkles, Award } from 'lucide-react'

type CardVariant = 'obsidian' | 'gold' | 'emerald' | 'platinum'

interface CardInfo {
  id: CardVariant
  name: string
  subtitle: string
  bgGradient: string
  borderGlow: string
  accentColor: string
  perks: string[]
}

const CARDS: CardInfo[] = [
  {
    id: 'obsidian',
    name: 'CRED Obsidian Reserve',
    subtitle: 'Crafted from black titanium',
    bgGradient: 'linear-gradient(135deg, #18181c 0%, #09090b 50%, #1f1f26 100%)',
    borderGlow: 'rgba(255, 255, 255, 0.25)',
    accentColor: '#ffffff',
    perks: ['0% Foreign Exchange Mark-up', '10x Rewards on Luxury Spends', 'Global VIP Concierge 24/7', 'Unlimited Airport Lounge Access'],
  },
  {
    id: 'gold',
    name: 'CRED Gold Metal Edition',
    subtitle: 'Solid 24k brushed gold core',
    bgGradient: 'linear-gradient(135deg, #3d2f11 0%, #171206 40%, #523f16 100%)',
    borderGlow: 'rgba(234, 179, 8, 0.4)',
    accentColor: '#fbbf24',
    perks: ['Instant Cashbacks on Bills', 'Dining Privileges at 500+ Top Restaurants', 'Exclusive Minted Coins', 'Zero Annual Maintenance Fee'],
  },
  {
    id: 'emerald',
    name: 'CRED Emerald Metal',
    subtitle: 'Limited edition sapphire finish',
    bgGradient: 'linear-gradient(135deg, #062b1e 0%, #02120c 45%, #0d4230 100%)',
    borderGlow: 'rgba(16, 185, 129, 0.4)',
    accentColor: '#34d399',
    perks: ['100% Bill Protection Warranty', 'High-Yield Stash Returns up to 7.8%', 'Private Flight Booking Upgrades', 'Zero Hidden Processing Charges'],
  },
  {
    id: 'platinum',
    name: 'CRED RuPay Select',
    subtitle: 'UPI Credit Card with zero charge',
    bgGradient: 'linear-gradient(135deg, #27272a 0%, #09090b 60%, #3f3f46 100%)',
    borderGlow: 'rgba(192, 132, 252, 0.35)',
    accentColor: '#c084fc',
    perks: ['Scan & Pay Anywhere via UPI', 'Instant 3% Cashback on Every Tap', 'Airport Lounge Access Included', 'Instant Credit Limit Boost'],
  },
]

export function CreditCard3D() {
  const [selectedCard, setSelectedCard] = useState<CardVariant>('obsidian')
  const [isFlipped, setIsFlipped] = useState(false)
  const [rotX, setRotX] = useState(0)
  const [rotY, setRotY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const card = CARDS.find((c) => c.id === selectedCard) || CARDS[0]

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rX = ((y - centerY) / centerY) * -14
    const rY = ((x - centerX) / centerX) * 14

    setRotX(rX)
    setRotY(rY)
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })
  }

  const handleMouseLeave = () => {
    setRotX(0)
    setRotY(0)
    setGlarePos({ x: 50, y: 50 })
  }

  const selectVariant = (variant: CardVariant) => {
    soundFx.playCardFlip()
    setSelectedCard(variant)
  }

  const toggleFlip = () => {
    soundFx.playCardFlip()
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono tracking-widest text-white/70 uppercase mb-3">
          <Award className="w-3.5 h-3.5 text-white" /> Members Privilege Card
        </div>
        <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-white mb-3">
          feel the weight of membership.
        </h2>
        <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto">
          Crafted with heavy-gauge anodized metals, precision laser engraving, and zero annual compromises.
        </p>
      </div>

      {/* Card Selector Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CARDS.map((c) => {
          const active = c.id === selectedCard
          return (
            <button
              key={c.id}
              onClick={() => selectVariant(c.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
                active
                  ? 'border-white bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {c.name.split(' ')[1] || c.name}
            </button>
          )
        })}
      </div>

      {/* 3D Metal Card Display */}
      <div
        className="perspective-1000 w-full max-w-md aspect-[1.586/1] cursor-pointer mb-12 relative group"
        onClick={toggleFlip}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={cardRef}
          className="w-full h-full relative rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition-transform duration-100 ease-out border overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY + (isFlipped ? 180 : 0)}deg)`,
            background: card.bgGradient,
            borderColor: card.borderGlow,
          }}
        >
          {/* Metallic Sheen Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
            }}
          />

          {/* Micro Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* FRONT OF CARD */}
          {!isFlipped ? (
            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center bg-black/40">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-serif tracking-widest text-lg font-bold text-white uppercase">
                    CRED
                  </span>
                </div>
                <Wifi className="w-6 h-6 text-white/60 rotate-90" />
              </div>

              {/* EMV Chip */}
              <div className="my-auto flex items-center gap-4">
                <div className="w-12 h-9 rounded-md bg-gradient-to-tr from-amber-200 via-yellow-400 to-amber-600 p-[1px] shadow-inner relative overflow-hidden">
                  <div className="w-full h-full bg-yellow-500/20 border border-yellow-800/40 rounded-[5px] grid grid-cols-2 gap-1 p-1">
                    <div className="border-r border-b border-yellow-800/40" />
                    <div className="border-b border-yellow-800/40" />
                    <div className="border-r border-yellow-800/40" />
                    <div />
                  </div>
                </div>
                <span className="text-xs font-mono tracking-widest text-zinc-400">METAL CORE</span>
              </div>

              {/* Footer Details */}
              <div>
                <div className="text-lg md:text-xl font-mono tracking-[0.25em] text-white/90 mb-3 shadow-sm">
                  4532 •••• •••• 8892
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">MEMBER NAME</div>
                    <div className="text-sm font-semibold tracking-wide text-white uppercase">
                      CRED MEMBER
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">VALID THRU</div>
                    <div className="text-xs font-mono text-white/80">12/30</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* BACK OF CARD */
            <div className="relative z-10 h-full flex flex-col justify-between [transform:rotateY(180deg)]">
              {/* Magnetic Strip */}
              <div className="-mx-6 -mt-2 h-10 bg-zinc-950 border-y border-white/10" />

              {/* Signature Strip */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-9 bg-zinc-800/90 rounded border border-white/10 flex items-center px-3 text-zinc-400 text-xs font-mono italic">
                  Authorized Signature
                </div>
                <div className="w-12 h-9 bg-white text-black font-mono font-bold flex items-center justify-center text-xs rounded">
                  892
                </div>
              </div>

              {/* Security & Issuer Text */}
              <div className="text-[9px] font-mono text-zinc-500 leading-tight">
                This card is property of CRED Club. Issued for eligible members upon score verification.
                Complies with PCI-DSS 256-bit encryption standard.
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Card Perks Grid */}
      <div className="w-full max-w-2xl bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div>
            <h3 className="text-lg font-serif text-white">{card.name}</h3>
            <p className="text-xs text-zinc-400">{card.subtitle}</p>
          </div>
          <span
            className="text-xs font-mono uppercase px-3 py-1 rounded-full border border-white/10"
            style={{ color: card.accentColor, borderColor: `${card.accentColor}40` }}
          >
            ACTIVE TIER
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {card.perks.map((perk, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
              <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: card.accentColor }} />
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
