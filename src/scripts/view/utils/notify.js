'use strict';


// functiom for calling custom notfiication
export const notify = new Notyf({
  duration: 2000,
  ripple: true,
  dismissible: true,
  position: {x: 'center', y: 'top'},
 });