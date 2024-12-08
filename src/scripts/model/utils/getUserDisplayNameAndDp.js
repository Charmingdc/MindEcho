'use strict';

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";



export const getUserDisplayNameAndDp = async (app) => {
  const auth = getAuth(app);
 
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({
          username: user.displayName,
          photoURL: user.photoURL
        });
      } else {
        reject("No user is currently signed in.");
      }
    });
  });
  
};