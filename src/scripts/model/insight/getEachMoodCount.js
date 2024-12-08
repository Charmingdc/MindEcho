'use strict';


export const getEachMoodCount = async (data) => {
  try {

    if (data.length === 0) {
      return {};
    }
    
    const result = data.reduce((groupedMoodObj, moodObj) => {
     const moodName = moodObj.mood;

     if (groupedMoodObj[moodName] == null) groupedMoodObj[moodName] = [];

     groupedMoodObj[moodName].push(moodObj);
     return groupedMoodObj;
    }, {});
    
    return result;
  } catch (error) {
    console.log(error);
  }
};