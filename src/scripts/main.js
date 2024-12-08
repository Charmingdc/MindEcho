'use strict';

import app from '../database/firebaseConfig.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";




const verifyPage = (pageName) => {
  return window.location.pathname.includes(pageName);
};



const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = './auth/login.html'; // redirect user to login page
    return;
  } 
  else if (user && !user.emailVerified) {
    console.log('Unverified user');
    signOut(auth); // sign out unverified users
    window.location.href = './auth/login.html';
  }
});



const initializeApp = (app) => {

  if (verifyPage('home.html')) {

    import('./controller/homeController.js')
      .then(module => module.initHome(app))
      .catch(err => console.error('Failed to load home controller:', err.message));

  } else if (verifyPage('aichat.html')) {

    import('./controller/therapistController.js')
      .then(module => module.initAI(app))
      .catch(err => console.error('Failed to load AI controller:', err.message));

  } else if (verifyPage('insight.html')) {

    import('./controller/insightController.js')
      .then(module => module.initInsight(app))
      .catch(err => console.error('Failed to load Insight controller:', err.message));

  } else if (verifyPage('mood.html')) {

    import('./controller/moodController.js')
      .then(module => module.initMood(app))
      .catch(err => console.error('Failed to load Mood controller:', err.message));
  } else if (verifyPage('setting.html')) {
    
    import('./controller/settingController.js')
      .then(module => module.initSetting(app))
      .catch(err => console.error('Failed to load Setting controller:', err.message));
  }
};


window.onload = () => {
  initializeApp(app); // initialize the whole app
};