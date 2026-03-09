import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const isDark = () => document.documentElement.classList.contains('dark')

export const PortfolioChart: React.FC = () => {
  const dark = isDark()
  const textColor = dark ? '#6b7280' : '#9ca3af'

  return (
    <Doughnut
      data={{
        labels: ['Savings', 'Shares', 'Deposits', 'Contributions'],
        datasets: [{
          data: [55, 21, 15, 9],
          backgroundColor: ['#0a6e6e', '#c9921a', '#059669', '#2563eb'],
          borderWidth: 0,
          hoverOffset: 10,
        }],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: textColor,
              font: { family: 'Sora', size: 11 },
              padding: 12,
              usePointStyle: true,
              pointStyleWidth: 8,
            },
          },
        },
      }}
    />
  )
}
