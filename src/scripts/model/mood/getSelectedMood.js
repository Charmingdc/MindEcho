'use strict';

export const getSelectedMood = async () => {
  
  try {
    
   const moodOptions = document.getElementsByName('mood');
  

   for (const option of moodOptions) {
     if (option.checked) {
       return option.value;
       break;
     }
   } // loop through all radio buttons 
     // break the loop as soon as it find one that is checked
     // return the radio button value
     
  } catch (err) {
    console.log(err);
  }
  
};