import React from 'react';
import {
  MapPin,
  Briefcase,
  CalendarDays,
  Pencil,
  Trash2,
} from 'lucide-react';

const COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-yellow-100 text-yellow-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-orange-100 text-orange-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
];

const JobCard = ({ job, onDelete, onEdit }) => {
  return (
    <div className="relative group">
      {/* Buttons with Notch */}
      <div className="absolute -top-3 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {/* Edit */}
        <div className="relative">
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-10 h-6 bg-white rounded-b-full -z-10 shadow-md" />
          <button
            onClick={() => onEdit(job)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-full shadow transform hover:scale-105"
            title="Edit"
          >
            <Pencil size={16} />
          </button>
        </div>

        {/* Delete */}
        <div className="relative">
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-10 h-6 bg-white rounded-b-full -z-10 shadow-md" />
          <button
            onClick={() => onDelete(job.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow transform hover:scale-105"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 h-72 rounded-2xl shadow-md p-6 pt-6 transition-all duration-300 transform group-hover:translate-y-2 group-hover:scale-[1.02] group-hover:shadow-xl border hover:border-blue-400 overflow-hidden">

        {/* Decorative Blob */}
        <svg
          className="absolute bottom-0 right-0 w-24 h-24 opacity-10 pointer-events-none"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#A5B4FC"
            d="M48.4,-61.8C61.8,-55.4,71.1,-41.3,74.8,-26.9C78.5,-12.6,76.6,2.1,70.3,16.1C64.1,30.1,53.4,43.3,40.3,49.5C27.2,55.7,11.6,54.8,-2.8,58.4C-17.3,62.1,-34.6,70.2,-46.2,65.4C-57.8,60.7,-63.7,43.1,-66.5,26.6C-69.3,10.1,-69,-5.3,-64.2,-20.3C-59.5,-35.3,-50.3,-49.9,-37.3,-56.3C-24.3,-62.7,-12.2,-60.8,2.6,-64.7C17.4,-68.6,34.8,-78.3,48.4,-61.8Z"
            transform="translate(100 100)"
          />
        </svg>

        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 z-10 relative">
          {job.title}
        </h2>

        <p className="text-sm text-blue-700 flex items-center z-10 relative">
          <Briefcase size={16} className="mr-2 text-blue-500" />
          {job.company}
        </p>

        <p className="text-sm text-purple-700 flex items-center mt-1 z-10 relative">
          <MapPin size={16} className="mr-2 text-purple-500" />
          {job.location}
        </p>

        <p className="text-sm text-slate-700 flex items-center mt-1 z-10 relative">
          <CalendarDays size={16} className="mr-2 text-slate-500" />
          {job.job_type} • Posted: {job.posting_date}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2 overflow-y-auto max-h-[90px] pr-1 hide-scrollbar z-10 relative">
          {job.tags?.split(',').map((tag, idx) => {
            const color = COLORS[idx % COLORS.length];
            return (
              <span
                key={idx}
                className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}
              >
                {tag.trim()}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
