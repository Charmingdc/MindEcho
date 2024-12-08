'use strict';

import { formatTime } from '../utils/formatTime.js'; // import formatTime function 
let currentTimeInterval;

export const updatePlayer = (track, trackAudio) => {
  const currentTrackName = document.getElementById('current-track-name');
  let trackCurrentTime = document.getElementById('track-current-time');
  const slider = document.getElementById('slider');  
  
  
  trackAudio.onloadedmetadata = () => {
    currentTrackName.textContent = `${track.name}`; // set track name
    trackCurrentTime.innerHTML = trackAudio.currentTime;
    slider.value = Math.trunc(trackAudio.currentTime); 
    slider.max = Math.trunc(trackAudio.duration);
    

    if (currentTimeInterval) {
      clearInterval(currentTimeInterval);
    }

    currentTimeInterval = setInterval(() => {
       trackCurrentTime.innerHTML = formatTime(trackAudio.currentTime);
       slider.value = Math.trunc(trackAudio.currentTime);
     }, 1000);
  }
};