# Khmer Calculator Hub — សរុប Parse ទាំង ៣ Phase

---

## PHASE 1 — Calculator ✅ DONE

```
HTML + CSS + JavaScript
        ↓
Calculator works (១៨ ម៉ាស៊ីន)
        ↓
History → localStorage
        ↓
User មិនចាំបាច់ Login
```

### 1.1 ម៉ាស៊ីនគណនាទាំង ១៨

| # | ម៉ាស៊ីន | calculatorType | Data ក្នុង History |
|---|---------|----------------|-------------------|
| 1 | Age Calculator | age | years, months, days |
| 2 | Average Calculator | average | sum, average, minimum, maximum |
| 3 | BMI Calculator | bmi | weight, height, bmi, category |
| 4 | Break-Even Calculator | break-even | fixedCosts, sellingPrice, variableCost, breakEvenUnits, breakEvenRevenue |
| 5 | Currency Converter | currency | amount, from, to, result |
| 6 | Discount Calculator | discount | price, discount, saved, finalPrice |
| 7 | Fuel Cost Calculator | fuel | distance, fuelConsumption, fuelPrice, fuelUsed, totalFuelCost, costPerKm |
| 8 | GPA Calculator | gpa | subjects, totalCredits, totalPoints, gpa, message |
| 9 | Grade Calculator | grade | score, maxScore, percentage, grade |
| 10 | Interest Calculator | interest | type, typeName, principal, rate, time, frequency, interest, totalAmount |
| 11 | Loan Calculator | loan | loanAmount, interestRate, loanTerm, monthlyPayment, totalPayment, totalInterest |
| 12 | Percentage Calculator | percentage | type, valueOne, valueTwo, result |
| 13 | Profit Calculator | profit | cost, selling, profit, margin |
| 14 | Salary Calculator | salary | basicSalary, allowances, deductions, taxRate, grossSalary, totalDeductions, netSalary |
| 15 | Savings Calculator | savings | initialDeposit, monthlyContribution, annualRate, years, totalContributions, interestEarned, futureValue |
| 16 | Tax Calculator | tax | income, deduction, taxRate, taxableIncome, taxAmount, afterTaxIncome |
| 17 | Unit Converter | unit | type, value, from, to, fromName, toName, result |
| 18 | VAT Calculator | vat | type, typeName, price, vatRate, priceBeforeVAT, vatAmount, totalPrice |

### 1.2 History Structure (localStorage)

**Key:** `calculatorHistory`

```json
{
  "id": 1727589600000,
  "calculator": "BMI Calculator",
  "calculatorType": "bmi",
  "data": { "weight": 70, "height": 170, "bmi": 24.22, "category": "Normal Weight" },
  "date": "9/29/2026, 2:00:00 PM"
}
```

- រក្សាទុកចុងក្រោយ ២០ ការគណនា
- បង្ហាញតាមភាសា ខ្មែរ / English
- លុបមួយៗ ឬ Clear All
- មិនចាំបាច់ Login

### 1.3 File Structure Phase 1

```
Khmer-Calculator-Hub/
├── index.html
├── css/style.css
├── js/
│   ├── history.js          ← support ទាំង ១៨
│   ├── language.js
│   ├── script.js
│   ├── age.js … vat.js     ← ១៨ calculators
├── calculators/
│   ├── age.html … vat.html ← ១៨ pages
├── images/
├── robots.txt, sitemap.xml
└── HISTORY-FIX-README.md
```

### 1.4 Flow Phase 1

```
User បើក Calculator
    → បញ្ចូលតម្លៃ → គណនា
    → បង្ហាញលទ្ធផល
    → រក្សាទុក History (structured)
    → displayHistory()
    → បង្ហាញឈ្មោះ + លទ្ធផល តាមភាសា
```

---

## PHASE 2 — Account ⏳ បន្ទាប់

```
Register
   ↓
Login
   ↓
Dashboard
   ↓
Calculator History (ភ្ជាប់នឹង Account)
```

### 2.1 អ្វីដែលត្រូវធ្វើ

| ផ្នែក | ការពិពណ៌នា | File / Route |
|--------|-------------|--------------|
| Register | ទម្រង់ចុះឈ្មោះ (name, email, password) | register.html /auth/register |
| Login | ចូលប្រព័ន្ធ + session | login.html /auth/login |
| Logout | ចាកចេញ | logout button |
| Dashboard | ទំព័រសម្រាប់ user ដែល login | dashboard.html |
| Profile | មើល/កែព័ត៌មាន user | profile.html |
| History (Account) | ប្រវត្តិគណនា ភ្ជាប់ user_id | នៅ Dashboard |
| Auth UI | Login/Register/Logout នៅ header | index.html + all pages |

### 2.2 Auth Flow

```
Guest (មិន login)
    → ប្រើ Calculator បាន (Phase 1 នៅដដែល)
    → History រក្សាទុក localStorage

User Register
    → បញ្ចូល name, email, password
    → Validate → Save user
    → Auto login ឬ redirect to Login

User Login
    → email + password
    → Session / Token
    → Redirect to Dashboard

Dashboard
    → បង្ហាញឈ្មោះ user
    → បង្ហាញ Calculator History របស់ user
    → Link ទៅ Calculators
    → Logout
```

### 2.3 ការផ្លាស់ប្តូរ History (Phase 2)

```
Phase 1:  History → localStorage (guest)
Phase 2:  History → localStorage (guest)
          + History → Server/Database (logged-in user)
```

- Guest: នៅប្រើ localStorage ដដែល
- Logged-in: រក្សាទុកក្នុង database តាម user_id
- នៅពេល login អាច merge localStorage history → account history (optional)

### 2.4 UI ដែលត្រូវបន្ថែម

- Header: ប៊ូតុង **Login** | **Register** (guest)
- Header: **Dashboard** | **Logout** + ឈ្មោះ user (logged-in)
- ទំព័រ Register, Login, Dashboard
- Form validation (email format, password length)

### 2.5 បច្ចេកទេស Phase 2 (ជម្រើស)

| ជម្រើស | បច្ចេកទេស | គុណសម្បត្តិ |
|---------|-----------|-------------|
| A | Frontend តែមួយ (localStorage fake auth) | ងាយ, demo លឿន |
| B | PHP ធម្មតា + Session + MySQL | ងាយតភ្ជាប់ Phase 3 |
| C | Laravel Auth | ពេញលេញ, គាំទ្រ Phase 3 ដោយផ្ទាល់ |

**ណែនាំ:** ជម្រើស B ឬ C (ដើម្បីទៅ Phase 3 បានរលូន)

---

## PHASE 3 — Database ⏳ ក្រោយ

```
HTML/CSS/JS
      ↓
PHP/Laravel
      ↓
MySQL + XAMPP
      ↓
Users + History
```

### 3.1 Database Schema

#### Table: users

| Column | Type | Note |
|--------|------|------|
| id | INT AUTO_INCREMENT PRIMARY KEY | |
| name | VARCHAR(100) | |
| email | VARCHAR(150) UNIQUE | |
| password | VARCHAR(255) | hashed (bcrypt) |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

#### Table: calculation_history

| Column | Type | Note |
|--------|------|------|
| id | INT AUTO_INCREMENT PRIMARY KEY | |
| user_id | INT FOREIGN KEY → users.id | |
| calculator_type | VARCHAR(50) | age, bmi, loan, ... |
| calculator_name | VARCHAR(100) | |
| data | JSON | structured result data |
| result_text | TEXT | optional display text |
| created_at | TIMESTAMP | |

### 3.2 API / Backend Endpoints

| Method | Endpoint | ការងារ |
|--------|----------|--------|
| POST | /api/register | ចុះឈ្មោះ user |
| POST | /api/login | Login → session/token |
| POST | /api/logout | Logout |
| GET | /api/user | ព័ត៌មាន user បច្ចុប្បន្ន |
| GET | /api/history | ប្រវត្តិគណនារបស់ user |
| POST | /api/history | រក្សាទុកការគណនាថ្មី |
| DELETE | /api/history/{id} | លុប history មួយ |
| DELETE | /api/history | Clear all history របស់ user |

### 3.3 Flow Phase 3

```
User Login
    → Session / JWT
    → Calculator គណនា
    → POST /api/history (user_id + data)
    → Dashboard GET /api/history
    → បង្ហាញប្រវត្តិពី MySQL
```

### 3.4 Stack Phase 3

```
Frontend:  HTML + CSS + JavaScript (មានរួច)
Backend:   PHP ឬ Laravel
Database:  MySQL
Local:     XAMPP (Apache + MySQL + PHP)
```

### 3.5 XAMPP Setup (សង្ខេប)

1. Install XAMPP
2. Start Apache + MySQL
3. phpMyAdmin → Create database `khmer_calculator_hub`
4. Import schema (users + calculation_history)
5. Put project in `htdocs/Khmer-Calculator-Hub`
6. Configure DB connection (host, user, password, db name)

### 3.6 Laravel (បើប្រើ)

```
laravel new khmer-calculator-hub
php artisan make:model User
php artisan make:model CalculationHistory
php artisan make:migration
php artisan make:controller AuthController
php artisan make:controller HistoryController
```

- Laravel Breeze / Fortify សម្រាប់ Auth
- Eloquent models
- Migration សម្រាប់ tables
- API routes ឬ Blade views

---

## សរុប Flow ទាំង ៣ Phase

```
┌─────────────────────────────────────────────────────────┐
│  PHASE 1 ✅                                              │
│  Guest → Calculator → localStorage History              │
│  (មិនចាំបាច់ Login)                                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  PHASE 2 ⏳                                              │
│  Register → Login → Dashboard                           │
│  Guest: localStorage | User: Account History            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  PHASE 3 ⏳                                              │
│  PHP/Laravel + MySQL                                    │
│  Users table + calculation_history table                │
│  History រក្សាទុកជាអចិន្ត្រៃយ៍ក្នុង Database              │
└─────────────────────────────────────────────────────────┘
```

---

## ស្ថានភាពបច្ចុប្បន្ន

| Phase | Status | មានក្នុង Zip នេះ |
|-------|--------|------------------|
| Phase 1 — Calculator + History | ✅ DONE | បាទ — code ពេញ |
| Phase 2 — Account | ⏳ Plan | Parse / Roadmap តែប៉ុណ្ណោះ |
| Phase 3 — Database | ⏳ Plan | Parse / Schema / API តែប៉ុណ្ណោះ |

---

## ឯកសារក្នុង Zip

- Project Phase 1 ពេញលេញ (១៨ calculators + history fixed)
- HISTORY-FIX-README.md
- FULL-ROADMAP-3-PHASES.md (ឯកសារនេះ)

---

**ចង់ចាប់ផ្តើម code Phase 2 ឬ Phase 3 បន្ទាប់?**  
ប្រាប់ថាចង់ប្រើ PHP ធម្មតា ឬ Laravel + មាន XAMPP រួចហើយទេ។
