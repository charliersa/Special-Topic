import { useEffect, useRef } from 'react'
import { POSTERS, GROUP_META } from '../data'
import { PosterCard } from './PosterCard'

/**
 * ScrollGallery — 橫向捲動長卷主區域
 *
 * 功能：
 *   - 滾輪轉橫向捲動
 *   - 拖曳 / 觸控捲動
 *   - 章節分隔章節標記
 *   - 尾頁「終」印章
 */
export function ScrollGallery({
  scrollRef,
  heights,
  active,
  tweaks,
  onJumpTo,
}) {
  // 滾輪轉橫向
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [scrollRef])

  // 拖曳 / 觸控
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let isDown = false, startX = 0, startScroll = 0
    const down = (e) => {
      if (e.target.closest('button, a, .twk-panel, input')) return
      isDown = true
      el.classList.add('dragging')
      startX = (e.touches?.[0]?.pageX ?? e.pageX) - el.offsetLeft
      startScroll = el.scrollLeft
    }
    const move = (e) => {
      if (!isDown) return
      const x = (e.touches?.[0]?.pageX ?? e.pageX) - el.offsetLeft
      el.scrollLeft = startScroll - (x - startX) * 1.2
    }
    const up = () => { isDown = false; el.classList.remove('dragging') }

    el.addEventListener('mousedown', down)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    el.addEventListener('touchstart', down, { passive: true })
    el.addEventListener('touchmove', move, { passive: true })
    el.addEventListener('touchend', up)
    return () => {
      el.removeEventListener('mousedown', down)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
      el.removeEventListener('touchstart', down)
      el.removeEventListener('touchmove', move)
      el.removeEventListener('touchend', up)
    }
  }, [scrollRef])

  const groupOf = (i) => POSTERS[i].group || 'intro'

  const padX = Math.max(80, tweaks.gap * 1.5)

  return (
    <main className="scroll" ref={scrollRef}>
      <div className="rail">
        <div className="rail-line" />
        <div className="strip" style={{ gap: `${tweaks.gap}px`, padding: `0 ${padX}px` }}>

          {POSTERS.map((poster, i) => {
            const grp = groupOf(i)
            const prevGroup = i > 0 ? groupOf(i - 1) : grp
            const newGroup = i > 0 && grp !== prevGroup

            return (
              <div key={i} style={{ display: 'contents' }}>
                {newGroup && (
                  <div className="section-mark" aria-hidden="true">
                    <div className="seal-lg">{GROUP_META[grp].char}</div>
                    <div className="section-label">{GROUP_META[grp].label}</div>
                  </div>
                )}
                <PosterCard
                  poster={poster}
                  index={i}
                  height={heights[i]}
                  isActive={active === i}
                  framed={tweaks.showFrames}
                  showCaptions={tweaks.showCaptions}
                  onClick={() => onJumpTo(i)}
                />
              </div>
            )
          })}

          {/* 尾頁 */}
          <div className="endcap">
            <div className="endcap-seal">終</div>
            <div className="endcap-text">
              <div>卷末</div>
              <div className="endcap-sub">
                National Xinying Industrial Vocational High School · 多媒體技術科
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
