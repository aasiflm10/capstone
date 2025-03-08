import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const DataTableWithCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // ✅ Prepare data for Bar Chart (Active vs Inactive)
  const statusData = [
    { name: "Active", value: data.filter((item) => item.Status === "Active").length },
    { name: "Inactive", value: data.filter((item) => item.Status === "Inactive").length },
  ];

  // ✅ Prepare data for Pie Chart (Entries by Country)
  const countryCounts = data.reduce((acc, item) => {
    acc[item.Country] = (acc[item.Country] || 0) + 1;
    return acc;
  }, {});

  const countryData = Object.keys(countryCounts).map((key) => ({
    name: key,
    value: countryCounts[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Excel Data</h2>
      
      {/* ✅ Table Display */}
      <table className="min-w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Start Date</th>
            <th className="border border-gray-300 p-2">End Date</th>
            <th className="border border-gray-300 p-2">Country</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border border-gray-300">
              <td className="border border-gray-300 p-2">{item.ID}</td>
              <td className="border border-gray-300 p-2">{item.Name}</td>
              <td className="border border-gray-300 p-2">{item.Description}</td>
              <td className="border border-gray-300 p-2">{item.Date}</td>
              <td className="border border-gray-300 p-2">{item.Status}</td>
              <td className="border border-gray-300 p-2">{item["Start Date"]}</td>
              <td className="border border-gray-300 p-2">{item["End Date"]}</td>
              <td className="border border-gray-300 p-2">{item.Country}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Bar Chart for Active vs Inactive */}
      <h2 className="text-xl font-bold mb-4">Status Distribution</h2>
      <BarChart width={400} height={300} data={statusData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>

      {/* ✅ Pie Chart for Countries */}
      <h2 className="text-xl font-bold mb-4">Entries by Country</h2>
      <PieChart width={400} height={300}>
        <Pie data={countryData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
          {countryData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default DataTableWithCharts;
