import React, { useState } from "react";

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
    country: "",
  });

  // Handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onFilterChange({ ...filters, [name]: value }); // Send updated filters to parent
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md w-64">
      <h2 className="text-lg font-bold">Filters</h2>

      {/* Status Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">End Date</label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>

      {/* Country Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium">Country</label>
        <select
          name="country"
          value={filters.country}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">All</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="India">India</option>
          <option value="Canada">Canada</option>
        </select>
      </div>

      {/* Display Selected Filters */}
      <div className="mt-4 p-2 bg-gray-100 rounded">
        <h3 className="text-sm font-semibold">Selected Filters:</h3>
        <p className="text-xs">Status: {filters.status || "All"}</p>
        <p className="text-xs">Start Date: {filters.startDate || "Any"}</p>
        <p className="text-xs">End Date: {filters.endDate || "Any"}</p>
        <p className="text-xs">Country: {filters.country || "All"}</p>
      </div>
    </div>
  );
};

export default FilterComponent;
