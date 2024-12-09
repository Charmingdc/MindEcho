'use strict';

// importing necessary functions

// view functions
import { getElement } from '../view/utils/getElement.js';
import { createElement } from '../view/utils/createElement.js';
import { writeToElement } from '../view/utils/writeToElement.js';
import { notify } from '../view/utils/notify.js';
import { renderRecentMoods } from '../view/insight/renderRecentMoods.js';
import { renderMoodHistory } from '../view/insight/renderMoodHistory.js';
import { pieChart } from '../view/insight/pieChart.js';
import { lineChart } from '../view/insight/lineChart.js';
import { displayChartError } from '../view/insight/displayChartError.js';
import { renderMoodAnalysis } from '../view/insight/renderMoodAnalysis.js';
import { verifyAction } from '../view/utils/verifyAction.js';
import { showLoader } from '../view/utils/showLoader.js';
import { applyTheme } from '../view/utils/applyTheme.js';

//model function
import { getLoggedMoods } from '../model/insight/getLoggedMoods.js';
import { deleteAllMoodLogs } from '../model/insight/deleteAllMoodLogs.js';
import { deleteMood } from '../model/insight/deleteMood.js';
import { filterMoods } from '../model/insight/filterMoods.js';
import { getPieChartData } from '../model/insight/getPieChartData.js';
import { getLineChartData } from '../model/insight/getLineChartData.js';
import { getHighestMoodCount } from '../model/Insight/getHighestMoodCount.js';
import { getSavedTheme } from '../model/utils/getSavedTheme.js';


// getting elements from html file
const bdy = getElement('bdy', 'id');
const introScreen = getElement('intro-screen', 'id');
const loadingScreen = getElement('loading-screen', 'id');
const viewHistoryBtn = getElement('view-history', 'id');
const moodHistoryContainer = getElement('mood-history', 'id');
const closeHistoryBtn = getElement('close-history', 'id');
const deleteAllBtn = getElement('delete-all-btn', 'id');
const dateInput = getElement('date-input', 'id');
const nameInput = getElement('name-input', 'id');
const lineChartBox = getElement('mood-chart', 'id');
const moodChartInfo = getElement('mood-chart-info', 'id');
const pieChartBox = getElement('mood-count-chart', 'id');

let data;




export const initInsight = async (app) => {
  try {

    const handleTheme = async () => {
      try {
        // retrieving saved from local storage
        const savedTheme = await getSavedTheme();

        // apply theme
        await applyTheme(savedTheme, bdy);
      } catch (err) {
        console.error('Error applying theme:', err.message);
      }
    };
    handleTheme();


    data = await getLoggedMoods(app); // get all logged moods

    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 1000); // hide intro screen after two sec



    const handleDeleteMood = async (selectedMood) => {
      try {
        const isTrue = await verifyAction(moodHistoryContainer);
        if (!isTrue) return; // if isTrue is false, just return without doing anything 

        showLoader(true, loadingScreen);
        // display loader
        data = await deleteMood(app, selectedMood);
        showLoader(false, loadingScreen);
        // hide loader

        renderRecentMoods(data);
        renderMoodHistory(data, handleDeleteMood);
        renderMoodCountChart(); // re-render pie chart
        renderMoodChart(); // re-render mood chart 
        handleRenderMoodAnalysis();
      } catch (err) {
        console.error(err)
      }

    }; // function to handle single mood deletion


    const handleFilter = async () => {
      try {
        const dateValue = dateInput.value;
        const nameValue = nameInput.value;

        const filteredMoods = await filterMoods(data, dateValue, nameValue); // Call Model function
        renderMoodHistory(filteredMoods, handleDeleteMood); // Update View  with filtered data
      } catch (err) {
        console.error(err);
      }
    }; // function to handle mood filtering 

    const handleEvents = () => {
      dateInput.addEventListener('change', async () => await handleFilter());
      nameInput.addEventListener('input', async () => await handleFilter());


      //event listener to mood history 
      viewHistoryBtn.addEventListener('click', () => {
        moodHistoryContainer.style.display = 'flex';
      });
      // event listener to hide mood history
      closeHistoryBtn.addEventListener('click', () => {
        moodHistoryContainer.style.display = 'none';
      });

    }
    handleEvents();



    const renderMoodChart = async () => {
      try {
        const { chartData, dynamicLabels } = await getLineChartData(data);


        if (data.length === 0) {
          displayChartError(lineChartBox);
          moodChartInfo.style.display = 'none';
          return;
        }

        lineChart(chartData, dynamicLabels, lineChartBox);
      } catch (err) {
        console.error(err);
      }
    };
    renderMoodChart();



    const renderMoodCountChart = async () => {
      try {
        const [labels, series] = await getPieChartData(data);

        if (data.length === 0) {
          displayChartError(pieChartBox);
          return;
        }

        pieChart(series, labels, pieChartBox)
      } catch (err) {
        console.error(err);
      }
    }
    renderMoodCountChart();



    const handleRenderMoodAnalysis = async () => {
      try {

        const analytics = await getHighestMoodCount(data);

        if (Object.entries(analytics).length === 1) {
          const moodAnalysisBox = getElement('mood-analysis-box', 'id');
          moodAnalysisBox.style.width = '100%';

          moodAnalysisBox.innerHTML = `<em> ${analytics.errorText} </em>`;
        } else {
          const { mood, count } = analytics;
          renderMoodAnalysis(mood, count);
        }

      } catch (err) {
        console.error(err);
      }
    }
    handleRenderMoodAnalysis();



    deleteAllBtn.addEventListener('click', async () => {

      if (data.length === 0) {
        notify.error('Empty mood log history');
      } else {
        const isTrue = await verifyAction(moodHistoryContainer);
        if (!isTrue) return; // if isTrue is false, just return without doing anything 

        showLoader(true, loadingScreen);
        data = await deleteAllMoodLogs(app); // delete all mood logs
        showLoader(false, loadingScreen);


        renderRecentMoods(data); // update recent moods with the latest data
        renderMoodHistory(data, handleDeleteMood); // update mood history with the latest info
        await renderMoodCountChart(); // re-render pie chart
        await renderMoodChart(); // re-render mood chart
        await handleRenderMoodAnalysis();
      }

    }); // event listener to handle mood history wipe




    await renderRecentMoods(data); // render recent moods
    await renderMoodHistory(data, handleDeleteMood); // render all mood history 
  } catch (error) {
    console.log(error.message);
  }
};