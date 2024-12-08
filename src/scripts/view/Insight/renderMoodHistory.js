'use strict';

// importing necessary functions 
import { getElement } from '../utils/getElement.js';
import { createElement } from '../utils/createElement.js';
import { writeToElement } from '../utils/writeToElement.js';
import { displayMoodAsIcon } from '../utils/displayMoodAsIcon.js';


export const renderMoodHistory = async (data, onMoodSelect) => {
 
  const moodHistoryList = getElement('mood-history-list', 'id');
  const trashIcon = ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg>`;
  
  
  
  writeToElement(moodHistoryList, '', 'html');
  try {
    
    if (data.length === 0) {
      const noMoods = createElement('li');
      noMoods.classList.add('no-mood');
      
      writeToElement(noMoods, 'No logged moods', 'html');
      moodHistoryList.appendChild(noMoods);
    } else {
      data.forEach((moodObj) => {
       const li = createElement('li');
       const moodActionBox = createElement('div');
       const moodBox = createElement('div');
       const moodName = createElement('h3')
       const deleteBtn = createElement('div');
       const moodLoggedDate = createElement('p');

       const nDate = new Date(moodObj.date);
       const fDate = nDate.toDateString()
       .split(' ').join(', ');
       
       displayMoodAsIcon(moodObj.mood, moodBox);
       
       
       writeToElement(moodName, moodObj.mood, 'string');
       writeToElement(deleteBtn, trashIcon, 'html');
       writeToElement(moodLoggedDate, `mood logged on: ${fDate}`, 'string');
       
       moodBox.appendChild(moodName);
       
       moodActionBox.appendChild(moodBox);
       moodActionBox.appendChild(deleteBtn);
       
       li.appendChild(moodActionBox);
       li.appendChild(moodLoggedDate);
       
       
       
       deleteBtn.addEventListener('click', () => {
         onMoodSelect(moodObj.id);
       });
       
       moodHistoryList.appendChild(li);
      });
    }
    
  } catch (error) {
    console.log(error);
  }
};