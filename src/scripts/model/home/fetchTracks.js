'use strict';

// import necessary functions
import { fetchApi } from '../utils/fetchApi.js';


export const fetchTracks = async () => {
  
  try {
    
    const path = 'https://raw.githubusercontent.com/Charmingdc/Relaxation-tracks/main/src/moods.json';
   
    const data = await fetchApi(`${path}`);
    const moodArray = data.moods; // set all moods to a variable
    
    return moodArray; // return all moods
   
  } catch (e) {
    console.log(e);
  }

};