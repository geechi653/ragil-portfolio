/** Shared theme helpers used across components. */

const EXT_COLORS: Record<string, string> = {
  tsx: '#58e1c3',
  ts: '#7c5cff',
  json: '#e3b341',
  md: '#79c0ff',
}

export const extColor = (ext: string) => EXT_COLORS[ext] ?? '#8b949e'
