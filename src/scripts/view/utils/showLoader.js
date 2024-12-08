'use strict';


export const showLoader = (state, container) => {
  if (state) {
    container.style.display = 'flex';
  } else if (!state) {
    container.style.display = 'none';
  }
};