/**
 * app.js
 * ------------------------------------------------------------
 * 页面所有的 React 组件都写在这一个文件里，通过 Babel（浏览器端）
 * 直接转译 JSX，无需构建步骤，克隆仓库后可直接用 GitHub Pages 部署。
 *
 * 组件结构：
 *   App
 *   ├─ Header            顶部导航
 *   ├─ Hero              首屏介绍 + 图版堆叠视觉
 *   ├─ PapersSection      #papers  筛选 / 搜索 + 论文卡片网格
 *   │   ├─ FilterBar
 *   │   └─ PaperCard × N
 *   ├─ AboutSection       #about
 *   └─ Footer
 * ------------------------------------------------------------
 */

const { useState, useMemo, useEffect } = React;

/* ============================================================
 * 工具函数：为没有配图的论文生成一张风格统一的「图版」占位图
 * 灵感来自论文里的示意图（Figure Plate）：节点图 / 散点图 / 网格网
 * 用字符串 hash 做种子，保证同一篇论文每次生成的图案一致
 * ============================================================ */

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// 简单的可复现伪随机数生成器（mulberry32）
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PLATE_ACCENTS = ["#B6532F", "#7C8B5E", "#5E7C8B"];

function buildPlateSvg(seedStr) {
  const seed = hashString(seedStr);
  const rand = mulberry32(seed);
  const accent = PLATE_ACCENTS[seed % PLATE_ACCENTS.length];
  const pattern = seed % 3; // 0: 节点图 1: 散点图 2: 三角网格
  const W = 400,
    H = 260;

  let shapes = "";

  if (pattern === 0) {
    // 节点连接图：呼应人机交互 / 知识图谱类研究
    const nodes = Array.from({ length: 6 }, () => ({
      x: 60 + rand() * (W - 120),
      y: 50 + rand() * (H - 100),
    }));
    for (let i = 0; i < nodes.length; i++) {
      const next = nodes[(i + 1) % nodes.length];
      shapes += `<line x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(
        1
      )}" x2="${next.x.toFixed(1)}" y2="${next.y.toFixed(
        1
      )}" stroke="${accent}" stroke-width="1" stroke-opacity="0.35"/>`;
    }
    nodes.forEach((n, i) => {
      shapes += `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${
        i === 0 ? 7 : 4
      }" fill="${accent}" fill-opacity="0.55"/>`;
    });
  } else if (pattern === 1) {
    // 散点图：呼应计算机视觉里的特征分布 / 评估曲线
    shapes += `<line x1="40" y1="${H - 40}" x2="${W - 30}" y2="${
      H - 40
    }" stroke="${accent}" stroke-opacity="0.4"/>`;
    shapes += `<line x1="40" y1="30" x2="40" y2="${
      H - 40
    }" stroke="${accent}" stroke-opacity="0.4"/>`;
    for (let i = 0; i < 22; i++) {
      const x = 55 + rand() * (W - 100);
      const y = 40 + rand() * (H - 90);
      shapes += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(
        1
      )}" r="3.2" fill="${accent}" fill-opacity="${(
        0.3 +
        rand() * 0.4
      ).toFixed(2)}"/>`;
    }
  } else {
    // 三角网格：呼应三维场景几何 / mesh 重建
    const cols = 6,
      rows = 4;
    const cw = (W - 60) / cols,
      ch = (H - 60) / rows;
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const jitter = 6;
        const x = 30 + c * cw + (rand() - 0.5) * jitter;
        const y = 30 + r * ch + (rand() - 0.5) * jitter;
        if (c < cols) {
          const x2 = 30 + (c + 1) * cw;
          shapes += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(
            1
          )}" x2="${x2.toFixed(1)}" y2="${y.toFixed(
            1
          )}" stroke="${accent}" stroke-opacity="0.3"/>`;
        }
        if (r < rows) {
          const y2 = 30 + (r + 1) * ch;
          shapes += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(
            1
          )}" x2="${x.toFixed(1)}" y2="${y2.toFixed(
            1
          )}" stroke="${accent}" stroke-opacity="0.3"/>`;
        }
      }
    }
  }

  const monogram = (seedStr.trim().charAt(0) || "P").toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="#F3ECE1"/>
    <text x="${W - 24}" y="${H - 18}" text-anchor="end" font-family="Georgia, serif" font-size="120" fill="${accent}" fill-opacity="0.08">${monogram}</text>
    ${shapes}
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* ============================================================
 * 图标：手写内联 SVG，避免额外的图标库依赖
 * ============================================================ */

const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
  </svg>
);

const IconGithub = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-2.14c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.36-2.66 5.31-5.19 5.6.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
  </svg>
);

const IconExternal = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" {...props}>
    <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMenu = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
  </svg>
);

const IconClose = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" {...props}>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

const IconMail = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ============================================================
 * Header：Logo + 导航 + GitHub 链接（含移动端折叠菜单）
 * ============================================================ */

function Header() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Paper Lists", href: "#papers" },
    { label: "About me", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight text-ink">
            {siteConfig.siteName}
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-muted sm:inline">
            {siteConfig.siteNameSub}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans text-sm text-ink/80 transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border text-ink/70 transition-colors hover:border-accent hover:text-accent md:flex"
            aria-label="GitHub"
          >
            <IconGithub className="h-4 w-4" />
          </a>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink/70 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="打开菜单"
          >
            {open ? <IconClose className="h-4 w-4" /> : <IconMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-cream px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-sans text-sm text-ink/80"
              >
                {item.label}
              </a>
            ))}
            <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer" className="font-sans text-sm text-ink/80">
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ============================================================
 * Hero：首屏介绍 + 右侧「图版堆叠」视觉签名
 * 用三张倾斜叠放的生成图版，呼应「论文陈列室」这个主题
 * ============================================================ */

function Hero() {
  const stackPapers = papersData.slice(0, 3);
  const topicCount = useMemo(() => {
    const topics = new Set();
    papersData.forEach((p) => p.tags.forEach((t) => topics.add(t)));
    return topics.size;
  }, []);

  return (
    <section id="home" className="relative overflow-hidden">
      {/* 背景细网格纹理，呼应「图纸 / 坐标纸」的学术质感 */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-60" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted">
            Computer Vision · HCI · Scene Generation
          </span>
          <h1 className="font-serif text-4xl leading-[1.15] text-ink sm:text-5xl">
            {siteConfig.heroTitle}
          </h1>
          <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-muted">
            {siteConfig.heroSubtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#papers"
              className="rounded-full bg-accent px-7 py-3 font-sans text-sm font-medium text-cream shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
            >
              Explore~
            </a>
            <span className="font-mono text-xs text-muted">
              {papersData.length} papers collected · {topicCount} tags
            </span>
          </div>
        </div>

        {/* 图版堆叠：三张卡片错落倾斜排列 */}
        <div className="relative hidden h-72 md:block">
          {stackPapers.map((p, i) => {
            const rotations = [-6, 3, 10];
            const offsets = [
              "left-2 top-6",
              "left-24 top-0",
              "left-44 top-16",
            ];
            return (
              <div
                key={p.id}
                className={`absolute ${offsets[i]} w-56 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg transition-transform duration-300 hover:-translate-y-1`}
                style={{ transform: `rotate(${rotations[i]}deg)`, zIndex: i }}
              >
                <img
                  src={p.imageUrl || buildPlateSvg(p.title)}
                  alt=""
                  className="h-32 w-full object-cover"
                />
                <div className="px-3 py-2">
                  <p className="truncate font-mono text-[10px] uppercase tracking-widest text-accent">
                    {p.venue}
                  </p>
                  <p className="truncate font-serif text-sm text-ink">{p.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * FilterBar：搜索框 + 分类标签
 * ============================================================ */

function FilterBar({ query, setQuery, activeTag, setActiveTag }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative w-full max-w-md">
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search by title,abstract,tags..."
          className="w-full rounded-full border border-border bg-surface py-2.5 pl-11 pr-4 font-sans text-sm text-ink placeholder:text-muted/70 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(182,83,47,0.15)] focus:border-accent"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filterTags.map((tag) => {
          const active = tag === activeTag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={
                "rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors " +
                (active
                  ? "border-accent bg-accent text-cream"
                  : "border-border bg-surface text-ink/70 hover:border-accent/60 hover:text-accent")
              }
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
 * PaperCard：单篇论文卡片
 * ============================================================ */

function PaperCard({ paper }) {
  const thumb = useMemo(
    () => paper.imageUrl || buildPlateSvg(paper.title),
    [paper.imageUrl, paper.title]
  );
  const secondaryTags = paper.tags.filter((t) => t !== paper.tags[0]);

  return (
    <a
      href={paper.paperUrl}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-alt">
        <img
          src={thumb}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full border border-border/80 bg-cream/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink/80 backdrop-blur">
          {paper.venue}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg leading-snug text-ink">{paper.title}</h3>
          <IconExternal className="mt-1 h-4 w-4 flex-shrink-0 text-muted transition-colors group-hover:text-accent" />
        </div>
        <p className="line-clamp-3 font-sans text-sm leading-relaxed text-muted">
          {paper.abstract}
        </p>

        {secondaryTags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {secondaryTags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-surface-alt px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/60"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

/* ============================================================
 * PapersSection：#papers  组合筛选栏 + 卡片网格
 * ============================================================ */

function PapersSection() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return papersData.filter((p) => {
      const matchTag = activeTag === "All" || p.tags.includes(activeTag);
      if (!matchTag) return false;
      if (!q) return true;
      const haystack = (p.title + " " + p.abstract + " " + p.tags.join(" ")).toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeTag]);

  return (
    <section id="papers" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">Collection</span>
        <h2 className="font-serif text-3xl text-ink">Paper Lists</h2>
      </div>

      <div className="mb-10">
        <FilterBar
          query={query}
          setQuery={setQuery}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-20 text-center">
          <p className="font-serif text-lg text-ink">No matching paper results</p>
          <p className="font-sans text-sm text-muted">
            Try change the keywords or click "All" to clear current searching tags.
          </p>
        </div>
      )}
    </section>
  );
}

/* ============================================================
 * AboutSection：#about
 * ============================================================ */

function AboutSection() {
  return (
    <section id="about" className="border-t border-border bg-surface-alt/50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">About</span>
            <h2 className="mt-1 font-serif text-3xl text-ink">About me</h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-sans text-base leading-relaxed text-ink/80">
              {siteConfig.authorBio}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="inline-flex items-center gap-2 font-sans text-sm text-ink/80 transition-colors hover:text-accent"
              >
                <IconMail className="h-4 w-4" />
                {siteConfig.contactEmail}
              </a>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm text-ink/80 transition-colors hover:text-accent"
              >
                <IconGithub className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * Footer
 * ============================================================ */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <span className="font-mono text-xs text-muted">
          © {year} {siteConfig.siteName}
        </span>
        <span className="font-mono text-xs text-muted">
          Built with React · Tailwind CSS
        </span>
      </div>
    </footer>
  );
}

/* ============================================================
 * App 根组件
 * ============================================================ */

function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header />
      <main>
        <Hero />
        <PapersSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
