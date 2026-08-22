# Yashwant Saini — Portfolio

A static, GitHub Pages–ready portfolio. All content lives in one file
(`data.js`) so you can update it without ever touching HTML, CSS or JS.

```
portfolio/
├── index.html          public site
├── style.css            styling (light/dark theme)
├── script.js             renders index.html from data.js
├── data.js                ← ALL editable content lives here
├── admin/
│   ├── admin.html        local, offline content-editing form
│   ├── admin.js
│   └── admin.css
└── assets/
    ├── resume.pdf         the one downloadable file on the site
    └── certificates/      certificate images (view-only, never downloadable)
```

---

## 1. Publish it on GitHub Pages

1. Create a new **public** GitHub repository (e.g. `portfolio`).
2. Upload everything in this folder to the repository (keep the folder
   structure exactly as-is).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, pick
   the `main` branch and the `/ (root)` folder, then **Save**.
5. GitHub gives you a URL like:
   `https://YOUR-USERNAME.github.io/portfolio/`
   The site is live there within a minute or two. No paid hosting, no
   build step, no server required.

---

## 2. Updating content — no code editing required

All the text on the site (about, skills, experience, projects,
certifications, education, contact links) comes from **`data.js`**.
`index.html`, `style.css` and `script.js` never need to change for a
normal content update.

### Option A — Recommended: use the local content editor

1. Open `admin/admin.html` **directly in your browser** (double-click
   the file, or right-click → Open with → your browser). It runs
   entirely on your own computer — it makes no network requests and
   talks to nothing online.
2. Click **Import data.js** and select the `data.js` file from this
   folder.
3. Edit any section using the forms (add/remove experience, projects,
   certifications, skills, etc.).
4. Click **Export data.js** — an updated `data.js` file downloads.
5. Replace the old `data.js` in your project folder with the
   downloaded one.
6. Commit and push the change to GitHub (or use **Add file → Upload
   files** on the repository's GitHub web page). Your GitHub login is
   the only "authentication" this ever needs — the change goes live as
   soon as GitHub Pages rebuilds, usually within a minute.

`admin/admin.html` is **not linked from the public site** and does not
appear in navigation. It's a private convenience tool for you; it has
no password of its own because it never needs to write anywhere —
publishing still happens through your own GitHub account, which is
real authentication GitHub already provides. This is also why the
project needs no backend server, API keys, or database: there is
nothing to secure beyond your normal GitHub login.

### Option B — Edit data.js directly

`data.js` is plain, readable JSON-like JavaScript. You can also open it
in any text editor (or edit it straight in the GitHub website's file
editor) and change values directly — just keep the structure (the
`{ }`, `[ ]`, and quotes) intact. See the comments at the top of the
file for the exact shape expected.

### Adding a certificate image

1. Add the image file to `assets/certificates/` (e.g.
   `assets/certificates/python.jpg`).
2. In `data.js` (or via the admin form), set that certificate's
   `image` field to the matching path, e.g.
   `"assets/certificates/python.jpg"`.
3. Certificates are always view-only on the public site — there is no
   download button for them, by design.

### Updating your resume

Replace `assets/resume.pdf` with your latest resume, keeping the same
file name. The **View Resume** / **Download Resume** buttons on the
site always point to this one file.

---

## 3. Why this is secure

- The public repository and public site contain **no passwords, API
  keys, or tokens** — there's nothing to leak because nothing needs
  server-side authentication.
- The public site is **read-only** for every visitor. There is no
  contact form, no database, and no code path that lets a visitor
  change, upload, or delete anything.
- The only way to change content is to edit `data.js` and push it to
  GitHub yourself, which is protected by your own GitHub account login
  — real authentication, not a frontend password box.
- `admin/admin.html` never sends data anywhere; it only reads a local
  file you choose and offers a local file to download.

---

## 4. Local preview

Because the site loads `data.js` as a plain `<script>` tag (not
`fetch`), you can preview it by simply opening `index.html` in a
browser — no local server required. (`admin/admin.html` works the same
way.)
