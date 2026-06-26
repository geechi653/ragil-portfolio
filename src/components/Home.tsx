import { FILES, fileLabel } from '../sections'
import { extColor } from '../theme'
import { profile } from '../data/portfolio'

/** Shown when no file/tab is open — a VS Code–style welcome launcher. */
export default function Home({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="home">
      <div className="home-logo" aria-hidden>
        <span className="t-key">&lt;</span>
        <span className="t-var">/</span>
        <span className="t-fn">&gt;</span>
      </div>
      <h1 className="home-title">{profile.name}</h1>
      <p className="home-sub">{profile.role}</p>
      <p className="home-tag">{profile.tagline}</p>

      <div className="home-grid">
        {FILES.map((f) => (
          <button className="home-card" key={f.id} onClick={() => onOpen(f.id)}>
            <span className="file-dot" style={{ background: extColor(f.ext) }} />
            <span className="home-card-name">{fileLabel(f)}</span>
            <span className="home-card-lang">{f.lang}</span>
          </button>
        ))}
      </div>

      <p className="home-hint">
        Press <kbd>⌘K</kbd> to jump to any file
      </p>
    </div>
  )
}
