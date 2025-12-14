import ApplyJobClient from "./ApplyJobClient";
import Apply from "./Apply";

export default async function ApplyJobPage({ params }) {
  const { id } = await params; // ✅ unwrap correctly

  return <Apply />;
  // <ApplyJobClient jobId={id} />
}
