'use strict';

import { getElement } from '../utils/getElement.js';
import { notify } from '../utils/notify.js';
import { writeToElement } from '../utils/writeToElement.js';
import { createElement } from '../utils/createElement.js';
import { copyText } from '../utils/copyText.js';
import { speakText } from '../utils/tts.js';
import { formatResponse } from './formatResponse.js';


export const updateChatBox = async (response, prompt, chatBox) => {

  const userChatWrap = createElement('div');
  const aiToolBox = createElement('div');
  const aiChatBox = createElement('div');
  const aiDp = createElement('div');
  const aiChatWrap = createElement('div');
  const copyTextBtn = createElement('div');
  const speakTextBtn = createElement('div');

  const speakTextIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
    <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
    <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
   </svg>`;
  const copyTextIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
     <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
    </svg>`;
 
 
  userChatWrap.classList.add('usr-chat-wrap');
  aiToolBox.classList.add('box-icon');
  aiChatBox.classList.add('ai-chatbox');
  aiDp.classList.add('ai-dp');
  aiChatWrap.classList.add('ai-chat-wrap');
  
  writeToElement(userChatWrap, prompt, 'string');
  writeToElement(copyTextBtn, copyTextIcon, 'html');
  writeToElement(speakTextBtn, speakTextIcon, 'html');
  
  
  let fullResponse = '';
  for await (let chunk of response.stream) {
   let chunkText = chunk.text();
   fullResponse += chunkText;

   const aiChat = createElement('p');
   aiChat.classList.add('ai-chat');
   writeToElement(aiChat, formatResponse(chunkText), 'html');
   
   speakTextBtn.addEventListener('click', () => {
     speakText(chunkText);
   }); // event listener to speak text 

   aiToolBox.appendChild(speakTextBtn);
   aiToolBox.appendChild(copyTextBtn);

   aiChatBox.appendChild(aiChat);
   aiChatBox.appendChild(aiToolBox);

   aiChatWrap.appendChild(aiDp);
   aiChatWrap.appendChild(aiChatBox);

   chatBox.appendChild(userChatWrap);
   chatBox.appendChild(aiChatWrap);
  }

  copyTextBtn.addEventListener('click', () => {
    copyText(fullResponse);
  }); // event listener to copy text to clipboard
};

