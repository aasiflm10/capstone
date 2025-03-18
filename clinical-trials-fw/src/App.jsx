import { useState } from "react";
import "./App.css";
import FilterComponent from "./components/Filters";
import TherapeuticPieChart from "./components/graphs/Theraputic_Pie_Chart";
import axios from "axios";

function App() {
  const [therapeuticAreas, setTherapeuticAreas] = useState([]);

  const handleFilterSubmit = async (country) => {
    try {
      const response = await axios.post("http://localhost:5000/api/get-therapeutic-areas", {
        country,
      });
  
      setTherapeuticAreas(response.data.therapeuticAreas || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  return (
    <div className="flex gap-8 p-6">
      {/* Filters Section */}
      <FilterComponent onSubmit={handleFilterSubmit} />

      {/* Data Section */}
      <div className="flex-1">
        <h2 className="text-lg font-bold text-center mb-4">
          Therapeutic Areas
        </h2>
        {therapeuticAreas.length > 0 ? (
          <TherapeuticPieChart data={therapeuticAreas} />
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
}

export default App;
