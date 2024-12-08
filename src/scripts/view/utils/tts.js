'use strict';

export const speakText = (text) => {

 const utterance = new SpeechSynthesisUtterance(text);
 speechSynthesis.speak(utterance);
 
}