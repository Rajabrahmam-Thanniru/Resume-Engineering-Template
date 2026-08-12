````markdown
# Resume Engineering Template Rules

## Purpose

This repository is a reusable AI-assisted resume engineering system.

It supports two primary workflows:

1. **Master Resume Mode** — build, create, update, and improve the user's factual Master Resume.
2. **Job Tailoring Mode** — use the Master Resume to create a job-specific resume without modifying the Master Resume.

The overall workflow is:

```text
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
```
````

The system must prioritize factual accuracy over ATS optimization.

---

# 1. Project Structure

The expected project structure is:

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

Do not assume every directory must contain files immediately.

---

# 2. Source of Truth

The system uses three levels of information.

## Source Documents

`source/`

Contains the user's original resume and supporting source documents.

These documents establish the factual baseline when building the Master Resume.

## Knowledge Base

`knowledge/`

Contains structured factual evidence extracted from source documents or explicitly confirmed by the user.

The knowledge base should contain information such as:

- experience
- technologies
- responsibilities
- projects
- achievements
- education
- certifications
- other verified professional information

## Master Resume

`resume.tex` and `sections/*.tex`

The Master Resume is the canonical presentation layer.

It represents the user's complete verified professional profile.

The Master Resume is the source used when creating job-specific resumes.

The Master Resume is NOT a job-specific resume.

---

# 3. Evidence Classification

For every important claim, classify the evidence as one of the following.

## VERIFIED

Information explicitly supported by:

- source documents
- the Master Resume
- the knowledge base
- direct user confirmation

Verified information may be used as factual resume content.

## INFERRED

Information that appears plausible based on available evidence but is not explicitly confirmed.

Do not present inferred information as verified experience.

If an inferred detail is important to the resume, ask the user for confirmation before using it as fact.

## UNSUPPORTED

Information that is:

- absent from available evidence
- contradicted by available evidence
- explicitly stated by the user as not used
- requested by the JD but not supported by the candidate's evidence

Do not claim unsupported information.

---

# 4. Factual Accuracy

Never invent:

- technologies
- responsibilities
- achievements
- metrics
- percentages
- performance improvements
- companies
- job titles
- dates
- certifications
- awards
- education
- project functionality
- architecture ownership
- leadership responsibilities
- team size
- customer impact
- business impact

If a source says:

> "Optimized API queries"

do not transform it into:

> "Reduced API latency by 40%"

unless the 40% measurement is explicitly supported.

If a JD asks for AWS but the candidate has no verified AWS experience, do not add AWS.

If a candidate has used Git but it is missing from the Master Resume and the user explicitly confirms it, it may be added during Master Resume Mode.

Never fabricate information to satisfy a Job Description.

---

# 5. Master Resume Mode

Master Resume Mode is used when the user explicitly asks to:

- create a Master Resume
- build a Master Resume from a source resume
- update the Master Resume
- improve the Master Resume
- rebuild the Master Resume
- add verified experience
- add verified skills
- add a verified project
- add verified achievements
- update existing Master Resume content
- correct factual information in the Master Resume

In Master Resume Mode, the agent MAY modify:

```text
resume.tex
sections/*.tex
knowledge/*.md
```

when necessary.

The goal is to improve the Master Resume while preserving factual accuracy.

---

# 6. Building the Master Resume

When starting from a source resume or supporting documents:

1. Inspect the files in `source/`.
2. Extract factual information.
3. Populate or update the relevant `knowledge/` files.
4. Classify important information as:
   - VERIFIED
   - INFERRED
   - UNSUPPORTED

5. Create or update the modular Master Resume.
6. Preserve all supported factual information.
7. Improve wording and presentation without changing factual meaning.
8. Avoid unnecessary keyword optimization.
9. Compile the Master Resume.
10. Inspect compilation output.
11. Render the PDF.
12. Visually inspect the PDF.
13. Fix layout problems if necessary.
14. Recompile and reverify.
15. Report the changes and verification result.

Do not fabricate missing information.

If important information is ambiguous, ask the user before making a factual claim.

---

# 7. Updating the Master Resume

When the user explicitly provides new verified information, update the Master Resume and relevant knowledge files.

For example:

> "I used Docker and CI/CD in this project."

If the user explicitly confirms this, the information may be added to:

- `knowledge/`
- relevant `sections/*.tex`
- `resume.tex` if required

The same applies to other explicitly confirmed technologies, responsibilities, projects, achievements, or workflows.

After updating:

1. Compile.
2. Inspect errors and warnings.
3. Generate the PDF.
4. Render the PDF.
5. Visually inspect the PDF.
6. Confirm the Master Resume remains valid.
7. Report the changes.

---

# 8. Master Resume Protection During JD Tailoring

When tailoring a resume for a Job Description:

**The Master Resume is READ-ONLY.**

Do NOT modify:

```text
resume.tex
sections/*.tex
knowledge/*.md
```

during ordinary JD tailoring.

Job-specific modifications must be isolated under:

```text
output/<job-name>/
```

The Master Resume may only be modified during JD tailoring if the user explicitly asks to update the Master Resume itself.

For example:

> "Tailor my resume for this JD."

means:

```text
READ Master Resume
        ↓
CREATE tailored resume
        ↓
output/<job-name>/
```

It does NOT mean:

```text
MODIFY Master Resume
```

---

# 9. Job Description Mode

When the user provides a Job Description and asks to tailor the resume:

Automatically enter **Job Tailoring Mode**.

The user should not need to repeat the workflow instructions contained in this file.

The agent should use:

1. the Job Description
2. the Master Resume
3. the knowledge base
4. explicitly verified information provided by the user

as the evidence sources.

---

# 10. Job Description Analysis

Before modifying a job-specific resume, analyze the Job Description.

Extract:

- required technologies
- required technical skills
- required responsibilities
- preferred technologies
- preferred skills
- experience requirements
- education requirements
- domain requirements
- important terminology
- relevant ATS keywords
- soft skills where relevant
- development methodologies
- tooling requirements

Do not treat every JD keyword as something the candidate necessarily possesses.

The purpose of JD analysis is to identify what the employer is looking for and determine which requirements are supported by the candidate's evidence.

---

# 11. Evidence Mapping

Compare the Job Description against:

1. `knowledge/`
2. the Master Resume
3. explicitly verified information provided by the user

For each important requirement, classify the candidate's match as:

- **Strong Match**
- **Partial Match**
- **Not Verified**
- **Unsupported**

This match classification is separate from the evidence classification.

Example:

```text
Requirement: React

Evidence:
Experience building React applications.

Evidence status:
VERIFIED

Match:
Strong Match
```

Another example:

```text
Requirement: AWS

Evidence:
No verified AWS experience found.

Evidence status:
UNSUPPORTED

Match:
Unsupported
```

Never turn an unsupported requirement into a resume claim.

---

# 12. Job-Specific Resume

Create the tailored resume under:

```text
output/<job-name>/
```

For example:

```text
output/
└── company-fullstack-engineer/
    ├── resume.tex
    └── resume.pdf
```

Additional job-specific supporting files may be stored inside the same directory when useful.

The tailored resume may:

- change summary emphasis
- reorder experience bullets
- reorder projects
- emphasize relevant technologies
- reorder skills
- improve wording while preserving factual meaning
- use relevant JD terminology naturally
- remove less relevant content when necessary for space
- emphasize verified experience that directly matches the JD

The tailored resume must NOT:

- invent experience
- invent metrics
- add unsupported technologies
- add unsupported responsibilities
- add unsupported achievements
- modify the Master Resume
- modify the factual knowledge base merely to satisfy the JD

---

# 13. ATS Optimization

Optimize for ATS compatibility without manipulating the system.

Use JD keywords when:

1. the keyword accurately describes verified experience, and
2. it can be incorporated naturally.

Do not add keywords merely because they appear in the JD.

Do not repeat keywords unnecessarily.

Do not sacrifice readability for keyword density.

Prioritize:

- accurate terminology
- standard section headings
- readable structure
- selectable text
- clear technical skills
- concise experience bullets
- consistent formatting

The resume should be optimized for both:

1. ATS readability
2. human readability

---

# 14. Content Optimization

Prefer:

- concise bullets
- action-oriented wording
- technically specific descriptions
- relevant technologies
- legitimate measurable achievements
- strong evidence-based descriptions

Prioritize information according to the target role.

Do not remove a strong factual achievement without explaining why.

Preserve:

- dates
- job titles
- companies
- project functionality
- education
- verified achievements

When space is limited, prefer reducing redundancy over deleting important evidence.

---

# 15. LaTeX Build Workflow

After creating or modifying any resume:

1. Compile the LaTeX document.
2. Inspect compilation errors.
3. Inspect warnings.
4. Fix actual compilation errors.
5. Fix meaningful layout problems.
6. Confirm the PDF was generated.
7. Confirm the expected page count.
8. Render the PDF to images.
9. Visually inspect:
   - clipping
   - overflow
   - page breaks
   - spacing
   - wrapping
   - alignment
   - hierarchy
   - readability

10. Fix layout issues if necessary.
11. Compile again.
12. Re-render if necessary.
13. Perform final verification.

Never claim successful verification without actually checking the generated PDF.

Non-fatal LaTeX warnings may remain if they do not cause visible or structural problems. Report them when relevant.

---

# 16. Build Environment

The project uses MiKTeX.

Available LaTeX engines may include:

- `latexmk`
- `pdflatex`
- `xelatex`
- `lualatex`

If the executables are not available on PATH, use the verified local installation path.

Do not modify the operating system PATH automatically.

Prefer the existing project build configuration when one is already established.

Do not introduce a new LaTeX engine or build system unless necessary.

---

# 17. Output and Temporary Files

Keep job-specific generated files under:

```text
output/<job-name>/
```

Keep temporary rendering and inspection files under:

```text
tmp/
```

Do not mix generated build artifacts with source files.

Do not overwrite the Master Resume with a job-specific version.

Keep the Master Resume's final PDF and build artifacts organized according to the project's established structure.

Do not unnecessarily commit generated LaTeX build artifacts.

---

# 18. Git Safety

Keep Git changes:

- focused
- reviewable
- understandable

Do not:

- change global Git identity
- modify another Git repository
- expose credentials
- expose access tokens
- expose passwords
- expose private SSH keys
- create a GitHub repository automatically
- add a remote automatically
- push automatically

Repository-local Git configuration may be used when the user explicitly wants a repository to use a particular Git identity.

Before any push:

1. Show the proposed remote.
2. Show the current branch.
3. Show the files or commits that will be pushed.
4. Ask the user for confirmation.

Do not assume that a configured Git identity means the user wants to push.

---

# 19. Privacy and Template Safety

This repository may be used as a reusable template.

Before sharing or publishing the template, ensure it does not contain:

- personal names
- personal email addresses
- phone numbers
- home addresses
- private GitHub URLs
- private LinkedIn URLs
- company-confidential information
- private source documents
- credentials
- API keys
- access tokens
- private configuration
- personal Git history

Use placeholders in reusable template content.

Example:

```text
[YOUR NAME]
[YOUR EMAIL]
[YOUR PHONE]
[YOUR GITHUB]
[YOUR LINKEDIN]
[COMPANY NAME]
[PROJECT NAME]
```

Never copy the user's `.git` directory into a reusable template.

---

# 20. Final Report — Master Resume Mode

When creating or updating the Master Resume, report:

## Source Analyzed

List the source documents used.

## Knowledge Changes

List important factual information added, removed, or updated.

Clearly identify information that was:

- VERIFIED
- INFERRED
- UNSUPPORTED

Do not silently convert inferred information into verified information.

## Master Resume Changes

Summarize changes to:

- summary
- experience
- projects
- skills
- education
- formatting/layout

## Verification

Confirm:

- LaTeX compilation
- PDF generation
- PDF rendering
- visual inspection
- page count
- major warnings or limitations

---

# 21. Final Report — Job Tailoring Mode

When tailoring for a Job Description, report:

## JD Requirements

List the most important requirements extracted from the JD.

## Requirement → Evidence

Show the relevant candidate evidence.

Example:

```text
React
→ Capable / verified through relevant projects

Node.js
→ Verified through relevant backend/API work

AWS
→ Unsupported / no verified evidence
```

## Strong Matches

List requirements strongly supported by the candidate's experience.

## Partial Matches

List requirements where related experience exists but does not fully satisfy the JD.

## Not Verified / Unsupported

List requirements without sufficient evidence.

Do not attempt to hide important gaps.

## Resume Changes

Explain changes to:

- summary
- experience
- projects
- skills
- wording
- ordering

## Generated Files

Provide:

- tailored `.tex`
- tailored `.pdf`

## Verification

Confirm:

- compilation succeeded
- PDF generated
- PDF rendered
- visual inspection completed
- page count checked
- ATS-readable text checked where practical
- remaining warnings or limitations

---

# 22. Ambiguous Requests

If the user says something ambiguous such as:

> "Update my resume"

determine whether they mean:

- update the Master Resume, or
- create a job-specific resume.

If the intended operation cannot be determined safely, ask for clarification.

If the user explicitly says:

> "Update my Master Resume"

use Master Resume Mode.

If the user says:

> "Tailor my resume for this JD"

use Job Tailoring Mode.

If the user says:

> "Compare my resume with this JD"

do not modify the resume unless explicitly requested.

Instead:

1. analyze the JD
2. analyze the Master Resume
3. map requirements to evidence
4. report matches and gaps

---

# 23. Default Behavior

The user should not need to repeat the workflow instructions contained in this file.

When the user provides a Job Description and asks to tailor their resume:

Automatically:

```text
Analyze JD
    ↓
Find Evidence
    ↓
Classify Evidence
    ↓
Map Requirements
    ↓
Tailor Resume
    ↓
Compile LaTeX
    ↓
Render PDF
    ↓
Verify
    ↓
Report
```

When the user asks to create or update the Master Resume:

Automatically:

```text
Read Sources
    ↓
Extract Facts
    ↓
Classify Evidence
    ↓
Update Knowledge Base
    ↓
Build/Update Master Resume
    ↓
Compile LaTeX
    ↓
Render PDF
    ↓
Verify
    ↓
Report
```

When the user asks only for JD analysis:

```text
Read JD
    ↓
Extract Requirements
    ↓
Read Master Resume
    ↓
Map Evidence
    ↓
Report Matches and Gaps
```

Do not modify files unless the user asks for a modification.

---

# 24. Minimal User Commands

The workflow should be usable with short natural-language commands.

Examples:

### Build the Master Resume

> Build my Master Resume from the resume in `source/`.

### Update the Master Resume

> Update my Master Resume with my new Docker and CI/CD experience.

### Analyze a JD

> Compare my Master Resume with this JD.

### Tailor for a JD

> Tailor my resume for `jobs/frontend-engineer.md`.

### Tailor from pasted JD

> Tailor my Master Resume for the following job description: [JD]

### Check gaps

> What are the biggest gaps between my Master Resume and this JD?

### Verify resume

> Compile and verify my Master Resume.

The user should not need to repeat the full workflow instructions.

---

# 25. Core Principles

The system exists to produce the **best truthful resume for the target situation**.

The following principles have priority:

1. **Factual accuracy over ATS optimization.**
2. **Evidence over assumptions.**
3. **Master Resume stability over job-specific optimization.**
4. **Natural keyword usage over keyword stuffing.**
5. **Readable resumes over overly dense resumes.**
6. **Verified PDF output over unverified source changes.**
7. **Minimal Git changes over unnecessary repository modifications.**
8. **User approval before potentially destructive or external Git operations.**

The fundamental rule is:

> **Never sacrifice factual accuracy for ATS optimization.**

The preferred workflow is:

```text
Right Evidence
    ↓
Right Master Resume
    ↓
Right Job
    ↓
Right Tailoring
    ↓
Verified Result
```

```

```

# 26. Windows LaTeX Setup

The template can be compiled from a Windows terminal. MiKTeX provides `pdflatex`, `xelatex`, `lualatex`, and usually `latexmk`; Strawberry Perl provides the Perl runtime used by `latexmk` on Windows.

Before installing anything, check whether the tools are already available:

```powershell
Get-Command latexmk,pdflatex,xelatex,lualatex,perl -ErrorAction SilentlyContinue
Test-Path "C:\Program Files\MiKTeX\miktex\bin\x64"
Test-Path "$env:LOCALAPPDATA\Programs\MiKTeX\miktex\bin\x64"
Test-Path "C:\Strawberry\perl\bin\perl.exe"
```

If MiKTeX or Strawberry Perl is missing and Chocolatey is installed, install them from an elevated PowerShell terminal:

```powershell
choco install miktex.install -y
choco install strawberryperl -y
```

If Chocolatey is unavailable, install MiKTeX and Strawberry Perl from their official websites, then reopen the terminal. Do not download installers from untrusted sources.

After installation, verify the executables. If they are installed but not on `PATH`, use explicit paths or add the installation directories to the user's PATH manually; do not change the system PATH automatically from the resume workflow. Typical paths are:

```text
C:\Program Files\MiKTeX\miktex\bin\x64\
%LOCALAPPDATA%\Programs\MiKTeX\miktex\bin\x64\
C:\Strawberry\perl\bin\
C:\Strawberry\c\bin\
```

Example explicit compilation:

```powershell
& "$env:LOCALAPPDATA\Programs\MiKTeX\miktex\bin\x64\pdflatex.exe" `
  -interaction=nonstopmode -halt-on-error `
  -output-directory=output resume.tex
```

Run the compiler from the repository root so `resume.tex` resolves the local `sections/` directory. Compile twice when cross-references or hyperlinks are present. Render the resulting PDF and inspect it before reporting completion.

Never install packages or tools silently as part of ordinary resume tailoring. Report missing dependencies and ask for permission before using an installer or package manager.

# 27. Cross-Platform Dependency Installation

The workflow must work on Windows, macOS, and Linux. Detect dependencies before installing them, and never assume that a command is on `PATH`.

## Detection

Run the checks appropriate to the current shell:

```text
latexmk --version
pdflatex --version
xelatex --version
lualatex --version
perl --version
```

If a command is missing, install only the missing dependency. MiKTeX or TeX Live provides the LaTeX engines; `latexmk` may be included with the distribution or installed separately; Strawberry Perl is needed for `latexmk` on Windows, while Perl is commonly preinstalled on macOS and Linux.

## Windows

Preferred package-manager route when Chocolatey is available:

```powershell
choco install miktex.install -y
choco install strawberryperl -y
```

If Chocolatey is unavailable, install MiKTeX and Strawberry Perl from their official websites. Reopen the terminal after installation and verify the commands again. Use explicit executable paths if the installers did not update `PATH`.

## macOS

With Homebrew:

```bash
brew install --cask mactex
brew install latexmk
```

MacTeX includes the standard LaTeX engines. If `latexmk` is already included, the second command is unnecessary.

## Debian or Ubuntu Linux

```bash
sudo apt update
sudo apt install -y latexmk texlive-latex-base texlive-latex-recommended texlive-fonts-recommended texlive-latex-extra perl
```

## Fedora Linux

```bash
sudo dnf install -y latexmk texlive-scheme-basic texlive-collection-latexextra perl
```

## Arch Linux

```bash
sudo pacman -S --needed latexmk texlive-basic texlive-latexrecommended texlive-latexextra perl
```

If the distribution is not listed, use its official package manager to install TeX Live, `latexmk`, and Perl. Do not mix package managers unnecessarily.

## Compilation rule

Run compilation from the repository root so local `sections/` paths resolve correctly. Prefer `latexmk -pdf` when available; otherwise run the selected LaTeX engine twice when cross-references or hyperlinks are present. Render the PDF and visually inspect it after compilation.

Do not automatically install dependencies during ordinary resume tailoring. Report what is missing and ask for permission before using `sudo`, an elevated shell, a package manager, or an installer.
