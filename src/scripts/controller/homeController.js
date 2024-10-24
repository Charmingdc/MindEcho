'use strict';

// import neccesary functions
import { getElement } from '../view/getElement.js';
import { copyText } from '../view/copyText.js';
import { speakText } from '../view/tts.js';
import { fetchApi } from '../model/fetchApi.js';
import { writeToElement } from '../view/writeToElement.js';



// selecting elements 
const introScreen = getElement('intro-screen', 'id');
const dailyAffirmText = getElement('daily-affirm-text', 'id');
const copyAffirmBtn = getElement('copy-affirm-btn', 'id');
const speakAffirmBtn = getElement('speak-affirm-btn', 'id');
const showRelaxTracks = getElement('show-relax-tracks', 'id');
const tracksContainer  = getElement('tracks-container', 'id');
const closeTrackCont = getElement('close-tracks-cont', 'id');
const trackCats = getElement('track-cats', 'id');






window.onload = () => {

  setTimeout(() => {
    introScreen.style.display = 'none';
  }, 1000); // hide intro screen after two sec
  


  const fetchTracks = () => {
   const path = 'https://raw.githubusercontent.com/Charmingdc/Relaxation-tracks/main/src/moods.json';
   
   fetchApi(`${path}`)
   .then(data => {

     const moodArray = data.moods; // set all moods to a variable

     // loop through all moods
     moodArray.forEach(mood => { 

      const li = document.createElement('li');
      const h2 = document.createElement('h2');
  
      h2.textContent = mood.mood;
      li.appendChild(h2);
      trackCats.appendChild(li);
      

      // loop through all moods tracks
      mood.tracks.forEach(track => {
        const playBtn = `<i class="fa-solid fa-circle-play">`; // create a variable for play icon

        const trackDp = document.createElement('div'); // create trackDp
        trackDp.innerHTML = playBtn; // set Playbtn as trackDp innerHTML 

        const trackName = document.createElement('h3');
        trackName.textContent = track.name; // created a h3 header and set track name as its text

        const trackMin = document.createElement('p');
        const audio = new Audio(track.media_url);
        audio.onloadedmetadata = () => {
          trackMin.textContent = (audio.duration / 60).toFixed(2);
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
        
        li.appendChild(trackBoxWrap);
      });

     });
   });
  }
  fetchTracks(); // function to fetch and display tracks by categories 
};


// function to set random affirmation 
const setAffirm = () => {
 const path = '/src/assets/json/affirms.json';
 
 fetchApi(`${path}`)
 .then(data => {
   const affirm = data.affirmations; // get all affirmatios
   const randomIndex = Math.floor(Math.random() * affirm.length); // created a random index
   const randomAffirm = affirm[randomIndex]; // get affirmations randomly 
   writeToElement('daily-affirm-text', randomAffirm); // display affirmation to the UI
 });
}
setAffirm();


// event listener to copy daily affirmation
copyAffirmBtn.addEventListener('click', () => {
  copyText(dailyAffirmText);
});


// event listener to listen to daily affirmation
speakAffirmBtn.addEventListener('click', () => {
  speakText('daily-affirm-text');
});


// event listener to show relaxation tracks container 
showRelaxTracks.addEventListener('click', () => {
  tracksContainer.style.display = 'flex';
});

// event listener to hide relaxation tracks container 
closeTrackCont.addEventListener('click', () => {
  tracksContainer.style.display = 'none';
});