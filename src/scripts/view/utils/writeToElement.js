'use strict';

export const writeToElement = (element, text, type) => {

  if(!element)
   console.error('Element not found');// check if element is in the DOM
  
  if (type === 'string') {
   element.textContent = text; // copy text to element
  } else if (type === 'html') {
   element.innerHTML = text; //copy html to element 
  }
  
};