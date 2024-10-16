'use strict';

import { notify } from './notify.js';
import { processInput } from './processInput.js';



// function to validate inputs and call process inputs function
export const validateInputs = (authType, userN, psw, email) => {
 
 if (userN == '' && psw === '') {
 
  const text = 'All input fields are empty.';
  notify.error(text);
  
 } else if (userN === '') {
  
  const text = 'Username input is empty.';
  notify.error(text);
  
 } else if (email == '') {
  
  const text = 'Email input is empty.';
  notify.error(text);
  
 } else if (psw == '') {
  
  const text = 'Password input is empty.';
  notify.error(text);
  
 } else if (userN.length < 4) {
  
  const text = 'Username must not be less than four(4) characters';
  notify.error(text);
  
 } else if (psw.length < 8) {
  
  const text = 'Password must not be less than eight(8) characters';
  notify.error(text);
  
 } else {
  processInput(authType, userN, psw, email);
 }
 
}
