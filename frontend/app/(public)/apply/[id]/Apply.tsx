"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "react-phone-number-input/style.css";

/* ---------------- TYPES ---------------- */

type Job = {
  _id: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
};

type ApplicationData = Record<string, unknown> & {
  jobId?: string;
  jobTitle?: string;
  jobDepartment?: string;
  jobLocation?: string;
};

/* ---------------- DYNAMIC IMPORT ---------------- */

const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

/* ---------------- COMPONENT ---------------- */

export default function SendEmailForm() {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [previousEmployment, setPreviousEmployment] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>();
  const [job, setJob] = useState<Job | null>(null);

  const params = useParams<{ id: string }>();
  const jobId = params?.id;

  const imageUrl = "/hero-background.jpg";

  /* ---------------- FETCH JOB ---------------- */

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:4080/api/jobs/${jobId}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch job");

        const json: { data: Job } = await res.json();
        setJob(json.data);
      } catch (err) {
        console.error("Failed to fetch job", err);
      }
    };

    fetchJob();
  }, [jobId]);

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: ApplicationData = {};

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        data[key] = {
          name: value.name,
          size: value.size,
          type: value.type,
        };
      } else {
        data[key] = value;
      }
    }

    // 🔑 Attach job data
    data.jobId = job?._id;
    data.jobTitle = job?.title;
    data.jobDepartment = job?.department;
    data.jobLocation = job?.location;

    console.log("FINAL APPLICATION DATA 👇");
    console.log(JSON.stringify(data, null, 2));
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-[50vh] overflow-hidden hidden md:block">
        <img
          src={imageUrl}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>

      <main className="absolute bg-white top-24 md:top-56 inset-x-0 mx-auto w-full md:max-w-4xl lg:max-w-5xl xl:max-w-7xl md:shadow-2xl px-4 py-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-sm text-gray-500">
            Job ID:{" "}
            <span className="font-medium text-gray-700">{job?._id || "—"}</span>
          </div>

          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Apply for {job?.title || "this position"}
            {job?.department && (
              <span className="text-gray-500"> · {job.department}</span>
            )}
          </h1>

          <div className="flex flex-wrap gap-6 mt-2 text-sm text-gray-500">
            <span>{job?.location}</span>
            <span>{job?.type}</span>
          </div>
        </div>

        <div className="w-full h-[2px] bg-blue-500 my-4" />

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="jobId" value={job?._id ?? ""} />
          <input type="hidden" name="jobTitle" value={job?.title ?? ""} />

          {/* Name */}
          <input
            type="text"
            name="fullName"
            required
            placeholder="Full Name"
            className="w-full border px-4 py-2 rounded-md"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-md"
          />

          {/* Phone */}
          <PhoneInput
            international
            defaultCountry="IN"
            value={phone}
            onChange={setPhone}
            className="border rounded-md px-4 py-2"
          />
          <input type="hidden" name="phone" value={phone ?? ""} />

          {/* Resume */}
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            required
            className="w-full"
          />

          {/* Previous Employment */}
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="previousEmployment"
                value="yes"
                checked={previousEmployment === "yes"}
                onChange={() => setPreviousEmployment("yes")}
                required
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="previousEmployment"
                value="no"
                checked={previousEmployment === "no"}
                onChange={() => setPreviousEmployment("no")}
              />{" "}
              No
            </label>
          </div>

          {previousEmployment === "yes" && (
            <input
              type="text"
              name="previousDetails"
              required
              placeholder="Previous details"
              className="w-full border px-4 py-2 rounded-md"
            />
          )}

          {/* Consent */}
          <label className="flex gap-2 text-sm">
            <input type="checkbox" name="consent" required />I agree to the
            recruitment privacy policy.
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

          {status && <p className="text-green-600">{status}</p>}
        </form>
      </main>
    </div>
  );
}
