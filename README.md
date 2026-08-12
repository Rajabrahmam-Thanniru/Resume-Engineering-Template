# Resume Engineering Template

Reusable AI-assisted LaTeX resume workflow for developers and other technical professionals.

## Workflow

```text
Personal Resume
      ↓
Structured Knowledge Base
      ↓
Job Description
      ↓
JD Analysis
      ↓
Evidence Matching
      ↓
Tailored Resume
      ↓
LaTeX Compilation
      ↓
PDF Verification
```

## Repository layout

- `source/`: original resume and supporting documents; preserve as source material.
- `knowledge/`: factual evidence files. Replace the `.example.md` files with verified facts.
- `resume.tex`: Master Resume entry point.
- `sections/`: modular Master Resume content.
- `jobs/`: job descriptions to analyze.
- `output/<job-name>/`: isolated tailored LaTeX, build artifacts, and PDF.
- `tmp/`: rendered PDF images and temporary QA files.

## Using with Codex

1. Place the original resume in `source/`.
2. Replace the fictional knowledge examples with verified facts.
3. Update the placeholder sections in `sections/`.
4. Add a job description under `jobs/`.
5. Ask Codex to analyze the JD and map requirements to evidence.
6. Ask Codex to create the tailored version under `output/<job-name>/` without modifying the Master Resume.
7. Compile and visually inspect the resulting PDF.

## Compile

From the template directory, compile the Master Resume twice:

```text
cd Resume-Engineering-Template
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=tmp resume.tex
```

For a tailored resume, run the compiler from the template directory and use an output directory such as `output/<job-name>`. Use `latexmk -pdf -outdir=output` when available.

Do not treat a successful compilation as sufficient: render the PDF and inspect the page visually.

## Requirements-first and output naming

Before generating or editing a resume, inspect the project, read the applicable JD, analyze requirements, and map them to verified evidence. Do not start LaTeX generation until unsupported requirements are recorded.

Use the verified person's name in normalized form:

```text
Alex Morgan -> Alex_Morgan_Resume.pdf
```

Keep outputs isolated:

```text
output/Alex_Morgan_Resume.pdf
output/acme-fullstack/Alex_Morgan_Resume.tex
output/acme-fullstack/Alex_Morgan_Resume.pdf
```

Job folders distinguish targets, while the filename identifies the person. Check for an existing target path before writing and never silently overwrite it; use explicit approval, a version suffix, or a new job folder.

## Dependency preflight

Before compiling, check the required LaTeX engine, latexmk when used, and Perl when required. If every required command is available, skip installation completely. If anything is missing, list the missing commands, request permission, and install only the dependencies that provide those commands. Never reinstall or upgrade already-satisfied dependencies.

