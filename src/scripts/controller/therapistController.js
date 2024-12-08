'use strict';

// imported necessary functions
import { notify } from '../view/utils/notify.js';
import { getElement } from '../view/utils/getElement.js';
import { createElement } from '../view/utils/createElement.js';
import { showLoading } from '../view/therapist/showLoading.js';
import { updateChatBox } from '../view/therapist/updateChatBox.js';
import { emptyPrompt } from '../view/therapist/emptyPrompt.js';
import { detectNewMsgs } from '../view/therapist/detectNewMsgs.js';

import { genAI, model, chat } from '../model/therapist/context.js';
import { textPrompt } from '../model/therapist/textPrompt.js';
import { speechToText } from '../model/therapist/speechToText.js';



// get necessary elements
const introScreen = getElement('intro-screen', 'id');
const promptInput = getElement('prompt-input', 'id');
const speechToTextBtn = getElement('speech-to-textbtn', 'id');
const sendPromptBtn = getElement('send-prompt', 'id');
const aiDefaultScreen = getElement('ai-default-screen', 'id');
const chatBox = getElement('conversation-box', 'id');
const scrollButton = getElement('scroll-button', 'id');
const listeningNotif = getElement('listening', 'class');
const clearChats = getElement('clear-chatbox', 'id');


const userChatWrap = createElement('div');
userChatWrap.classList.add('usr-chat-wrap');




export const initAI = async (app) => {
 
  setTimeout(() => {
    introScreen.style.display = 'none';
  }, 1000); // hide intro screen after two sec

  const startListening = async () => {
    try {

      const {text, isRecording} = await speechToText();
      promptInput.value = text;
      
      if (!isRecording) {
        listeningNotif.classList.remove('now-listening');
      }

    } catch (error) {
      console.log('Please fix me 🥺 :' + error);
    }
  };
  // Attached an event listener to speech to text buttton
  speechToTextBtn.addEventListener('click', () => {
    listeningNotif.classList.add('now-listening')
    startListening()
  });

  

  const sendPrompt = async () => {

    try {
      // check if prompt is empty
      if (promptInput.value === '') {
        emptyPrompt();
      } else {
    
       showLoading(promptInput.value, sendPromptBtn, aiDefaultScreen, userChatWrap, chatBox); // Display loading effect 

       const response = await textPrompt(promptInput.value); // Await chatbot response

       chatBox.removeChild(userChatWrap); //remove the loading function user chat from the chatbox
       updateChatBox(response, promptInput.value, chatBox); // Update conversation box


       sendPromptBtn.classList.remove('spinner'); // Remove spinning classList that showLoading function added
       sendPromptBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
         <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
         </svg>`; // set send prompt button inner html to send icon

       promptInput.value = ''; // clears prompt input
      }
     } catch (error) {
       console.error(`Please fix me: ${error}`)
     }

  }
  // Attached an event listener to send prompt button
  sendPromptBtn.addEventListener('click', () => sendPrompt());


  clearChats.addEventListener('click', () => {
   chatBox.innerHTML = '';
   notify.success('Conversations cleared 🧹');
  }); // event listener to clear chats
  
  
  detectNewMsgs(chatBox, scrollButton); // function to detect new messages 
}
