'use strict';

export const fetchApi = async (url) => {
  
  try {  
    const response = await fetch(`${url}`);

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();  
    return data; // return the data 
   
  } catch (e) {  
   console.error(e);
   return  [];
  }
  
}
