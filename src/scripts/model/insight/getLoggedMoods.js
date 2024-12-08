'use strict';


// importing firebase functions
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


// importing local functions
import { getUserId } from '../utils/getUserId.js';


export const getLoggedMoods = async (app) => {
  try {
    const auth = getAuth(app);
    const db = getFirestore(app);

    // call the function to get the current user id
    const userId = await getUserId(auth);

    // reference moodLogs collection 
    const moodLogsRef = collection(db, 'moodLogs');

    // quarry the moodLogs collection
    const q = query(moodLogsRef, where("userId", "==", userId));


    // return the moodLogs 
    return new Promise((resolve, reject) => {
      let moodLogs = [];

      // Subscribe to the snapshot and wait for it to populate moodLogs
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
          moodLogs.push({ ...doc.data(), id: doc.id });
        });

        // Resolve the promise with the moodLogs data
        resolve(moodLogs);
      }, (err) => {
        console.error(err.message);
        resolve([]);
      }); // Handle errors with reject
    });

  } catch (err) {
    console.error(err.message);
  }
};