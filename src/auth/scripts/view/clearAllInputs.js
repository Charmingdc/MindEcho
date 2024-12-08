'use strict';

export const clearAllInputs = (usernameInput, passwordInput, emailInput) => {
  usernameInput.value = '';
  passwordInput.value = '';
  
  if (emailInput) emailInput.value = '';
};