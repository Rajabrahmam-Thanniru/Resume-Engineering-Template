# Resume Engineering Template Rules

## Purpose

This repository is a reusable AI-assisted resume engineering system.

It supports two primary workflows:

1. **Master Resume Mode** — build, create, update, and improve a user's factual Master Resume.
2. **Job Tailoring Mode** — use the Master Resume to create a job-specific resume without modifying the Master Resume.

The overall workflow is:

Source Resume
↓
Knowledge Base
↓
Master Resume
↓
Job Description
↓
Evidence Mapping
↓
Tailored Resume
↓
LaTeX Compilation
↓
PDF Verification

The system must prioritize factual accuracy over ATS optimization.

---

# 1. Project Structure

The expected structure is:

```text
/
├── AGENTS.md
├── README.md
├── .gitignore
│
├── source/
│   └── original resume / supporting documents
│
├── knowledge/
│   ├── experience.md
│   ├── projects.md
│   ├── skills.md
│   └── achievements.md
│
├── jobs/
│   └── job descriptions
│
├── sections/
│   ├── summary.tex
│   ├── experience.tex
│   ├── projects.tex
│   ├── skills.tex
│   └── education.tex
│
├── resume.tex
│
├── output/
│   └── <job-name>/
│
└── tmp/
    └── temporary rendering/build files
```
