import React, { useState } from "react";

const FilterComponent = ({ onSubmit }) => {
  const [country, setCountry] = useState("");
  const [therapeuticArea, setTherapeuticAreas] = useState("");

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md w-64">
      <h2 className="text-lg font-bold text-center">Filters</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Country name"
          className="rounded-md p-2 outline-2 w-full border"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        
        <div className="flex justify-center">
          <button
            onClick={() => onSubmit(country, therapeuticArea)}
            className="rounded-md bg-blue-500 text-white p-2 w-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
