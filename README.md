# Khmer Calculator Hub – Firebase Version

## ជំហាន Deploy

### 1. បង្កើត Firebase Project
1. ចូល https://console.firebase.google.com
2. **Add project** → ដាក់ឈ្មោះ (ឧ. `khmer-calculator-hub`)
3. បិទ Google Analytics ក៏បាន

### 2. បើក Authentication
1. នៅ Firebase Console → **Build → Authentication**
2. ចុច **Get started**
3. **Sign-in method** → បើក **Email/Password** → Enable → Save

### 3. បើក Firestore
1. **Build → Firestore Database**
2. **Create database** → ជ្រើស **Start in test mode** (សម្រាប់ពេលសាក)
3. ជ្រើស location (asia-southeast1 ល្អ)

### 4. បន្ថែម Web App
1. Project Settings (រនាំង) → **Your apps** → **Add app** → Web (`</>`)
2. ដាក់ឈ្មោះ app → **Register app**
3. ចម្លង `firebaseConfig` object

### 5. កែឯកសារ Config
បើក file `js/firebase-config.js` រួចដាក់តម្លៃពិតប្រាកដ៖

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

កែ `.firebaserc` ដាក់ `YOUR_PROJECT_ID` ជា project id ពិត។

### 6. Deploy
```bash
npm install -g firebase-tools
firebase login
firebase use your-project-id
firebase deploy --only hosting
```

បន្ទាប់ពី deploy រួច អ្នកនឹងបាន link៖
- `https://your-project-id.web.app`
- `https://your-project-id.firebaseapp.com`

### 7. Firestore Security Rules (សំខាន់!)
នៅ Firestore → Rules ដាក់៖

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /history/{docId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

---

## អ្វីដែលបានប្តូរ
- Login / Register → Firebase Authentication
- History (user) → Firestore
- Guest history → នៅតែ localStorage
- លុប PHP + MySQL ទាំងអស់
- លុប domain ចាស់ `.infy.click`

## Notes
- បើ deploy ហើយ Login មិនដំណើរការ → ពិនិត្យ `firebase-config.js` និង Email/Password បាន Enable ឬនៅ
- បើ History មិនរក្សាទុក → ពិនិត្យ Firestore Rules
