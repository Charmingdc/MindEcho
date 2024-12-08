'use strict';

// import notify function
import { notify } from './notify.js';

export const copyText = (text) => {
 
 navigator.clipboard.writeText(text)
 .then(msg => {
  notify.success('Text copied to clipboard');
 })
 .catch(err => {
  notify.error('Error copying text');
 });
 
};