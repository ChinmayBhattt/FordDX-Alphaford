import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzUBGTtpN7ZCnOijcIW8aJFO-yIQPwESA",
  authDomain: "alphaford---proteinai.firebaseapp.com",
  projectId: "alphaford---proteinai",
  storageBucket: "alphaford---proteinai.appspot.com",
  messagingSenderId: "872727300078",
  appId: "1:872727300078:web:ef2e90d5f76376634fb0ff",
  measurementId: "G-WX11PKTVYC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const errorDiv = document.getElementById('loginError');
  errorDiv.textContent = '';
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = '/frontend/index.html';
  } catch (err) {
    errorDiv.textContent = err.message;
  }
});

// Signup
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const errorDiv = document.getElementById('signupError');
  errorDiv.textContent = '';
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name, photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}` });
    window.location.href = '/frontend/index.html';
  } catch (err) {
    errorDiv.textContent = err.message;
  }
});

// Redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = '/frontend/index.html';
  }
});
