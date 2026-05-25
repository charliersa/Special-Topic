import { TweakRow } from './TweakRow'

/** 判斷顏色是否為淺色（決定勾號顏色） */
function isLight(hex) {
  const h = String(hex).replace('#', '')
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0')
  const n = parseInt(x.slice(0, 6), 16)
  if (Number.isNaN(n)) return true
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  return r * 299 + g * 587 + b * 114 > 148000
}

function CheckIcon({ light }) {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M3 7.2 5.8 10 11 4.2"
        fill="none" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
        stroke={light ? 'rgba(0,0,0,.78)' : '#fff'}
      />
    </svg>
  )
}

/**
 * TweakColor — 色板 / 調色盤選取器。
 * options 每個元素可以是單一 hex 字串，或 hex 字串陣列（調色盤）。
 * 沒有 options 時，退回 native color input。
 */
export function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input
          type="color"
          className="twk-swatch"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    )
  }

  const key = (o) => String(JSON.stringify(o)).toLowerCase()
  const cur = key(value)

  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o]
          const [hero, ...rest] = colors
          const sup = rest.slice(0, 4)
          const on = key(o) === cur
          return (
            <button
              key={i}
              type="button"
              className="twk-chip"
              role="radio"
              aria-checked={on}
              data-on={on ? '1' : '0'}
              aria-label={colors.join(', ')}
              title={colors.join(' · ')}
              style={{ background: hero }}
              onClick={() => onChange(o)}
            >
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <CheckIcon light={isLight(hero)} />}
            </button>
          )
        })}
      </div>
    </TweakRow>
  )
}
