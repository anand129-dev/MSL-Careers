import JobList from "../components/JobList";
import UpcomingJobList from "../components/UpcomingJobList";
import HeroSection from "@/components/Hero";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* <div className="w-full mx-auto"> */}
      <div className="//min-h-screen w-full //bg-gray-600 flex flex-col items-center mx-auto px-4 lg:px-20 xl:px-32 2xl:px-40">
        <h1 className="text-3xl font-semibold text-blue-900 mt-8">
          Welcome to MSL's NAVORA
        </h1>
        <JobList />
      </div>
      <div className="//min-h-screen bg-slate-50 w-full //bg-gray-600 flex flex-col items-center mx-auto px-4 lg:px-20 xl:px-32 2xl:px-40">
        <UpcomingJobList />
      </div>
    </main>
  );
}
