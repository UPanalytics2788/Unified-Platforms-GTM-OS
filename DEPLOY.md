# Deployment & Launch Runbook — Unified Platforms

This app is a Vite + React SPA whose CMS is **Firebase Firestore** (the browser reads/writes
Firestore directly). An Express server (`server.ts`) serves the built files and proxies the
Gemini chatbot. CI/CD is GitHub Actions → SSH into the Hostinger VPS → build → pm2.

There are **two independent things** to get right: (1) the auto-deploy pipeline, and
(2) the Firebase config that lets the CMS work on your live domain. Both are required to launch.

---

## 1. GitHub Actions secrets (required for auto-deploy)

Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Required | What it is |
|---|---|---|
| `HOST` | ✅ | VPS public IP / hostname |
| `USERNAME` | ✅ | SSH user (e.g. `root` or a deploy user) |
| `SSH_KEY` | ✅ | **Private** SSH key (full PEM, incl. BEGIN/END lines). Its public half must be in the VPS `~/.ssh/authorized_keys` |
| `SSH_PORT` | optional | SSH port if not 22 |
| `GEMINI_API_KEY` | optional | Enables the AI chatbot/agents. Written into `.env` on the server at deploy time |
| `APP_URL` | optional | `https://yourdomain.com` — used for Google Calendar OAuth callback |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | optional | Only if you use the Calendar integration |
| `VITE_CHATBOT_MODEL` | optional | Defaults to `gemini-flash-latest` |

Generate a deploy key locally, then add the public half to the VPS:

```bash
ssh-keygen -t ed25519 -C "github-deploy" -f deploy_key   # no passphrase
# paste contents of deploy_key.pub into the VPS: ~/.ssh/authorized_keys
# paste contents of deploy_key (the PRIVATE file) into the SSH_KEY secret
```

Trigger a run from the **Actions** tab (the workflow now supports manual "Run workflow"),
or push to `main`. If it fails, the run log shows exactly which step died.

---

## 2. VPS prerequisites (one-time, run on the server)

The deploy expects Node, pm2, and nginx to exist. SSH in once and set them up:

```bash
# Node 20 LTS via nvm (recommended so the deploy's `nvm` sourcing finds it)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
. ~/.nvm/nvm.sh && nvm install 20 && nvm alias default 20

npm install -g pm2
pm2 startup    # run the command it prints, so pm2 survives reboots

sudo apt-get update && sudo apt-get install -y nginx
```

The app listens on **127.0.0.1:3000**. nginx must reverse-proxy your domain to it.

`/etc/nginx/sites-available/unified-platforms`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/unified-platforms /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Free SSL:
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 3. Firebase Console — unblock the CMS on your live domain

The CMS appears "empty / not syncing" on the live site because **admin login is blocked on a
non-Firebase domain**, so the CMS never seeds and the site falls back to hardcoded defaults.
Fix in the Firebase project `gen-lang-client-0623449182`:

1. **Authentication → Settings → Authorized domains → Add domain** → add `yourdomain.com`
   (and `www.yourdomain.com`). Without this, Google sign-in and email/password login fail.
2. **Authentication → Sign-in method** → ensure **Google** and **Email/Password** are enabled.
3. **Authentication → Users** → confirm `analytics@unifiedplatforms.com` (and/or
   `shree@unifiedplatforms.com`) exists. These are the admin accounts (see `src/constants.ts`).
4. **Google Cloud Console → APIs & Services → Credentials** → open the Browser API key.
   If it has an **HTTP referrer restriction**, add `https://yourdomain.com/*` and
   `https://www.yourdomain.com/*`, or the site can't even read Firestore.
5. **Deploy the security rules** (`firestore.rules`) to the project if not already:
   `firebase deploy --only firestore:rules` (rules allow public read, admin/editor write).

### Seeding the CMS
Once an admin can log in on the live domain, the app **auto-seeds** Firestore on first admin
visit (`runCMSInitialization` in `src/lib/cms-init.ts`, triggered from `src/App.tsx` when
`settings/brand` is missing). You can also force a reseed from the Admin Dashboard
(CMS Initialization tool, gated by `VITE_ENABLE_CMS_INIT`).

---

## 4. Verify a launch

- [ ] Actions run is green (push to `main`)
- [ ] `https://yourdomain.com` loads over HTTPS
- [ ] `/login` → admin can sign in (no "domain not authorized" error)
- [ ] `/admin` loads and shows seeded content
- [ ] Editing content in `/admin` is reflected on the public page (hard refresh)
- [ ] A test lead from `/contact` appears in `/admin` leads

## Notes / known limitations
- Some content (homepage hero defaults, footer) still has in-code fallbacks used only when
  Firestore is unreachable/empty. Full "edit every pixel from the CMS" requires converting
  those remaining hardcoded sections to Firestore-driven — tracked as a follow-up.
- `firebase-applet-config.json` (public web config) is committed intentionally; these are not
  secrets. Real secrets live in GitHub Actions secrets / the server `.env` only.
