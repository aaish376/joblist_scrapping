import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const initialForm = {
  title: '',
  company: '',
  location: '',
  job_type: 'Full-time',
  tags: '',
};

const JobForm = ({ editingJob, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingJob) setForm(editingJob);
    else setForm(initialForm);
  }, [editingJob]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.location) {
      return setError('Title, Company and Location are required.');
    }
    onSubmit(form);
    setForm(initialForm);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full max-w-xl bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          title="Close"
        >
          <X size={20} />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-purple-600">➕</span>{' '}
            {editingJob ? 'Edit Job' : 'Add New Job'}
          </h3>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="job_type"
              value={form.job_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>

          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
            >
              {editingJob ? 'Update Job' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
