import { useState } from "react";
import "./App.css";
import FilterComponent from "./components/Filters";
import TherapeuticPieChart from "./components/graphs/Theraputic_Pie_Chart";
import TherapeuticCountPieChart from "./components/graphs/TheraputicArea_Pie_Chart";
import axios from "axios";
import CountryTrialCountBarChart from "./components/graphs/Countries_TrailCount_Bar";

function App() {
  const [trialCounts, setTrialCounts] = useState({});
  const [countryTrialCounts, setCountryTrialCounts] = useState({}); // State for country-wise trial count

  const handleFilterSubmit = async (country, therapeuticArea) => {
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/get-therapeutic-areas",
      //   country ? { country } : { "country" : ""
      //   }
      // );

      const trailCountsResponse = await axios.post(
        "http://localhost:5000/api/trials-by-therapeutic-area",
        country ? { country } : { country: "" }
      );

      setTrialCounts(trailCountsResponse.data.trialCounts || {});

      const countryResponse = await axios.post(
        "http://localhost:5000/api/trials-by-country",
        country ? { country } : { country: "" }
      );
      console.log(countryResponse);
      setCountryTrialCounts(countryResponse.data.trialCounts || {});


      // setTherapeuticAreas(response.data.therapeuticAreas || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex gap-8 p-6">
      {/* Filters Section */}
      <FilterComponent onSubmit={handleFilterSubmit} />

      {/* Data Section */}
      <div className="border-8">
        {Object.keys(trialCounts).length > 0 ? (
          <TherapeuticCountPieChart data={trialCounts} />
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>
      {/* Country Trial Count Bar Chart */}
      <div className="border-8 p-4">
        {Object.keys(countryTrialCounts).length > 0 ? (
          <CountryTrialCountBarChart data={countryTrialCounts} />
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
}
export default App;
