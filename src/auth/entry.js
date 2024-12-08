'use strict';

import app from '../database/firebaseConfig.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";




const verifyPage = (pageName) => {
  return window.location.pathname.includes(pageName);
};



const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user !== null && user.emailVerified && (verifyPage('login.html') || verifyPage('signup.html'))) {
    
    window.location.href = '../home.html';
    return;
  } else if (!user) {
    console.log('No signed-in user');
  }
});



const initAuth = (app) => {

  if (verifyPage('login.html')) {

    import('./scripts/loginController.js')
      .then(module => module.initLogin(app))
      .catch(err => console.error('Failed to load login controller:', err));

  } else if (verifyPage('signup.html')) {

    import('./scripts/signupController.js')
      .then(module => module.initSignup(app))
      .catch(err => console.error('Failed to load sign up controller:', err.message));

  }
};


window.onload = () => {
  initAuth(app);
} // initialize controllers