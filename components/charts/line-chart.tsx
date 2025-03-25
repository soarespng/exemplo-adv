"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface LineChartProps {
  data: any[]
  xField: string
  yField: string
  xLabel?: string
  yLabel?: string
  color?: string
}

export function LineChart({ data, xField, yField, xLabel, yLabel, color = "#8C583A" }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return

    // Destruir gráfico existente, se houver
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Criar novo gráfico
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((item) => item[xField]),
        datasets: [
          {
            label: yLabel || yField,
            data: data.map((item) => item[yField]),
            borderColor: color,
            backgroundColor: `${color}20`,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: !!yLabel,
              text: yLabel || "",
            },
          },
          x: {
            title: {
              display: !!xLabel,
              text: xLabel || "",
            },
          },
        },
      },
    })

    // Limpar ao desmontar
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [data, xField, yField, xLabel, yLabel, color])

  return <canvas ref={canvasRef} />
}

