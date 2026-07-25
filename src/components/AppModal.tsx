import { useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { soundFx } from '../lib/AudioHaptics'
import { X, ShieldCheck, Check, QrCode, Sparkles, ArrowRight } from 'lucide-react'

interface AppModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AppModal({ isOpen, onClose }: AppModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('Alex Rivera')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setProgress(0)
      setPhone('')
    }
  }, [isOpen])

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handlePhoneSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!phone || phone.length < 8) return
    soundFx.playClick()
    setStep(2)

    // Simulate verification progress
    let p = 0
    const interval = setInterval(() => {
      p += 15
      setProgress(Math.min(p, 100))
      if (p >= 100) {
        clearInterval(interval)
        soundFx.playCardFlip()
        setStep(3)
      }
    }, 250)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundFx.playClick()
              onClose()
            }}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* STEP 1: Phone Verification */}
          {step === 1 && (
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                MEMBERS-ONLY CLUB
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1 mb-2">
                apply for CRED membership.
              </h3>

              <p className="text-zinc-400 text-xs sm:text-sm mb-6">
                Enter your mobile number linked to your credit cards to run a instant soft score check.
              </p>

              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-mono text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl py-3.5 pl-14 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Full Name (as per PAN)
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl py-3.5 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  Verify Credit Score <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-zinc-500 text-center font-mono mt-3">
                  Soft check will not impact your CRIF/Experian credit score.
                </p>
              </form>
            </div>
          )}

          {/* STEP 2: Eligibility Scan */}
          {step === 2 && (
            <div className="py-8 text-center">
              <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-white/10 border-t-white animate-spin" />
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-serif text-white mb-2">scanning credit registries...</h3>
              <p className="text-xs font-mono text-zinc-400 mb-6">
                Querying Experian & CRIF High Mark databases for {phone}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-white/10">
                <div
                  className="bg-white h-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 text-right text-xs font-mono text-zinc-500">{progress}%</div>
            </div>
          )}

          {/* STEP 3: Virtual Member Pass Pass */}
          {step === 3 && (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <Check className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-serif text-white mb-1">welcome to CRED.</h3>
              <p className="text-xs text-zinc-400 mb-6 font-mono">
                SCORE APPROVED: 792 / 900 • OBSIDIAN TIER
              </p>

              {/* Virtual Member Pass Graphic */}
              <div className="w-full aspect-[1.6/1] bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/20 rounded-2xl p-5 text-left relative overflow-hidden mb-6 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-serif text-lg font-bold text-white tracking-wider">CRED</span>
                    <div className="text-[9px] font-mono text-zinc-400">MEMBER PASS</div>
                  </div>
                  <QrCode className="w-10 h-10 text-white/80" />
                </div>

                <div className="mt-8">
                  <div className="text-xs font-mono text-zinc-400 uppercase">MEMBER ID</div>
                  <div className="text-sm font-mono tracking-widest text-white">
                    CRD-8829-9920
                  </div>
                  <div className="text-base font-semibold text-white mt-2 capitalize">{name}</div>
                </div>

                <div className="absolute bottom-3 right-4 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> VERIFIED MEMBER
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick()
                  onClose()
                }}
                className="w-full py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Access Dashboard
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
