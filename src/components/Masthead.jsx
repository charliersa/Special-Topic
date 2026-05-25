/**
 * Masthead — 頁首：品牌標題 + 目前頁碼
 */
export function Masthead({ active, total }) {
  return (
    <header className="masthead">
      <div className="brand">
        <div className="seal">墨</div>
        <div>
          <div className="kicker">115 年度・多媒新生代 設計展</div>
          <div className="title">畢業專題 長卷</div>
        </div>
      </div>
      <div className="counter">
        <span className="num">{String(active + 1).padStart(2, '0')}</span>
        <span className="slash">/</span>
        <span className="total">{String(total).padStart(2, '0')}</span>
      </div>
    </header>
  )
}
