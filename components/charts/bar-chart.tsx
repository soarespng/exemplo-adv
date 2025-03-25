"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface BarChartProps {
  data: any[]
  xField: string
  yField: string
  xLabel?: string
  yLabel?: string
  colors?: string[]
}

export function BarChart({
  data,
  xField,
  yField,
  xLabel,
  yLabel,
  colors = ["#8C583A", "#BF8654", "#D9B88F", "#733030", "#262425"],
}: BarChartProps) {
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
      type: "bar",
      data: {
        labels: data.map((item) => item[xField]),
        datasets: [
          {
            label: yLabel || yField,
            data: data.map((item) => item[yField]),
            backgroundColor: data.map((_, i) => colors[i % colors.length]),
            borderColor: data.map((_, i) => colors[i % colors.length]),
            borderWidth: 1,
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
  }, [data, xField, yField, xLabel, yLabel, colors])

  return <canvas ref={canvasRef} />
}

