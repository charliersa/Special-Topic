import { useState, useRef, useEffect, useCallback } from 'react'
import '../../styles/tweaks.css'

const PAD = 16

/**
 * TweaksPanel — 可拖曳的浮動設定面板。
 *
 * 支援 host 協定：
 *   接收: __activate_edit_mode / __deactivate_edit_mode
 *   發送: __edit_mode_available / __edit_mode_dismissed
 */
export function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = useState(false)
  const dragRef = useRef(null)
  const offsetRef = useRef({ x: PAD, y: PAD })

  const clampToViewport = useCallback(() => {
    const panel = dragRef.current
    if (!panel) return
    const w = panel.offsetWidth, h = panel.offsetHeight
    const maxRight  = Math.max(PAD, window.innerWidth  - w - PAD)
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD)
    offsetRef.current = {
      x: Math.min(maxRight,  Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    }
    panel.style.right  = offsetRef.current.x + 'px'
    panel.style.bottom = offsetRef.current.y + 'px'
  }, [])

  // 開啟時夾緊視窗範圍
  useEffect(() => {
    if (!open) return
    clampToViewport()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport)
      return () => window.removeEventListener('resize', clampToViewport)
    }
    const ro = new ResizeObserver(clampToViewport)
    ro.observe(document.documentElement)
    return () => ro.disconnect()
  }, [open, clampToViewport])

  // host 協定監聽
  useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type
      if (t === '__activate_edit_mode')   setOpen(true)
      else if (t === '__deactivate_edit_mode') setOpen(false)
    }
    window.addEventListener('message', onMsg)
    window.parent.postMessage({ type: '__edit_mode_available' }, '*')
    return () => window.removeEventListener('message', onMsg)
  }, [])

  const dismiss = () => {
    setOpen(false)
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*')
  }

  const onDragStart = (e) => {
    const panel = dragRef.current
    if (!panel) return
    const r = panel.getBoundingClientRect()
    const sx = e.clientX, sy = e.clientY
    const startRight  = window.innerWidth  - r.right
    const startBottom = window.innerHeight - r.bottom
    const move = (ev) => {
      offsetRef.current = {
        x: startRight  - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      }
      clampToViewport()
    }
    const up = () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  if (!open) return null

  return (
    <div
      ref={dragRef}
      className="twk-panel"
      data-omelette-chrome=""
      style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}
    >
      <div className="twk-hd" onMouseDown={onDragStart}>
        <b>{title}</b>
        <button
          className="twk-x"
          aria-label="Close tweaks"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={dismiss}
        >
          ✕
        </button>
      </div>
      <div className="twk-body">
        {children}
      </div>
    </div>
  )
}
