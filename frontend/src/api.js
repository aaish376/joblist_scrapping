

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // your Flask backend
});

export const getJobs = (params) => API.get('/jobs', { params });
export const getJob = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post('/jobs', data);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
export const getFilters = () => API.get('/filters');

// // Dummy data list for local testing
// let jobs = [
//   {
//     id: 1,
//     title: "Junior Actuary",
//     company: "ABC Insurance",
//     location: "New York, USA",
//     posting_date: "2025-07-01",
//     job_type: "Full-time",
//     tags: "Pricing, Life, Excel"
//   },
//   {
//     id: 2,
//     title: "Data Analyst Intern",
//     company: "DataCorp",
//     location: "Toronto, Canada",
//     posting_date: "2025-06-25",
//     job_type: "Internship",
//     tags: "Health, SQL, Python"
//   },
//   {
//     id: 3,
//     title: "Senior Pricing Analyst",
//     company: "Global Re",
//     location: "London, UK",
//     posting_date: "2025-06-20",
//     job_type: "Contract",
//     tags: "Reinsurance, Pricing, R"
//   }
// ];

// let idCounter = 4;

// export const getJobs = async (params) => {
//   let filtered = [...jobs];

//   if (params?.keyword) {
//     filtered = filtered.filter(job =>
//       job.title.toLowerCase().includes(params.keyword.toLowerCase()) ||
//       job.company.toLowerCase().includes(params.keyword.toLowerCase())
//     );
//   }

//   if (params?.job_type) {
//     filtered = filtered.filter(job => job.job_type === params.job_type);
//   }

//   if (params?.sort === "posting_date_asc") {
//     filtered.sort((a, b) => new Date(a.posting_date) - new Date(b.posting_date));
//   } else {
//     filtered.sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date));
//   }

//   return { data: filtered };
// };

// export const getJob = async (id) => {
//   const job = jobs.find(j => j.id === parseInt(id));
//   return { data: job };
// };

// export const createJob = async (data) => {
//   const newJob = { ...data, id: idCounter++, posting_date: new Date().toISOString().split("T")[0] };
//   jobs.push(newJob);
//   return { data: newJob };
// };

// export const updateJob = async (id, data) => {
//   const index = jobs.findIndex(j => j.id === parseInt(id));
//   if (index > -1) {
//     jobs[index] = { ...jobs[index], ...data };
//     return { data: jobs[index] };
//   }
//   throw new Error("Job not found");
// };

// export const deleteJob = async (id) => {
//   jobs = jobs.filter(j => j.id !== parseInt(id));
//   return { data: { success: true } };
// };
