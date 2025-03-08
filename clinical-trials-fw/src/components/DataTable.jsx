import axios from "axios";
import React, { useEffect, useState } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/data");
            setData(response.data);
            console.log(response.data);
        } catch(error) {
            console.log("Error fetching data : ", error);
        }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Excel Data</h2>
      <table className="min-w-full border-collapse border border-gray-300">
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
              <td className="border border-gray-300 p-2">
                {item["Start Date"]}
              </td>
              <td className="border border-gray-300 p-2">{item["End Date"]}</td>
              <td className="border border-gray-300 p-2">{item.Country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
