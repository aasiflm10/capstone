import { useState } from "react";
import "./App.css";
import ChartComponent from "./components/ChartComponent";
import DataTable from "./components/DataTable";
import DataTableWithCharts from "./components/DataTableWithCharts";
import FilterComponent from "./components/Filters";
import CountriesCountBar from "./components/graphs/Countries_Count_Bar";
import PhasesCountBar from "./components/graphs/Phases_Count_Bar";

function App() {
  const [filters, setFilters] = useState({});

  return (
    <div className="flex gap-8 p-6">
      {/* Filters Section */}
      <FilterComponent onFilterChange={setFilters} />

      {/* Data Section */}
      <div className="flex-1">
        <h2 className="text-xl font-bold">Filtered Data</h2>
        <pre>{JSON.stringify(filters, null, 2)}</pre>
        <DataTableWithCharts/>
      </div>
    </div>
  );
}

export default App;
