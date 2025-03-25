"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface PieChartProps {
  data: any[]
  nameField: string
  valueField: string
  colors?: string[]
}

export function PieChart({
  data,
  nameField,
  valueField,
  colors = ["#8C583A", "#BF8654", "#D9B88F", "#733030", "#262425"],
}: PieChartProps) {
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
      type: "pie",
      data: {
        labels: data.map((item) => item[nameField]),
        datasets: [
          {
            data: data.map((item) => item[valueField]),
            backgroundColor: data.map((_, i) => colors[i % colors.length]),
            borderColor: "#fff",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw || 0
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                const percentage = Math.round(((value as number) / total) * 100)
                return `${label}: ${value} (${percentage}%)`
              },
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
  }, [data, nameField, valueField, colors])

  return <canvas ref={canvasRef} />
}

