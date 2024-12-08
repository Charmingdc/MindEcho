'use strict';

//importing necessary functions
import { getElement } from '../utils/getElement.js';
import { writeToElement } from '../utils/writeToElement.js';
import { formatTime } from '../utils/formatTime.js';



export const updatePlayer = async (track) => {
  try {
   const musicPlayerWrapper = getElement('daily-music-box-wrapper', 'id');
   const musicPlayer = getElement('daily-music-box', 'id');
   const trackName = getElement('track-name', 'id');
   const trackDuration = getElement('track-duration', 'id');
   const errorDiv = getElement('track-error-div', 'id');
   
 
    
   const updateUI = async () => {
     const url = track.media_url;
     const audio = new Audio(url);
    
     
     trackName.textContent = track.name;
     trackDuration.textContent = 'loading...';
     audio.addEventListener('loadedmetadata', () => {
       trackDuration.textContent = formatTime(audio.duration);
     });
   };
    
    
   if (track == null) {
     musicPlayer.style.display = 'none';
     errorDiv.style.display = 'flex';
   } else {
     musicPlayer.style.display = 'grid';
     errorDiv.style.display = 'none';
     await updateUI();
   }
    
  } catch (error) {
    console.log('Please fix me' + error);
  }
};