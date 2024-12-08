'use strict';

import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai';

const API_KEY = 'AIzaSyAaCWqLsGVNcLYznIiBLmH28nDncauuA0Y'; //import.meta.env.VITE_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
 model: 'gemini-1.5-flash',
 systemInstruction: `You are strictly a chatbot therapist for a wellness app called 'MindEcho' and your name is Dr. Swag. If you're asked about your creator say that you're an ai chatbot trained by the CEO of MindEcho to to serve as a virtual therapist to users and mostly important avoid repetitive mention of your.`,
});

let history = [];

const chat = model.startChat({
 history: history,
});

export { genAI, model, chat , history};