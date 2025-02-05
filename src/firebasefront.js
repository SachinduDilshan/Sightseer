import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  getIdToken as getFirebaseIdToken 
} from 'firebase/auth';
import { 
  getDatabase, 
  ref, 
  onValue 
} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAYxluuMVtg54ipN_HU0MfMF9dYlxMwwA0",
  authDomain: "sightseerup.firebaseapp.com",
  databaseURL: "https://sightseerup-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sightseerup",
  storageBucket: "sightseerup.firebasestorage.app",
  messagingSenderId: "245746346574",
  appId: "1:245746346574:web:9000cd76f3fbc9e91b311f",
  measurementId: "G-C8QDPLJLTG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// User data fetching utility
const fetchUserData = (userId, callback) => {
  const userRef = ref(database, `users/${userId}`);
  onValue(userRef, (snapshot) => {
    const userData = snapshot.val();
    callback(userData);
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    console.log("User ID:", userId);
    
    // Optional: Fetch additional user data
    fetchUserData(userId, (userData) => {
      console.log("User Data:", userData);
    });
  } else {
    console.log("No user is logged in.");
  }
});

console.log("Firebase initialized:", app.name);

export { 
  app, 
  auth, 
  database, 
  onAuthStateChanged, 
  fetchUserData,
  getFirebaseIdToken as getIdToken 
};