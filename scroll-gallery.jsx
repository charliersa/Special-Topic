const { useState, useEffect, useRef, useMemo } = React;

// Curated narrative: cover → opener poem → team → ink series → cake series → animal series
const POSTERS = [
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic1.png", title: "115 年度 多媒新生代", subtitle: "設計展主視覺", group: "intro" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic19.png", title: "序", subtitle: "在沉靜的沙盒之中", group: "intro" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic18.png", title: "團隊陣容", subtitle: "Team Profile", group: "intro" },

  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic04.png", title: "簡約", subtitle: "墨韻文創 主視覺", group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic02.png", title: "墨非定律", subtitle: "設計理念．水墨痕跡", group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic05.png", title: "山水留白", subtitle: "墨非定律 風景視覺", group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic06.png", title: "青山不墨", subtitle: "千秋畫．流水無弦萬古琴", group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic07.png", title: "詩意的起點", subtitle: "一筆濃淡 一行留白", group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic03.png", title: "周邊延伸", subtitle: "徽章．馬克杯．咖啡墊．名片", group: "ink" },

  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic08.png", title: "CAKE CRAFT", subtitle: "蛋糕文化．設計動機與理念", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic10.png", title: "黑森林蛋糕", subtitle: "Schwarzwälder Kirschtorte . DE", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic11.png", title: "巴滕伯格蛋糕", subtitle: "Battenberg Cake . UK", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic12.png", title: "草莓奶霜", subtitle: "Strawberry Cream . US", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic13.png", title: "起司の蛋糕", subtitle: "チーズケーキ . JP", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic14.png", title: "瑪德蓮", subtitle: "Madeleine . FR", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic15.png", title: "寶島頂級鮮果", subtitle: "Fruit Cake . TW", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic09.png", title: "周邊延伸", subtitle: "名片．杯墊．馬克杯．吉祥物", group: "cake" },

  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic16.png", title: "療育的動物們", subtitle: "設計理念", group: "animal" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic17.png", title: "癒しの動物たち", subtitle: "主視覺插畫", group: "animal" },
];

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "background": "paper",
  "layout": "rhythm",
  "size": 78,
  "gap": 56,
  "showCaptions": true,
  "showFrames": true
}/*EDITMODE-END*/;

const BG = {
  paper: {
    name: "宣紙",
    body: "radial-gradient(1200px 800px at 20% 30%, #f5ecd9 0%, #ece1c8 40%, #e2d4b3 100%)",
    ink: "#2a241c",
    sub: "#7a6a4f",
    rule: "rgba(60,40,20,.25)",
    chip: "rgba(255,253,247,.7)",
  },
  ink: {
    name: "水墨",
    body: "linear-gradient(180deg,#e9e4dc 0%, #d6cfc1 60%, #b8b0a0 100%)",
    ink: "#1a1814",
    sub: "#544a3c",
    rule: "rgba(20,15,10,.35)",
    chip: "rgba(255,255,255,.65)",
  },
  dark: {
    name: "暗墨",
    body: "radial-gradient(1400px 900px at 30% 20%, #2a2620 0%, #18140f 60%, #0c0a08 100%)",
    ink: "#f3ead7",
    sub: "#a89878",
    rule: "rgba(240,220,180,.18)",
    chip: "rgba(40,32,22,.7)",
  },
};

function App() {
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(DEFAULTS) : [DEFAULTS, () => {}];
  const bg = BG[tweaks.background] || BG.paper;

  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  // wheel-to-horizontal
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // drag-to-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false, startX = 0, startScroll = 0;
    const down = (e) => {
      if (e.target.closest("button, a, .tweaks-panel, input")) return;
      isDown = true; el.classList.add("dragging");
      startX = (e.touches?.[0]?.pageX ?? e.pageX) - el.offsetLeft;
      startScroll = el.scrollLeft;
    };
    const move = (e) => {
      if (!isDown) return;
      const x = (e.touches?.[0]?.pageX ?? e.pageX) - el.offsetLeft;
      el.scrollLeft = startScroll - (x - startX) * 1.2;
    };
    const up = () => { isDown = false; el.classList.remove("dragging"); };
    el.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchmove", move, { passive: true });
    el.addEventListener("touchend", up);
    return () => {
      el.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchmove", move);
      el.removeEventListener("touchend", up);
    };
  }, []);

  // progress + active item
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max <= 0 ? 0 : el.scrollLeft / max;
      setProgress(p);
      // active = nearest poster center to viewport center
      const cx = el.scrollLeft + el.clientWidth / 2;
      const items = el.querySelectorAll(".poster");
      let best = 0, bestD = Infinity;
      items.forEach((node, i) => {
        const c = node.offsetLeft + node.offsetWidth / 2;
        const d = Math.abs(c - cx);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [tweaks.layout, tweaks.size, tweaks.gap]);

  // keyboard
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onKey = (e) => {
      const step = el.clientWidth * 0.7;
      if (e.key === "ArrowRight") el.scrollBy({ left: step, behavior: "smooth" });
      if (e.key === "ArrowLeft") el.scrollBy({ left: -step, behavior: "smooth" });
      if (e.key === "Home") el.scrollTo({ left: 0, behavior: "smooth" });
      if (e.key === "End") el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nudge = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  const jumpTo = (i) => {
    const el = scrollRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".poster");
    const node = items[i];
    if (!node) return;
    const target = node.offsetLeft - (el.clientWidth - node.offsetWidth) / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  // layout sizing
  const baseH = tweaks.size; // vh
  const heights = useMemo(() => {
    if (tweaks.layout === "uniform") return POSTERS.map(() => baseH);
    if (tweaks.layout === "cinematic") {
      // alternate large/small for cinematic rhythm
      return POSTERS.map((_, i) => (i % 3 === 0 ? Math.min(92, baseH + 12) : i % 3 === 1 ? baseH : baseH - 10));
    }
    // rhythm: gentle wave so it feels like an unfurling scroll
    return POSTERS.map((_, i) => {
      const wave = Math.sin(i * 0.9) * 6 + Math.sin(i * 0.31) * 4;
      return Math.max(54, Math.min(90, baseH + wave));
    });
  }, [tweaks.layout, baseH]);

  // section dividers from explicit group on each poster
  const groupOf = (i) => POSTERS[i].group || "intro";

  const groupMeta = {
    intro: { label: "卷首・Prologue", char: "序" },
    ink: { label: "墨韻文創 / 墨非定律", char: "墨" },
    cake: { label: "CAKE CRAFT", char: "甜" },
    animal: { label: "癒しの動物たち / 療育的動物們", char: "癒" },
  };

  return (
    <div className="app" style={{ background: bg.body, color: bg.ink, "--ink": bg.ink, "--sub": bg.sub, "--rule": bg.rule, "--chip": bg.chip }}>
      {/* paper / ink texture */}
      <div className="grain" />
      {tweaks.background === "paper" && <div className="paper-fibers" />}
      {tweaks.background === "ink" && <div className="ink-wash" />}

      {/* header */}
      <header className="masthead">
        <div className="brand">
          <div className="seal">墨</div>
          <div>
            <div className="kicker">115 年度・多媒新生代 設計展</div>
            <div className="title">畢業專題 長卷</div>
          </div>
        </div>
        <div className="counter">
          <span className="num">{String(active + 1).padStart(2, "0")}</span>
          <span className="slash">/</span>
          <span className="total">{String(POSTERS.length).padStart(2, "0")}</span>
        </div>
      </header>

      {/* the long horizontal scroll */}
      <main className="scroll" ref={scrollRef}>
        <div className="rail">
          <div className="rail-line" />
          <div className="strip" style={{ gap: `${tweaks.gap}px`, padding: `0 ${Math.max(80, tweaks.gap * 1.5)}px` }}>
            {POSTERS.map((p, i) => {
              const h = heights[i];
              const grp = groupOf(i);
              const prevGroup = i > 0 ? groupOf(i - 1) : grp;
              const newGroup = i > 0 && grp !== prevGroup;
              return (
                <React.Fragment key={i}>
                  {newGroup && (
                    <div className="section-mark" aria-hidden="true">
                      <div className="seal-lg">{groupMeta[grp].char}</div>
                      <div className="section-label">{groupMeta[grp].label}</div>
                      <div className="section-rule" />
                    </div>
                  )}
                  <figure
                    className={`poster ${tweaks.showFrames ? "framed" : ""} ${active === i ? "is-active" : ""}`}
                    style={{ height: `${h}vh` }}
                    onClick={() => jumpTo(i)}
                  >
                    <div className="poster-no">{String(i + 1).padStart(2, "0")}</div>
                    <div className="poster-img-wrap">
                      <img src={p.src} alt={p.title} loading="lazy" draggable="false" />
                    </div>
                    {tweaks.showCaptions && (
                      <figcaption>
                        <div className="cap-title">{p.title}</div>
                        <div className="cap-sub">{p.subtitle}</div>
                      </figcaption>
                    )}
                  </figure>
                </React.Fragment>
              );
            })}
            <div className="endcap">
              <div className="endcap-seal">終</div>
              <div className="endcap-text">
                <div>卷末</div>
                <div className="endcap-sub">National Xinying Industrial Vocational High School · 多媒體技術科</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* footer / controls */}
      <footer className="footbar">
        <button className="nav" onClick={() => nudge(-1)} aria-label="上一段">‹</button>
        <div className="track" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const p = (e.clientX - rect.left) / rect.width;
          const el = scrollRef.current;
          if (!el) return;
          el.scrollTo({ left: p * (el.scrollWidth - el.clientWidth), behavior: "smooth" });
        }}>
          <div className="track-fill" style={{ width: `${progress * 100}%` }} />
          {POSTERS.map((_, i) => (
            <div
              key={i}
              className={`tick ${active === i ? "on" : ""}`}
              style={{ left: `${(i / (POSTERS.length - 1)) * 100}%` }}
              onClick={(e) => { e.stopPropagation(); jumpTo(i); }}
            />
          ))}
        </div>
        <button className="nav" onClick={() => nudge(1)} aria-label="下一段">›</button>
        <div className="hint">滑鼠滾輪・拖曳・← →</div>
      </footer>

      {/* Tweaks */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="畫面" />
          <window.TweakRadio label="背景" value={tweaks.background} options={[
            { value: "paper", label: "宣紙" },
            { value: "ink", label: "水墨" },
            { value: "dark", label: "暗墨" },
          ]} onChange={(v) => setTweak("background", v)} />
          <window.TweakRadio label="排列" value={tweaks.layout} options={[
            { value: "uniform", label: "齊整" },
            { value: "rhythm", label: "律動" },
            { value: "cinematic", label: "戲劇" },
          ]} onChange={(v) => setTweak("layout", v)} />
          <window.TweakSection label="尺寸" />
          <window.TweakSlider label="圖片高度" value={tweaks.size} min={50} max={92} step={1} onChange={(v) => setTweak("size", v)} unit="vh" />
          <window.TweakSlider label="間距" value={tweaks.gap} min={16} max={140} step={4} onChange={(v) => setTweak("gap", v)} unit="px" />
          <window.TweakSection label="細節" />
          <window.TweakToggle label="顯示說明文字" value={tweaks.showCaptions} onChange={(v) => setTweak("showCaptions", v)} />
          <window.TweakToggle label="顯示外框" value={tweaks.showFrames} onChange={(v) => setTweak("showFrames", v)} />
        </window.TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
