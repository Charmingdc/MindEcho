'use strict';

// importing utility function 
import { getElement } from '../utils/getElement.js';
import { writeToElement } from '../utils/writeToElement.js';
import { displayMoodAsIcon } from '../utils/displayMoodAsIcon.js';

export const displayCurrentMoodInfo = (mood) => {
  const currentMoodEmoji = getElement('current-mood-emoji', 'id');
  const currentMoodName = getElement('current-mood-name', 'id');
  
  
  
  displayMoodAsIcon(mood, currentMoodEmoji);
  if (mood === undefined) {
    writeToElement(currentMoodName, 'Mood not logged', 'string');
  } else {
    writeToElement(currentMoodName, mood, 'string');
  }
 
};