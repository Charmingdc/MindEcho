'use strict';


const validateEmail = async (email) => {
  try {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(email);
  } catch (err) {
    console.error('An error occurred while validating email:', err.message);
  }
};



const validateUsername = async (username) => {
  if (username.length < 4) {
    return false;
  } else {
    return true;
  }
};


const validatePassword = async (password) => {
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
};

export { validateEmail, validateUsername, validatePassword };