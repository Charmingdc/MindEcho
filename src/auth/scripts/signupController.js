'use strict';


// importing view functions 
import { notify } from './view/notify.js';
import { updateButtonState } from './view/updateButtonState.js';
import { clearAllInputs } from './view/clearAllInputs.js';


// importing model functions 
import { validateInputs } from './model/validateInputs.js';
import { togglePswVisibility } from './model/togglePswVisibility.js';
import { signUserUp } from './model/signUserUp.js';


// getting elements 
const signupForm = document.querySelector('#signup-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const emailInput = document.querySelector('#email');
const pswToggle = document.querySelector('#psw-toggle');
const submitBtn = document.querySelector('#submit-btn');




export const initSignup = (app) => {
  submitBtn.setAttribute('disabled', 'true')

  const checkInputs = () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const email = emailInput.value.trim();

    return username === '' || password === '' || email === '';
  };
  usernameInput.addEventListener('input', () => updateButtonState(checkInputs(), submitBtn));
  passwordInput.addEventListener('input', () => updateButtonState(checkInputs(), submitBtn));
  emailInput.addEventListener('input', () => updateButtonState(checkInputs(), submitBtn));



  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault(); //prevent form submit default behavior
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const email = emailInput.value.trim();



    try {
      let isUserValidated = await validateInputs(username, password, email);


      if (isUserValidated == true) {
        const { type, text } = await signUserUp(app, submitBtn, username, password, email);
        
        
        if (type == 'success') {
          notify.success(text);
          
          clearAllInputs(usernameInput, passwordInput, emailInput);
        } else if (type == 'error') {
          notify.error(text);
        }
        
      } else if (isUserValidated == 'weak username') {
        notify.error('Username must not be less than four(4) characters');
      } else if (isUserValidated == 'weak password') {
        notify.error('Password must be at least (6) characters');
      } else if (isUserValidated == 'invalid email') {
        notify.error('Please input a valid email address');
      }

    } catch (error) {
      console.error(error.message);
    }

  });


  pswToggle.addEventListener('click', () => {
    togglePswVisibility(pswToggle, signupForm)
  }); // event listener to toggle password input visibility 
}