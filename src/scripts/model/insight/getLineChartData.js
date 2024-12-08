'use strict';

import { getLastSevenDays } from '../utils/getLastSevenDays.js';
import { getFormattedDate } from '../utils/getFormattedDate.js';


export const getLineChartData = async (data) => {
  try {
    const moodMapping = { sad: 1, stressed: 2, anxious: 3, calm: 4, happy: 5 };


    // Get the weekday from a date string, considering the local timezone
    const getLocalWeekday = (dateStr) => {
      const localDate = new Date(`${dateStr}T00:00:00`); // Force local time at midnight
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return weekdays[localDate.getDay()]; // Returns correct local weekday
    };

    const lastSevenDays = getLastSevenDays();

    // Log today's date for debugging purposes
    const today = new Date();
    today.setHours(0, 0, 0, 0);
   
   
    // Normalize input data (force local time)
    const normalizeToLocal = (date) => {
      const localDate = new Date(date);
      localDate.setHours(0, 0, 0, 0); // Normalize to midnight
      return getFormattedDate(localDate); // Use custom format function
    };

    const normalizedData = data.map(item => ({
      ...item,
      date: normalizeToLocal(item.date),
    }));

    // Generate chart data (mood counts for the last 7 days)
    const chartData = lastSevenDays.map(date => {
      const moodEntry = normalizedData.find(item => item.date === date);
      return moodEntry ? moodMapping[moodEntry.mood] : null; // Use null if no mood entry for that day
    });

    // Generate dynamic labels for the chart (local weekday names)
    const dynamicLabels = lastSevenDays.map(date => getLocalWeekday(date));

    return { chartData, dynamicLabels };
  } catch (error) {
    console.error("Error Generating Line Chart Data:", error);
    return { chartData: [], dynamicLabels: [] };
  }
};