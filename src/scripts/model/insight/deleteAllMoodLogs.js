'use strict';

// importing firebase functions
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import { getFirestore, collection, doc, getDocs, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// importing local function 
import { getLoggedMoods } from './getLoggedMoods.js';
import { getUserId } from '../utils/getUserId.js';



export const deleteAllMoodLogs = async (app) => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  try {
    // Get the current user's ID
    const userId = await getUserId(auth);

    // Reference the moodLogs collection
    const moodLogsRef = collection(db, 'moodLogs');
    
    // query the collection for user specific mood logs
    const q = query(moodLogsRef, where("userId", "==", userId));

    // Fetch all mood logs for the user
    const moodLogsSnapshot = await getDocs(q);
    if (moodLogsSnapshot.empty) {
      console.log("No mood logs found for the user.");
      return;
    }

    // Delete all mood logs
    const deletePromises = moodLogsSnapshot.docs.map((moodLog) =>
      deleteDoc(doc(db, 'moodLogs', moodLog.id))
    );
    
    // delete all mood logs for user
    await Promise.all(deletePromises);
    
    // get latest data
    const latestData = await getLoggedMoods(app);
    
    return latestData; // return latest data
  } catch (error) {
    console.error("Error deleting mood logs:", error.message);
  }
};