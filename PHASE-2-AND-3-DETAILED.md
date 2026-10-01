# Phase 2 + Phase 3 — Parse លម្អិត

---

# PHASE 2 — Account

```
Register
   ↓
Login
   ↓
Dashboard
   ↓
Calculator History (ភ្ជាប់ Account)
```

---

## 2.1 ទំព័រ / Pages ដែលត្រូវបង្កើត

| # | ទំព័រ | File | ការងារ |
|---|--------|------|--------|
| 1 | Register | `register.html` | ចុះឈ្មោះ user ថ្មី |
| 2 | Login | `login.html` | ចូលប្រព័ន្ធ |
| 3 | Dashboard | `dashboard.html` | ទំព័រដើមរបស់ user |
| 4 | Profile (optional) | `profile.html` | មើល/កែព័ត៌មាន |
| 5 | Header (update) | `index.html` + calculators | ប៊ូតុង Login/Register/Logout |

---

## 2.2 Register — Parse លម្អិត

### Form Fields

| Field | Type | Validation |
|-------|------|------------|
| name | text | ចាំបាច់, min 2 តួ |
| email | email | ចាំបាច់, format email, unique |
| password | password | ចាំបាច់, min 6 តួ |
| confirm_password | password | ត្រូវគ្នានឹង password |

### Flow

```
User បើក register.html
    → បញ្ចូល name, email, password, confirm
    → Click Register
    → Frontend validate (empty, email format, password match)
    → Backend: ពិនិត្យ email មានរួចឬទេ
    → Hash password
    → Insert users table
    → Success → redirect Login (ឬ auto-login)
    → Error → បង្ហាញសារ (email មានរួច, ...)
```

### UI Elements

- Input: Name, Email, Password, Confirm Password
- Button: Register
- Link: "Already have account? Login"
- Error messages (ខ្មែរ/EN)
- Success message

---

## 2.3 Login — Parse លម្អិត

### Form Fields

| Field | Type | Validation |
|-------|------|------------|
| email | email | ចាំបាច់ |
| password | password | ចាំបាច់ |

### Flow

```
User បើក login.html
    → បញ្ចូល email, password
    → Click Login
    → Frontend validate
    → Backend: រក user តាម email
    → Verify password (hash compare)
    → Create Session / Token
    → Success → redirect Dashboard
    → Error → "Email or password incorrect"
```

### Session / Auth State

```
Logged in:
  - sessionStorage / cookie: user_id, name, email
  - Header បង្ហាញ: ឈ្មោះ user + Dashboard + Logout

Logged out (Guest):
  - Header បង្ហាញ: Login + Register
  - Calculator នៅប្រើបាន
  - History នៅ localStorage
```

---

## 2.4 Dashboard — Parse លម្អិត

### Sections លើ Dashboard

| Section | ខ្លឹមសារ |
|---------|----------|
| Welcome | "សួស្តី, {name}!" |
| Quick Links | តំណភ្ជាប់ទៅ Calculators ពេញនិយម |
| My History | បញ្ជីប្រវត្តិគណនារបស់ user |
| Stats (optional) | ចំនួនការគណនា, ម៉ាស៊ីនប្រើច្រើន |
| Logout | ប៊ូតុងចាកចេញ |

### History លើ Dashboard

```
GET history របស់ user_id
    → បង្ហាញ list:
        - ឈ្មោះម៉ាស៊ីនគណនា
        - លទ្ធផល (format តាមភាសា)
        - កាលបរិច្ឆេទ
        - ប៊ូតុងលុប
    → Clear All History
```

### Flow ពេលគណនា (Logged-in)

```
User login រួច → បើក Calculator → គណនា
    → រក្សាទុក localStorage (backup)
    → រក្សាទុក Server (user_id + data)   ← Phase 2/3
    → Dashboard បង្ហាញ history ពី Server
```

---

## 2.5 Auth UI លើ Header (គ្រប់ទំព័រ)

### Guest

```
[Logo]  Calculators  |  Login  |  Register  |  🌐 KH/EN
```

### Logged-in

```
[Logo]  Calculators  |  Dashboard  |  {Name}  |  Logout  |  🌐 KH/EN
```

### Logic

```javascript
if (isLoggedIn()) {
  // បង្ហាញ Dashboard, Name, Logout
} else {
  // បង្ហាញ Login, Register
}
```

---

## 2.6 History Strategy Phase 2

| User Type | History Storage |
|-----------|-----------------|
| Guest | localStorage តែប៉ុណ្ណោះ |
| Logged-in | Database (user_id) + optional localStorage backup |

### Merge (optional)

```
ពេល Login:
  - មាន history ក្នុង localStorage
  - មាន history ក្នុង account
  → ជម្រើស: Merge local → account
  → ឬទុកដោយឡែក
```

---

## 2.7 File Structure Phase 2 (បន្ថែមលើ Phase 1)

```
Khmer-Calculator-Hub/
├── index.html              (update header)
├── register.html           ← NEW
├── login.html              ← NEW
├── dashboard.html          ← NEW
├── profile.html            ← NEW (optional)
├── js/
│   ├── auth.js             ← NEW (login/register/session)
│   ├── history.js          (update: sync to server បើ login)
│   └── ...
├── calculators/            (update header លើគ្រប់ទំព័រ)
└── ...
```

---

## 2.8 auth.js — Functions សំខាន់

| Function | ការងារ |
|----------|--------|
| `register(name, email, password)` | ចុះឈ្មោះ |
| `login(email, password)` | ចូល |
| `logout()` | ចាកចេញ |
| `isLoggedIn()` | ពិនិត្យ session |
| `getCurrentUser()` | យក user បច្ចុប្បន្ន |
| `requireAuth()` | redirect បើមិន login (សម្រាប់ Dashboard) |

---

## 2.9 Validation Messages (ខ្មែរ / EN)

| Key | English | ខ្មែរ |
|-----|---------|--------|
| enterAllFields | Please fill all fields | សូមបញ្ចូលគ្រប់វាល |
| invalidEmail | Invalid email format | អ៊ីមែលមិនត្រឹមត្រូវ |
| passwordTooShort | Password min 6 characters | ពាក្យសម្ងាត់យ៉ាងហោច ៦ តួ |
| passwordMismatch | Passwords do not match | ពាក្យសម្ងាត់មិនត្រូវគ្នា |
| emailExists | Email already registered | អ៊ីមែលនេះមានរួចហើយ |
| loginFailed | Email or password incorrect | អ៊ីមែល ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវ |
| registerSuccess | Registration successful | ចុះឈ្មោះជោគជ័យ |
| loginSuccess | Login successful | ចូលប្រព័ន្ធជោគជ័យ |

---

## 2.10 Phase 2 — Implementation Order

```
Step 1: បង្កើត register.html + login.html (UI)
Step 2: បង្កើត auth.js (frontend logic + localStorage fake auth សម្រាប់ demo)
Step 3: Update header លើ index + calculators
Step 4: បង្កើត dashboard.html (បង្ហាញ history)
Step 5: Connect history ទៅ user (localStorage key តាម user_id)
Step 6: (បន្ទាប់) តភ្ជាប់ Backend ពិត → Phase 3
```

### Demo Mode (មុន Database)

```
users ក្នុង localStorage:
{
  "users": [
    { "id": 1, "name": "Sok", "email": "sok@mail.com", "password": "hashed..." }
  ],
  "currentUser": { "id": 1, "name": "Sok", "email": "sok@mail.com" }
}

history តាម user:
  calculatorHistory_user_1
  calculatorHistory_user_2
```

---

# PHASE 3 — Database

```
HTML/CSS/JS
      ↓
PHP/Laravel
      ↓
MySQL + XAMPP
      ↓
Users + History
```

---

## 3.1 Database Schema — Parse លម្អិត

### Database Name

```
khmer_calculator_hub
```

### Table: `users`

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

| Column | Type | Note |
|--------|------|------|
| id | INT PK AI | |
| name | VARCHAR(100) | ឈ្មោះ |
| email | VARCHAR(150) UNIQUE | login |
| password | VARCHAR(255) | bcrypt hash |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### Table: `calculation_history`

```sql
CREATE TABLE calculation_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  calculator_type VARCHAR(50) NOT NULL,
  calculator_name VARCHAR(100) NOT NULL,
  data JSON NOT NULL,
  result_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_calculator_type (calculator_type)
);
```

| Column | Type | Note |
|--------|------|------|
| id | INT PK AI | |
| user_id | INT FK | → users.id |
| calculator_type | VARCHAR(50) | age, bmi, loan, ... |
| calculator_name | VARCHAR(100) | "BMI Calculator" |
| data | JSON | structured data |
| result_text | TEXT | optional display |
| created_at | TIMESTAMP | |

### Example Row (calculation_history)

```json
{
  "id": 1,
  "user_id": 5,
  "calculator_type": "bmi",
  "calculator_name": "BMI Calculator",
  "data": {
    "weight": 70,
    "height": 170,
    "bmi": 24.22,
    "category": "Normal Weight"
  },
  "result_text": "BMI: 24.22 | Weight: 70 kg | Height: 170 cm",
  "created_at": "2026-09-29 14:00:00"
}
```

---

## 3.2 API Endpoints — Parse លម្អិត

### Auth

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/register` | `{name, email, password}` | `{success, user}` / error |
| POST | `/api/login` | `{email, password}` | `{success, user, token?}` |
| POST | `/api/logout` | — | `{success}` |
| GET | `/api/user` | — (session) | `{id, name, email}` |

### History

| Method | Endpoint | Body / Params | Response |
|--------|----------|---------------|----------|
| GET | `/api/history` | — | `[{id, calculator_type, data, date}, ...]` |
| POST | `/api/history` | `{calculator_type, calculator_name, data, result_text}` | `{success, id}` |
| DELETE | `/api/history/{id}` | — | `{success}` |
| DELETE | `/api/history` | — | `{success}` clear all |

### Example POST /api/history

```json
// Request
{
  "calculator_type": "salary",
  "calculator_name": "Salary Calculator",
  "data": {
    "basicSalary": 1000,
    "allowances": 200,
    "deductions": 50,
    "taxRate": 10,
    "grossSalary": 1200,
    "totalDeductions": 170,
    "netSalary": 1030
  },
  "result_text": "Net: $1030.00"
}

// Response
{
  "success": true,
  "id": 42
}
```

---

## 3.3 Backend Structure

### Option A: PHP ធម្មតា (XAMPP)

```
Khmer-Calculator-Hub/
├── api/
│   ├── config.php          ← DB connection
│   ├── register.php
│   ├── login.php
│   ├── logout.php
│   ├── user.php
│   ├── history.php         ← GET/POST/DELETE
│   └── helpers.php         ← hash, json response, auth check
├── (frontend files...)
```

**config.php**
```php
<?php
$host = "localhost";
$db   = "khmer_calculator_hub";
$user = "root";
$pass = "";
$pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
```

### Option B: Laravel

```
app/
├── Models/
│   ├── User.php
│   └── CalculationHistory.php
├── Http/Controllers/
│   ├── AuthController.php
│   └── HistoryController.php
database/migrations/
├── xxxx_create_users_table.php
└── xxxx_create_calculation_history_table.php
routes/
├── api.php
└── web.php
```

---

## 3.4 Auth Backend Flow

### Register

```
POST /api/register
  → Validate name, email, password
  → Check email unique
  → password_hash($password, PASSWORD_BCRYPT)
  → INSERT users
  → Return success + user (without password)
```

### Login

```
POST /api/login
  → Find user by email
  → password_verify($password, $hash)
  → session_start() / set cookie / JWT
  → $_SESSION['user_id'] = $user['id']
  → Return success + user
```

### Protect Routes

```
function requireLogin() {
  if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
  }
}
```

---

## 3.5 History Backend Flow

### Save (ពេលគណនា)

```
Frontend (logged-in):
  calculate() → result
  → if (isLoggedIn()) {
      POST /api/history { calculator_type, data, ... }
    }
  → else {
      save to localStorage (Phase 1)
    }
```

### Load (Dashboard)

```
GET /api/history
  → WHERE user_id = current_user
  → ORDER BY created_at DESC
  → LIMIT 50
  → Return JSON list
```

### Delete

```
DELETE /api/history/42
  → WHERE id = 42 AND user_id = current_user
  → Prevent លុប history របស់ user ផ្សេង
```

---

## 3.6 XAMPP Setup Steps

```
1. Install XAMPP
2. Start Apache + MySQL
3. បើក http://localhost/phpmyadmin
4. Create database: khmer_calculator_hub
5. Run SQL (users + calculation_history)
6. Copy project → C:/xampp/htdocs/Khmer-Calculator-Hub
7. Edit api/config.php (host, user, password)
8. បើក http://localhost/Khmer-Calculator-Hub/
```

---

## 3.7 Frontend ↔ Backend Connection

### Phase 1 (now)

```
JS → localStorage → displayHistory()
```

### Phase 3 (target)

```
JS → fetch('/api/history') → JSON → displayHistory()
JS → fetch('/api/history', { method: 'POST', body: ... })
```

### history.js Update (Phase 3)

```javascript
async function saveHistoryToServer(calculatorType, data) {
  if (!isLoggedIn()) {
    // fallback localStorage
    return saveHistoryLocal(...);
  }
  const res = await fetch('/api/history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      calculator_type: calculatorType,
      calculator_name: ...,
      data: data
    })
  });
  return res.json();
}

async function loadHistoryFromServer() {
  if (!isLoggedIn()) {
    return getHistory(); // localStorage
  }
  const res = await fetch('/api/history');
  return res.json();
}
```

---

## 3.8 Security Checklist

| Item | Action |
|------|--------|
| Password | bcrypt hash តែប៉ុណ្ណោះ មិនរក្សា plain text |
| SQL | Prepared statements (PDO) — ការពារ SQL injection |
| Session | HttpOnly cookie, regenerate id បន្ទាប់ login |
| CORS | កំណត់ origin បើ API ដាច់ដោយឡែក |
| Auth check | គ្រប់ history API ត្រូវពិនិត្យ user_id |
| Input | Validate + sanitize email, name |

---

## 3.9 Phase 3 — Implementation Order

```
Step 1: XAMPP + Create database + tables
Step 2: api/config.php + helpers.php
Step 3: register.php + login.php + logout.php
Step 4: history.php (GET, POST, DELETE)
Step 5: Update auth.js → call real API
Step 6: Update history.js → save/load from API បើ login
Step 7: Test Register → Login → Calculate → Dashboard History
Step 8: (Optional) Laravel refactor
```

---

## សរុប Flow ទាំង ៣ Phase (Final)

```
PHASE 1 ✅
  Guest → Calculator → localStorage History

PHASE 2 ⏳
  Register / Login (UI + session)
  Dashboard បង្ហាញ History
  Guest: localStorage | User: per-user storage

PHASE 3 ⏳
  MySQL users + calculation_history
  PHP/Laravel API
  History រក្សាទុកអចិន្ត្រៃយ៍តាម user_id
```

---

## តារាងសម្រេច

| Feature | Phase 1 | Phase 2 | Phase 3 |
|---------|---------|---------|---------|
| ១៨ Calculators | ✅ | ✅ | ✅ |
| History localStorage | ✅ | ✅ (guest) | ✅ (guest) |
| Register / Login UI | — | ✅ | ✅ |
| Dashboard | — | ✅ | ✅ |
| History per user | — | ✅ (local) | ✅ (MySQL) |
| Database | — | — | ✅ |
| API Backend | — | — | ✅ |
