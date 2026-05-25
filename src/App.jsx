import { useState, useEffect, useRef, useMemo } from 'react'

import { POSTERS, DEFAULTS, BG } from './data'
import { useTweaks }             from './hooks/useTweaks'

import { Masthead }       from './components/Masthead'
import { ScrollGallery }  from './components/ScrollGallery'
import { Footbar }        from './components/Footbar'

import {
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakSlider,
  TweakToggle,
} from './components/tweaks'

export default function App() {
  const [tweaks, setTweak] = useTweaks(DEFAULTS)
  const bg = BG[tweaks.background] || BG.paper

  const scrollRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [active,   setActive]   = useState(0)

  // ── 進度條 + 焦點海報 ──────────────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth
      setProgress(max <= 0 ? 0 : el.scrollLeft / max)

      const cx = el.scrollLeft + el.clientWidth / 2
      const items = el.querySelectorAll('.poster')
      let best = 0, bestD = Infinity
      items.forEach((node, i) => {
        const c = node.offsetLeft + node.offsetWidth / 2
        const d = Math.abs(c - cx)
        if (d < bestD) { bestD = d; best = i }
      })
      setActive(best)
    }
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [tweaks.layout, tweaks.size, tweaks.gap])

  // ── 鍵盤控制 ───────────────────────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onKey = (e) => {
      const step = el.clientWidth * 0.7
      if (e.key === 'ArrowRight') el.scrollBy({ left:  step, behavior: 'smooth' })
      if (e.key === 'ArrowLeft')  el.scrollBy({ left: -step, behavior: 'smooth' })
      if (e.key === 'Home') el.scrollTo({ left: 0,              behavior: 'smooth' })
      if (e.key === 'End')  el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // ── 捲動控制函式 ────────────────────────────────────────────────
  const nudge = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' })
  }

  const jumpTo = (i) => {
    const el = scrollRef.current
    if (!el) return
    const items = el.querySelectorAll('.poster')
    const node = items[i]
    if (!node) return
    el.scrollTo({ left: node.offsetLeft - (el.clientWidth - node.offsetWidth) / 2, behavior: 'smooth' })
  }

  const seekTo = (ratio) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: ratio * (el.scrollWidth - el.clientWidth), behavior: 'smooth' })
  }

  // ── 版面高度計算 ────────────────────────────────────────────────
  const baseH = tweaks.size
  const heights = useMemo(() => {
    if (tweaks.layout === 'uniform') return POSTERS.map(() => baseH)
    if (tweaks.layout === 'cinematic') {
      return POSTERS.map((_, i) =>
        i % 3 === 0 ? Math.min(92, baseH + 12)
        : i % 3 === 1 ? baseH
        : baseH - 10
      )
    }
    // rhythm: 溫和波浪
    return POSTERS.map((_, i) => {
      const wave = Math.sin(i * 0.9) * 6 + Math.sin(i * 0.31) * 4
      return Math.max(54, Math.min(90, baseH + wave))
    })
  }, [tweaks.layout, baseH])

  // ── CSS 自訂屬性（主題色） ──────────────────────────────────────
  const themeVars = {
    '--ink':  bg.ink,
    '--sub':  bg.sub,
    '--rule': bg.rule,
    '--chip': bg.chip,
  }

  return (
    <div
      className="app"
      style={{ background: bg.body, color: bg.ink, ...themeVars }}
    >
      {/* 材質疊層 */}
      <div className="grain" />
      {tweaks.background === 'paper' && <div className="paper-fibers" />}
      {tweaks.background === 'ink'   && <div className="ink-wash" />}

      {/* 頁首 */}
      <Masthead active={active} total={POSTERS.length} />

      {/* 橫向長卷 */}
      <ScrollGallery
        scrollRef={scrollRef}
        heights={heights}
        active={active}
        tweaks={tweaks}
        onJumpTo={jumpTo}
      />

      {/* 頁尾控制列 */}
      <Footbar
        progress={progress}
        active={active}
        total={POSTERS.length}
        onNudge={nudge}
        onJumpTo={jumpTo}
        onSeek={seekTo}
      />

      {/* Tweaks 浮動面板 */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="畫面" />
        <TweakRadio
          label="背景"
          value={tweaks.background}
          options={[
            { value: 'paper', label: '宣紙' },
            { value: 'ink',   label: '水墨' },
            { value: 'dark',  label: '暗墨' },
          ]}
          onChange={(v) => setTweak('background', v)}
        />
        <TweakRadio
          label="排列"
          value={tweaks.layout}
          options={[
            { value: 'uniform',   label: '齊整' },
            { value: 'rhythm',    label: '律動' },
            { value: 'cinematic', label: '戲劇' },
          ]}
          onChange={(v) => setTweak('layout', v)}
        />
        <TweakSection label="尺寸" />
        <TweakSlider
          label="圖片高度"
          value={tweaks.size}
          min={50} max={92} step={1} unit="vh"
          onChange={(v) => setTweak('size', v)}
        />
        <TweakSlider
          label="間距"
          value={tweaks.gap}
          min={16} max={140} step={4} unit="px"
          onChange={(v) => setTweak('gap', v)}
        />
        <TweakSection label="細節" />
        <TweakToggle
          label="顯示說明文字"
          value={tweaks.showCaptions}
          onChange={(v) => setTweak('showCaptions', v)}
        />
        <TweakToggle
          label="顯示外框"
          value={tweaks.showFrames}
          onChange={(v) => setTweak('showFrames', v)}
        />
      </TweaksPanel>
    </div>
  )
}
