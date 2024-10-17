'use strict';

export const fetchJson = async (jsonApi) => {
  
  try {
    
    const response = await fetch(`${jsonApi}`);
    const data = await response.json();
    const affirms = data.affirmations;
    const randomIndex = Math.floor(Math.random() * affirms.length);
    const randomAffirm = affirms[randomIndex];
    
    return randomAffirm; // return a random affirmation 
    
  } catch (e) {
    
   console.error(e);
   
  }
  
}
