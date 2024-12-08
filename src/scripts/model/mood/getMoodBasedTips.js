'use strict'; 

// import necessary functions
import { fetchApi } from '../utils/fetchApi.js';

export const getMoodBasedTips = async (selectedMood) => {
  
  const url = 'https://raw.githubusercontent.com/Charmingdc/MindEchoTest/main/src/assets/jsons/moodTips.json';
  
  let moodBasedTips;
  let mood = selectedMood; // set copy selectedMood to mood variable 

  try {
   
    const response = await fetchApi(url);
    const data = response;
    
    if (mood && data[mood]) {
      moodBasedTips = data[mood];
    } else {
      console.log(`Error: no tips found for the selected mood`);
    }
    
    
    let randomIndex = Math.floor(Math.random() * data[mood].length); // generated a random index


    let startIndex;
    if (randomIndex == data[mood].length - 1) {
      startIndex = randomIndex - 4;
    } else if (randomIndex <= 2) {
      startIndex = randomIndex + 4;
    } else {
      startIndex = randomIndex;
    }
    
    const selectedTips = moodBasedTips.slice(startIndex, startIndex + 3);
    
    return selectedTips;
    
  } catch (err) {
    console.log(err);
  }
  
};