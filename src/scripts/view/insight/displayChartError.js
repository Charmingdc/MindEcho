export const displayChartError = (chartBox) => {
 
  // Check if a chart instance exists and destroy it
  if (chartBox.chart) {
    chartBox.chart.destroy();
    chartBox.chart = null;
  } else {
    console.log("No chart instance found to destroy.");
  }

  // Clear chartBox content
  chartBox.innerHTML = '';

  // Styling chartBox
  chartBox.style.display = 'flex';
  chartBox.style.flexDirection = 'column';
  chartBox.style.alignItems = 'center';
  chartBox.style.justifyContent = 'center';
  chartBox.style.textAlign = 'center';

  // Add no-data message
  const imgSrc = '/public/assets/imgs/no-data-rafiki.png';
  chartBox.innerHTML = `
    <h2>No data to render the chart</h2>
    <br>
    <img src="${imgSrc}" style="width: 18rem;" alt="No data" />
  `;
};