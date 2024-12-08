'use strict';

export const speechToText = () => {
 
  return new Promise((resolve, reject) => {
   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   const recognition = new SpeechRecognition();

   recognition.continuous = true;
   recognition.interimResults = true;
   recognition.lang = 'en-US';
   
   let isRecording = false;
   let finalTranscript = '';

   recognition.onresult = (event) => {
    isRecording = true;

    let interimTranscript = '';

    for ( let i = event.resultIndex; i < event.results.length; i++ ) {
      const transcriptSegment = event.results[i][0].transcript;
    
      if (event.results[i].isFinal) {
        finalTranscript = transcriptSegment + '';
      }
       else {
        interimTranscript += transcriptSegment;
      }
    }
  
   };


   recognition.onend = () => {
    isRecording = false;

    resolve({
     text: finalTranscript,
     isRecording: false,
    });
   }

   recognition.onerror = (error) => {
    reject(error);
   }

   recognition.start();
   console.log('Listening');
  });

};