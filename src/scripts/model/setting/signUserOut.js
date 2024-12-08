'use strict';

// importing firebase auth service
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


export const signUserOut = async (app) => {
  try {
    const auth = getAuth(app);
    await signOut(auth); // sign user out
  } catch (err) {
    console.error('Failed to sign user out:', err.message);
  }
}