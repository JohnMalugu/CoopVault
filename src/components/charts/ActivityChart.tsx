import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend
} from 'chart.js'
import { activityChartData } from '@/utils/mockData'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const isDark = () => document.documentElement.classList.contains('dark')

export const ActivityChart: React.FC = () => {
  const dark = isDark()
  const gridColor = dark ? '#1f2937' : '#f3f4f6'
  const textColor = dark ? '#6b7280' : '#9ca3af'

  return (
    <Bar
      data={{
        labels: activityChartData.labels,
        datasets: [
          {
            label: 'Savings (TZS K)',
            data: activityChartData.savings,
            backgroundColor: 'rgba(10,110,110,0.75)',
            borderRadius: 5,
            borderSkipped: false,
          },
          {
            label: 'Loans (TZS K)',
            data: activityChartData.loans,
            backgroundColor: 'rgba(201,146,26,0.75)',
            borderRadius: 5,
            borderSkipped: false,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: textColor,
              font: { family: 'Sora', size: 11 },
              usePointStyle: true,
              pointStyleWidth: 10,
            },
          },
          tooltip: {
            callbacks: {
              label: ctx => ` TZS ${(ctx.parsed.y * 1000).toLocaleString()}`,
            },
          },
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'Sora', size: 11 } } },
          y: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'Sora', size: 11 }, callback: v => `${v}K` } },
        },
      }}
    />
  )
}
