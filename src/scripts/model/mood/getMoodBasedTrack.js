'use strict';

//importing necessary functions
import { fetchApi } from '../utils/fetchApi.js';


export const getMoodBasedTrack = async (selectedMood) => {
  
  try {
   const randomIndex = Math.floor(Math.random() * 6); // random number from 0 - 6;
  
   const url = 'https://raw.githubusercontent.com/Charmingdc/Relaxation-tracks/main/src/moods.json'; // soundscapes api url
   const response = await fetchApi(url);
   const moods = response.moods; // get soundscapes moods object and set them to a variable
  
  
   let tracks = null;
   moods.forEach(moodObj => {
    if (moodObj.mood == selectedMood) tracks = moodObj.tracks;
   }); 
   // loop through all mood objects and check if current iterated mood objects mood matches the selected mood
   // then we set the tracks of the matched mood to a variable
  
   return tracks[randomIndex]; // return a random track from the tracks array 
  } catch (err) {
    console.log(err);
  }
  
};