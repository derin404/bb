import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbeZTtXLK6hD49ubPATd-YxaQ9jOjnlAw",
  authDomain: "bloodbridge-2c4e1.firebaseapp.com",
  projectId: "bloodbridge-2c4e1",
  storageBucket: "bloodbridge-2c4e1.firebasestorage.app",
  messagingSenderId: "1296088634",
  appId: "1:1296088634:web:b89d86a0258f97df673f03"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);