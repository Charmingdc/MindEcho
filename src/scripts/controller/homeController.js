'use strict';

// import neccesary functions
import { getElement } from '../view/getElement.js';
import { copyText } from '../view/copyText.js';
import { speakText } from '../view/tts.js';

// selecting elements 
const introScreen = getElement('intro-screen', 'id');
const dailyAffirmText = getElement('daily-affirm-text', 'id');
const copyAffirmBtn = getElement('copy-affirm-btn', 'id');
const speakAffirmBtn = getElement('speak-affirm-btn', 'id');
const showRelaxTracks = getElement('show-relax-tracks', 'id');





// function to hide intro screen after 2 secs
window.onload = () => {
  setTimeout(() => {
    introScreen.style.display = 'none';
  }, 2000);
};


// event listener to copy daily affirmation
copyAffirmBtn.addEventListener('click', () => {
  copyText(dailyAffirmText);
});


// event listener to listen to daily affirmation
speakAffirmBtn.addEventListener('click', () => {
  speakText('daily-affirm-text');
});

showRelaxTracks.addEventListener('click', () => {
  alert('working');
});