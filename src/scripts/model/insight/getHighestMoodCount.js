'use strict';

import { getEachMoodCount } from './getEachMoodCount.js';

export const getHighestMoodCount = async (data) => {
  try {
    if (data.length < 3) {
      return {errorText: 'Not enough mood logged data to calculate analysis'};
    }
    
    const newData = data.slice(-7);
    const moods = await getEachMoodCount(newData);

  
    const moodCounts = Object.entries(moods)
    .map(([mood, entries]) => [mood, entries.length]);

    // Find the mood with the highest count
    const [highestMood, highestCount] = moodCounts.reduce((max, current) => (current[1] > max[1] ? current : max),
      ['', 0] // Initial value: empty mood and count 0
    );

    return { mood: highestMood, count: highestCount };
  } catch (err) {
    console.error(err);
  }
};