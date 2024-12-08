'use strict';



//import updatePlayer function 

import { updatePlayer } from "./updatePlayer.js";
import { formatTime } from "../utils/formatTime.js";
import { getElement } from '../utils/getElement.js';



const trackCats = getElement('track-cats', 'id');

export const updateTrackList = (mood, onTrackSelect) => {
    const peekPlayer = document.querySelector('.peek-player');
    const audioControl = document.getElementById('audio-control');
      
      
    const category = document.createElement('li');
    const h2 = document.createElement('h2');
    h2.textContent = mood.mood;
    category.appendChild(h2);
      
      
      
      // loop through all moods tracks
      mood.tracks.forEach(track => {
        const randomId = Math.floor(Math.random() * 1e6);
        track.id = randomId; // generate unique id for each track 
      

        const playBtn = `<i class="fa-solid fa-circle-play">`; // create a variable for play icon

        const trackDp = document.createElement('div'); // create trackDp
        trackDp.innerHTML = playBtn; // set Playbtn as trackDp innerHTML 

        const trackName = document.createElement('h3');
        trackName.textContent = track.name; // created a h3 header and set track name as its text

        const trackMin = document.createElement('p');
        const audio = new Audio(track.media_url);
        audio.onloadedmetadata = () => {
          trackMin.textContent = formatTime(audio.duration);
        }

        const trackInfo = document.createElement('div');
        trackInfo.appendChild(trackName); // created a div for track Infos and append trackName to it
        trackInfo.appendChild(trackMin);

        const trackBox = document.createElement('div');
        trackBox.appendChild(trackDp);
        trackBox.appendChild(trackInfo);

        const trackBoxWrap = document.createElement('div');
        trackBoxWrap.classList.add('tracks-box-wrapper');
        trackBoxWrap.appendChild(trackBox);

        trackBoxWrap.addEventListener('click', () => {
          const trackAudio = new Audio(track.media_url);
          updatePlayer(track, trackAudio);
          onTrackSelect(trackAudio);
          peekPlayer.style.display = 'flex';
          audioControl.classList.add('fa-circle-pause');
        });
        
        category.appendChild(trackBoxWrap);
      });
      
      trackCats.appendChild(category);

}
