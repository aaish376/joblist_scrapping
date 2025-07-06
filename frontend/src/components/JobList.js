import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs, onDelete, onEdit }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.length > 0 ? (
        jobs.map(job => <JobCard key={job.id} job={job} onDelete={onDelete} onEdit={onEdit} />)
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobList;
