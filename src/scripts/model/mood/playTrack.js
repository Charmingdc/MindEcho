'use strict';


export const playTrack = async (audio, playIcon, playText) => {
  try {
   
   if (!audio.src) {
     console.log('Audio source is missing');
     return;
   } // check if audio source is present
 
 
   if (audio.paused) {
     audio.play();
     playText.textContent = 'Pause';
     playIcon.classList.replace('fa-circle-play', 'fa-circle-pause');
   } else {
     audio.pause();
     playText.textContent = 'Play';
     playIcon.classList.replace('fa-circle-pause', 'fa-circle-play');
   }; // if statement to check playing state  // then change button icon 
      // then play / pause track base accordingly 
   
   
   audio.addEventListener('ended', () => {
     playIcon.classList.replace('fa-circle-pause', 'fa-circle-play');
     playText.textContent = 'Play';
   });
   
  } catch (error) {
    console.log(error)
  }
};