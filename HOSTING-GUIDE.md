# 🌐 Hosting Guide — Khmer Calculator Hub (Login / Register)

## ⚠️ សំខាន់

**GitHub Pages មិនអាច run PHP + MySQL បានទេ**  
Login / Register ត្រូវការ **hosting ដែលគាំទ្រ PHP + MySQL**។

### Hosting ឥតគិតថ្លៃ (Free) ដែលអាចប្រើបាន
| Host | PHP | MySQL | កំណត់ |
|------|-----|-------|--------|
| InfinityFree | ✅ | ✅ | ល្អសម្រាប់ test |
| AwardSpace | ✅ | ✅ | ល្អ |
| 000webhost | ✅ | ✅ | មាន limit |
| ByetHost | ✅ | ✅ | |

### Hosting បង់លុយ (ណែនាំ)
- Hostinger, Namecheap, A2 Hosting, DigitalOcean, etc.

---

## ជំហាន Deploy

### 1. Upload ឯកសារ
Upload **ទាំងអស់** (លើកលែង `.git`) ទៅ public_html ឬ folder របស់អ្នក។

```
public_html/
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── api/
│   ├── config.php   ← កែ database នៅទីនេះ
│   ├── login.php
│   ├── register.php
│   └── ...
├── js/
├── css/
├── calculators/
├── images/
└── database.sql
```

### 2. បង្កើត Database
1. នៅ Control Panel → MySQL Databases
2. បង្កើត database ថ្មី
3. បង្កើត user + password
4. Import file `database.sql` (phpMyAdmin → Import)

### 3. កែ `api/config.php`
បើក file `api/config.php` រួចកែផ្នែក Database:

```php
$host = "sql.yourhost.com";     // MySQL host ពី control panel
$db   = "your_db_name";         // ឈ្មោះ database ពេញ
$user = "your_db_user";
$pass = "your_db_password";
```

### 4. តេស្ត
- បើក `https://yourdomain.com/register.html`
- ចុះឈ្មោះ → គួរទៅ dashboard
- Logout → Login ម្តងទៀត
- សាកលើ **ទូរស័ព្ទ** និង **កុំព្យូទ័រ**

---

## តើ API ត្រឹមត្រូវទេ?

| Endpoint | Method | ស្ថានភាព |
|----------|--------|----------|
| `/api/register.php` | POST | ✅ |
| `/api/login.php` | POST | ✅ |
| `/api/logout.php` | POST | ✅ |
| `/api/user.php` | GET | ✅ (ត្រូវ login) |
| `/api/history.php` | GET/POST/DELETE | ✅ |

- Password ប្រើ `password_hash` (BCRYPT) — សុវត្ថិភាព
- Session cookie កំណត់ `SameSite=Lax`, `HttpOnly`, `Secure` នៅលើ HTTPS
- API_BASE auto-detect → ដំណើរការលើ root ឬ subfolder, phone និង computer

---

## បញ្ហាទូទៅ

| បញ្ហា | ដំណោះស្រាយ |
|-------|-------------|
| `network_error` / Cannot connect | ពិនិត្យ path API + PHP មានដំណើរការទេ |
| `database_error` | កែ host/user/pass ក្នុង `config.php` + import `database.sql` |
| Login បានតែ refresh បាត់ | ត្រូវ HTTPS ឬ session cookie (config បាន fix រួច) |
| លើ phone មិនបាន | Clear cache / ប្រើ HTTPS |
| CORS error | config.php បានកែរួច (credentials + origin) |

---

## Local test (XAMPP)
1. Copy folder ទៅ `htdocs/Khmer-Calculator-Hub`
2. បើក phpMyAdmin → import `database.sql`
3. បើក `http://localhost/Khmer-Calculator-Hub/`
4. API នឹង auto-detect path ដោយស្វ័យប្រវត្តិ
