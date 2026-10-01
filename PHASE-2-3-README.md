# Phase 2 + Phase 3 — Ready

## Phase 2 (works now without XAMPP)

1. Open `register.html` → create account
2. Open `login.html` → login
3. Open `dashboard.html` → see history
4. Header on `index.html` shows Login/Register or Dashboard/Logout

Auth uses localStorage (works offline).

Files:
- `register.html`, `login.html`, `dashboard.html`
- `js/auth.js`

## Phase 3 (XAMPP + MySQL)

1. Start Apache + MySQL in XAMPP
2. phpMyAdmin → Import `database.sql`
3. Put project in `htdocs/Khmer-Calculator-Hub`
4. Edit `api/config.php` if needed (default root / empty password)
5. Set `USE_API = true` in `js/auth.js` when connecting frontend to PHP API

API:
- POST `api/register.php`
- POST `api/login.php`
- POST `api/logout.php`
- GET  `api/user.php`
- GET/POST/DELETE `api/history.php`
