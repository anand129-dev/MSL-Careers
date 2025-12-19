"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateJobPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const form = new FormData(e.currentTarget);

    const jobData = {
      title: form.get("title"),
      department: form.get("department"),
      location: form.get("location"),
      type: form.get("type"),
      description: form.get("description"),
      responsibilities: String(form.get("responsibilities") || "")
        .split("\n")
        .filter((x) => x.trim()),
      requirements: String(form.get("requirements") || "")
        .split("\n")
        .filter((x) => x.trim()),
      postedBy: "6770e9fa55e01a79cd01f123",
    };

    try {
      const res = await fetch("http://localhost:4080/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create job");
        return; // 🔴 STOP HERE
      }

      // ✅ SUCCESS PATH — NOTHING AFTER SHOULD THROW
      setMessage("Job created successfully!");
      e.currentTarget.reset();

      setTimeout(() => {
        router.push("/admin/jobs");
      }, 800);

      return; // 🔴 IMPORTANT
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">
          Create Job Opening
        </h1>

        {message && (
          <p className="mb-4 text-center text-white p-2 rounded bg-green-600">
            {message}
          </p>
        )}

        {error && (
          <p className="mb-4 text-center text-white p-2 rounded bg-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input name="title" label="Job Title *" required />
          <Input name="department" label="Department" />
          <Input name="location" label="Location *" required />

          <Select name="type" label="Job Type *" />

          <Textarea name="description" label="Job Description *" required />
          <Textarea
            name="responsibilities"
            label="Responsibilities (one per line)"
          />
          <Textarea name="requirements" label="Requirements (one per line)" />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- UI Helpers ---------- */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input {...props} className="w-full border rounded p-2" />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <textarea {...props} rows={4} className="w-full border rounded p-2" />
    </div>
  );
}

function Select({ label, ...props }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <select {...props} className="w-full border rounded p-2">
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Contract</option>
      </select>
    </div>
  );
}
