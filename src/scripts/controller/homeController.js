'use strict';

// import neccesary functions
import { getElement } from '../view/getElement.js';
import { copyText } from '../view/copyText.js';
import { speakText } from '../view/tts.js';

// getting elements 
const dailyAffirmText = getElement('daily-affirm-text', 'id');
const copyAffirmBtn = getElement('copy-affirm-btn', 'id');
const speakAffirmBtn = getElement('speak-affirm-btn', 'id');
