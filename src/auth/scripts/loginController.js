'use strict';

// importing view functions 
import { notify } from './view/notify.js';
import { updateButtonState } from './view/updateButtonState.js';
import { clearAllInputs } from './view/clearAllInputs.js';


// importing model functions
import { togglePswVisibility } from './model/togglePswVisibility.js';
import { validateInputs } from './model/validateInputs.js';
import { signUserIn } from './model/signUserIn.js';



// getting elements 
const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const pswToggle = document.querySelector('#psw-toggle');
const submitBtn = document.querySelector('#submit-btn');




export const initLogin = (app) => {
  submitBtn.setAttribute('disabled', 'true')

  const checkInputs = () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    return username === '' || password === '';
  };
  usernameInput.addEventListener('input', () => updateButtonState(checkInputs(), submitBtn));
  passwordInput.addEventListener('input', () => updateButtonState(checkInputs(), submitBtn));


  // Submit button click handler
  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // prevent form submit default behavior
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();



    try {
      let isUserValidated = await validateInputs(username, password);


      if (isUserValidated == true) {
        const { type, text } = await signUserIn(app, submitBtn, username, password);

        if (type == 'success') {
          notify.success(text);

          clearAllInputs(usernameInput, passwordInput);
        } else if (type == 'error') {
          notify.error(text);
        } // check return type from signUserIn function
        
      } else if (isUserValidated == 'weak username') {
        notify.error('Username must be at least (4) characters');
      } else if (isUserValidated == 'weak password') {
        notify.error('Password must be at least (6) characters');
      } 

    } catch (err) {
      console.error(err.message);
    }
  });

  // Toggle password visibility
  pswToggle.addEventListener('click', () => {
    togglePswVisibility(pswToggle, loginForm);
  });
};