'use strict';

// Import the chat object and history array from the context.js module
import { chat, history } from './context.js';

export const textPrompt = async (prompt) => {
  try {
    // Add the user's input to the chat history
    history.push({
      role: "user", // The role is 'user' to denote this is the user's message
      parts: [{ text: prompt }], // Store the prompt text inside the parts array
    });

    // Send the prompt to the chat model and get the response stream
    const result = await chat.sendMessageStream(prompt);

    // Return the raw result to be processed by the UI
    return result;
  } catch (error) {
    // Log any errors that occur during the process
    console.error(error);
  }
};