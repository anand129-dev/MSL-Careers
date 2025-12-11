"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplyJobClient({ jobId }) {
  const router = useRouter();
  const mockUserId = "67383fe048fa3c4022a96abc";

  const [job, setJob] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch job details
  useEffect(() => {
    fetch(`http://localhost:4080/api/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => setJob(data.job));
  }, [jobId]);

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      jobId,
      userId: mockUserId,
      resumeUrl,
      coverLetter,
    };

    const res = await fetch("http://localhost:4080/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/profile");
    } else {
      alert("Error applying for job");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-6">
        {job ? (
          <>
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <p className="text-gray-600 mb-4">{job.location}</p>
          </>
        ) : (
          <p>Loading job details...</p>
        )}

        <form className="space-y-4" onSubmit={handleApply}>
          <div>
            <label className="block mb-1 font-semibold">Resume URL</label>
            <input
              type="text"
              className="w-full border p-3 rounded"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Cover Letter</label>
            <textarea
              rows={5}
              className="w-full border p-3 rounded"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            ></textarea>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
          >
            {loading ? "Applying..." : "Apply Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
