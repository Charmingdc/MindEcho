'use strict';

// import formatDate function 

import { getFormattedDate } from './getFormattedDate.js';


// Get the last 7 days, including today (in local time)
export const getLastSevenDays = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight in local time
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i)); // Subtract days to get last 7 days
    return getFormattedDate(date); // Use custom function
  });
  return dates;
};