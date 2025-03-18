import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffbb28", "#ff8042", "#ff4560"];

const TherapeuticPieChart = ({ data }) => {
  const chartData = data.map((area, index) => ({
    name: area,
    value: 1, // Each therapeutic area counts as one occurrence
    color: COLORS[index % COLORS.length], // Assign a color from the array
  }));

  return (
    <div className="flex justify-center">
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TherapeuticPieChart;
