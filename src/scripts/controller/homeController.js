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





// function to hide intro screen after 2 secs
window.onload = () => {
  setTimeout(() => {
    introScreen.style.display = 'none';
  }, 1000);
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