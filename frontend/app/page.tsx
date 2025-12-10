import JobList from "../components/JobList";

export default function Home() {
  return (
    <main className="min-h-screen max-w-4xl flex-col">
      <h1 className="text-3xl font-semibold">
        MSL Careers Portal — Setup Successful
      </h1>
      <JobList />
    </main>
  );
}
