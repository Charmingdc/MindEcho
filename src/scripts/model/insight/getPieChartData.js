'use strict';

// import necessary function 
import { getEachMoodCount } from './getEachMoodCount.js';


export const getPieChartData = async (data) => {
  try {
   const moodsCount = await getEachMoodCount(data);
      
   let labels = Object.keys(moodsCount);
   let series = Object.values(moodsCount)
   .map(item => {
     return item.length;
    });
      
    return [labels, series];
  } catch (error) {
    console.log(error)
  }
};