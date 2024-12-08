'use strict';

//importing necessary functions
import { getElement } from '../utils/getElement.js';
import { writeToElement } from '../utils/writeToElement.js';
import { copyText } from '../utils/copyText.js';
import { speakText } from '../utils/tts.js';



export const showQuote = async (mood, quote) => {
  const quoteBoxWrapper = getElement('quote-box-wrapper', 'id');
  const quoteBox = getElement('quote-box', 'id');
  const moodQuoteInfo = getElement('mood-quote-info', 'id');
  const pQuote = getElement('p-quote', 'id');
  const copyQuoteBtn = getElement('copy-quote-btn', 'id');
  const speakQuoteBtn = getElement('speak-quote-btn', 'id');
  const errorDiv = getElement('quote-error-div', 'id');
  
   
  try {
   
    const updateUI = async () => {
      
      quoteBox.style.display = 'flex';
      pQuote.style.display = 'flex';
      errorDiv.style.display = 'none';
      
      pQuote.textContent = `${quote}`;
      moodQuoteInfo.textContent = `You're feeling ${mood.toUpperCase()}, here is a positive quote for you!`
      
      copyQuoteBtn.addEventListener('click', () => copyText(`${quote}`)); // event listener to copy quote 
      
      speakQuoteBtn.addEventListener('click', () => speakText(`${quote}`)); // event listener to speak quote
    };
    
    

    if (mood == null) {
     
     quoteBox.style.display = 'none';
     pQuote.style.display = 'none';
     errorDiv.style.display = 'flex';
     
     moodQuoteInfo.textContent = 'Log your mood to get a positive quote';
     
    } else {
      await updateUI();
    }
   
  } catch (err) {
    console.log('Please fix me ' + err);
  }
 
};