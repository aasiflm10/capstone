import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CountriesCountBar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/get-countries')
      .then(response => response.json())
      .then(data => {
        const formattedData = Object.entries(data).map(([name, value]) => ({ name, value }));
        setData(formattedData);
      })
      .catch(error => console.error('Error fetching country data:', error));
  }, []);

  return (
    <div>
      <h2>Number of Trials per Country</h2>
      <ResponsiveContainer width={1500} height={800}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
  
};

export default CountriesCountBar;