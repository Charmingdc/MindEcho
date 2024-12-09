'use strict';


// import helper function 
import { getElement } from './getElement.js';


// function to apply theme
export const applyTheme = async (theme, container) => {
  try {
    container.classList.remove('default-mode', 'light-mode');
    
    container.classList.add(theme);
  } catch (err) {
    console.log('Error applying theme:', err.message);
  }
}