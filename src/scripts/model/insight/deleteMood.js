'use strict';

// importing firebase functions
import { getFirestore, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// importing local function 
import { getLoggedMoods} from './getLoggedMoods.js';


export const deleteMood = async (app, selectedMoodId) => {
  
  try {
   const db = getFirestore(app);
   
   // reference the mood document 
   const moodLogRef = doc(db, 'moodLogs', selectedMoodId);
   
   // delete the selected mood
   await deleteDoc(moodLogRef);
   
   // get the latest data from firebase
   const latestData = await getLoggedMoods(app);
   
   
   // return the latest data
   return latestData;
  } catch (err) {
    console.error(err.message)
  }
  
};