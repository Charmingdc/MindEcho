'use strict';

export const writeToElement = (elementId, text) => {
  
  const element = document.getElementById(elementId);
  
  if(!element)
   console.error('Element not found');// check if element is in the DOM
   
   element.textContent = text; // copy text to element
};