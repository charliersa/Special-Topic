const { useState, useEffect, useRef, useMemo } = React;

// Curated narrative: cover ??opener poem ??team ??ink series ??cake series ??animal series
const POSTERS = [
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic1.png", title: "115 撟游漲 憭??啁?隞?, subtitle: "閮剛?撅蜓閬死", group: "intro" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic19.png", title: "摨?, subtitle: "?冽???瘝?銋葉", group: "intro" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic18.png", title: "????捆", subtitle: "Team Profile", group: "intro" },

  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic4.png", title: "蝪∠?", subtitle: "憓券? 銝餉?閬?, group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic2.png", title: "憓券?摰?", subtitle: "閮剛??艙嚗偌憓函?頝?, group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic5.png", title: "撅望偌?", subtitle: "憓券?摰? 憸冽閬死", group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic6.png", title: "?控銝◢", subtitle: "???恬?瘚偌?∪憐?砍??, group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic7.png", title: "閰拇??絲暺?, subtitle: "銝蝑?瘛?銝銵???, group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic3.png", title: "?券?撱嗡撓", subtitle: "敺賜?嚗收?嚗??∪?嚗???, group: "ink" },

  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic8.png", title: "CAKE CRAFT", subtitle: "????嚗身閮?璈??艙", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic10.png", title: "暺ㄝ??蝟?, subtitle: "Schwarzw瓣lder Kirschtorte . DE", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic11.png", title: "撌湔?隡舀??", subtitle: "Battenberg Cake . UK", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic12.png", title: "??憟園?", subtitle: "Strawberry Cream . US", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic13.png", title: "韏瑕?株?蝟?, subtitle: "??箝?潦 . JP", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic14.png", title: "?芸噸??, subtitle: "Madeleine . FR", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic15.png", title: "撖嗅雀??擙格?", subtitle: "Fruit Cake . TW", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic9.png", title: "?券?撱嗡撓", subtitle: "??嚗憓?擐砍??荔??孕??, group: "cake" },

  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic16.png", title: "????拙?, subtitle: "閮剛??艙", group: "animal" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic17.png", title: "???桀??押???, subtitle: "銝餉?閬箸???, group: "animal" },
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
    name: "摰??",
    body: "radial-gradient(1200px 800px at 20% 30%, #f5ecd9 0%, #ece1c8 40%, #e2d4b3 100%)",
    ink: "#2a241c",
    sub: "#7a6a4f",
    rule: "rgba(60,40,20,.25)",
    chip: "rgba(255,253,247,.7)",
  },
  ink: {
    name: "瘞游◢",
    body: "linear-gradient(180deg,#e9e4dc 0%, #d6cfc1 60%, #b8b0a0 100%)",
    ink: "#1a1814",
    sub: "#544a3c",
    rule: "rgba(20,15,10,.35)",
    chip: "rgba(255,255,255,.65)",
  },
  dark: {
    name: "?◢",
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
    intro: { label: "?琿??與rologue", char: "摨? },
    ink: { label: "憓券? / 憓券?摰?", char: "憓? },
    cake: { label: "CAKE CRAFT", char: "?? },
    animal: { label: "???桀??押???/ ????拙?, char: "?? },
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
          <div className="seal">憓?/div>
          <div>
            <div className="kicker">115 撟游漲?餃?慦?誨 閮剛?撅?/div>
            <div className="title">?Ｘ平撠? ?瑕</div>
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
              <div className="endcap-seal">蝯?/div>
              <div className="endcap-text">
                <div>?瑟</div>
                <div className="endcap-sub">National Xinying Industrial Vocational High School 繚 憭?擃?銵?</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* footer / controls */}
      <footer className="footbar">
        <button className="nav" onClick={() => nudge(-1)} aria-label="銝?畾?>??/button>
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
        <button className="nav" onClick={() => nudge(1)} aria-label="銝?畾?>??/button>
        <div className="hint">皛?皛曇憚?餅??喋????/div>
      </footer>

      {/* Tweaks */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="?恍" />
          <window.TweakRadio label="?" value={tweaks.background} options={[
            { value: "paper", label: "摰??" },
            { value: "ink", label: "瘞游◢" },
            { value: "dark", label: "?◢" },
          ]} onChange={(v) => setTweak("background", v)} />
          <window.TweakRadio label="??" value={tweaks.layout} options={[
            { value: "uniform", label: "朣" },
            { value: "rhythm", label: "敺?" },
            { value: "cinematic", label: "?脣?" },
          ]} onChange={(v) => setTweak("layout", v)} />
          <window.TweakSection label="撠箏站" />
          <window.TweakSlider label="??擃漲" value={tweaks.size} min={50} max={92} step={1} onChange={(v) => setTweak("size", v)} unit="vh" />
          <window.TweakSlider label="??" value={tweaks.gap} min={16} max={140} step={4} onChange={(v) => setTweak("gap", v)} unit="px" />
          <window.TweakSection label="蝝啁?" />
          <window.TweakToggle label="憿舐內隤芣???" value={tweaks.showCaptions} onChange={(v) => setTweak("showCaptions", v)} />
          <window.TweakToggle label="憿舐內憭?" value={tweaks.showFrames} onChange={(v) => setTweak("showFrames", v)} />
        </window.TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

