'use strict';

// importing firebase function
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";



// Function to get the UID of the logged-in user
export const getUserId = (auth) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        reject('No user signed in');
      } else {
        resolve(user.uid);
      }
    });
  });
};