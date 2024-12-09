'use strict';

// importing necessary functions 
import { getElement } from '../utils/getElement.js';
import { createElement } from '../utils/createElement.js';
import { writeToElement } from '../utils/writeToElement.js';
import { displayMoodAsIcon } from '../utils/displayMoodAsIcon.js';


export const renderRecentMoods = async (data) => {

  const recentMoodsBox = getElement('recent-moods-peek', 'class');
  writeToElement(recentMoodsBox, '', 'html')
  // clears the box default input 

  try {
    
    if (data.length === 0) {
      recentMoodsBox.style.height = 'auto';
      recentMoodsBox.style.textAlign = 'center';
      recentMoodsBox.style.fontSize = '1.4rem';
      
      writeToElement(recentMoodsBox, 'No recently logged moods', 'html');
    } else {
      const moods = data.slice(-5);
      
      moods.forEach((moodObj) => {
       const moodBox = createElement('div');
       displayMoodAsIcon(moodObj.mood, moodBox);
       
       recentMoodsBox.appendChild(moodBox);
      });
    }
    
  } catch (error) {
    console.log(error);
  }
};