'use strict'; 

// import necessary functions
import { fetchApi } from '../utils/fetchApi.js';


export const getMoodBasedQuote = async (selectedMood) => {
  
  const url = 'https://quote-api-ashen.vercel.app/api/quotes';
  
  let moodBasedQuote;
  let mood = selectedMood; // set copy selectedMood to mood variable 
  switch (selectedMood) {
    case 'happy':
      mood = 'smile';
      break;
  } // switch case to change happy to smile
  
  
  try {
   
    const response = await fetchApi(url);
    const data = response.moods;
    
    
    if (mood && data[mood]) {
        moodBasedQuote = data[mood];
    } else {
      console.log('Error no quote found for selected mood');
    }
    
    
    const randomIndex = Math.floor(Math.random() * data[mood].length); // generated a random index
    return moodBasedQuote[randomIndex]; // return random quote based on mood
    
  } catch (err) {
    console.log(err);
  }
  
};