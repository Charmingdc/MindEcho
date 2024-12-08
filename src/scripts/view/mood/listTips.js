'use strict';

//importing necessary functions
import { getElement } from '../utils/getElement.js';
import { createElement } from '../utils/createElement.js';
import { writeToElement } from '../utils/writeToElement.js';


export const listTips = async (tips) => {
  const ul = getElement('tips', 'id');
  const tipsBox = getElement('tips-box', 'id');
   
  try {
   
    const updateUI = async () => {
      tipsBox.style.display = 'flex';
      ul.style.display = 'block';
     
      tips.forEach(tip => {
        const li = createElement('li');
        li.textContent = tip;
        ul.appendChild(li);
      });
    };
    
    

    if (tips == null) {
      ul.style.display = 'none';
      ul.innerHTML = '';
      tipsBox.style.display = 'none';
    } else {
      await updateUI();
    }
   
  } catch (err) {
    console.log('Please fix me ' + err);
  }
 
};