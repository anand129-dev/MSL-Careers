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
    <div className="max-w-7xl mx-auto bg-slate-500">
      <div className="flex justify-between py-4">
        <div>
          <h1 className="text-4xl text-primary">Upcoming Openings</h1>
          {/* <h1 className="text-4xl">Be the First to Apply</h1> */}
        </div>
        <div>
          <button className="px-6 py-2 border border-blue-500 rounded-full">
            Upload CV
          </button>
        </div>
      </div>

      <div className="bg-gray-100 rounded-xl px-4 py-4">
        <ul className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="p-4 border rounded-md flex flex-col gap-2 bg-white"
            >
              <h2 className="text-xl font-bold font-inter">{job.title}</h2>
              <h2 className="text-xl">{job.department}</h2>
              <p className="text-base">
                Location : <span className="font-bold">{job.location}</span>
                {job.department}
              </p>
              <p className="text-gray-500">{job.location}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/jobs/${job._id}`)}
                  className="px-4 py-2 text-base text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
                >
                  View Details
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-full">
                  Apply Now
                </button>
              </div>

              {/* <button
                onClick={() => router.push(`/jobs/${job._id}`)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
