import { notFound } from "next/navigation";

type Job = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
};

type Props = { params: { id: string } };

export default async function JobDetailPage(props: Props) {
  // Unwrap params properly
  const { id } = await props.params; // <- this is required in Next.js 14+ App Router

  console.log("params.id received:", id); // ✅ Should log actual id

  try {
    const res = await fetch(`http://localhost:4080/api/jobs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API returned not ok:", res.statusText);
      return notFound();
    }

    const { data: job } = await res.json();

    if (!job) return notFound();

    return (
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <p className="text-gray-600 mb-2">Department: {job.department}</p>
        <p className="text-gray-500 mb-2">Location: {job.location}</p>
        <p className="text-gray-500 mb-2">Type: {job.type}</p>
        <p className="mt-4">{job.description}</p>
        <p className="mt-4">{job.requirements}</p>
      </main>
    );
  } catch (err) {
    console.error("Error fetching job detail:", err);
    return notFound();
  }
}
