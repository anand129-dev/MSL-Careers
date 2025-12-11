import ApplyJobClient from "./ApplyJobClient";

export default async function ApplyJobPage({ params }) {
  const { id } = await params; // ✅ unwrap correctly

  return <ApplyJobClient jobId={id} />;
}
