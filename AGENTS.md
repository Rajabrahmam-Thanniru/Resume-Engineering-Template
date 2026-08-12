# Resume Engineering Template Rules

## Purpose

This repository is a reusable AI-assisted resume engineering system. It is designed to turn a personal source resume into a factual master resume and then produce job-specific versions without contaminating the master source.

## Source of truth

- The Master Resume is the canonical presentation layer.
- `source/` contains the original resume or supporting source documents.
- `knowledge/` is the factual evidence layer used for tailoring.
- Never invent experience, technologies, metrics, responsibilities, companies, dates, certifications, awards, or achievements.

## Evidence classification

For every important claim, distinguish:

- `VERIFIED`: explicitly supported by source documents or the user.
- `INFERRED`: plausible but not explicitly confirmed; do not present as fact without confirmation.
- `UNSUPPORTED`: absent, contradicted, or explicitly not used; do not claim.

## Job-specific workflow

1. Read and analyze the job description in `jobs/`.
2. Extract required technologies, responsibilities, preferred skills, experience requirements, and important keywords.
3. Map every relevant requirement to evidence in `knowledge/` and the Master Resume.
4. Classify each requirement as supported, partially supported, inferred, or unsupported.
5. Create the tailored source under `output/<job-name>/`.
6. Tailor the summary, experience ordering, project emphasis, and skills ordering only where evidence supports the change.
7. Never modify the Master Resume or its section files when tailoring a job description.
8. Compile the tailored LaTeX document.
9. Render the PDF to images and visually inspect clipping, overflow, spacing, wrapping, hierarchy, and readability.
10. Report unsupported requirements and any verification limitations.

## Content safety

- Never fabricate metrics. If a source says an API was optimized, do not add a percentage or latency value unless provided.
- Do not keyword-stuff. Use natural wording and only evidence-backed keywords.
- Do not remove a strong factual achievement without explaining why.
- Preserve dates, titles, companies, project functionality, and education details.

## Build and Git safety

- Keep generated artifacts in `output/` and temporary renderings in `tmp/`.
- Keep Git changes focused and reviewable.
- Do not initialize a remote, create a GitHub repository, change global Git identity, or push automatically.
- Before any push, show the proposed remote and ask for confirmation.
