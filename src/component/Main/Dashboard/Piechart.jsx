// src/components/EarningGrowthChart.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

// --- plugin: chart area background gradient ---
const ChartAreaGradient = {
  id: "chartAreaGradient",
  beforeDraw(chart, args, opts) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const { top, bottom, left, right } = chartArea;
    const g = ctx.createLinearGradient(0, top, 0, bottom);
    g.addColorStop(0, opts.from || "rgba(0,0,0,0.06)");
    g.addColorStop(1, opts.to || "rgba(0,0,0,0)");
    ctx.save();
    ctx.fillStyle = g;
    ctx.fillRect(left, top, right - left, bottom - top);
    ctx.restore();
  },
};
Chart.register(ChartAreaGradient);

const MONTHS = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export default function EarningGrowthChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [year, setYear] = useState(2025);

  // demo data — API ডেটা দিলে এখানে বসান
  const dataByYear = useMemo(
    () => ({
      2024: [35, 45, 60, 22, 75, 50, 38, 46, 18, 24, 16, 58],
      2025: [85, 72, 62, 28, 80, 66, 30, 48, 12, 19, 11, 80],
    }),
    []
  );

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    chartRef.current?.destroy();

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: `${year}`,
            data: dataByYear[year] || [],
            // --- only line, no area fill ---
            fill: false,
            tension: 0, // <-- straight segments (no rounded curve)
            borderColor: "#111827",
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 4.5,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#111827",
            pointBorderWidth: 1.5,
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
            callbacks: { label: (ctx) => ` ${ctx.parsed.y}` },
          },
          // plugin options (bg gradient)
          chartAreaGradient: {
            from: "rgba(17,24,39,0.08)", // top color
            to: "rgba(17,24,39,0.00)", // bottom color
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(0,0,0,0.08)", drawBorder: false },
            ticks: { color: "#6b7280" },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0,0,0,0.08)", drawBorder: false },
            ticks: { color: "#6b7280" },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [year, dataByYear]);

  return (
    <div className="rounded-2xl border bg-gray-50 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">
          Player Growth
        </h3>
        <select
          className="rounded-lg border px-3 py-1.5 text-sm"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
        </select>
      </div>

      <div className="h-64 md:h-72">
        <canvas ref={canvasRef} />
      </div>

      <div className="mt-2 text-center text-sm text-gray-500">◌ {year}</div>
    </div>
  );
}
