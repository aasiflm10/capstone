import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PhasesCountBar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/get-phases')
      .then(response => response.json())
      .then(data => {
        const formattedData = Object.entries(data).map(([name, value]) => ({ name, value }));
        setData(formattedData);
      })
      .catch(error => console.error('Error fetching phase data:', error));
  }, []);

  return (
    <div>
      <h2>Number of Trials per Phase</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <XAxis dataKey="name" label={{ value: 'Trial Phase', position: 'bottom', offset: -10 }} />
          <YAxis label={{ value: 'Number of Trials', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PhasesCountBar;
