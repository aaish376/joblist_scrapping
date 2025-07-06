import React, { useEffect, useState } from 'react';
import { getFilters } from '../api';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

const FilterBar = ({ filters, setFilters, jobCount }) => {
  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState([]);
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      const res = await getFilters();
      setLocations(res.data.locations);
      setTags(res.data.tags);
    };
    fetchFilters();
  }, []);

  const handleTagChange = (tag) => {
    const currentTags = filters.tags || [];
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    setFilters({ ...filters, tags: updatedTags });
  };

  const resetFilters = () => {
    setFilters({
      keyword: '',
      job_type: '',
      location: '',
      tags: [],
      sort: 'posting_date_desc',
    });
  };

  return (
    <div className="bg-gradient-to-br mb-10 from-white via-blue-50 to-purple-50 shadow-lg rounded-xl p-6 space-y-6">
      {/* Top Inputs */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="🔍 Search by Title or Company"
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />

        <select
          value={filters.job_type}
          onChange={(e) => setFilters({ ...filters, job_type: e.target.value })}
          className="w-full md:w-1/5 border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-full md:w-1/5 border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="w-full md:w-1/5 border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="posting_date_desc">Newest First</option>
          <option value="posting_date_asc">Oldest First</option>
        </select>
      </div>

      {/* Tags Header + Job Count */}
      <div className="flex flex-wrap justify-between items-center">
        <div
          className="flex items-center gap-2 text-purple-700 font-medium text-sm hover:underline cursor-pointer"
          onClick={() => setShowTags(!showTags)}
        >
          <Filter size={18} />
          Filter by Tags
          {showTags ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <p className="text-gray-700 font-medium">
            🎯 Showing <span className="font-semibold">{jobCount}</span> job{jobCount !== 1 && 's'}
          </p>
          <button
            onClick={resetFilters}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Tags Dropdown */}
      {showTags && (
        <div className="flex flex-wrap gap-3 animate-fade-in mt-2">
          {tags.map((tag) => (
            <label
              key={tag}
              className="bg-white border border-purple-200 px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer text-sm text-purple-700 shadow-sm hover:bg-purple-50 transition"
            >
              <input
                type="checkbox"
                checked={filters.tags?.includes(tag) || false}
                onChange={() => handleTagChange(tag)}
                className="accent-purple-600"
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      )}

      {/* Summary Tags */}
      <div className="flex flex-wrap justify-start gap-2">
        {filters.keyword && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center gap-2">
            Keyword: {filters.keyword}
            <button onClick={() => setFilters({ ...filters, keyword: '' })}>&times;</button>
          </span>
        )}
        {filters.job_type && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs flex items-center gap-2">
            Job Type: {filters.job_type}
            <button onClick={() => setFilters({ ...filters, job_type: '' })}>&times;</button>
          </span>
        )}
        {filters.location && (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs flex items-center gap-2">
            Location: {filters.location}
            <button onClick={() => setFilters({ ...filters, location: '' })}>&times;</button>
          </span>
        )}
        {filters.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs flex items-center gap-2"
          >
            {tag}
            <button onClick={() => handleTagChange(tag)}>&times;</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
