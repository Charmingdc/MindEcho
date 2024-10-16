'use strict';

export const speakText = (elementId) => {
  const element = document.getElementById(elementId);
 const text = element.textContent;
 
 if (!element)
   console.error(`Element not found`);
   
 const utterance = new SpeechSynthesisUtterance(text);
 speechSynthesis.speak(utterance);
 
}