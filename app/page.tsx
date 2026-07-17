"use client";

import { useMemo, useState } from "react";

const chapters = [
  { year: "2021", title: "The monolith", detail: "A single Rails service handled identity, billing, and the API.", tone: "green" },
  { year: "2022", title: "The incident", detail: "A 47-minute outage exposed a shared-session bottleneck.", tone: "amber" },
  { year: "2023", title: "The great split", detail: "Auth moved behind a service boundary in 14 linked commits.", tone: "blue" },
  { year: "2024", title: "The forgotten path", detail: "One legacy token refresh route never migrated.", tone: "red" },
];

const evidence = [
  { type: "COMMIT", id: "a4f92c1", title: "Extract session validation", author: "Maya Chen", date: "Mar 18, 2023", score: 98 },
  { type: "PULL REQUEST", id: "#1842", title: "Decouple auth from the monolith", author: "Jon Bell", date: "Mar 21, 2023", score: 94 },
  { type: "ISSUE", id: "#1791", title: "Sessions saturate primary database", author: "SRE team", date: "Mar 07, 2023", score: 91 },
];

export default function Home() {
  const [query, setQuery] = useState("Why is authentication split across three services?");
  const [active, setActive] = useState(2);
  const [view, setView] = useState<"story" | "evidence">("story");
  const [thinking, setThinking] = useState(false);
  const [asked, setAsked] = useState(true);

  const confidence = useMemo(() => active === 3 ? 87 : 96, [active]);

  function investigate() {
    if (!query.trim()) return;
    setThinking(true);
    setAsked(false);
    window.setTimeout(() => { setThinking(false); setAsked(true); setActive(3); }, 850);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="GitLore home"><span className="brand-mark">G</span><span>GitLore</span><small>CODEBASE TIME MACHINE</small></a>
        <div className="repo-pill"><span className="repo-icon">⌘</span><div><small>REPOSITORY</small><strong>northstar / platform</strong></div><span className="chevron">⌄</span></div>
        <nav><button className="icon-btn" aria-label="Search">⌕</button><button className="icon-btn" aria-label="Settings">⚙</button><span className="avatar">DC</span></nav>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span className="pulse" /> REPOSITORY INDEXED · 12,481 COMMITS · 7.4 YEARS</div>
        <h1>Every codebase has<br />a <em>story.</em></h1>
        <p>Trace the decisions, incidents, and people that shaped your software.<br />Answers grounded in the evidence your repository left behind.</p>
        <div className="ask-box">
          <span className="prompt-mark">›</span>
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && investigate()} aria-label="Ask about repository history" />
          <button onClick={investigate}>{thinking ? "Tracing…" : "Trace history"} <span>↵</span></button>
        </div>
        <div className="suggestions"><span>TRY</span>{["What caused the 2022 outage?", "When did billing become async?", "Which migration is incomplete?"].map(x => <button key={x} onClick={() => setQuery(x)}>{x}</button>)}</div>
      </section>

      <section className={`workspace ${thinking ? "loading" : ""}`}>
        <div className="workspace-head">
          <div><span className="kicker">INVESTIGATION  /  0047</span><h2>{asked ? query : "Following the evidence…"}</h2></div>
          <div className="switcher"><button className={view === "story" ? "active" : ""} onClick={() => setView("story")}>Story</button><button className={view === "evidence" ? "active" : ""} onClick={() => setView("evidence")}>Evidence</button></div>
        </div>

        {view === "story" ? <div className="story-grid">
          <aside className="timeline">
            <span className="label">THE EVOLUTION</span>
            {chapters.map((c, i) => <button key={c.year} className={`chapter ${active === i ? "active" : ""}`} onClick={() => setActive(i)}><span className={`dot ${c.tone}`} /><span className="year">{c.year}</span><span><strong>{c.title}</strong><small>{c.detail}</small></span></button>)}
          </aside>
          <article className="narrative">
            <div className="chapter-no">CHAPTER {String(active + 1).padStart(2, "0")}</div>
            <h3>{active === 3 ? "One route was left behind." : active === 2 ? "The monolith cracked along a fault line." : chapters[active].title}</h3>
            <p className="lead">{active === 3 ? "The migration looked complete, but the mobile refresh endpoint still validates tokens against the original sessions table—a quiet dependency that survived every cleanup." : active === 2 ? "Authentication wasn’t designed as three services. It became three services after an outage, a rushed extraction, and a later security boundary hardened the seams." : chapters[active].detail}</p>
            <div className="quote"><span>“</span><p>{active === 3 ? "Keep the legacy refresh path until mobile v2 adoption clears 95%." : "This buys us isolation now. We can unify the token boundary once the migration settles."}<small>— {active === 3 ? "PR #2014 · rollout note" : "PR #1842 · Jon Bell"}</small></p></div>
            <div className="finding"><div className="finding-icon">!</div><div><span>KEY FINDING</span><strong>{active === 3 ? "The migration is 96% complete—not 100%." : "The split was operational, not architectural."}</strong><p>{active === 3 ? "POST /v1/mobile/token/refresh still imports LegacySessionStore. Removing the old database today would break 3.8% of active mobile sessions." : "Service boundaries follow the sequence of production incidents rather than domain boundaries. That explains the duplicated validation logic."}</p></div><button aria-label="Open finding">↗</button></div>
          </article>
          <aside className="map-panel">
            <div className="panel-title"><span>ARCHITECTURE · {chapters[active].year}</span><button>↗</button></div>
            <div className="arch-map">
              <div className="node gateway">API GATEWAY<small>routes requests</small></div><span className="line l1" />
              <div className="node auth">AUTH SERVICE<small>tokens · OAuth</small></div><span className="line l2" />
              <div className="node sessions">SESSION STORE<small>Redis cluster</small></div><span className="line l3" />
              <div className="node legacy">LEGACY API<small>refresh route</small></div>
            </div>
            <div className="confidence"><div><span>CONFIDENCE</span><strong>{confidence}%</strong></div><div className="meter"><i style={{width: `${confidence}%`}} /></div><small>Based on 23 commits, 4 PRs, 2 issues, and 1 incident report.</small></div>
          </aside>
        </div> : <div className="evidence-view">
          <div className="evidence-intro"><span>PRIMARY SOURCES</span><h3>The trail behind the conclusion.</h3><p>Every claim links back to repository evidence. Nothing is invented; uncertainty stays visible.</p></div>
          <div className="evidence-list">{evidence.map((e, i) => <button key={e.id} onClick={() => setActive(Math.min(i + 1, 3))}><span className="rank">0{i + 1}</span><div><small>{e.type} · {e.id}</small><strong>{e.title}</strong><span>{e.author} · {e.date}</span></div><b>{e.score}%</b><i>↗</i></button>)}</div>
        </div>}
      </section>

      <footer><div><span className="brand-mark small">G</span><strong>GitLore</strong><span>Turn repository history into institutional memory.</span></div><div><span className="status-dot" /> ALL SYSTEMS OPERATIONAL <span>·</span> EVIDENCE, NOT GUESSWORK</div></footer>
    </main>
  );
}
