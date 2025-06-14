
# Patashala

## 📘 About

**Patashala** is a mobile app designed to assist teachers and school administrators in documenting and managing activities as part of the evaluation process for assuring quality in education. It enables users to keep accurate, multimedia-rich records aligned with educational standards and processes.

---

## ✨ Key Features

- 📸 **Multimedia Support**: Record activities using Photos, Videos, and attach PDFs.
- 📝 **Easy Posting**: Teachers and admins can post school activities easily.
- 🔍 **Post Viewer**: Browse, search, and read past records.
- 🎯 **Evaluation Ready**: Structured for quality assurance documentation.
- 🎨 **Dark/Light Themes**: Automatically adjusts to your device settings.

---

## 📱 Screenshots

| Home Screen | Post List | Full Post View | Upload Screen | Dark Mode|
|-------------|-----------|----------------|-----------|--------------|
| ![Home](https://i.ibb.co/9kvBC6JQ/1.png) | ![List](https://i.ibb.co/rG5hgkCh/2.png) | ![Full](https://i.ibb.co/x8Y6RNhN/3.png) | ![Dark](https://i.ibb.co/cKHp82pS/4.png) | ![About](https://i.ibb.co/kVks6M0q/5.png) |

---

## 📥 Download

📲 [**Get Patashala on Google Play**](https://play.google.com/store/apps/details?id=com.kushanshamika.patashala)

---

## 🚀 Getting Started

To set up this project locally using Expo:

1. **Clone the repository**  
   ```bash
   git clone https://github.com/kushanshamika/patashala.git
   cd patashala
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Firebase Configuration**  
   Replace the contents of `firebase/config.ts` with your own Firebase project settings:

   ```ts
   // firebase/config.ts
   export const firebaseConfig = {
     apiKey: 'YOUR_API_KEY',
     authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
     projectId: 'YOUR_PROJECT_ID',
     storageBucket: 'YOUR_PROJECT_ID.appspot.com',
     messagingSenderId: 'YOUR_SENDER_ID',
     appId: 'YOUR_APP_ID',
   };
   ```

   ✅ **Ensure the following Firebase services are enabled**:
   - Authentication (Email/Password)
   - Firestore Database

4. **Run the app**  
   ```bash
   npx expo start
   ```

---

## 🤝 Contribution

We welcome all contributors!  
If you have ideas, suggestions, or bug fixes, feel free to fork this repo, open issues, or submit pull requests.

---

## 🛠️ Building

We use [EAS Build](https://docs.expo.dev/build/introduction/) for production builds.

1. **Install EAS CLI**  
   ```bash
   npm install -g eas-cli
   ```

2. **Login and configure**  
   ```bash
   eas login
   eas build:configure
   ```

3. **Trigger build**  
   For Android:
   ```bash
   eas build --platform android
   ```

   For iOS:
   ```bash
   eas build --platform ios
   ```

> Make sure your app is configured properly in `eas.json` and all secrets/environment variables are set if needed.

---

## 🧩 Tech Stack

- [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/) – Auth + Firestore
- TypeScript

---

## 📞 Contact Us

Interested in using **Patashala** at your school? We'd love to help!  
Please contact us using the information below:

**Patshala** යනු  ශ්‍රී ලංකාවේ රාජ්‍ය පාසල් වල ප්‍රමිති ගොනු පවත්වාගෙන යාම සදහා නිර්මාණය කරන ලද ජංගම මෘදුකාංග යෙදුමක් වේ. මෙය ඔබ පාසලටත් නොමිලයේ ලබාදීමට අප කටයුතු කරන්නෙමු.

- 📧 Email: shamikakushan@gmail.com
- 📱 Phone: +94 77 548 9485

---

Built with ❤️ for schools and teachers.
