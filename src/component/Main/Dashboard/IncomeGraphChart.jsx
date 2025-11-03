// src/components/UserGrowthChart.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend
);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export default function UserGrowthChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [year, setYear] = useState(2025);

  // Demo data (তুমি API থেকে আনলে এখানে বসিয়ে দিও)
  const dataByYear = useMemo(
    () => ({
      2024: [10, 35, 55, 25, 40, 60, 50, 70, 45, 65, 50, 75],
      2025: [15, 90, 100, 12, 22, 33, 85, 25, 93, 66, 41, 80],
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Destroy previous instance on re-render
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: `${year}`,
            data: dataByYear[year] || [],
            borderColor: "#111827", // slate-900
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 3.5,
            pointHoverRadius: 5,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#111827",
            pointBorderWidth: 1.5,
            fill: "start",
            // responsive gradient based on chart area
            backgroundColor: (context) => {
              const { chart } = context;
              const { ctx, chartArea } = chart;
              if (!chartArea) return "rgba(0,0,0,0.06)";
              const gradient = ctx.createLinearGradient(
                0,
                chartArea.top,
                0,
                chartArea.bottom
              );
              gradient.addColorStop(0, "rgba(17,24,39,0.25)");
              gradient.addColorStop(1, "rgba(17,24,39,0.02)");
              return gradient;
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y}`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(0,0,0,0.06)",
              drawBorder: false,
            },
            ticks: { color: "#6b7280" }, // gray-500
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0,0,0,0.06)",
              drawBorder: false,
            },
            ticks: { color: "#6b7280" },
          },
        },
      },
    });

    return () => {
      chartRef.current && chartRef.current.destroy();
    };
  }, [year, dataByYear]);

  return (
    <div className="rounded-2xl border bg-gray-50 p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">Earning Growth</h3>
        <select
          className="rounded-lg border px-3 py-1.5 text-sm"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
        </select>
      </div>

      {/* Chart area */}
      <div className="h-64 md:h-72">
        <canvas ref={canvasRef} />
      </div>

      <div className="mt-2 text-center text-sm text-gray-500">◌ {year}</div>
    </div>
  );
}
