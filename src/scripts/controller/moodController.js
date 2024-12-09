'use strict';

// importing necessary functions

// view function
import { getElement } from '../view/utils/getElement.js';
import { createElement } from '../view/utils/createElement.js';
import { writeToElement } from '../view/utils/writeToElement.js';
import { notify } from '../view/utils/notify.js';
import { displayCurrentMoodInfo } from '../view/mood/displayCurrentMoodInfo.js';
import { updatePlayer } from '../view/mood/updateMoodBasedTrackPlayer.js';
import { showQuote } from '../view/mood/showQuote.js';
import { listTips } from '../view/mood/listTips.js';
import { applyTheme } from '../view/utils/applyTheme.js';

//model functions
import { setLocalStorage, getLocalStorage, wipeLocalStorage } from '../model/utils/localStorageModel.js';
import { saveMoodBasedTrack, saveMoodBasedQuote, saveSelectedMood, saveMoodBasedTips, saveMoodLogToFirestore } from '../model/mood/saveDataModel.js';
import { getSelectedMood } from '../model/mood/getSelectedMood.js';
import { getMoodBasedTrack } from '../model/mood/getMoodBasedTrack.js';
import { getMoodBasedQuote } from '../model/mood/getMoodBasedQuote.js';
import { getMoodBasedTips } from '../model/mood/getMoodBasedTips.js';
import { playTrack } from '../model/mood/playTrack.js';
import { getFormattedDate } from '../model/utils/getFormattedDate.js';
import { getSavedTheme } from '../model/utils/getSavedTheme.js';


// getting elements from html file
const bdy = getElement('bdy', 'id');
const introScreen = getElement('intro-screen', 'id');
const logMoodBtn = getElement('log-mood-btn', 'id');
const musicCtrlBtn = getElement('ctrl-btn', 'id');
const playIcon = getElement('play-icon', 'id');
const playText = getElement('play-text', 'id');
const quoteErrorDiv = getElement('quote-error-div', 'id');
const trackErrorDiv = getElement('track-error-div', 'id');


// defining global variables 
const lastClickedDate = getLocalStorage('mindEcho_lastClickedDate');
const currentDate = new Date().toDateString();
let audio;
let mood;
let track;



// setting up loader
const loader = createElement('div');
loader.classList.add('loader');
const loader2 = createElement('div');
loader2.classList.add('loader');




export const initMood = async (app) => {

  const handleTheme = async () => {
    try {
      // retrieving saved from local storage
      const savedTheme = await getSavedTheme();

      // apply theme
      await applyTheme(savedTheme, bdy);
    } catch (err) {
      console.error('Error applying theme:', err.message);
    }
  };
  handleTheme();


  setTimeout(() => {
    introScreen.style.display = 'none';
  }, 1000); // hide intro screen after two sec


  const moodObj = getLocalStorage('mindEcho_currentMood'); // get the mood object
  const quote = getLocalStorage('mindEcho_currentQuote'); // get the current quote 
  const trackObj = getLocalStorage('mindEcho_currentTrack'); // get the object containing the track information
  const tips = getLocalStorage('mindEcho_currentTips');



  if (!moodObj) {
    mood = null;
  } else {
    mood = moodObj['mood'];
  }; // check if it's empty or not and change the value of 'mood' variable accordingly 


  if (!trackObj) {
    track = null;
  } else {
    track = trackObj;
  }; // check if it's empty ot not and update the value of 'track' variable accordingly



  displayCurrentMoodInfo(mood); // display the logged mood on page load

  showQuote(mood, quote); // display mood based quote

  updatePlayer(track); // update the mood based track audio player

  listTips(tips); // list the mood based tips

  // Check if the button should be visible
  if (lastClickedDate !== currentDate) {
    logMoodBtn.style.display = "flex"; // Show button

    wipeLocalStorage(); // clear all data related to MindEcho stored on local storage 
    displayCurrentMoodInfo(); // update mood info UI
    showQuote(); //update quote box UI
    updatePlayer(); // update track player UI
    listTips(); // update tips list UI
  } else {
    logMoodBtn.style.display = "none"; // Hide button
  }


  // event listener to handle mood log
  logMoodBtn.addEventListener('click', async () => {

    const selectedMood = await getSelectedMood(); // get selected mood
    const text = 'Please select a mood 🥺';


    if (selectedMood) {
      init(selectedMood);
      notify.success('Mood logged successfully');

      logMoodBtn.style.display = "none"; // Hide button on click

      setLocalStorage('mindEcho_lastClickedDate', currentDate); // Save today's date
    } else {
      notify.error(text);
    }

  });



  musicCtrlBtn.addEventListener('click', () => {
    const audioUrl = track.media_url;


    // Check if the audio instance already exists
    if (!audio) {
      audio = new Audio(audioUrl); // Initialize audio only once
    } else if (audio.src !== audioUrl) {
      // If the track URL changes, update the audio source
      audio.src = audioUrl;
      audio.load(); // Reload the audio with the new source
    }

    playTrack(audio, playIcon, playText);
  });





  const init = async (selectedMood) => {

    try {

      await saveSelectedMood(selectedMood); // save selected mood
      await saveMoodLogToFirestore(app, selectedMood); // save logged mood to firebase

      const date = getFormattedDate(new Date());
      const newMoodObj = {
        mood: selectedMood,
        date,
      }; // create new mood object with the new logged mood

      setLocalStorage('mindEcho_currentMood', newMoodObj); // update the current mood
      displayCurrentMoodInfo(selectedMood)
      // display the newest mood info 



      quoteErrorDiv.textContent = 'loading resource...';
      quoteErrorDiv.appendChild(loader);

      trackErrorDiv.textContent = 'loading resource...';
      trackErrorDiv.appendChild(loader2);
      // loading text for both quote and track when Fetching api




      const moodBasedQuote = await getMoodBasedQuote(selectedMood); // get recommended quote based on the currently logged mood
      await saveMoodBasedQuote(moodBasedQuote); // save the mood based quote

      setLocalStorage('mindEcho_currentQuote', moodBasedQuote); // update the current quote
      showQuote(selectedMood, moodBasedQuote); // display the newest mood based quote



      const moodBasedTrack = await getMoodBasedTrack(selectedMood);
      // get recommend track based on the currently logged mood
      await saveMoodBasedTrack(moodBasedTrack); // save the mood based track

      setLocalStorage('mindEcho_currentTrack', moodBasedTrack); // update the current track
      updatePlayer(moodBasedTrack); // update player with the newest mood based track info




      const moodBasedTips = await getMoodBasedTips(selectedMood); // get recommended tips based on currently logged mood
      await saveMoodBasedTips(moodBasedTips); // save the mood based tips

      setLocalStorage('mindEcho_currentTips', moodBasedTips); // update the mood based tips 
      listTips(moodBasedTips); // list the mood based tips to the UI


    } catch (error) {
      console.log('Please fix me' + error);
    };
  };
};