/**
 * Footbar — 頁尾控制列
 *   左右箭頭按鈕 + 進度條（含刻度點）+ 提示文字
 */
export function Footbar({ progress, active, total, onNudge, onJumpTo, onSeek }) {
  return (
    <footer className="footbar">
      <button className="nav" onClick={() => onNudge(-1)} aria-label="上一段">‹</button>

      <div
        className="track"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          onSeek((e.clientX - rect.left) / rect.width)
        }}
      >
        <div className="track-fill" style={{ width: `${progress * 100}%` }} />
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`tick ${active === i ? 'on' : ''}`}
            style={{ left: `${(i / (total - 1)) * 100}%` }}
            onClick={(e) => { e.stopPropagation(); onJumpTo(i) }}
          />
        ))}
      </div>

      <button className="nav" onClick={() => onNudge(1)} aria-label="下一段">›</button>
      <div className="hint">滑鼠滾輪・拖曳・← →</div>
    </footer>
  )
}
