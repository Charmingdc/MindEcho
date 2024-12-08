'use strict';


export const updateButtonState = (state, button) => {
  if (state) {
    button.setAttribute('disabled', 'true');
    
    if (button.classList.contains('button')) {
      button.classList.replace('button', 'disabled');
    }
  } else {
    button.removeAttribute('disabled');
    button.classList.replace('disabled', 'button');
  }
};