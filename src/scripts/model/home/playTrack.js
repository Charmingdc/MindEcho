'use strict';

// Declare a variable to hold the currently playing track
let currentAudio = null;

// function to play audio
export const playTrack = (trackAudio) => {
  const slider = document.getElementById('slider');
  const audioControl = document.getElementById('audio-control');
  const hidePeekPlayer = document.getElementById('hide-peek-player');
  
  
  // created a new audio object
  const newAudio = trackAudio;

  // function to check if audio is playing 
  const isAudioPlaying = (audio) => {
   //  check if audio is playing and has a current time greater than 0 and has not ended 
   return !audio.paused && audio.currentTime > 0 && !audio.ended;
  }
  
  if (currentAudio && isAudioPlaying(currentAudio)) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  
  newAudio.play();
  currentAudio = newAudio;
  const togglePlayPause = () => {
   if (audioControl.classList.contains('fa-circle-pause')) {
     currentAudio.pause();
     audioControl.classList.remove('fa-circle-pause');
     audioControl.classList.add('fa-circle-play');
   } else if (audioControl.classList.contains('fa-circle-play')) {
     currentAudio.play();
     audioControl.classList.remove('fa-circle-play');
     audioControl.classList.add('fa-circle-pause');
   }
  };
  audioControl.addEventListener('click', () => togglePlayPause());
  

  hidePeekPlayer.addEventListener('click', () => {
   currentAudio.pause();
   currentAudio.currentTime = 0;
  }); // function to stop and reset track when player is close
  
  slider.onchange = () => {
    currentAudio.play();
    currentAudio.currentTime = slider.value;
    audioControl.classList.add('fa-circle-pause');
  }; // function to change track current time to slider value 

  
  
  // event listener to detect when the new audio ends 
  newAudio.addEventListener('ended', () => {
   currentAudio.currentTime = 0;
   currentAudio = null;
   audioControl.classList.remove('fa-circle-pause');
   audioControl.classList.add('fa-circle-play');
  });
}
  