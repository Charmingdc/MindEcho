'use strict';

// importing Firebase service
import { getAuth, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential, updateEmail, sendEmailVerification, updatePassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


// import local function
import { getUserId } from '../utils/getUserId.js';
import { formatError } from '../utils/formatFirebaseError.js';



// function to update user display picture 
const updateUserDp = async (app, url) => {
  const auth = getAuth(app);

  try {
    const photoURL = url;
    const uid = await getUserId(auth);

    // Update the user's `photoURL` in Firebase Auth
    await updateProfile(auth.currentUser, { photoURL });

    return photoURL;
  } catch (error) {
    console.error("Error updating profile picture:", error.message);
    return null;
  }
}



// function to update username
const updateUsername = async (app, button, newUsername) => {
  button.innerHTML = 'Updating...';

  const db = getFirestore(app);
  const auth = getAuth(app);

  // Get the current user
  const user = auth.currentUser;
  if (!user) {
    return { status: "error", text: "User is not authenticated" };
  }

  const oldUsername = user.displayName.toLowerCase();
  const newUsernameNormalized = newUsername.toLowerCase();

  const oldDocRef = doc(db, "users", oldUsername);
  const newDocRef = doc(db, "users", newUsernameNormalized);

  try {
    // Get the old document data
    const oldDocSnap = await getDoc(oldDocRef);

    // Check if the old username exists
    if (!oldDocSnap.exists()) {
      return { status: "error", text: "Old username does not exist." };
    }

    // Check if the new username already exists
    const newDocSnap = await getDoc(newDocRef);
    if (newDocSnap.exists()) {
      button.innerHTML = 'Update';
      return { status: "error", text: "Username is already taken" };
    }

    // Copy data to the new document without adding a `username` field
    const oldData = oldDocSnap.data();
    await setDoc(newDocRef, oldData);

    // Delete the old document
    await deleteDoc(oldDocRef);

    // Update the user's displayName in Firebase Auth
    await updateProfile(user, { displayName: newUsername });

    return { status: "success", text: "Username updated successfully" };
  } catch (err) {
    console.error("Error updating username:", err.message);
    return { status: "error", text: "An error occurred while updating the username" };
  } finally {
    button.innerHTML = 'Update';
  }
};




// function to update user email
const updateUserEmail = async (app, button, newEmail, password) => {
  button.innerHTML = 'Updating...';
  const auth = getAuth(app);
  const db = getFirestore(app);


  try {
    // Listen for authentication state changes
    const user = await new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error('No authenticated user'));
        }
      });
    });

    // convert username to lowercase 
    const normalizedUsername = user.displayName.toLowerCase();

    // access the user document 
    const docRef = doc(db, 'users', normalizedUsername);

    // get user credentials,
    const credential = EmailAuthProvider.credential(user.email, password);

    // reauthenticate user
    await reauthenticateWithCredential(user, credential);

    // update user email
    await updateEmail(user, newEmail);

    // Update the 'email' field of the user document
    await updateDoc(docRef, { email: newEmail });

    // send verification email
    await sendEmailVerification(user);

    // Success response
    return { type: 'success', text: `Email verification sent to ${newEmail}. Verify your email address to log in.` };

  } catch (err) {
    console.error('Failed to update email:', err.message);
    const formattedErr = await formatError(err.message);
    return { type: 'error', text: formattedErr };
  } finally {
    button.innerHTML = 'Update';
  }
};



// function to update user password 
const updateUserPassword = async (app, button, currentPassword, newPassword) => {
  button.innerHTML = 'Updating...';
  const auth = getAuth(app);

  try {
    // Listen for authentication state changes
    const user = await new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error('No authenticated user'));
        }
      });
    });
    
    // get user credentials,
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    // reauthenticate user
    await reauthenticateWithCredential(user, credential);
    
    // update user password 
    await updatePassword(user, newPassword);
    
    // return success message
    return { type: 'success', text: `Password changed to ${newPassword} successfully.`};
  } catch (err) {
    console.error('Failed to update user password:', err.message);

    const formattedErr = await formatError(err.message);
    return { type: 'error', text: formattedErr };
  } finally {
    button.innerHTML = 'Update';
  }
}



export { updateUserDp, updateUsername, updateUserEmail, updateUserPassword }; // export all functions 