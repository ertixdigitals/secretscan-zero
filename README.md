# SecretScan-Zero

**A zero-backend, zero-knowledge secret scanner that finds and redacts hardcoded credentials entirely inside your browser.**


---

## What it does

Drag in a folder, files, or a `.zip` and SecretScan-Zero detects hardcoded API keys, private keys, database passwords, tokens, and JWTs — then gives you two ways to remediate:

- **Download Sanitized ZIP** — a clean copy of your code with every secret replaced by `[REDACTED_SECURE_TOKEN]`. Safe to share.
- **Copy AI Remediation Prompt** — an LLM-ready prompt grouped by file that tells your AI coding agent to migrate the secrets to environment variables (`process.env` / `import.meta.env`).

It also exports a **Markdown + JSON audit report** (file, line, type, severity, endpoints). A beginner-friendly **How to Use** guide is built into the page.

## Privacy guarantee

Your code never leaves the browser. All scanning runs in a **Web Worker thread**; files live only in memory and are garbage-collected after the scan. No server, no network calls, no storage, no analytics. Nothing is uploaded — ever.

## How it works

1. **Ingest** — the UI thread walks dropped directories, decompresses ZIPs (with zip-bomb guards), and decodes text.
2. **Scan** — the Worker splits files into 256 KB overlapping slices and runs a corpus of **78+ signatures** plus Shannon-entropy heuristics; every finding records file + line + column.
3. **Redact** — overlapping match ranges are merged and every credential is rewritten in-place to `[REDACTED_SECURE_TOKEN]`; finding `context`/`snippet` fields are masked at the source.
4. **Verify (fail-closed)** — the Worker checks its own redaction invariant, then the UI re-verifies every file payload (`verifyRedaction`) and both generated report strings (`verifyPayloadRedaction`) against every known secret value. **If anything leaks, the download is aborted.**
5. **Package** — the verified files and reports are bundled with JSZip and downloaded as `Blob`s.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static bundle -> dist/
npm run preview  # serve the production build
npm test         # 131-test security/robustness suite
```

## Using the tool

1. **Drop code** — drag a project folder, files, or a `.zip` onto the drop zone (or click to browse).
2. **Review findings** — the Secret Redaction Center shows every secret with a prominent `L{line}` badge, file, type, category, and severity; filter by severity. Toggle **Deep Crypto Scan** to also flag 64-char hex/Ethereum private keys.
3. **Remediate** — **Download Sanitized ZIP** (with plain-English success feedback), **Copy AI Remediation Prompt**, or save the **Audit Report**. Big folders (`node_modules`, `.git`, `dist`) and lock files are left out of the ZIP automatically.

## Hardening

- ReDoS-safe regexes (bounded quantifiers, capped PEM body)
- Zip-bomb guards: entry-count, per-entry size, 1000:1 ratio, 128 MB budget
- Memory caps (20 MB/file, 256 MB corpus) and per-file/per-global time budgets
- Path sanitization (`..` traversal, drive letters, null bytes) and control-character stripping for all displayed/archived content
- Case-insensitive exclusion of lockfiles and build directories in both Worker and UI

## Tech stack

| Layer | Technology |
| --- | --- |
| UI | React 18 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| Engine | Native Web Worker |
| ZIP | JSZip |
| Icons | lucide-react |
| Tests | node:test |

## Deployment

Fully static — deploy the `dist/` folder to Vercel or GitHub Pages. No environment variables, no server.

## Changelog

### v1.5.0 — Fail-closed verification, dual remediation, beginner UX

- Sanitized ZIP download gated by `verifyRedaction` + `verifyPayloadRedaction`; any leaked value aborts the archive
- AI remediation prompt generator with preview modal (references your AI coding agent)
- Worker findings mask `context`/`snippet` at the source; the in-archive JSON report masks every finding field
- Case-insensitive lockfile/build-dir exclusion in Worker and UI
- Memoized report builders; `replaceAll` + deduplicated value sets in verification paths
- Beginner guide (5-step Quick Start + "What every button and box does"), header toggle, download success feedback
- Prominent `L{line}` badges on every secret finding

---

**SecretScan-Zero** · Zero backend · Zero cost · Zero knowledge. Your code never leaves the browser.
