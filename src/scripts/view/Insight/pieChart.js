'use strict';

// Function to render a pie chart
export const pieChart = (series, labels, chartBox) => {

  // Check if a chart already exists in chartBox, and destroy it if it does
  if (chartBox.chart) {
    chartBox.chart.destroy(); // Remove the existing chart instance
  }

  // Define chart configuration options
  const options = {
    series, // Data values for the pie chart (e.g., counts of each mood)
    chart: {
      width: 380, // Default chart width
      type: 'pie', // Specify the chart type as 'pie'
    },
    labels, // Labels for each data point in the chart
    colors: ['#5A9099', '#D55944', '#E58B3E', '#8EB350', '#36977E'], // Custom colors for the pie slices
    responsive: [{
      // Responsive settings for smaller screens
      breakpoint: 480, // Apply these settings for screen widths ≤ 480px
      options: {
        chart: {
          width: 380, // Set a fixed width for smaller screens
        },
        legend: {
          position: 'bottom', // Move the legend to the bottom for better visibility
        }
      }
    }],
    animations: {
      enabled: true, // Enable animations for the chart
      speed: 400, // Overall animation speed in milliseconds
      animateGradually: {
        enabled: true, // Enable gradual animation when rendering the chart
        delay: 100, // Delay in milliseconds between rendering each data point
      },
      dynamicAnimation: {
        enabled: true, // Enable dynamic animations (e.g., resizing, updates)
        speed: 300, // Speed for dynamic animations
      }
    }
  };

  // Create a new chart instance and assign it to chartBox.chart
  chartBox.chart = new ApexCharts(chartBox, options);

  // Render the chart in the specified chartBox container
  chartBox.chart.render();
};