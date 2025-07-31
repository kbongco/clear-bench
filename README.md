# 🧪 ClearBench

*Modern sample tracking for laboratory teams — built for visibility, accountability, and peace of mind.*

ClearBench is a role-based sample submission and tracking tool designed to help scientists, lab staff, and managers collaborate more efficiently — and with more accountability.

Built with React and TypeScript on the frontend and powered by FastAPI on the backend (in progress), the goal is to replace chaotic spreadsheet workflows with a structured, auditable system that keeps everyone on the same page — and off the blame bench.

---

## 📚 Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Inspiration](#inspiration) 
- [Tech Stack](#tech-stack)  
- [Screenshots](#screenshots)  
- [Getting Started](#getting-started)  
- [Architecture](#architecture)  
- [Planned Features](#planned-features)  
- [Data Flow & Permissions](#data-flow--permissions)  
- [Status](#status)  
- [License](#license)  

---

## 🧩 Overview

ClearBench brings order to sample testing pipelines in labs. It supports role-based workflows, allows lab techs to validate and track sample submissions, and lets scientists follow the status of their requests — all with a built-in audit trail and metrics dashboard to surface patterns early.

---

## ✅ Features

### 🔬 Scientists (non-managers)
- Submit samples for testing  
- View and search samples within their team  
- Get notified when samples are out of spec or rejected  
- Generate PDF/CSV reports  
- Track sample status  

### 👩‍🔬 Scientists (managers)
- All of the above, plus:
- View and search across all teams  
- Access metric dashboards  

### 🧪 Lab Techs
- View and search all samples across teams  
- Validate submissions and paperwork  
- Notify submitters + managers if samples are invalid  
- Generate reports  
- View audit trails  
- Access metric dashboards  

---

## 💡 Inspiration

Before becoming a software engineer, I worked as a food scientist and laboratory technician. In one of my previous roles as a stability specialist, our team was responsible for testing samples for multiple project teams. On average, we handled over 40 samples a day — each with 5 bottles stored under different conditions.

I've seen firsthand how chaotic this process can get. When things go wrong — like missing samples or samples being tested at the wrong time — it's often the lab techs who get blamed, even when the breakdown happens earlier in the pipeline.

ClearBench is an idea I’ve had since those days in the lab. It’s my way of fixing a broken workflow: making sample submission easier, more transparent, and fairer for everyone involved. It's about giving lab teams tools that match the importance of their work — while reducing the manual burden and the blame game.

ClearBench isn't just about organizing data — it’s about building trust in the process.

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Zustand, Tailwind CSS  
- **Backend** (planned): FastAPI (Python)  
- **Auth**: TBD (JWT, Firebase Auth, or similar)  
- **CI/CD**: GitHub Actions  
- **Hosting**: Firebase (frontend), Render/Fly.io (backend target)  

---

## 🖼 Screenshots

Coming soon!  
Mockups and UI demos will be included once core components are complete.

---

## 🚀 Getting Started

### Frontend Setup

```bash
git clone https://github.com/your-username/clearbench.git
cd clearbench
npm install
npm run dev
