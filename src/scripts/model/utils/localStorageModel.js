'use strict';


// function for setting data to local storage 
const setLocalStorage = (key, value) => {
  try {
    
    if (typeof value !== 'string' && typeof value !== 'number') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
    
  } catch (err) {
    console.error(`Error setting local storage item: ${err.message}`);
  }
};





// function for getting local storage data
const getLocalStorage = (key) => {
  const item = localStorage.getItem(key); // Retrieve item from local storage
  if (!item) return null; // Return null if item doesn't exist

  try {
    // Try parsing as JSON (handles objects/arrays)
    return JSON.parse(item);
  } catch (err) {
    // If parsing fails, return the string directly
    return item;
  }
};


const wipeLocalStorage = (key) => {
 // clearing all local storage items
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("mindEcho_")) {
      localStorage.removeItem(key);
    }
  });
}

export { setLocalStorage, getLocalStorage, wipeLocalStorage };