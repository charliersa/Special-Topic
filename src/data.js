// ── 海報資料 ─────────────────────────────────────────────────────────────────
// Curated narrative: cover → opener poem → team → ink series → cake series → animal series
export const POSTERS = [
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic1.png", title: "115 年度 多媒新生代", subtitle: "設計展主視覺",                  group: "intro" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic19.png", title: "序",                  subtitle: "在沉靜的沙盒之中",               group: "intro" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic18.png", title: "團隊陣容",            subtitle: "Team Profile",                   group: "intro" },

  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic4.png",  title: "簡約",                subtitle: "墨韻文創 主視覺",                group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic2.png",  title: "墨非定律",            subtitle: "設計理念．水墨痕跡",             group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic5.png",  title: "山水留白",            subtitle: "墨非定律 風景視覺",              group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic6.png",  title: "青山不墨",            subtitle: "千秋畫．流水無弦萬古琴",         group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic7.png",  title: "詩意的起點",          subtitle: "一筆濃淡 一行留白",              group: "ink" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic3.png",  title: "周邊延伸",            subtitle: "徽章．馬克杯．咖啡墊．名片",     group: "ink" },

  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic8.png",  title: "CAKE CRAFT",          subtitle: "蛋糕文化．設計動機與理念",       group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic10.png", title: "黑森林蛋糕",          subtitle: "Schwarzwälder Kirschtorte . DE", group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic11.png", title: "巴滕伯格蛋糕",        subtitle: "Battenberg Cake . UK",           group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic12.png", title: "草莓奶霜",            subtitle: "Strawberry Cream . US",          group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic13.png", title: "起司の蛋糕",          subtitle: "チーズケーキ . JP",              group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic14.png", title: "瑪德蓮",              subtitle: "Madeleine . FR",                 group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic15.png", title: "寶島頂級鮮果",        subtitle: "Fruit Cake . TW",                group: "cake" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic9.png",  title: "周邊延伸",            subtitle: "名片．杯墊．馬克杯．吉祥物",     group: "cake" },

  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic16.png", title: "療育的動物們",        subtitle: "設計理念",                       group: "animal" },
  { src: "https://res.cloudinary.com/dbiirpmpy/image/upload/v1779678917/MD/Special%20Topic/Special_Topic17.png", title: "癒しの動物たち",      subtitle: "主視覺插畫",                     group: "animal" },
];

// ── 預設 Tweaks 設定 ─────────────────────────────────────────────────────────
export const DEFAULTS = {
  background: "paper",
  layout:     "rhythm",
  size:       78,
  gap:        56,
  showCaptions: true,
  showFrames:   true,
};

// ── 背景主題 ─────────────────────────────────────────────────────────────────
export const BG = {
  paper: {
    name: "宣紙",
    body: "radial-gradient(1200px 800px at 20% 30%, #f5ecd9 0%, #ece1c8 40%, #e2d4b3 100%)",
    ink:  "#2a241c",
    sub:  "#7a6a4f",
    rule: "rgba(60,40,20,.25)",
    chip: "rgba(255,253,247,.7)",
  },
  ink: {
    name: "水墨",
    body: "linear-gradient(180deg,#e9e4dc 0%, #d6cfc1 60%, #b8b0a0 100%)",
    ink:  "#1a1814",
    sub:  "#544a3c",
    rule: "rgba(20,15,10,.35)",
    chip: "rgba(255,255,255,.65)",
  },
  dark: {
    name: "暗墨",
    body: "radial-gradient(1400px 900px at 30% 20%, #2a2620 0%, #18140f 60%, #0c0a08 100%)",
    ink:  "#f3ead7",
    sub:  "#a89878",
    rule: "rgba(240,220,180,.18)",
    chip: "rgba(40,32,22,.7)",
  },
};

// ── 各章節 meta ──────────────────────────────────────────────────────────────
export const GROUP_META = {
  intro:  { label: "卷首・Prologue",            char: "序" },
  ink:    { label: "墨韻文創 / 墨非定律",       char: "墨" },
  cake:   { label: "CAKE CRAFT",                char: "甜" },
  animal: { label: "癒しの動物たち / 療育的動物們", char: "癒" },
};
