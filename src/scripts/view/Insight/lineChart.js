'use strict';

export const lineChart = (chartData, chartLabels, chartBox) => {

  // Check if a chart already exists in chartBox, and destroy it if it does
  if (chartBox.chart) {
    chartBox.chart.destroy(); // Remove the existing chart instance
  }

  // Check if there is only one non-null value in chartData
  const nonNullData = chartData.filter(data => data !== null);

  // Handle the case where there is only one data point (non-null value)
  if (nonNullData.length === 1) {
    chartLabels = ['One Mood Logged']; // Adjust the label
    chartData = [{ x: chartLabels[0], y: nonNullData[0] }]; // Single data point formatting

    // Adjust the y-axis for the single mood value
    const moodEmojis = ['😢', '😫', '😰', '😌', '😄']; // Emojis for moods
    const moodIndex = nonNullData[0] - 1; // Index of the logged mood
    var yAxisLabels = [moodEmojis[moodIndex]]; // Only the single mood for y-axis
  }

  const options = {
    series: [{
      name: "Moods Logged",
      data: chartData, // Mood index for each day (1 = 😢, 2 = 😫, 3 = 😰, 4 = 😌, 5 = 😄)
    }],
    chart: {
      type: 'line',
      height: 380,
      zoom: {
        enabled: false
      },
      width: '100%' // Responsive width
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#4438D0'],
    markers: {
      size: 6,
      shape: 'circle',
      colors: ['#4438D0'],
    },
    title: {
      text: 'Moods Logged Per Day',
      align: 'left'
    },
    xaxis: {
      categories: chartLabels, // Days of the week or custom label for single mood
    },
    grid: {
      borderColor: '#0D0D0D', // Change this to your desired color
      strokeDashArray: 5, // Optional: makes the grid lines dashed
      xaxis: {
        lines: {
          show: true, // Ensure vertical grid lines are visible
        },
      },
    },
    yaxis: {
      categories: yAxisLabels || [], // Only the single mood or full set if there are multiple moods
      labels: {
        formatter: function(value) {
          // Using the actual emoji characters directly in the array
          const moodEmojis = ['😢', '😫', '😰', '😌', '😄']; // Emojis for moods
          return moodEmojis[value - 1] || 'N/A'; // Map mood indices to emojis
        },
        style: {
          fontSize: '1.2rem',
        },
      }
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        // Tooltip displaying emojis
        const moodEmojis = ['😢', '😫', '😰', '😌', '😄']; // Emojis for moods
        const moodIndex = series[seriesIndex][dataPointIndex];
        return `<div style="padding: 8px; background-color: rgb(13, 13, 13); border: 1px solid rgb(13, 13, 13); border-radius: 0.4rem;">
                          Mood: ${moodEmojis[moodIndex - 1] || 'N/A'}
                        </div>`;
      }
    }
  };

  chartBox.chart = new ApexCharts(chartBox, options);
  chartBox.chart.render();
};