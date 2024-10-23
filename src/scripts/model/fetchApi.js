'use strict';

export const fetchApi = async (Api) => {
  
  try {
    
    const response = await fetch(`${Api}`);
    const data = await response.json();
    
    return data; // return the data 
    
  } catch (e) {
    
   console.error(e);
   
  }
  
}
