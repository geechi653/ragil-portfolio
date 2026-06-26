import { useEffect, useState } from 'react'

/** A faux terminal panel that types out a greeting, then idles with a cursor. */
const SCRIPT = [
  { prompt: 'ragil@portfolio:~$', cmd: 'whoami', out: 'Ragil Mammadov — Full-Stack Software Developer' },
  { prompt: 'ragil@portfolio:~$', cmd: 'cat status.txt', out: 'Open to interesting problems · Raleigh, NC' },
  { prompt: 'ragil@portfolio:~$', cmd: 'echo "Use ⌘K or the sidebar to explore →"', out: 'Use ⌘K or the sidebar to explore →' },
]

export default function Terminal({ onClose }: { onClose: () => void }) {
  const [typed, setTyped] = useState('')
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (step >= SCRIPT.length) {
      setDone(true)
      return
    }
    const full = SCRIPT[step].cmd
    if (typed.length < full.length) {
      const t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 38)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setStep((s) => s + 1)
      setTyped('')
    }, 650)
    return () => clearTimeout(t)
  }, [typed, step])

  return (
    <div className="terminal">
      <div className="terminal-head">
        <span className="terminal-tab">TERMINAL</span>
        <span className="terminal-shell">zsh — portfolio</span>
        <button className="terminal-x" onClick={onClose} aria-label="Close terminal">
          ×
        </button>
      </div>
      <div className="terminal-body">
        {SCRIPT.slice(0, step).map((l, i) => (
          <div key={i}>
            <div className="term-line">
              <span className="term-prompt">{l.prompt}</span> {l.cmd}
            </div>
            <div className="term-out">{l.out}</div>
          </div>
        ))}
        {step < SCRIPT.length && (
          <div className="term-line">
            <span className="term-prompt">{SCRIPT[step].prompt}</span> {typed}
            <span className="caret" />
          </div>
        )}
        {done && (
          <div className="term-line">
            <span className="term-prompt">ragil@portfolio:~$</span>
            <span className="caret" />
          </div>
        )}
      </div>
    </div>
  )
}
