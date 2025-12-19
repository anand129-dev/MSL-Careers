"use client";

import React, { useEffect, useState } from "react";
import { Plus, Filter, MoreVertical, Eye, Pencil, Power } from "lucide-react";
import { StatusBadge, SectionSearch } from "../components/shared";
import { useRouter } from "next/navigation";

type Job = {
  _id: string;
  title: string;
  department: string;
  location: string;
  isActive: boolean;
  postedBy?: {
    name: string;
  };
};

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingJobId, setUpdatingJobId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:4080/api/jobs");
        const json = await res.json();
        setJobs(json.data || []);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleJobStatus = async (jobId: string, currentStatus: boolean) => {
    try {
      setUpdatingJobId(jobId);

      const res = await fetch(`http://localhost:4080/api/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !currentStatus,
        }),
      });

      if (!res.ok) throw new Error("Failed to update job status");

      // Update UI without refetch
      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, isActive: !currentStatus } : job
        )
      );
    } catch (error) {
      console.error(error);
      alert("Unable to update job status");
    } finally {
      setUpdatingJobId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Job Management</h1>
        <button
          onClick={() => router.push("/admin/jobs/create-job")}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Post Job
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <SectionSearch
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 text-sm font-bold">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="text-left px-6 py-4">Job ID</th>
              <th className="text-left px-6 py-4">Title</th>
              <th className="text-left px-6 py-4">Department</th>
              <th className="text-left px-6 py-4">Location</th>
              <th className="text-left px-6 py-4">Posted By</th>
              <th className="text-left px-6 py-4">Active</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-slate-400"
                >
                  Loading jobs...
                </td>
              </tr>
            )}

            {!loading && filteredJobs.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-slate-400"
                >
                  No jobs found
                </td>
              </tr>
            )}

            {filteredJobs.map((job) => (
              <tr key={job._id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                  {job._id.slice(-6)}
                </td>

                <td className="px-6 py-4 font-semibold text-sm">{job.title}</td>

                <td className="px-6 py-4 text-slate-500 text-sm">
                  {job.department}
                </td>

                <td className="px-6 py-4 text-slate-500 text-sm">
                  {job.location}
                </td>

                <td className="px-6 py-4 text-slate-500 text-sm">
                  {job.postedBy?.name || "—"}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={job.isActive ? "Active" : "Inactive"} />
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-4 text-slate-400">
                    <Eye className="w-4 h-4 cursor-pointer hover:text-indigo-600" />

                    <Pencil
                      className="w-4 h-4 cursor-pointer hover:text-indigo-600"
                      onClick={() => router.push(`/admin/jobs/edit/${job._id}`)}
                    />

                    <button
                      disabled={updatingJobId === job._id}
                      onClick={() => toggleJobStatus(job._id, job.isActive)}
                      className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border
        ${
          job.isActive
            ? "text-red-600 border-red-200 hover:bg-red-50"
            : "text-green-600 border-green-200 hover:bg-green-50"
        }
        ${updatingJobId === job._id ? "opacity-50 cursor-not-allowed" : ""}
      `}
                    >
                      <Power className="w-3 h-3" />
                      {job.isActive ? "Deactivate" : "Activate"}
                    </button>

                    <MoreVertical className="w-4 h-4 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
