import { useEffect, useState } from 'react'
import { FILES, fileLabel, type FileDef } from './sections'
import { extColor } from './theme'
import { profile } from './data/portfolio'
import CommandPalette from './components/CommandPalette'
import Terminal from './components/Terminal'
import Home from './components/Home'
import {
  FilesIcon,
  SearchIcon,
  GitIcon,
  MailIcon,
  TerminalIcon,
  CloseIcon,
  ChevronIcon,
  GithubIcon,
  LinkedInIcon,
  SunIcon,
  MoonIcon,
} from './components/Icons'

const DOT = ({ ext }: { ext: string }) => (
  <span className="file-dot" style={{ background: extColor(ext) }} />
)

type Theme = 'dark' | 'light'

const isFile = (raw: string) => FILES.some((f) => f.id === raw)

// ── Path-based routing (e.g. /projects). Home is "/". ─────────────────────
const idToPath = (id: string | null) => (id ? `/${id}` : '/')

const pathToId = (pathname: string): string | null => {
  const seg = pathname.replace(/^\/+/, '').split('/')[0]
  return isFile(seg) ? seg : null
}

// Resolve the file (or home) to show on first load, honouring legacy /#id links.
const resolveInitialId = (): string | null => {
  const fromPath = pathToId(window.location.pathname)
  if (fromPath) return fromPath
  const legacyHash = window.location.hash.replace('#', '')
  return isFile(legacyHash) ? legacyHash : null
}

const navigate = (id: string | null, replace = false) => {
  const path = idToPath(id) + window.location.search
  const same = window.location.pathname === idToPath(id) && !window.location.hash
  if (same && !replace) return
  window.history[replace ? 'replaceState' : 'pushState'](null, '', path)
}

export default function App() {
  const initial = resolveInitialId()

  const [activeId, setActiveId] = useState<string | null>(initial)
  const [openIds, setOpenIds] = useState<string[]>(initial ? [initial] : [])
  const [paletteOpen, setPaletteOpen] = useState(false)
  // Terminal is decorative; keep it closed by default on small screens.
  const [termOpen, setTermOpen] = useState(() => window.innerWidth > 640)
  const [navOpen, setNavOpen] = useState(false) // mobile explorer drawer
  const [theme, setTheme] = useState<Theme>(() => {
    const q = new URLSearchParams(window.location.search).get('theme')
    if (q === 'light' || q === 'dark') return q
    return (localStorage.getItem('theme') as Theme) || 'dark'
  })

  // Apply + persist the theme.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const open = (id: string) => {
    setActiveId(id)
    setOpenIds((ids) => (ids.includes(id) ? ids : [...ids, id]))
    setNavOpen(false)
    navigate(id)
  }

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const idx = openIds.indexOf(id)
    const next = openIds.filter((x) => x !== id)
    setOpenIds(next)
    if (id === activeId) {
      const nextActive = next.length ? next[Math.min(idx, next.length - 1)] : null
      setActiveId(nextActive)
      navigate(nextActive)
    }
  }

  // Normalise a legacy /#id URL to a clean path on first load.
  useEffect(() => {
    if (window.location.hash) navigate(initial, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync state with browser back/forward navigation.
  useEffect(() => {
    const onPop = () => {
      const id = pathToId(window.location.pathname)
      setActiveId(id)
      if (id) setOpenIds((ids) => (ids.includes(id) ? ids : [...ids, id]))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Global keyboard: ⌘K / Ctrl-K toggles the command palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const activeFile = activeId ? (FILES.find((f) => f.id === activeId) as FileDef) : null

  return (
    <div className="app">
      {/* Title bar */}
      <header className="titlebar">
        <div className="traffic">
          <span className="tl tl-red" />
          <span className="tl tl-amber" />
          <span className="tl tl-green" />
        </div>
        <div className="title-center">
          <span className="title-name">{profile.name}</span>
          <span className="title-sep">—</span>
          <span className="title-sub">Visual Portfolio</span>
        </div>
        <div className="title-actions">
          <button
            className="icon-btn"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </button>
          <button className="kbtn" onClick={() => setPaletteOpen(true)}>
            <SearchIcon size={13} />
            <span>Jump to…</span>
            <kbd>⌘K</kbd>
          </button>
        </div>
      </header>

      <div className="body">
        {/* Activity bar */}
        <nav className="activity">
          <button
            className="act is-active"
            title="Explorer"
            onClick={() => setNavOpen((v) => !v)}
          >
            <FilesIcon size={22} />
          </button>
          <button className="act" title="Search" onClick={() => setPaletteOpen(true)}>
            <SearchIcon size={22} />
          </button>
          <a className="act" title="GitHub" href={profile.github} target="_blank" rel="noreferrer">
            <GitIcon size={22} />
          </a>
          <a className="act" title="Email" href={`mailto:${profile.email}`}>
            <MailIcon size={22} />
          </a>
          <div className="act-spacer" />
          <a className="act" title="LinkedIn" href={profile.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon size={20} />
          </a>
          <a className="act" title="GitHub" href={profile.github} target="_blank" rel="noreferrer">
            <GithubIcon size={20} />
          </a>
        </nav>

        {/* Explorer / file tree */}
        <aside className={'explorer' + (navOpen ? ' is-open' : '')}>
          <div className="explorer-head">EXPLORER</div>
          <div className="tree-root">
            <ChevronIcon size={14} className="tree-caret" />
            <span>portfolio</span>
          </div>
          <ul className="tree">
            {FILES.map((f) => (
              <li
                key={f.id}
                className={'tree-item' + (f.id === activeId ? ' is-active' : '')}
                onClick={() => open(f.id)}
              >
                <DOT ext={f.ext} />
                <span>{fileLabel(f)}</span>
              </li>
            ))}
          </ul>
          <div className="explorer-foot">{profile.location}</div>
        </aside>
        {navOpen && <div className="scrim" onClick={() => setNavOpen(false)} />}

        {/* Editor column */}
        <main className="editor">
          {openIds.length > 0 && (
            <div className="tabs">
              {openIds.map((id) => {
                const f = FILES.find((x) => x.id === id) as FileDef
                return (
                  <div
                    key={id}
                    className={'tab' + (id === activeId ? ' is-active' : '')}
                    onClick={() => open(id)}
                  >
                    <DOT ext={f.ext} />
                    <span>{fileLabel(f)}</span>
                    <button
                      className="tab-x"
                      onClick={(e) => closeTab(id, e)}
                      aria-label="Close tab"
                    >
                      <CloseIcon size={12} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {activeFile ? (
            <>
              <div className="breadcrumb">
                portfolio <ChevronIcon size={12} /> <span>{fileLabel(activeFile)}</span>
              </div>
              <div className="editor-scroll">
                <div className="editor-content" key={activeFile.id}>
                  {activeFile.render()}
                </div>
              </div>
            </>
          ) : (
            <div className="editor-scroll">
              <Home onOpen={open} />
            </div>
          )}

          {termOpen && <Terminal onClose={() => setTermOpen(false)} />}
        </main>
      </div>

      {/* Status bar */}
      <footer className="statusbar">
        <div className="sb-left">
          <span className="sb-item sb-branch">
            <GitIcon size={13} /> main
          </span>
          <span className="sb-item">{activeFile ? activeFile.lang : 'Welcome'}</span>
          <button className="sb-item sb-btn" onClick={() => setTermOpen((v) => !v)}>
            <TerminalIcon size={13} /> {termOpen ? 'Hide' : 'Show'} terminal
          </button>
        </div>
        <div className="sb-right">
          <span className="sb-item">{profile.status}</span>
          <span className="sb-item">UTF-8</span>
          <span className="sb-item sb-accent">● Ready</span>
        </div>
      </footer>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onPick={open} />
    </div>
  )
}
