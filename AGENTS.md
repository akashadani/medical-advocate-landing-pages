# Repository Guidelines

## Project Structure & Module Organization
- Landing pages live at the repo root: `medical-advocate-generic.html`, `medical-advocate-parents.html`, `medical-advocate-pets.html` for audience-specific funnels, plus `pricing.html` and the post-submit `thankyou.html`.
- Google Apps Script backends sit alongside the pages: `google-apps-script.js` (multi-project lead capture) and `billrelief-google-apps-script.js` (BillRelief-specific). Copy these into Apps Script when updating the deployment that powers `GOOGLE_SCRIPT_URL`.
- Assets are inline (CSS/JS within each HTML file); there is no build pipeline or node_modules directory.

## Build, Test, and Development Commands
- Preview locally with a static server from the repo root: `python3 -m http.server 8000` then visit `http://localhost:8000/medical-advocate-generic.html?source=dev`.
- Quick-open a single page in the default browser: `open medical-advocate-pets.html`.
- Deploy backend changes by pasting the relevant Apps Script file into `script.google.com`, saving, and creating a new deployment version; update the `GOOGLE_SCRIPT_URL` constants if the endpoint changes.

## Coding Style & Naming Conventions
- Use 2-space indentation for HTML, CSS, and inline JS to match existing files; prefer double quotes in HTML attributes and JS strings where present.
- Keep filenames kebab-case and audience-specific (`medical-advocate-<audience>.html`); reuse the current CTA, gradient palette, and system font stack for consistency across variants.
- Preserve the hidden `project` field (`billrelief`) and `source` query parameter handling so leads stay routed correctly in Sheets.

## Testing Guidelines
- Manual checks per page: load locally, submit the form with a test email, and confirm the success toast appears and no console errors are thrown.
- Verify network behavior: the POST to `GOOGLE_SCRIPT_URL` should return 200; spot-check the target Google Sheet for a new row (Timestamp, Email, Source, Project).
- For copy or layout changes, test on mobile viewport widths (~375px) and ensure above-the-fold content remains visible without scrolling.

## Commit & Pull Request Guidelines
- Commit messages: present-tense, imperative, and concise (e.g., `Refine parents hero copy`, `Align CTA spacing`). Group related page changes in a single commit when possible.
- Pull requests should summarize the intent, list affected pages/scripts, and note any Apps Script deployment updates or `GOOGLE_SCRIPT_URL` changes. Include before/after screenshots for visual changes, plus the local test commands you ran.

## Security & Configuration Tips
- Do not embed secrets or sheet IDs in new files beyond the existing `GOOGLE_SCRIPT_URL`; if the backend URL changes, coordinate the rollout so all pages point to the same deployed script version.
- When cloning or sharing, remind collaborators that this is a private project; avoid uploading assets or variants to public hosts without approval.
