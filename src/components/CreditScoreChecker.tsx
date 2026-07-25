import { useState, type ChangeEvent } from 'react'
import { soundFx } from '../lib/AudioHaptics'
import { ShieldCheck, TrendingUp, Zap, CheckCircle2, Lock } from 'lucide-react'

interface CreditScoreCheckerProps {
  onOpenModal: () => void
}

export function CreditScoreChecker({ onOpenModal }: CreditScoreCheckerProps) {
  const [score, setScore] = useState<number>(785)

  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value)
    if (Math.abs(val - score) > 5) {
      soundFx.playScoreTick(val)
    }
    setScore(val)
  }

  // Calculate tier status
  const getTier = (s: number) => {
    if (s >= 750) {
      return {
        label: 'EXCELLENT',
        status: 'ELIGIBLE FOR OBSIDIAN CLUB',
        color: '#00e599',
        cashback: 'Up to ₹15,000/yr',
        rate: '7.8% APY',
      }
    } else if (s >= 680) {
      return {
        label: 'GOOD',
        status: 'ELIGIBLE FOR GOLD TIER',
        color: '#fbbf24',
        cashback: 'Up to ₹8,000/yr',
        rate: '6.5% APY',
      }
    } else {
      return {
        label: 'BUILDING',
        status: 'SCORE BOOST REQUIRED',
        color: '#f87171',
        cashback: 'Up to ₹2,500/yr',
        rate: '5.0% APY',
      }
    }
  }

  const tier = getTier(score)

  // Circular gauge math
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const normalizedScore = (score - 300) / 600 // 0 to 1
  const strokeDashoffset = circumference - normalizedScore * circumference

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-20">
      <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl shadow-2xl">
        {/* Glow background accent */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20 transition-colors duration-500"
          style={{ backgroundColor: tier.color }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: Interactive Meter */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* SVG Ring Gauge */}
              <svg className="w-full h-full -rotate-90 transform">
                {/* Background Ring */}
                <circle
                  cx="128"
                  cy="128"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="14"
                  fill="transparent"
                />
                {/* Score Progress Ring */}
                <circle
                  cx="128"
                  cy="128"
                  r={radius}
                  stroke={tier.color}
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-300 ease-out"
                />
              </svg>

              {/* Center Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
                  CRIF HIGH MARK
                </span>
                <span className="text-5xl font-serif font-bold text-white tracking-tight">
                  {score}
                </span>
                <span
                  className="text-xs font-mono font-semibold tracking-wider mt-1 px-2.5 py-0.5 rounded-full border border-white/10"
                  style={{ color: tier.color, borderColor: `${tier.color}40` }}
                >
                  {tier.label}
                </span>
              </div>
            </div>

            {/* Score Slider Control */}
            <div className="w-full max-w-sm mt-6">
              <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>300 (Min)</span>
                <span>Test Your Score</span>
                <span>900 (Max)</span>
              </div>
              <input
                type="range"
                min="300"
                max="900"
                value={score}
                onChange={handleScoreChange}
                className="w-full accent-white cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
              />
            </div>
          </div>

          {/* Right Column: Status & Benefits */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
              <Zap className="w-4 h-4" /> INSTANT SCORE SIMULATOR
            </div>

            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
              check your eligibility for the club.
            </h3>

            <p className="text-zinc-400 text-sm md:text-base mb-6 leading-relaxed">
              CRED only accepts members with a credit score above 750. Maintain your score to unlock exclusive rewards, zero forex cards, and high-yield returns.
            </p>

            {/* Unlocked Benefits List */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-white/10">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs md:text-sm font-medium text-white">Status Assessment</span>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-400">{tier.status}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-white/10">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  <span className="text-xs md:text-sm font-medium text-white">Annual Rewards Estimate</span>
                </div>
                <span className="text-xs font-mono font-semibold text-white">{tier.cashback}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-white/10">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs md:text-sm font-medium text-white">CRED Stash APY</span>
                </div>
                <span className="text-xs font-mono font-semibold text-cyan-400">{tier.rate}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                soundFx.playClick()
                onOpenModal()
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold text-sm uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              {score >= 750 ? (
                <>
                  <ShieldCheck className="w-4 h-4" /> Claim Your Membership Now
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Unlock Score Booster Program
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
