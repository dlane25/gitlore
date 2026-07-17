# GitLore — Codebase Time Machine

GitLore reconstructs the decisions, incidents, commits, and people behind a software system's architecture.

## Links

- Live application: https://gitlore-time-machine.drail-la.chatgpt.site
- Demo video: https://youtu.be/1eS86UgnxNM

## Submission overview

The Build Week prototype demonstrates an evidence-backed repository investigation through a realistic seeded codebase. It answers the question, “Why is authentication split across three services?” using a historical timeline, architecture map, primary-source evidence, and confidence scoring.

The investigation culminates in a concrete discovery: a mobile token-refresh route still depends on the legacy session store, making the migration 96% complete rather than 100%.

## What is implemented

- Responsive GitLore product interface
- Interactive repository-history question flow
- Four-stage architectural timeline
- Architecture dependency visualization
- Evidence and confidence views
- Incomplete-migration reveal
- Production deployment through OpenAI Sites
- Custom Open Graph artwork

## Prototype boundary

The current submission uses realistic seeded repository evidence so judges can experience a reliable end-to-end investigation without granting access to a private repository. A production version would connect to GitHub or another source-control provider and use GPT-5.6 to synthesize traceable answers from live commits, pull requests, issues, discussions, and incident records.

## Built with

Codex, GPT-5.6, OpenAI, React, TypeScript, Next.js, Vinext, Vite, Cloudflare-compatible server output, OpenAI Sites, GPT Image, HTML5, and CSS3.

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Then open the local URL printed by the development server.

## Production build

```bash
npm run build
```

## Key files

- `app/page.tsx` — interactive product experience and seeded investigation
- `app/globals.css` — responsive visual system
- `app/layout.tsx` — metadata and social sharing configuration
- `.openai/hosting.json` — OpenAI Sites project configuration

## Built with Codex

Codex was used throughout product ideation, UX design, implementation, debugging, production validation, image creation, deployment, gallery preparation, and demo-video production.
