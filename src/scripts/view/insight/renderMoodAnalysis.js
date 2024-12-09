'use strict';

// import necessary functions
import { getElement } from '../utils/getElement.js';
import { writeToElement } from '../utils/writeToElement.js';


export const renderMoodAnalysis = async (mood, count) => {
  try {
    const moodAnalysisBox = getElement('mood-analysis-box', 'id');
    moodAnalysisBox.style.width = '100%';
    
    
    switch (mood) {
      case 'sad':
       writeToElement(moodAnalysisBox, 
       `Sadness 😢 has been your most logged mood recently. It's okay to feel this way sometimes—acknowledge your emotions and give yourself grace. 🌻`,
       'html');
        break;
      
      case 'stressed':
        writeToElement(moodAnalysisBox,
        `Feeling stressed? You've logged this mood often recently. Consider identifying stressors and finding ways to manage them. ✨`,
        'html');
        break;
      
      case 'anxious':
        writeToElement(moodAnalysisBox, 
        `Anxiety has been a recurring theme this week. Try grounding techniques or talking to someone you trust to ease your mind. 💙`,
        'html');
        break;
      
      case 'calm':
        writeToElement(moodAnalysisBox, 
        `Calmness has been your dominant mood this week—what a great sign of balance in your life. Keep nurturing this peace. 😌`,
        'html');
        break;
        
      case 'happy':
        writeToElement(moodAnalysisBox,
        `Your week has been filled with happy moments. Savor them and keep embracing what makes you smile. ☺️`,
        'html');
        break;
    }
    
  } catch (err) {
    console.log(err)
  }
};