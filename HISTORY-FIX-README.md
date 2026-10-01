# Khmer Calculator Hub — Phase 1 History Fix

## សរុបការកែ (Summary of Fixes)

### 1. history.js
- បន្ថែម formatHistoryResult សម្រាប់ម៉ាស៊ីនគណនាទាំង **១៨**
- បន្ថែម getCalculatorDisplayName (ភាសាខ្មែរ / អង់គ្លេស)
- saveHistory គាំទ្រទាំង format ចាស់ និង format ថ្មី (structured data)
- បង្ហាញ history ត្រឹមត្រូវតាមភាសា

### 2. ម៉ាស៊ីនគណនាទាំង ១៨ — រក្សាទុក history តាមរចនាសម្ព័ន្ធថ្មី

| # | ម៉ាស៊ីនគណនា | File | calculatorType | Status |
|---|-------------|------|----------------|--------|
| 1 | Age | age.js | age | ✅ |
| 2 | Average | average.js | average | ✅ |
| 3 | BMI | bmi.js | bmi | ✅ |
| 4 | Break-Even | break-even.js | break-even | ✅ Fixed |
| 5 | Currency | currency.js | currency | ✅ Fixed |
| 6 | Discount | discount.js | discount | ✅ |
| 7 | Fuel | fuel.js | fuel | ✅ Fixed |
| 8 | GPA | gpa.js | gpa | ✅ |
| 9 | Grade | grade.js | grade | ✅ |
| 10 | Interest | interest.js | interest | ✅ |
| 11 | Loan | loan.js | loan | ✅ |
| 12 | Percentage | percentage.js | percentage | ✅ |
| 13 | Profit | profit.js | profit | ✅ |
| 14 | Salary | salary.js | salary | ✅ Fixed |
| 15 | Savings | savings.js | savings | ✅ |
| 16 | Tax | tax.js | tax | ✅ |
| 17 | Unit | unit.js | unit | ✅ Fixed |
| 18 | VAT | vat.js | vat | ✅ Fixed |

### 3. រចនាសម្ព័ន្ធ History (localStorage)

```json
{
  "id": 1234567890,
  "calculator": "BMI Calculator",
  "calculatorType": "bmi",
  "data": {
    "weight": 70,
    "height": 170,
    "bmi": 24.22,
    "category": "Normal Weight"
  },
  "date": "9/29/2026, 2:00:00 PM"
}
```

- រក្សាទុកក្នុង `localStorage` key: `calculatorHistory`
- រក្សាទុកចុងក្រោយ ២០ ការគណនា
- មិនចាំបាច់ Login (Phase 1)

---

## Phase Roadmap

### Phase 1 — Calculator ✅ DONE
```
HTML + CSS + JavaScript
        ↓
Calculator works (១៨ ម៉ាស៊ីន)
        ↓
History → localStorage
        ↓
User មិនចាំបាច់ Login
```

### Phase 2 — Account (បន្ទាប់)
```
Register → Login → Dashboard → Calculator History (ភ្ជាប់ account)
```

### Phase 3 — Database
```
HTML/CSS/JS → PHP/Laravel → MySQL + XAMPP → Users + History
```

---

## របៀបប្រើ

1. បើក `index.html` ក្នុង browser
2. ជ្រើសម៉ាស៊ីនគណនាណាមួយ
3. គណនា → មើល History ខាងក្រោម
4. ប្តូរភាសា (ខ្មែរ/English) → History ប្តូរតាមភាសា
5. លុប history មួយៗ ឬ Clear All

## Files ដែលបានកែថ្មី (ថ្ងៃនេះ)

- `js/history.js`
- `js/break-even.js`
- `js/currency.js`
- `js/fuel.js`
- `js/salary.js`
- `js/unit.js`
- `js/vat.js`
