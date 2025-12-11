"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Job = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
};

export default function JobList() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:4080/api/jobs");
        const result = await res.json();
        console.log("API result:", result); // ✅ log the full API response
        setJobs(result.data);
        console.log("Jobs array:", result.data); // ✅ log array
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <ul className="w-full max-w-md space-y-4">
      {jobs.map((job) => (
        <li key={job._id} className="p-4 border rounded-md flex flex-col gap-2">
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p className="text-gray-600">{job.department}</p>
          <p className="text-gray-500">{job.location}</p>
          <button
            onClick={() => {
              console.log("Clicked job ID:", job._id); // ✅ log ID on click
              router.push(`/jobs/${job._id}`);
            }}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            
            View Details
          </button>
        </li>
      ))}
    </ul>
  );
}
