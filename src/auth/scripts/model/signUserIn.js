'use strict';


// importing firebase functions 
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


//importing local functions
import { formatError } from './formatFirebaseError.js';



export const signUserIn = async (app, button, username, password) => {
  button.innerHTML = `<div class="loader"></div>`;
  button.setAttribute('disabled', 'true');
  button.classList.replace('button', 'disabled');
  
  
  const auth = getAuth(app);
  const db = getFirestore(app);
  const normalizedUsername = username.toLowerCase();
  const userRef = doc(db, 'users', normalizedUsername);
  
  
  try {
    // fetch email associated with the username 
    const userSnap = await getDoc(userRef);
    
    
    // check if user name doesn't exist
    if (!userSnap.exists()) {
     console.log('Username does not exist');
     
      return {type: 'error', text: 'username does not exist'};
    }
    
    // get user email
    const email = userSnap.data().email;
    
    // sign user in with email and password 
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    
    
    const user = userCred.user;
    if (!user.emailVerified) {
      await signOut(auth); // log user out immediately 
      
      return { type: 'error', text: 'Verify your email to log in'};
    }
    
    
    // return login status
    return { type: 'success', text: 'Sign-in successfull'};
    
  } catch (err) {
    console.error('Error signing user in:', err.message);
    
    const formattedErr = await formatError(err.message);
    return { type: 'error', text: `Error: ${formattedErr}`};
  } finally {
    button.innerHTML = 'Log In';
    button.removeAttribute('disabled');
    button.classList.replace('disabled', 'button');
  }
};