'use strict';

// import necessary function
import { createElement } from './createElement.js';
import { writeToElement } from './writeToElement.js';
import { notify } from './notify.js';


export const verifyAction = (container) => {
  return new Promise((resolve) => {
    const text = 'Are you sure about this 🥺?';
    
    const h2 = createElement('h2');
    const modal = createElement('div');
    const optionBox = createElement('div');
    const yesBtn = createElement('button');
    const noBtn = createElement('button');
    
    modal.classList.add('verify-action-modal');
    
    writeToElement(h2, `${text}`, 'html');
    writeToElement(yesBtn, 'Yes 👍', 'string');
    writeToElement(noBtn, 'Nope 👎', 'string');
    
    optionBox.appendChild(yesBtn);
    optionBox.appendChild(noBtn);
    
    modal.appendChild(h2);
    modal.appendChild(optionBox);
    container.appendChild(modal);
    
    yesBtn.addEventListener('click', () => {
      resolve(true); // Resolve the promise with `true`
 
      container.removeChild(modal); // Remove the modal after action
    });
    
    noBtn.addEventListener('click', () => {
      resolve(false); // Resolve the promise with `false`
      container.removeChild(modal); // Remove the modal after action
    });
  });
};