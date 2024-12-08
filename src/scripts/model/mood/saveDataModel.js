'use strict';

//import necessary functions
import { setLocalStorage } from '../utils/localStorageModel.js';
import { getFormattedDate } from '../utils/getFormattedDate.js';

// importing firebase functions 
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



const saveMoodLogToFirestore = async (app, selectedMood) => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Use onAuthStateChanged to handle user authentication state change
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.error('No user is signed in.');
      return;
    }

    try {
      // Get the user ID after the user is authenticated
      const userId = user.uid;
      const date = getFormattedDate(new Date()); // get and format the current date

      // Access user's mood logs collection
      const moodLogRef = collection(db, 'moodLogs');

      // Create the new mood log
      const moodLog = {
        mood: selectedMood,
        date,
        userId,
        createdAt: serverTimestamp(),
      };

      // Add the new mood log to Firestore
      await addDoc(moodLogRef, moodLog);
    } catch (err) {
      // Catch and log any errors
      console.error('Failed to add mood log:', err.message);
    }
  });
};



const saveMoodBasedQuote = async (quote) => {

  try {
    setLocalStorage('mindEcho_currentQuote', quote); // save mood based quote to local storage  
  } catch (err) {
    console.log(err);
  }

};


const saveMoodBasedTrack = async (moodBasedTrack) => {

  try {
    setLocalStorage('mindEcho_currentTrack', moodBasedTrack);
    // save mood based track to local storage 
  } catch (err) {
    console.log(err);
  }

};


const saveSelectedMood = async (selectedMood) => {

  try {
    const date = getFormattedDate(new Date())
    const moodObj = {
      mood: selectedMood,
      date,
    }

    setLocalStorage('mindEcho_currentMood', moodObj); // save selected mood to localstorage

  } catch (err) {
    console.log(error);
  }

};



const saveMoodBasedTips = async (tips) => {

  try {
    setLocalStorage('mindEcho_currentTips', tips); // save mood based quote to local storage  
  } catch (err) {
    console.log(err);
  }

};


export { saveSelectedMood, saveMoodLogToFirestore, saveMoodBasedQuote, saveMoodBasedTrack, saveMoodBasedTips };