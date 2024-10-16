'use strict';

export const getElement = (elementId, type) => {
 
 let elm;
 
 if (type === 'id') {
   elm = document.querySelector(`#${elementId}`);
 } else if (type === 'class') {
  elm = document.querySelector(`.${elementId}`);
 }
  
 if(!elm) {
  console.error(`Element width identifier of *${elementId}* is not found`);
 }
   
 return elm;
}