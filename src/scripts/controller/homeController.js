'use strict';

// importing view functions
import { getElement } from '../view/utils/getElement.js';
import { updateTrackList } from '../view/home/updateTrackList.js';
import { showAffirm } from '../view/home/showAffirm.js';
import { displayUserDetails } from '../view/utils/displayUserDetails.js';

// importing model functions
import { fetchApi } from '../model/utils/fetchApi.js';
import { playTrack } from '../model/home/playTrack.js';
import { fetchTracks } from '../model/home/fetchTracks.js'
import { getUserDisplayNameAndDp } from '../model/utils/getUserDisplayNameAndDp.js';



// selecting elements 
const introScreen = getElement('intro-screen', 'id');
const showRelaxTracks = getElement('show-relax-tracks', 'id');
const tracksContainer = getElement('tracks-container', 'id');
const closeTrackCont = getElement('close-tracks-cont', 'id');
const peekPlayer = getElement('peek-player', 'class');
const hidePeekPlayer = getElement('hide-peek-player', 'id');
const usernameDiv = getElement('username-div', 'id');
const userDp = getElement('user-dp', 'id');




export const initHome = async (app) => {

  const handleTracks = async () => {
    const moodArray = await fetchTracks();
    // loop through all moods

    try {
      moodArray.forEach(mood => {
        updateTrackList(mood, playTrack);
        // call the showTracks function to display all tracks under their categories 
      });
    } catch (err) {
      console.log('Failed to update tracks list:', err.message);
    }
  }
  handleTracks();


  // function to set random affirmation 
  const setAffirm = async () => {
    const path = '/public/assets/json/affirms.json';

    try {
      const data = await fetchApi(`${path}`)
      showAffirm(data); // called the function to display affirmation to the UI
    } catch (err) {
      console.error('Failed to show affirmation:', err.message);
    }
  }
  setAffirm();



  const callDisplayUserDetails = async () => {
    try {
      const { username, photoURL } = await getUserDisplayNameAndDp(app);

      await displayUserDetails(username, photoURL, usernameDiv, userDp);
    } catch (err) {
      console.error('Failed to display user details:', err.message);
    }
  }
  await callDisplayUserDetails();

  setTimeout(() => {
    introScreen.style.display = 'none';
  }, 1000); // hide intro screen after two sec



  const eventsHandler = () => {
    //event to hide/show drop-down menu
    userDp.addEventListener('click', () => {
      dropDownMenu.classList.toggle('dropdown-show');
    });


    // event listener to show relaxation tracks container 
    showRelaxTracks.addEventListener('click', () => {
      tracksContainer.style.display = 'flex';
    });

    // event listener to hide relaxation tracks container 
    closeTrackCont.addEventListener('click', () => {
      tracksContainer.style.display = 'none';
    });


    // event listener to hide player
    hidePeekPlayer.addEventListener('click', () => {
      peekPlayer.style.display = 'none';
    })
  }
  eventsHandler();
};