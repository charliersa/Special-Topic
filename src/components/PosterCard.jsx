/**
 * PosterCard — 單張海報卡片（figure 元素）
 *
 * Props:
 *   poster       — { src, title, subtitle }
 *   index        — 第幾張（0-based）
 *   height       — 卡片高度 (vh)
 *   isActive     — 是否為目前焦點
 *   framed       — 是否顯示外框
 *   showCaptions — 是否顯示說明文字
 *   onClick      — 點擊時跳至此張
 */
export function PosterCard({ poster, index, height, isActive, framed, showCaptions, onClick }) {
  return (
    <figure
      className={[
        'poster',
        framed   ? 'framed'    : '',
        isActive ? 'is-active' : '',
      ].filter(Boolean).join(' ')}
      style={{ height: `${height}vh` }}
      onClick={onClick}
    >
      <div className="poster-no">{String(index + 1).padStart(2, '0')}</div>
      <div className="poster-img-wrap">
        <img
          src={poster.src}
          alt={poster.title}
          loading="lazy"
          draggable="false"
        />
      </div>
      {showCaptions && (
        <figcaption>
          <div className="cap-title">{poster.title}</div>
          <div className="cap-sub">{poster.subtitle}</div>
        </figcaption>
      )}
    </figure>
  )
}
