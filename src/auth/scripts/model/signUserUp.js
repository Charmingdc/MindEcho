'use strict';


// importing firebase functions 
import { getAuth, createUserWithEmailAndPassword, signOut, sendEmailVerification, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


// importing local functions
import { formatError } from './formatFirebaseError.js';


export const signUserUp = async (app, button, username, password, email) => {
  button.innerHTML = `<div class="loader"></div>`;
  button.setAttribute('disabled', 'true');
  button.classList.replace('button', 'disabled');


  const auth = getAuth(app);
  const db = getFirestore(app);
  const normalizedUsername = username.toLowerCase();


  try {
    // Check if username is unique
    const userRef = doc(db, 'users', normalizedUsername);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      button.innerHTML = 'Sign Up';
      button.removeAttribute('disabled');
      button.classList.replace('disabled', 'button');
       
      return { type: 'error', text: 'This username is already taken. Please choose another one.'};
    }

    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: username });

    // Save username in Firestore
    await setDoc(userRef, { uid: user.uid, email });

    // Send email verification
    await sendEmailVerification(user);
    
    
    return {type: 'success', text: 'Signup successful! Please verify your email before logging in.'};
  } catch (error) {
    console.error('Error during signup:', error.message);
    
    const formattedError = await formatError(error.message);
    return {type: 'error', text: `Error: ${formattedError}`};
   
  } finally {
    button.innerHTML = 'Sign Up';
    button.removeAttribute('disabled');
    button.classList.replace('disabled', 'button');
  }
};