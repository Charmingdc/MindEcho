'use strict';

// function to validate inputs
export const validateInputs = (userN, psw, email) => {
  let result;
  
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(email);
  }


  if (userN.length < 4) {
    result = 'weak username';
  } else if (email && !validateEmail(email)) {
    result = 'invalid email';
  } else if (psw.length < 6) {
    result = 'weak password';
  } else {
    result = true;
  }

  return result;
}