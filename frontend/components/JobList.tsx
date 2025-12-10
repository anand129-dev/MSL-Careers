"use client";

import { useEffect, useState } from "react";

type Job = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
};

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]); // ✅ inside component
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:4080/api/jobs");
        if (!res.ok) throw new Error("Network response not ok");
        const result = await res.json();
        setJobs(result.data); // only the array
      } catch (err) {
        console.error("Failed to load jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (jobs.length === 0) return <p>No jobs available</p>;

  return (
    <ul className="w-full max-w-md space-y-4">
      {jobs.map((job) => (
        <li
          key={job._id}
          className="p-4 border rounded-md hover:shadow-md transition"
        >
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p className="text-gray-600">{job.department}</p>
          <p className="text-gray-500">{job.location}</p>
        </li>
      ))}
    </ul>
  );
}
