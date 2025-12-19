"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type JobForm = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  isActive: boolean;
};

export default function EditJobPage() {
  const { jobId } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<JobForm>({
    title: "",
    department: "",
    location: "",
    type: "",
    description: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* Fetch job */
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:4080/api/jobs/${jobId}`);
        const json = await res.json();

        setForm({
          title: json.data.title,
          department: json.data.department,
          location: json.data.location,
          type: json.data.type,
          description: json.data.description,
          isActive: json.data.isActive,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`http://localhost:4080/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      router.push("/admin/jobs");
    } catch (err) {
      alert("Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-slate-400">Loading job...</p>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold">Edit Job</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 space-y-5"
      >
        <Input
          label="Job Title"
          value={form.title}
          onChange={(v) => setForm({ ...form, title: v })}
        />

        <Input
          label="Department"
          value={form.department}
          onChange={(v) => setForm({ ...form, department: v })}
        />

        <Input
          label="Location"
          value={form.location}
          onChange={(v) => setForm({ ...form, location: v })}
        />

        <Input
          label="Employment Type"
          value={form.type}
          onChange={(v) => setForm({ ...form, type: v })}
        />

        <Textarea
          label="Description"
          value={form.description}
          onChange={(v) => setForm({ ...form, description: v })}
        />

        <label className="flex items-center gap-3 text-sm font-semibold">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          Job is Active
        </label>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            {saving ? "Saving..." : "Update Job"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="border px-6 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* Reusable Inputs */

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase text-slate-400">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-4 py-2"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase text-slate-400">
        {label}
      </label>
      <textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-4 py-2"
      />
    </div>
  );
}
