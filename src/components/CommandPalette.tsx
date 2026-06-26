import { useEffect, useRef, useState } from 'react'
import { FILES, fileLabel } from '../sections'
import { extColor } from '../theme'

type Props = {
  open: boolean
  onClose: () => void
  onPick: (id: string) => void
}

export default function CommandPalette({ open, onClose, onPick }: Props) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = FILES.filter((f) =>
    fileLabel(f).toLowerCase().includes(query.toLowerCase().trim()),
  )

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      // Focus after the element mounts/paints.
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  if (!open) return null

  const choose = (id?: string) => {
    if (id) onPick(id)
    onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(results[active]?.id)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div className="palette" onMouseDown={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="palette-input"
          placeholder="Go to file…  (try 'projects')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <ul className="palette-list">
          {results.map((f, i) => (
            <li
              key={f.id}
              className={'palette-item' + (i === active ? ' is-active' : '')}
              onMouseEnter={() => setActive(i)}
              onMouseDown={() => choose(f.id)}
            >
              <span className="dot" style={{ background: extColor(f.ext) }} />
              <span>{fileLabel(f)}</span>
              <span className="palette-lang">{f.lang}</span>
            </li>
          ))}
          {results.length === 0 && <li className="palette-empty">No matching files</li>}
        </ul>
      </div>
    </div>
  )
}
