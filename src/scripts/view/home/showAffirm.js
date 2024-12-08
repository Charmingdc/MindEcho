'use strict';

// importing necessary functions
import { getElement } from '../utils/getElement.js';
import { writeToElement } from '../utils/writeToElement.js';
import { copyText } from '../utils/copyText.js';
import { speakText } from '../utils/tts.js';


export const showAffirm = (data) => {
  const dailyAffirmText = getElement('daily-affirm-text', 'id');
  const copyAffirmBtn = getElement('copy-affirm-btn', 'id');
  const speakAffirmBtn = getElement('speak-affirm-btn', 'id');
  
  const affirm = data.affirmations; // get all affirmatios
  
  const randomIndex = Math.floor(Math.random() * affirm.length); // created a random index
  const randomAffirm = affirm[randomIndex]; // get affirmations randomly
  
  
  writeToElement(dailyAffirmText, randomAffirm, 'string'); // display affirmation to the UI
  
  
  // event listener to copy daily affirmation
  copyAffirmBtn.addEventListener('click', () => {
    copyText(dailyAffirmText.textContent);
  });
 

  // event listener to listen to daily affirmation
  speakAffirmBtn.addEventListener('click', () => {
    speakText(dailyAffirmText.textContent);
  });
};