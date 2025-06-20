import React from 'react';

const SemiCircleGauge = ({
  value = 76,
  min = 0,
  max = 100,
  unit = 'MS',
  label = 'Temperature',
  color = '#FFD600',
  bgColor = '#444',
  innerColor = '#222', // This will now be the background of the inner circle only
  width = 300,
  height = 150,
}) => {
  // Gauge dimensions
  const cx = width / 2;
  const cy = height - 20; // Adjusted for better vertical centering of the semi-circle itself
  const radius = 80;
  const innerRadius = 60;
  const strokeWidth = 14;

  // Arc calculations
  const startAngle = Math.PI; // 180deg (left)
  const endAngle = 0;         // 0deg (right)
  const angle = Math.PI * (value - min) / (max - min); // Value angle

  // Helper to get arc coordinates
  const polarToCartesian = (cx, cy, r, angle) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  });

  // Arc paths
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const valueEnd = polarToCartesian(cx, cy, radius, startAngle + angle);

  // Large arc flag for SVG
  const largeArcFlag = angle > Math.PI ? 1 : 0;

  // Path for background semi-circle
  const bgPath = `
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}
  `;

  // Path for value arc
  const valuePath = `
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${valueEnd.x} ${valueEnd.y}
  `;

  return (
    <div style={{
        // Minimal container to maintain structure for the SVG and text below it
        width: width,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
      <svg width={width} height={height}>
        {/* Background arc */}
        <path
          d={bgPath}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={valuePath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Inner full circle */}
        <circle
          cx={cx}
          cy={cy}
          r={innerRadius}
          fill={innerColor}
          stroke="#333"
          strokeWidth={6}
        />
        {/* Dotted circle (optional) */}
        <circle
          cx={cx}
          cy={cy}
          r={innerRadius - 10}
          fill="none"
          stroke="#888"
          strokeWidth={2}
          strokeDasharray="4 6"
        />
        {/* Value text */}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fontSize="32"
          fill="#fff"
          fontWeight="bold"
        >{value}</text>
        <text
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          fontSize="16"
          fill="#aaa"
        >{unit}</text>
      </svg>
      {/* Label and min/max */}
      <div style={{ width: '100%', marginTop: 8, textAlign: 'center', color: '#aaa', fontSize: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 12px' }}>
          <span>{min}</span>
          <span>{max}</span>
        </div>
        <div style={{ marginTop: 8, color: '#ccc', fontSize: 18 }}>{label}</div>
      </div>
    </div>
  );
};

export default SemiCircleGauge;