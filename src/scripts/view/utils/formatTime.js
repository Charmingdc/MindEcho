'use strict';

export const formatTime = (seconds) => {
  
 const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
 const secs = Math.floor(seconds % 60);

 const formattedSec = secs < 10 ? `0${secs}` : secs;
 return `${mins}:${formattedSec}`;
};