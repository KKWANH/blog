![hello_world](/asset/img/hello_world.gif)

<h1 align="center">Kwanho Kim</h1>

<p align="center">
  Full-stack engineer for real-time, distributed systems.<br/>
  From the ROS graph to the operator screen — and through every failure mode between them.
</p>

<p align="center">
  <a href="https://kwanho.dev"><b>kwanho.dev</b></a>
  &nbsp;·&nbsp;
  <a href="https://kwanho.dev/editor">Editor's Introduction</a>
  &nbsp;·&nbsp;
  <a href="https://www.linkedin.com/in/kwanho-kim-327152232/">LinkedIn</a>
  &nbsp;·&nbsp;
  <a href="https://instagram.com/kwanho._kim">Instagram</a>
  &nbsp;·&nbsp;
  <code>kwanho0096@gmail.com</code>
</p>

---

## Now

After wrapping up the Pickit 3D contract (Aug 2025 — Mar 2026), I'm full-time on two side projects:

### [Earprint](https://github.com/KKWANH/earprint) &nbsp;·&nbsp; [earprint.kwanho.dev](https://earprint.kwanho.dev)

A YouTube Music taste analyzer. The one that knows you've been listening to the same 12 artists for three years.

- **Chrome MV3 extension** scrapes your YouTube Music liked tracks
- The web app enriches each track through Deezer and Last.fm, then runs a **Gemini analysis pass** to extract taste fingerprints
- Renders a **taste profile**, an **interactive artist map**, and a **five-mode recommender** (song / genre / unheard genre / indie / mix) with Tinder-style swipe rating
- Auth.js + Google OAuth · Neon Postgres + pgvector for embedding-based recommendations · Cloudflare Workers via OpenNext · Cron Worker for scheduled enrichment jobs
- `Next.js · TypeScript · Neon pgvector · Cloudflare Workers · Chrome MV3 · Gemini`

### [Ariadne](https://github.com/KKWANH/ai-assistant) &nbsp;·&nbsp; [ai.kwanho.dev](https://ai.kwanho.dev)

A local-first AI workspace where every answer cites the source it came from.

- **Multi-provider** — Anthropic Claude · OpenAI · Gemini · Moonshot Kimi · local Ollama, one interface across all of them. Per-model token usage priced and reported as inference cost per run
- **Agent mode** — decomposes a task into steps, runs tools (web search, file reading, document analysis), and re-plans as results arrive. Human approval gate before any action executes
- **Evidence engine** — maps every generated claim to its source document and flags unsupported claims. Hallucination at scale isn't a caveat, it's a system failure
- **Document ingestion** — PDF (+ OCR fallback) · DOCX · XLSX · Markdown · CSV. Context-selection filter so only relevant content reaches the model
- Deployed over Cloudflare Tunnel with local/remote access split and request-origin checks
- `TypeScript · Python · Fastify · React · SQLite · Docker · Cloudflare Tunnel`

---

## Career
```
42 Seoul → SEA:ME · Wolfsburg → Robert Bosch → Pickit 3D → today
```

Started programming at 14, while writing math and science essays at a school where clarity of reasoning mattered more than correct answers. That discipline — define every assumption, test logic against edge cases, pressure-test against reality — has stayed.
### Pickit 3D &nbsp;·&nbsp; Research & Software Engineer &nbsp;·&nbsp; Aug 2025 — Mar 2026 &nbsp;·&nbsp; Leuven, Belgium
3D-vision robotic picking in production. The system can't be paused between runs — everything has to work, recover, and report correctly while a robot arm is mid-pick.
- Delivered production-support features across React UI + API + ROS / streaming layers to unblock on-site operations
- Built a reusable Python WebSocket client with reconnect/backoff and message validation; used as the integration baseline across internal tools
- Built an internal log workflow — timezone-aware download → upload/convert pipeline → multilingual UI — that cut manual log handling and sped up incident triage
- Shipped a configuration UI for system/network settings with input validation and safe defaults
`C · C++ · Python · TypeScript · React · WebSocket · ROS1 · Docker · Git`
### Robert Bosch &nbsp;·&nbsp; V2X Communication Intern &nbsp;·&nbsp; Jun 2024 — Nov 2024 &nbsp;·&nbsp; Hildesheim, Germany
V2X is safety-critical automotive communication. An interface bug is not a ticket — it's an incident. First time my data contract decisions had formal consequences.
- Implemented a V2X vehicle demonstrator for safety-critical scenarios, defining message/data interfaces and validating end-to-end behaviour in test runs
- Integrated communication modules and designed data contracts to decouple components and accelerate iteration
- Built a React-based HMI for an eBike safety prototype
`C · Python · TypeScript · React · ROS2 · Docker · Git`
### SEA:ME &nbsp;·&nbsp; Master-level program in Automotive & Mobility &nbsp;·&nbsp; Jul 2023 — Jun 2024 &nbsp;·&nbsp; Wolfsburg, Germany
Four-module curriculum co-initiated with Volkswagen: embedded systems, autonomous driving, connected vehicles, and a capstone with automotive industry partners.
- **Embedded** — low-level C/C++ on ARM (Raspberry Pi, Jetson), bare-metal drivers, sensor integration, real-time constraints
- **Autonomous driving** — ROS-based perception pipeline: lane detection, sensor fusion, path planning. The CARLA lane-keeping project below came from this module
- **Connected vehicles** — CAN bus communication, AUTOSAR architecture fundamentals, V2X protocol design — the foundation that made Bosch immediately legible
- First time engineering for reproducibility and certification: edge cases matter when the vehicle is moving; a fix that works 99% of the time is a 1% liability
`C · C++ · Python · ROS · CARLA`
### École 42 &nbsp;·&nbsp; Common Core and Advanced Core &nbsp;·&nbsp; Sep 2020 — present &nbsp;·&nbsp; Seoul / Wolfsburg
No lectures, no curriculum. A specification, three peer reviewers, and a deadline.
- C from scratch — libft, ft_printf, get_next_line — then progressively harder systems: process control, IPC, file descriptors, memory management with no safety net
- **Minishell**: POSIX-compatible shell — lexer, parser, built-ins, pipe chains, redirections, signal handling. Requires a precise model of what the kernel does on fork, exec, and dup; anything vague shows up as a bug
- **Philosophers** (dining concurrency): mutex and semaphore solutions under strict timing and resource constraints. Learned where assumptions about thread scheduling order break — and why race conditions in tests are worse than in production
- CPP modules 00–09: OOP through templates, STL, exception handling — each module peer-reviewed, not auto-graded
- Peer evaluation model: every submission reviewed by three peers. Trains the discipline of writing code that is readable and provably correct, not just functional
`C · C++ · Unix · algorithms · systems`
---
## Projects
### 🥇 [ColorSavesLife](https://github.com/KKWANH/ColorSavesLife) &nbsp;·&nbsp; 1st place · Bosch ConnectedExperience (BCX) 2024 · Berlin
An AR overlay system that recolors traffic signals and road markings in real time for colorblind drivers.
- Transparent display output, camera input, YOLOv5 object detection — prototyped end-to-end in ROS2 / Gazebo
- Plugin-based Python architecture: each new sensor modality (depth camera, eye-tracker) is a self-contained plugin, not a codebase change. Eye-tracking was the first live plugin, feeding gaze data into the detection pipeline
- Led and presented the cross-functional team to 1st place at BCX 2024, competing against automotive and tech teams from Bosch, Mercedes-Benz, Volkswagen, and others across Europe
`Python · C++ · ROS2 · Gazebo · YOLOv5 · eye-tracking`
### Autonomous Lane-Keeping-Assist &nbsp;·&nbsp; SEA:ME · Aug 2023 — Dec 2023
- Trained a CNN on CARLA simulator camera frames to detect lane boundaries and output a real-time steering correction signal
- Architecture: preprocessing (resize / normalize / augment) → convolutional feature extractor → regression head. Evaluated across varied road geometry, lighting, and traffic
- Built the full data pipeline from scratch: capture loop, annotation tooling, train/val/test split. Discovered early that model quality is bounded by data quality before it's bounded by architecture
- Failure mode analysis: regression head amplified prediction noise at high speed. Traced to low-confidence frames outside the training distribution
`Python · CNN · CARLA`
### Rush03 &nbsp;·&nbsp; Rock band & student community · École 42 Seoul · Aug 2022 — Jul 2023
- Founded and led a 50-member student community at École 42 Seoul — members spanning every stage of the program
- Delivered three live events for 200–300 attendees: performance sets, open stage, student band showcase. Managed venue, equipment, scheduling, and rehearsal logistics
- Built the planning process the next cohort inherited: timeline templates, equipment checklists, contingency buffers, risk-response playbook
---
## Stack
**Languages** — C · C++ · Python · TypeScript / JavaScript

**Frameworks** — ROS1 / ROS2 · React · Next.js · Node · Fastify

**Infrastructure** — Docker · Git · Linux / Bash · Cloudflare Workers · Cloudflare Tunnel

**Databases** — PostgreSQL (Neon) · SQLite · pgvector

**Also reach for** — Qt · CARLA · Assembly · Figma
---
## Education
| Period | Program | Institution |
|--------|---------|-------------|
| Feb 2026 — present | B.Sc. Mechatronics | Korea National Open University |
| Mar 2023 — Feb 2025 | B.Sc. Artificial Intelligence · GPA 3.44 / 4.5 | Korea National Open University |
| Apr 2019 — Aug 2020 | B.Sc. Computer Engineering · GPA 4.24 / 4.5 | Korea Academic Credit Bank |
| Apr 2019 — Aug 2022 | B.Sc. Business Administration · GPA 3.77 / 4.5 | Korea Academic Credit Bank |
| Sep 2020 — present | École 42 · Common & Advanced Core | Seoul / Wolfsburg |
| Jul 2023 — Jun 2024 | SEA:ME · Master-level program | Wolfsburg · Automotive & Mobility |
**Selected certifications** — IELTS Academic 7.5 (C1, Mar 2025) · Engineer Information Processing (HRD Korea, Nov 2020) · Computer Specialist in Spreadsheet & DB Level I (KCCI, Dec 2019) · Network Advisor Level 2 (ICQA, Oct 2019)
---
## Languages
| Language | Level |
|----------|-------|
| Korean | Native |
| English | C1 · IELTS Academic 7.5 |
| Japanese | A1 |
---
<p align="center">
  <a href="https://kwanho.dev">kwanho.dev</a>
  &nbsp;·&nbsp;
  <a href="https://kwanho.dev/editor">Long-form profile</a>
  &nbsp;·&nbsp;
  <a href="https://www.linkedin.com/in/kwanho-kim-327152232/">LinkedIn</a>
  &nbsp;·&nbsp;
  <a href="https://instagram.com/kwanho._kim">Instagram</a>
  &nbsp;·&nbsp;
  <code>kwanho0096@gmail.com</code>
</p>
