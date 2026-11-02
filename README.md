# 🧪 ClearBench

_Modern sample tracking for laboratory teams — built for visibility, accountability, and peace of mind._

**[Live demo →](https://clear-bench.vercel.app/)** · [What's next](https://clear-bench.vercel.app/whats-next) · [Issues](https://github.com/kbongco/clear-bench/issues)

![ClearBench home page](docs/screenshots/home.png)

ClearBench replaces the spreadsheets labs use to track test samples. Scientists submit samples, lab techs approve or reject them and record results against product specs, and every step lands in an audit trail, so everyone can see who did what and when.

> **Heads up:** the demo's API runs on a free server that sleeps when idle. The first load can take up to a minute — after that it's quick.

---

## 📚 Table of Contents

- [Try the demo](#-try-the-demo)
- [Features](#-features)
- [Inspiration](#-inspiration)
- [How it's built](#-how-its-built)
- [Engineering highlights](#-engineering-highlights)
- [Running it locally](#-running-it-locally)
- [Testing and CI](#-testing-and-ci)
- [How I used AI](#-how-i-used-ai)
- [Status and what's next](#-status-and-whats-next)

---

## 🎬 Try the demo

There's no sign-up. Use the **View as** menu at the bottom of the sidebar (behind ☰ on a phone) to switch between people. It stands in for login until real authentication is built.

1. **As a scientist** (e.g. Dr. Alice Nguyen): open **Submit Samples** and submit one.
2. **Switch to a lab tech** (e.g. Sarah Lin): open **Approve Samples** and approve it.
3. **Open the sample**, go to the **Results** tab, and enter results for each test and storage condition.
4. Check the **History** tab: every step is recorded with who did it.

---

## ✅ Features

### 🔬 Scientists

- Submit samples with test types, storage conditions and test duration (due date calculated automatically)
- A home page with counts by status and a "Needs attention" list (out-of-spec and soonest-due samples)
- Search and filter their team's samples
- See each sample's details, results and full history

### 🧪 Lab techs

- An approval queue with Pending / Approved / Rejected filters; rejections require a reason
- Enter results per test and storage condition, checked against product specs, with pass/fail for visual and sensory tests
- Results are flagged **out of spec** automatically
- View all samples across teams and every product's spec limits

### 🧾 For everyone

- An **audit trail** on every sample: submitted, approved or rejected, results entered — who, when, and why
- Works on phones: a menu drawer, scrolling tabs, and layouts checked at 375px

---

## 💡 Inspiration

Before becoming a software engineer, I worked as a food scientist and laboratory technician. In one of my previous roles as a stability specialist, our team was responsible for testing samples for multiple project teams. On average, we handled over 40 samples a day — each with 5 bottles stored under different conditions.

I've seen firsthand how chaotic this process can get. When things go wrong — like missing samples or samples being tested at the wrong time — it's often the lab techs who get blamed, even when the breakdown happens earlier in the pipeline.

ClearBench is an idea I’ve had since those days in the lab. It’s my way of fixing a broken workflow: making sample submission easier, more transparent, and fairer for everyone involved. It's about giving lab teams tools that match the importance of their work — while reducing the manual burden and the blame game.

ClearBench isn't just about organizing data — it’s about building trust in the process.

---

## 🛠 How it's built

| Layer    | Tech                                                      | Why                                                         |
| -------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| Frontend | React 19, TypeScript, Tailwind CSS, Zustand, React Router | Typed components; Tailwind for fast, mobile-first layouts   |
| Backend  | FastAPI, SQLAlchemy 2, Pydantic                           | Request validation and typed responses from the same models |
| Database | PostgreSQL (Neon) in production, SQLite for tests         | Real relational data; tests run in memory with no setup     |
| Testing  | Vitest, React Testing Library, pytest                     | Unit tests on both sides, plus component tests              |
| CI/CD    | GitHub Actions, branch protection                         | Every PR must pass both suites before it can merge          |
| Hosting  | Vercel (frontend), Render (API), Neon (database)          | Free tiers; `main` deploys automatically                    |

```
Browser ──► Vercel (React app) ──► Render (FastAPI) ──► Neon (Postgres)
```

The frontend uses a **container / view** split: containers fetch data and handle loading and errors, views only render. The current user lives in one Zustand store behind a `useCurrentUser()` hook, so swapping the View-as menu for real login only changes what's behind that hook.

---

## 🧠 Engineering highlights

- **Spec limits are snapshotted onto each result.** If a product's spec changes later, past results still show the limits they were judged against — important for audits.
- **Status changes and their audit events are saved in one transaction.** A sample can't change status without its history entry, and vice versa.
- **Results entry validates everything before writing anything:** the sample's status, every test and condition present, numeric vs pass/fail values — then saves results, out-of-spec flags and the audit event together.
- **Accessible, mobile-first UI:** labelled form fields, keyboard-friendly menu drawer with focus management, tap targets sized for phones.
- **Guard rails:** a pre-push hook runs formatting, linting, type checks and both test suites; CI runs the same checks, and `develop` and `main` can't merge a red PR.

---

## 🚀 Running it locally

**You'll need:** Node 22 (see `.nvmrc`) and Python 3.10+.

### Backend (API on http://localhost:8000)

```bash
git clone https://github.com/kbongco/clear-bench.git
cd clear-bench/backend
python -m venv venv
source venv/bin/activate            # Windows: venv\Scripts\activate
pip install -r requirements-dev.txt
echo "DATABASE_URL=sqlite:///./clearbench.db" > .env
python seed_all.py                  # creates the tables and demo data
uvicorn main:app --reload
```

SQLite is the quickest way to start. To use Postgres instead, copy `backend/.env.example` and set `DATABASE_URL` to your database.

### Frontend (app on http://localhost:5173)

In a second terminal, from the repo root:

```bash
npm install
npm run dev
```

The app talks to `http://localhost:8000` by default. To point it somewhere else, copy `.env.example` to `.env.local` and change `VITE_API_URL`.

---

## 🧪 Testing and CI

```bash
npm run check        # Prettier, ESLint, TypeScript, Vitest, then Ruff and pytest
npm test             # frontend tests only
cd backend && pytest # backend tests only
```

`npm run check` also runs automatically before every `git push`. On GitHub, every pull request runs a frontend and a backend job; both must pass before it can merge.

---

## 🤝 How I used AI

I used [Claude](https://claude.ai) as a pair-programming partner on this project: something like a senior engineer reviewing my work, not a code generator I copied from. ClearBench was **not** vibe coded.

**What I did:**

- Designed the data model, the API and the screens, and made the product decisions, drawing on my years working in labs.
- Wrote the features myself: the endpoints, components, containers, utilities and most of the tests.
- Made the trade-off calls, sometimes against Claude's suggestion. For example, I kept the View-as menu inline instead of building it as a component, because it's scaffolding that real login will replace.
- Debugged my own mistakes and wrote them down in a learning log.

**What Claude did:**

- Planned each feature with me: options, trade-offs and a checklist, before any code.
- Reviewed every push: ran the type checks, linters and tests, and checked the UI in a real browser at phone and desktop widths.
- Explained concepts when I was stuck, usually with hints and blanks to fill in, not finished code.
- Wrote code when I asked for boilerplate or was really stuck: demo seed data, the CI workflow, deployment settings, a few complete files, and a first draft of this README. Every time, I asked for an explanation of how it worked and why, then reviewed and adjusted it before it went in.

**How I kept it honest:**

- Every change went through a pull request, CI and branch protection, and I didn't merge code I couldn't explain.
- Bugs got tests that failed first, so the fixes are proven rather than assumed.

---

## 📍 Status and what's next

ClearBench is a **live MVP** (v1). Coming next:

- **Real login** in place of the View-as menu, with the server — not the browser — deciding who you are
- **Certificate of analysis reports** for a sample's results
- **Editable specs**, notifications, and manager dashboards

See the in-app [What's next](https://clear-bench.vercel.app/whats-next) page, and the [open issues](https://github.com/kbongco/clear-bench/issues) for bugs and polish in progress.
