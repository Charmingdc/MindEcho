'use strict';

export const fetchApi = async (url, options) => {
  
  try {  
    const response = await fetch(url, options);

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
