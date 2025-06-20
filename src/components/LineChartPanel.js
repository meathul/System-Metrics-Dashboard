// components/LineChartPanel.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
//import "./LineChartPanel.css"; // Optional: for any extra styling

const data = [
  { time: "4:34 AM", value: 0 },
  { time: "4:36 AM", value: 60 },
  { time: "5:35 PM", value: 40 },
  { time: "8:24 PM", value: 0 },
  { time: "8:26 PM", value: 10 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#232b3b", // <-- Make sure this is set!
    borderRadius: "12px",
    padding: "28px 24px 20px 24px",
    minWidth: 0,
    boxSizing: "border-box",
    border: "1px solid #2c3446",
    width: "100%",
    height: "240px",
    display: "flex",
    flexDirection: "column"
      }}>
        <div>{label}</div>
        <div><strong>{payload[0].value}</strong></div>
      </div>
    );
  }
  return null;
};

export default function LineChartPanel({ title, min, max, last, unit }) {
  return (
    <div
      style={{
        background: "#232b3b",
        borderRadius: "12px",
        padding: "28px 24px 20px 24px",
        minWidth: 0,
        boxSizing: "border-box",
        border: "1px solid #2c3446",
        width: "100%",
        height: "240px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{
        fontSize: "1.15rem",
        fontWeight: 800,
        color: "#fff",
        marginBottom: 4,
        letterSpacing: "0.01em"
      }}>
        {title}
      </div>
      <div style={{
        color: "#8ca1b8",
        fontSize: "1rem",
        marginBottom: 16,
        fontWeight: 500
      }}>
        MIN {min}{unit} &nbsp; MAX {max}{unit} &nbsp; LAST {last}{unit}
      </div>
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="time"
              tick={{ fill: "#8ca1b8", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={false}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              width={0}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="linear"
              dataKey="value"
              stroke="#3ef3a4"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: "#3ef3a4", stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
