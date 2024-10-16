'use strict';

// importing utilities functions
import { validateInputs } from './utils/validateInputs.js';
import { togglePswVisibility } from './utils/togglePswVisibility.js';



// getting all elements related to login
const loginSec = document.querySelector('#login-sec');
const loginForm = document.querySelector('#login-form');
const loginPswToggle = document.querySelector('#login-psw-toggle');
const gotoSignup = document.querySelector('#goto-signup');

// getting all elements related to signup
const signupSec = document.querySelector('#signup-sec');
const signupForm = document.querySelector('#signup-form');
const signupPswToggle = document.querySelector('#signup-psw-toggle');
const gotoLogin = document.querySelector('#goto-login');



// event listener to switch to signup form
gotoSignup.addEventListener('click', () => {
 loginSec.style.zIndex = 0;
 signupSec.style.zIndex = 1;
});

// event listener to switch to login form
gotoLogin.addEventListener('click', () => {
 signupSec.style.zIndex = 0;
 loginSec.style.zIndex = 1;
});



// event listener to handle login form when submitted
loginForm.addEventListener('submit', (e) => {
 e.preventDefault();
 
 const usrN = loginForm.elements.username.value;
 const usrP = loginForm.elements.password.value;
 
 validateInputs('login', usrN, usrP);

});


// event listener to handle signup form when submitted
signupForm.addEventListener('submit', (e) => {
 e.preventDefault();
 
 const usrN = signupForm.elements.username.value
 const usrE = signupForm.elements.email.value
 const usrP = signupForm.elements.password.value
 
 validateInputs('signup', usrN, usrP, usrE);

});


// event listener to show/hide login password
loginPswToggle.addEventListener('click', () => {
 togglePswVisibility(loginPswToggle, loginForm); // call function to toggle password visibility
});


// event listener to show/hide signup password
signupPswToggle.addEventListener('click', () => {
 togglePswVisibility(signupPswToggle, signupForm); // call function to toggle password visibility
});