import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import './ResultsChart.css';

const ResultsChart = ({ data }) => {
  // Define a color palette for the bars based on rank
  const colors = ['#10b981', '#3b82f6', '#8b5cf6'];

  const formatData = data.map(item => ({
    name: item.name,
    match: item.matchPercentage
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip glass-panel">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">Match: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formatData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 30,
          }}
          barSize={60}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#cbd5e1" 
            tick={{ fill: '#cbd5e1', fontSize: 14, fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            dy={10}
          />
          <YAxis 
            stroke="#cbd5e1" 
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Bar dataKey="match" radius={[8, 8, 0, 0]} animationDuration={1500}>
            {formatData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;
