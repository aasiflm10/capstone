import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CountryTrialCountBarChart = ({ data }) => {
  // Convert data object to array format required by recharts
  const chartData = Object.entries(data).map(([country, trials]) => ({
    name: country,
    trials,
  }));

  return (
    <div className="flex justify-center">
      <ResponsiveContainer width={600} height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="trials" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CountryTrialCountBarChart;
