"use client";

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SalesData {
  date: string;
  sales: string;
}

interface SalesChartProps {
  salesData: SalesData[];
}



const SalesChart: React.FC<SalesChartProps> = ({ salesData }) => {
 const chartData = {
    labels: salesData.map((data) => data.date),
    datasets: [
      {
        label: 'Sales',
        data: salesData.map((data) => parseFloat(data.sales)), // Parse sales to numbers
        backgroundColor: ['#facc15', '#fb923c', '#f87171', '#a78bfa', '#60a5fa', '#34d399'], // Use attractive tailwind colors, more variety
        borderColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(53, 162, 235, 0.8)', // Deeper color on hover
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow flexible height
    plugins: {
      legend: {
        position: 'top' as 'top',
      },
      title: {
        display: true,
        text: 'Sales Data',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales',
        },
        beginAtZero: true, // Start y-axis at 0
      },

    },
  };





  return <Bar data={chartData} options={options} />;
};


export default SalesChart;
