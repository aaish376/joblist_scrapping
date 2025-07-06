import React, { useEffect, useState } from 'react';
import { getJobs, createJob, deleteJob, updateJob } from '../api';
import JobForm from './JobForm';
import JobList from './JobList';
import FilterBar from './FilterBar';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
 const [filters, setFilters] = useState({
  keyword: '',
  job_type: '',
  location: '',
  tags: [],
  sort: 'posting_date_desc',
});


  const fetchJobs = async () => {
  const res = await getJobs({
    ...filters,
    tag: filters.tags?.join(','), // pass tags as CSV string
  });
  setJobs(res.data);
};


  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleCreateOrUpdate = async (job) => {
    if (job.id) await updateJob(job.id, job);
    else await createJob(job);
    setEditingJob(null);
    setShowForm(false);
    fetchJobs();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this job?')) {
      await deleteJob(id);
      fetchJobs();
    }
  };

  const openForm = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Nav */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">📋 Actuarial Job Board Heree</h1>
        <button
          onClick={openForm}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Job
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <FilterBar filters={filters} setFilters={setFilters} jobCount={jobs.length} />

        <JobList jobs={jobs} onDelete={handleDelete} onEdit={(job) => {
          setEditingJob(job);
          setShowForm(true);
        }} />
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <JobForm
              editingJob={editingJob}
              onSubmit={handleCreateOrUpdate}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
