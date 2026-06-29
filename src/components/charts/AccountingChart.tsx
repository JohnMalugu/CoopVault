import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js'
import { accountingChartData } from '@/utils/mockData'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const isDark = () => document.documentElement.classList.contains('dark')

export const AccountingChart: React.FC = () => {
  const dark = isDark()
  const gridColor = dark ? '#1f2937' : '#f3f4f6'
  const textColor = dark ? '#6b7280' : '#9ca3af'

  return (
    <Line
      data={{
        labels: accountingChartData.labels,
        datasets: [
          {
            label: 'Revenue (TZS M)',
            data: accountingChartData.revenue,
            borderColor: '#0a6e6e',
            backgroundColor: 'rgba(10,110,110,0.08)',
            fill: true, tension: 0.4,
            pointRadius: 4, pointBackgroundColor: '#0a6e6e',
          },
          {
            label: 'Expenses (TZS M)',
            data: accountingChartData.expenses,
            borderColor: '#c9921a',
            backgroundColor: 'rgba(201,146,26,0.08)',
            fill: true, tension: 0.4,
            pointRadius: 4, pointBackgroundColor: '#c9921a',
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor, font: { family: 'Sora', size: 11 }, usePointStyle: true },
          },
          tooltip: {
            callbacks: { label: ctx => ` TZS ${ctx.parsed.y}M` },
          },
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor, callback: v => `${v}M` } },
        },
      }}
    />
  )
}
