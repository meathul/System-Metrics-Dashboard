// Install recharts if you haven't already: npm install recharts

import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// Dummy data similar to the chart in the screenshot
const data = [
  { time: "11:30", App1: 30, App2: 20, App3: 10, App4: 8, App5: 7, Other: 5 },
  { time: "12:00", App1: 32, App2: 18, App3: 12, App4: 7, App5: 6, Other: 5 },
  { time: "12:30", App1: 35, App2: 22, App3: 10, App4: 9, App5: 7, Other: 4 },
  { time: "13:00", App1: 33, App2: 19, App3: 13, App4: 8, App5: 6, Other: 5 },
  { time: "13:30", App1: 31, App2: 21, App3: 11, App4: 10, App5: 8, Other: 6 },
  { time: "14:15", App1: 30, App2: 20, App3: 12, App4: 9, App5: 7, Other: 5 },
];

// Color mapping for apps, matching the screenshot
const COLORS = {
  App1: "#4ADE80",   // Green
  App2: "#FACC15",   // Yellow
  App3: "#38BDF8",   // Blue
  App4: "#F472B6",   // Pink
  App5: "#F87171",   // Red
  Other: "#A3A3A3",  // Gray
};

const CpuCoreAllocationChart = () => (
  <div style={{ background: "#1e2533", padding: 24, borderRadius: 16 }}>
    <h3 style={{ color: "#fff", marginBottom: 16 }}>
      Top Apps - CPU/Core Allocation
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} stackOffset="expand">
        <XAxis dataKey="time" stroke="#cbd5e1" />
        <YAxis stroke="#cbd5e1" tickFormatter={(v) => `${Math.round(v * 100)}%`} />
        <Tooltip
          formatter={(value, name) => [`${value}%`, name]}
          contentStyle={{ background: "#23272f", borderRadius: 8, border: "none", color: "#fff" }}
        />
        <Legend
          verticalAlign="top"
          wrapperStyle={{ color: "#fff" }}
        />
        {Object.keys(COLORS).map((key) => (
          <Bar key={key} dataKey={key} stackId="a" fill={COLORS[key]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default CpuCoreAllocationChart;
